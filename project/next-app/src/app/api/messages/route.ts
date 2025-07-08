import { NextResponse } from "next/server";

let messages = [
  {
    id: 1,
    postId: "1",
    author: "Jane",
    content: "Great post! Thanks for sharing.",
    date: new Date().toISOString(),
  },
];

export async function GET(request: Request) {
  console.log("GET request hit");
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");
  console.log(postId);
  if (!postId)
    return NextResponse.json({ error: "Missing postId" }, { status: 400 });
  const filtered = messages.filter((msg) => msg.postId === postId);
  return NextResponse.json(filtered);
}

export async function POST(request: Request) {
  const { postId, author, content } = await request.json();
  if (!postId || !author || !content)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const newMessage = {
    id: messages.length + 1,
    postId,
    author,
    content,
    date: new Date().toISOString(),
  };

  messages.push(newMessage);
  return NextResponse.json(newMessage, { status: 201 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  messages = messages.filter((msg) => msg.id !== id);
  return NextResponse.json({ success: true });
}
