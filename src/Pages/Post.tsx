import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import service from "../backend/Config";
import { Button, BlogWrapper } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import type { Models } from "appwrite";
import type { RootState } from "../state/store";

interface Post extends Models.Document {
  title: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
}

const Post = () => {
  const [post, setPost] = useState<Post | null>(null);

  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post as Post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    if (post?.$id)
      service.deletePost(post.$id).then((status) => {
        if (status) {
          service.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
  };

  return post ? (
    <div className="relative">
      <div className="w-full h-[50vh] flex justify-center relative rounded-xl">
        <img
          src={service.getFileView(post?.featuredImage)}
          alt={post?.$id}
          className="absolute -z-5 h-[50vh] w-full object-cover object-bottom "
        />
        <div className="absolute -z-2 bg-gradient-to-b from-studio-100/0 via-studio-50/50 to-studio-50 w-full h-full"></div>
      </div>
      <BlogWrapper>
        <div className="w-full mb-6 p-2 relative">
          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
          <div className="relative">
            <p className="mb-4 text-studio-200 relative">
              By
              <span className="text-studio-450 font-bold"> {post.author}</span>
            </p>
            {isAuthor && (
              <div className="absolute right-0 bottom-0">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="bg-studio-50 px-4 py-1 rounded-full text-sm font-semibold shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
                    Edit
                  </Button>
                </Link>
                <Button
                  className=" px-4 py-1 bg-red-600 text-white rounded-full text-sm font-semibold shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] ml-2"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="w-full h-[1px] bg-studio-100"></div>
          <div className="flex gap-2 flex-wrap mt-2">
            {post?.tags &&
              post?.tags.map((tag: string) => (
                <div
                  className={`border px-4 py-1 rounded-full text-sm font-semibold capitalize  bg-studio-400 text-white`}
                  key={`${tag}:tag`}
                >
                  {tag}
                </div>
              ))}
          </div>
        </div>
        <div className="browser-css blog-page p-2 ">{parse(post.content)}</div>
      </BlogWrapper>
    </div>
  ) : null;
};

export default Post;
