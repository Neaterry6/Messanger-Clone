import React, { useState } from "react";

export default function Post({ post }) {
  const [liked, setLiked] = useState(false);

  const tagVzn = post.content?.includes("@vzn");

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow p-4 mb-8 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-3">
        <img
          src={post.user.image}
          alt={post.user.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <div className="font-bold">{post.user.name}</div>
          <div className="text-gray-400 text-xs">{post.createdAt}</div>
        </div>
      </div>
      <div className="mb-2">{post.content}</div>
      {tagVzn && (
        <div className="text-xs rounded px-2 py-1 bg-yellow-100 text-yellow-800 mb-2 inline-block">
          Tagging @vzn AI
        </div>
      )}
      {post.mediaUrl && (
        <img
          src={post.mediaUrl}
          alt="Post Media"
          className="rounded-lg max-h-80 object-cover mb-2 w-full"
        />
      )}
      <div className="flex gap-6 mt-2 justify-start">
        <button
          onClick={() => setLiked((prev) => !prev)}
          className={liked ? "text-pink-600" : ""}
        >
          ❤️ {liked ? post.likes + 1 : post.likes}
        </button>
        <button>💬 {post.comments?.length ?? 0}</button>
        <button>🔗 {post.shares || 0}</button>
      </div>
      <div className="flex mt-2 gap-2">
        <button className="border px-3 py-1 rounded bg-blue-50 dark:bg-blue-700 text-blue-700 dark:text-white">
          Message
        </button>
        <button className="border px-3 py-1 rounded">Follow</button>
        <button className="border px-3 py-1 rounded">Profile</button>
      </div>
    </div>
  );
}
