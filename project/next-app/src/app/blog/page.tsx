"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PostWithMessages from "../components/PostMessages";
import ModeToggle from "@/app/components/ui/mode-toggle";
import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";

interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
        setLoading(false);
      });
  }, []);

  async function handleNewPost(e: React.FormEvent) {
    e.preventDefault();
    setPosting(true);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, content }),
    });
    const newPost = await res.json();
    setPosts((prev) => [...prev, newPost]);
    setTitle("");
    setAuthor("");
    setContent("");
    setPosting(false);
  }

  async function handleDeletePost(id: string) {
    await fetch("/api/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setPosts((prev) => prev.filter((post) => post.id !== id));
  }

  if (loading) return <p className="p-4 text-white">Loading blog posts...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-900/10 to-purple-900/10 blur-3xl left-10 top-10" />
        <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-gray-700/5 to-gray-600/5 blur-2xl right-10 bottom-10" />
      </div>

      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <div className="relative z-20">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="text-white/90 hover:text-white">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon className="text-white/70" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/about"
                    className="text-white/90 hover:text-white"
                  >
                    About
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon className="text-white/70" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/blog" className="text-white/90 hover:text-white">
                    Blog
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="relative z-20">
          <ModeToggle />
        </div>
      </div>

      <div className="relative z-10 pt-20">
        <div className="max-w-3xl mx-auto p-6 space-y-12">
          <h1 className="text-4xl font-bold text-center text-white">
            Motorcycle Blog Center
          </h1>

          <section className="bg-white/5 border border-white/20 p-6 rounded-lg shadow-xl backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Create a New Blog Post
            </h2>
            <form onSubmit={handleNewPost} className="space-y-4">
              <input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />
              <input
                type="text"
                placeholder="Your Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />
              <textarea
                placeholder="Write your blog post..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                rows={4}
                required
              ></textarea>
              <button
                type="submit"
                className="bg-white/10 text-white px-6 py-2 rounded border border-white/20 hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
                disabled={posting}
              >
                {posting ? "Posting..." : "Submit Post"}
              </button>
            </form>
          </section>

          {posts.map((post) => (
            <PostWithMessages
              key={post.id}
              post={post}
              onDelete={() => handleDeletePost(post.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
