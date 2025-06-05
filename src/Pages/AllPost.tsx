import { useState, useEffect, useMemo } from "react";
import service from "../backend/Config";
import type { Models } from "appwrite";
import { Card, Main } from "../components";
import tags from "../components/Constants/TagsOptions";
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
  const [selectedTag, setSelectedTag] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTag(
      (prevTags) =>
        prevTags.includes(tag)
          ? prevTags.filter((t) => t !== tag) // Remove the tag if it already exists
          : [...prevTags, tag] // Add the tag if it doesn't exist
    );
  };

  useEffect(() => {
    service.getPosts().then((res) => {
      if (res) {
        setPosts(res.documents as Post[]);
      }
    });
  }, []);

  // Filter posts based on selected tags
  const filteredPosts = useMemo(() => {
    if (selectedTag.length === 0) return posts; // If no tags are selected, show all posts
    return posts.filter((post) =>
      post.tags.some((tag) => selectedTag.includes(tag))
    );
  }, [posts, selectedTag]);

  return (
    <div className="w-full pu-8">
      <Main>
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
        <div className="grid grid-cols-1 gap-4 max-w-[1200px] m-auto md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
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
