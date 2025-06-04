import { useState, useEffect } from "react";
import service from "../backend/Config";
import type { Models } from "appwrite";
import { Button, Card, Main } from "../components";
import SignupBtn from "../components/Header/SignupBtn";
import type { RootState } from "../state/store";
import { useSelector } from "react-redux";
import { WritePostBtn } from "../components/Header/WritePostBtn";

interface Post extends Models.Document {
  title: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
  author: string;
  tags: string[];
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const authStatus = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    service.getPosts().then((res) => {
      if (res && res.documents) {
        setPosts(res.documents as Post[]);
      } else {
        console.log("no post found");
      }
    });
  }, []);

  return (
    <div className="w-full py-8 ">
      <Main>
        <div className="overflow-hidden">
          <img
            className="absolute -right-72 -z-5 top-24 opacity-30 "
            src="/log-shape.webp"
            alt=""
          />
          <img
            className="absolute -left-72 hidden -z-5 top-24 opacity-30 md:block"
            src="/log-shape.webp"
            alt=""
          />
        </div>
        <div className="mt-24 mb-48">
          <div className="flex flex-col gap-4 items-start justify-between md:items-center">
            <h1 className="text-studio-700 text-left md:text-center">
              Design , Development <br /> & Life
            </h1>
            <h5 className="text-studio-450 text-left md:max-w-[600px] md:text-center">
              From pixels to production — explore ideas, tips, and stories that
              power better digital experiences.
            </h5>
          </div>
          <div className="flex flex-col items-start justify-between  mt-12 md:items-center">
            {!authStatus ? (
              <>
                <SignupBtn />
                <p className="text-studio-300 mt-2">to write your ideas</p>
              </>
            ) : (
              <div>
                <WritePostBtn />
                <Button linkTo="/all-posts" className="secondary-btn ml-2">
                  See all Blogs
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 max-w-[1200px] m-auto md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.$id} className="">
              <Card {...post} />
            </div>
          ))}
        </div>
      </Main>
    </div>
  );
};

export default HomePage;
