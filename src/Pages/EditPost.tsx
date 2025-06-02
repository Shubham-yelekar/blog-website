import { useEffect, useState } from "react";
import { Main, PostForm } from "../components";
import service from "../backend/Config";
import { useNavigate, useParams } from "react-router";
import type { Models } from "appwrite";

interface Post extends Models.Document {
  title: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
}

const EditPost = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((res) => {
        if (res) {
          setPost(res as Post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <Main>
      <PostForm post={post} />
    </Main>
  ) : null;
};

export default EditPost;
