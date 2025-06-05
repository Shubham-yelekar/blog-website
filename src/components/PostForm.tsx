import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "./index";
import service from "../backend/Config";
import { useNavigate } from "react-router";
import type { RootState } from "../state/store.ts";
import { useSelector } from "react-redux";

import tags from "./Constants/TagsOptions.ts";

interface FormData {
  title?: string;
  slug?: string;
  content?: string;
  featuredImage?: string;
  status?: string;
  userId?: string;
  image?: FileList;
  tags?: string[];
  author?: string;
}

interface PostFormProps {
  post?: Partial<FormData> & { $id?: string }; // post can be partial (some fields may be missing)
}

const PostForm: React.FC<PostFormProps> = ({ post }) => {
  const [selectedTag, setSelectedTag] = useState<string[]>(post?.tags || []);
  const [previewImage, setPreviewImage] = useState<string | null>(
    post?.featuredImage ? service.getFileView(post.featuredImage) : null
  );
  const toggleTag = (tag: string) => {
    setSelectedTag((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

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

      let slug = slugTransform(data.title || "");

      if (post?.$id) {
        // Update post
        if (file && post.featuredImage) {
          await service.deleteFile(post.featuredImage);
        }

        const updatedPost = await service.updatePost(post.$id, {
          title: data.title,
          slug,
          content: data.content,
          status: data.status,
          featuredImage: file ? file.$id : post.featuredImage,
          tags: selectedTag,
        });

        if (updatedPost) {
          navigate(`/post/${updatedPost.slug}?id=${updatedPost.$id}`);
        }
      } else {
        // Create post
        if (!file) return;

        const newPost = await service.createPost({
          title: data.title || "",
          slug: data.slug,
          content: data.content || "",
          status: data.status || "active",
          featuredImage: file.$id,
          userId: userData?.$id || "",
          tags: selectedTag,
          author: userData?.name || "Anonymous",
        });

        if (newPost) {
          navigate(`/post/${newPost.slug}?id=${newPost.$id}`);
        }
      }
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  const slugTransform = useCallback((value: string) => {
    if (value) {
      return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and dashes
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .replace(/-+/g, "-") // Replace multiple dashes with a single one
        .replace(/^-+|-+$/g, ""); // Trim dashes from start and end
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-full p-2 md:w-2/3">
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
          className="mb-5 cursor-not-allowed"
          {...register("slug", { required: true })}
          readOnly
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label="Content"
          control={control}
          name="content"
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full p-2 md:w-1/3">
        <Input
          label="Cover Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
          onChange={handleImageChange}
        />
        {previewImage && (
          <div className="w-full mb-4">
            <img src={previewImage} alt={previewImage} className="rounded-lg" />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        Tags
        <div className="flex gap-2 flex-wrap mt-2">
          {tags &&
            tags.map((tag) => (
              <button
                type="button"
                className={`text-sm border  px-4 py-2 rounded-full ${
                  selectedTag.includes(tag.tag)
                    ? "bg-studio-400 text-white"
                    : "border-studio-200"
                }`}
                onClick={() => toggleTag(tag.tag)}
                key={tag.tag}
              >
                {tag.name}
              </button>
            ))}
        </div>
        <hr className="border-studio-100 my-4" />
        <Button type="submit" className="secondary-btn w-full!">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
