"use client";

import { Room } from "./Room";
import { StorageTldraw } from "./components/StorageTldraw";

/**
 * IMPORTANT: LICENSE REQUIRED
 * To use tldraw commercially, you must first purchase a license
 * Learn more: https://tldraw.dev/community/license
 */

export default function Home() {
  return (
    <Room>
      {(roomId) => <StorageTldraw roomId={roomId} />}
    </Room>
  );
}
