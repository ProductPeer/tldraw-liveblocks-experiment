import { createClient, LiveMap, Room } from "@liveblocks/client";
import { 
  createTLStore, 
  defaultShapeUtils,
  TLStoreWithStatus,
  TLStore,
  DocumentRecordType,
  PageRecordType,
  TLDocument,
  TLPageId,
  IndexKey,
  TLRecord,
  createShapeId,
  TLGeoShape,
  Vec,
} from "tldraw";

export class LiveblocksAIClient {
  private client: ReturnType<typeof createClient>;
  private room: Room | null = null;
  private store: TLStore | null = null;
  private baseUrl: string;

  constructor(baseUrl: string = "http://localhost:3000") {
    this.baseUrl = baseUrl;
    
    // Create Liveblocks client with AI auth endpoint
    this.client = createClient({
      authEndpoint: `${baseUrl}/api/ai-auth`,
    });
  }

  async connect(roomId: string): Promise<void> {
    // Enter the room
    this.room = this.client.enter(roomId, {
      initialPresence: { presence: null },
      initialStorage: { records: new LiveMap() },
    });

    // Initialize tldraw store
    this.store = createTLStore({
      shapeUtils: defaultShapeUtils,
    });

    // Wait for connection
    await new Promise<void>((resolve) => {
      const unsubscribe = this.room!.subscribe("connection", (status) => {
        if (status === "open") {
          unsubscribe();
          resolve();
        }
      });
    });

    // Sync with existing board state
    await this.syncWithRoom();
  }

  private async syncWithRoom(): Promise<void> {
    if (!this.room || !this.store) return;

    const { root } = await this.room.getStorage();
    const liveRecords = root.get("records");

    // Initialize store with records from Storage
    this.store.clear();
    this.store.put(
      [
        DocumentRecordType.create({
          id: "document:document" as TLDocument["id"],
        }),
        PageRecordType.create({
          id: "page:page" as TLPageId,
          name: "Page 1",
          index: "a1" as IndexKey,
        }),
        ...[...liveRecords.values()],
      ],
      "initialize"
    );

    // Subscribe to changes from room
    this.room.subscribe(
      liveRecords,
      (storageChanges) => {
        const toRemove: TLRecord["id"][] = [];
        const toPut: TLRecord[] = [];

        for (const update of storageChanges) {
          if (update.type !== "LiveMap") return;

          for (const [id, { type }] of Object.entries(update.updates)) {
            switch (type) {
              case "delete":
                toRemove.push(id as TLRecord["id"]);
                break;
              case "update":
                const curr = update.node.get(id);
                if (curr) {
                  toPut.push(curr as any as TLRecord);
                }
                break;
            }
          }
        }

        // Update local store
        this.store!.mergeRemoteChanges(() => {
          if (toRemove.length) this.store!.remove(toRemove);
          if (toPut.length) this.store!.put(toPut);
        });
      },
      { isDeep: true }
    );
  }

  // Create a sticky note at the specified position
  async createStickyNote(text: string, position: { x: number; y: number }): Promise<void> {
    if (!this.room || !this.store) {
      throw new Error("Not connected to room");
    }

    const { root } = await this.room.getStorage();
    const liveRecords = root.get("records");

    // Create a new sticky note shape
    const shapeId = createShapeId();
    const shape: TLGeoShape = {
      id: shapeId,
      type: "geo",
      x: position.x,
      y: position.y,
      rotation: 0,
      index: "a1" as IndexKey,
      parentId: "page:page" as TLPageId,
      isLocked: false,
      opacity: 1,
      props: {
        w: 200,
        h: 200,
        geo: "rectangle",
        color: "yellow",
        labelColor: "black",
        fill: "solid",
        dash: "draw",
        size: "m",
        font: "draw",
        text: text,
        align: "middle",
        verticalAlign: "middle",
        growY: 0,
        url: "",
      },
      meta: {},
      typeName: "shape",
    };

    // Add to Liveblocks storage
    liveRecords.set(shape.id, shape);
    
    // Add to local store
    this.store.put([shape]);
  }

  // Get all shapes on the board
  async getAllShapes(): Promise<TLRecord[]> {
    if (!this.store) {
      throw new Error("Not connected to room");
    }

    return this.store.allRecords().filter(record => record.typeName === "shape");
  }

  // Update AI presence (cursor position, etc.)
  async updatePresence(cursorPosition: { x: number; y: number }): Promise<void> {
    if (!this.room) return;

    // This would update the AI's cursor position
    // Implementation depends on how presence is structured
    this.room.updatePresence({
      presence: {
        // Presence data structure would go here
      }
    });
  }

  disconnect(): void {
    if (this.room) {
      this.room.leave();
      this.room = null;
    }
    this.store = null;
  }
}