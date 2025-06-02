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
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    service.getPosts().then((res) => {
      if (res) {
        setPosts(res.documents as Post[]);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Main>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Main>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Main>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <Card {...post} />
            </div>
          ))}
        </div>
      </Main>
    </div>
  );
};

export default HomePage;
