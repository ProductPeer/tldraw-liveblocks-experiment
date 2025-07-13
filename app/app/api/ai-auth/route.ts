import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";
import { getUser } from "../../database";

// AI-specific authentication endpoint
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

export async function POST(request: NextRequest) {
  // Get the AI user
  const aiUser = getUser("productpeer-ai");
  
  if (!aiUser) {
    return new Response("AI user not found", { status: 404 });
  }

  // Create a session for the AI user
  const session = liveblocks.prepareSession(aiUser.id, {
    userInfo: aiUser.info,
  });

  // Use the same naming pattern for room access
  session.allow(`liveblocks:examples:*`, session.FULL_ACCESS);

  // Authorize the AI user and return the result
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}