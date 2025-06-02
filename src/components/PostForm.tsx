import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "./index";
import service from "../backend/Config";
import { useNavigate } from "react-router";
import type { RootState } from "../state/store.ts";
import { useSelector } from "react-redux";
import { ID } from "appwrite";

interface FormData {
  slug?: string;
  title?: string;
  content?: string;
  featuredImage?: string;
  status?: string;
  userId?: string;
  image?: FileList;
}

interface PostFormProps {
  post?: Partial<FormData> & { $id?: string }; // post can be partial (some fields may be missing)
}

const PostForm: React.FC<PostFormProps> = ({ post }) => {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm<FormData>({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const submit = async (data: FormData & { image?: FileList }) => {
    try {
      const file = data.image?.[0]
        ? await service.uploadfile(data.image[0])
        : null;

      if (post?.slug) {
        // Update post
        if (file && post.featuredImage) {
          await service.deleteFile(post.featuredImage);
        }

        const updatedPost = await service.updatePost(post.slug, {
          title: data.title,
          content: data.content,
          status: data.status,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (updatedPost) {
          navigate(`/post/${updatedPost.$id}`);
        }
      } else {
        // Create post
        if (!file) return;

        const newPost = await service.createPost({
          title: data.title || "",
          slug: data.slug || ID.unique(),
          content: data.content || "",
          status: data.status || "active",
          featuredImage: file.$id,
          userId: userData?.$id || "",
        });

        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        }
      }
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  const slugTransform = useCallback((value: string) => {
    if (value) {
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/, "-")
        .replace(/\s/g, "-");
    }
  }, []);

  useEffect(() => {
    const subcription = watch((value, { name }) => {
      if (value.title)
        if (name === "title") {
          setValue("slug", slugTransform(value.title), {
            shouldValidate: true,
          });
        }
    });
    return () => subcription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          type="text"
          label="Title"
          placeholder="Title"
          className="mb-5"
          {...register("title", { required: true })}
        />
        <Input
          type="text"
          label="Slug"
          placeholder="title"
          className="mb-5"
          {...register("slug", { required: true })}
          onChange={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label="content"
          control={control}
          name="content"
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="FeaturedImage :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post?.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" className="secondary-btn">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
