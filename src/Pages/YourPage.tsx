import { useState, useEffect } from "react";
import service from "../backend/Config";
import type { Models } from "appwrite";
import { Card, Main } from "../components";
import type { RootState } from "../state/store";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { Plus } from "lucide-react";

interface Post extends Models.Document {
  title: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
  author: string;
  tags: string[];
}

const YourPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const currentUser = useSelector((state: RootState) => {
    return state.auth.userData;
  });

  const [usersPosts, setUserPosts] = useState<Post[]>([]);

  function filterPosts() {
    if (!currentUser) return [];
    return posts.filter((post) => post.userId === currentUser.$id);
  }

  useEffect(() => {
    if (currentUser) {
      const filteredPosts = filterPosts();
      setUserPosts(filteredPosts);
    }
  }, [posts, currentUser]);

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
    <Main>
      <div className="m-auto max-w-[1200px] mb-12 border-b pb-4 border-studio-100">
        <h3>{currentUser && <>{currentUser.name}</>}</h3>
        <Link
          to={"/add-post"}
          className="inline-flex text-sm mt-4 bg-studio-500 text-studio-50 px-3 py-2 rounded-full items-center gap-2"
        >
          <Plus size={18} />
          Write a Blog
        </Link>
      </div>
      <div>
        <div className="grid grid-cols-1 gap-4 max-w-[1200px] m-auto md:grid-cols-2 lg:grid-cols-3">
          {usersPosts.map((post) => (
            <div key={post.$id} className="">
              <Card {...post} />
            </div>
          ))}
        </div>
      </div>
    </Main>
  );
};

export default YourPage;
