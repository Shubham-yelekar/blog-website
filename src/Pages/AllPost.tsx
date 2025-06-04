import { useState, useEffect } from "react";
import service from "../backend/Config";
import type { Models } from "appwrite";
import { Card, Main } from "../components";

interface Post extends Models.Document {
  title: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
  author: string;
  tags: string[];
}

const AllPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    service.getPosts().then((res) => {
      if (res) {
        setPosts(res.documents as Post[]);
      }
    });
  }, []);
  return (
    <div className="w-full pu-8">
      <Main>
        <div className="grid grid-cols-1 gap-4 max-w-[1200px] m-auto md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="">
              <Card {...post} />
            </div>
          ))}
        </div>
      </Main>
    </div>
  );
};

export default AllPost;
