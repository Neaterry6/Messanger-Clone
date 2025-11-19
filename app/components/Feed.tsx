import React, { useState, useEffect } from "react";
import Post from "./Post";
import ThemeToggle from "./ThemeToggle";
import Sidebar from "./Sidebar/Sidebar";

const vznUser = {
  id: "ai-vzn",
  name: "vzn",
  image: "/vzn.png",
};

const demoPosts = [
  {
    id: "p1",
    user: { id: "1", name: "alice", image: "/user1.jpg" },
    content: "Enjoying a great day with new friends!",
    mediaUrl: "/media1.jpg",
    createdAt: "1h ago",
    likes: 24,
    comments: [],
    shares: 5,
  },
  {
    id: "p2",
    user: vznUser,
    content: "Hi, I am VZN! Tag @vzn here or DM me for help. 🚀",
    mediaUrl: "",
    createdAt: "Just now",
    likes: 99,
    comments: [],
    shares: 2,
  },
];

export default function Feed() {
  const [posts, setPosts] = useState(demoPosts);

  // Infinite scroll can be added here in the future.
  return (
    <div className="flex h-full">
      <Sidebar>
        <div className="flex justify-end mb-4 px-6">
          <ThemeToggle />
        </div>
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-2xl font-semibold mb-6 text-center">Feed</h1>
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
