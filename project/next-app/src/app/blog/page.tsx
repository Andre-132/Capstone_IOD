"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
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
  likes?: number;
}

interface LikeButtonProps {
  initialLikes?: number;
  postId: string;
  onLikeUpdate?: (postId: string, newLikes: number, isLiked: boolean) => void;
}

const SleekLikeButton: React.FC<LikeButtonProps> = ({
  initialLikes = 0,
  postId,
  onLikeUpdate,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = async () => {
    if (isAnimating) return;

    setIsAnimating(true);

    const newLikedState = !isLiked;
    const newLikes = newLikedState ? likes + 1 : likes - 1;

    setLikes(newLikes);
    setIsLiked(newLikedState);

    if (onLikeUpdate) {
      onLikeUpdate(postId, newLikes, newLikedState);
    }

    try {
    } catch (error) {
      console.error("Failed to update like:", error);
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleLike}
      className={`
        group relative flex items-center gap-2 px-4 py-2 rounded-full
        transition-all duration-300 ease-out backdrop-blur-sm
        hover:scale-105 active:scale-95
        bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30
        ${isLiked ? "bg-red-500/20 border-red-400/40" : ""}
        ${isAnimating ? "animate-pulse" : ""}
      `}
      disabled={isAnimating}
    >
      <div
        className={`
        absolute inset-0 rounded-full opacity-0 transition-opacity duration-300
        ${
          isLiked
            ? "bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-100"
            : ""
        }
        group-hover:opacity-50
      `}
      />

      <Heart
        className={`
          relative z-10 w-5 h-5 transition-all duration-300
          ${
            isLiked
              ? "text-red-400 fill-red-400 scale-110"
              : "text-white/70 group-hover:text-white scale-100"
          }
          ${isAnimating ? "animate-bounce" : ""}
        `}
      />

      <span
        className={`
        relative z-10 text-sm font-medium transition-all duration-300
        ${isLiked ? "text-red-300" : "text-white/70 group-hover:text-white"}
      `}
      >
        {likes}
      </span>

      {isAnimating && (
        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
      )}

      {isLiked && isAnimating && (
        <>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Heart className="w-3 h-3 text-red-400 fill-red-400 opacity-80" />
          </div>
          <div className="absolute -top-1 left-1/4 transform -translate-x-1/2 animate-bounce delay-75">
            <Heart className="w-2 h-2 text-pink-400 fill-pink-400 opacity-60" />
          </div>
          <div className="absolute -top-1 right-1/4 transform translate-x-1/2 animate-bounce delay-150">
            <Heart className="w-2 h-2 text-red-300 fill-red-300 opacity-60" />
          </div>
        </>
      )}
    </button>
  );
};

const PostWithMessages = ({ post, onDelete, onLikeUpdate }) => {
  return (
    <article className="bg-white/5 border border-white/20 p-6 rounded-lg shadow-xl backdrop-blur-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {post.title}
          </h3>
          <p className="text-white/60 text-sm">
            By {post.author} • {post.date}
          </p>
        </div>
        <button
          onClick={onDelete}
          className="text-red-400 hover:text-red-300 text-sm px-3 py-1 rounded border border-red-400/20 hover:border-red-300/40 transition-colors"
        >
          Delete
        </button>
      </div>

      <div className="text-white/80 mb-6 leading-relaxed">{post.content}</div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SleekLikeButton
            initialLikes={post.likes || 0}
            postId={post.id}
            onLikeUpdate={onLikeUpdate}
          />
        </div>
        <div className="text-white/40 text-sm">#{post.id.slice(0, 8)}</div>
      </div>
    </article>
  );
};

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

  async function handleNewPost(e: React.MouseEvent<HTMLButtonElement>) {
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

  function handleLikeUpdate(
    postId: string,
    newLikes: number,
    isLiked: boolean
  ) {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes: newLikes } : post
      )
    );
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
        <div className="relative z-20"></div>
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
            <div className="space-y-4">
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
                onClick={handleNewPost}
                className="bg-white/10 text-white px-6 py-2 rounded border border-white/20 hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
                disabled={posting}
              >
                {posting ? "Posting..." : "Submit Post"}
              </button>
            </div>
          </section>

          {posts.map((post) => (
            <PostWithMessages
              key={post.id}
              post={post}
              onDelete={() => handleDeletePost(post.id)}
              onLikeUpdate={handleLikeUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
