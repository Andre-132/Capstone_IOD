"use client";

import { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";

interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

interface Message {
  id: number;
  postId: string;
  author: string;
  content: string;
  date: string;
}

export default function PostWithMessages({
  post,
  onDelete,
}: {
  post: Post;
  onDelete: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  console.log(messages);
  useEffect(() => {
    fetch(`/api/messages?postId=${post.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("fetch messages", data);
        setMessages(data);
        setLoading(false);
      });
  }, [post.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: post.id, author, content }),
    });
    const newMsg = await res.json();
    setMessages((prev) => [...prev, newMsg]);
    setAuthor("");
    setContent("");
    setSubmitting(false);
  }

  async function handleDeleteMessage(id: number) {
    await fetch("/api/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }

  return (
    <article className="p-6 border rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-1">{post.title}</h2>
        <DeleteButton onClick={onDelete} label="Delete Post" />
      </div>
      <p className="text-sm text-gray-500 mb-2">
        By {post.author} on {new Date(post.date).toLocaleDateString()}
      </p>
      <p className="mb-4">{post.content}</p>

      <div className="mb-4">
        <h3 className="font-semibold">Comments</h3>
        {loading ? (
          <p>Loading comments...</p>
        ) : messages.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul className="space-y-2">
            {messages.map((msg) => (
              <li key={msg.id} className="border p-2 rounded relative">
                <p className="font-medium">{msg.author}</p>
                <p className="text-xs text-gray-400">
                  <p>{msg.content}</p>
                  {new Date(msg.date).toLocaleString()}
                </p>
                <DeleteButton
                  onClick={() => handleDeleteMessage(msg.id)}
                  className="absolute top-1 right-2 text-xs"
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          rows={3}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </article>
  );
}
