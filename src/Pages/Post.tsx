import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import service from "../backend/Config";
import { Button, Main } from "../components";
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
    <div className="py-8">
      <Main>
        <div className="w-full flex justify-center  mb-4 relative border rounded-xl p-2">
          <img src={service.getFilePreview(post?.featuredImage)} alt="" />
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="bg-green-500">Edit</Button>
              </Link>
              <Button className="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Main>
    </div>
  ) : null;
};

export default Post;
