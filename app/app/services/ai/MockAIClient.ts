// Mock AI Client for testing - doesn't actually connect to Liveblocks
// This is just to verify the API endpoints work

export class MockAIClient {
  private roomId: string | null = null;
  private isConnected: boolean = false;

  async connect(roomId: string): Promise<void> {
    // Mock connection
    this.roomId = roomId;
    this.isConnected = true;
    console.log(`Mock AI connected to room: ${roomId}`);
  }

  async createStickyNote(text: string, position: { x: number; y: number }): Promise<void> {
    if (!this.isConnected) {
      throw new Error("Not connected to room");
    }
    console.log(`Mock AI would create sticky note: "${text}" at (${position.x}, ${position.y})`);
  }

  async getAllShapes(): Promise<any[]> {
    if (!this.isConnected) {
      throw new Error("Not connected to room");
    }
    console.log("Mock AI would fetch all shapes");
    return [];
  }

  disconnect(): void {
    this.isConnected = false;
    this.roomId = null;
    console.log("Mock AI disconnected");
  }
}