import { NextRequest, NextResponse } from "next/server";
import { LiveblocksAIClient } from "@/services/ai/LiveblocksAIClient";
import { GeminiService } from "@/services/ai/GeminiService";

// Store AI client instances
const aiClients = new Map<string, LiveblocksAIClient>();

export async function POST(request: NextRequest) {
  try {
    const { action, roomId, data } = await request.json();

    switch (action) {
      case "connect": {
        // Create new AI client for this room
        const client = new LiveblocksAIClient();
        await client.connect(roomId);
        aiClients.set(roomId, client);
        
        return NextResponse.json({ 
          success: true, 
          message: "AI connected to room" 
        });
      }

      case "generate-sticky": {
        const client = aiClients.get(roomId);
        if (!client) {
          return NextResponse.json({ 
            error: "AI not connected to room" 
          }, { status: 400 });
        }

        // Use Gemini to generate content
        const geminiKey = process.env.GEMINI_API_KEY;
        if (!geminiKey) {
          return NextResponse.json({ 
            error: "Gemini API key not configured" 
          }, { status: 500 });
        }

        const gemini = new GeminiService(geminiKey);
        const content = await gemini.generateStickyNoteContent(data.prompt);
        
        // Create sticky note on board
        await client.createStickyNote(content, data.position || { x: 100, y: 100 });
        
        return NextResponse.json({ 
          success: true, 
          content 
        });
      }

      case "analyze": {
        const client = aiClients.get(roomId);
        if (!client) {
          return NextResponse.json({ 
            error: "AI not connected to room" 
          }, { status: 400 });
        }

        const geminiKey = process.env.GEMINI_API_KEY;
        if (!geminiKey) {
          return NextResponse.json({ 
            error: "Gemini API key not configured" 
          }, { status: 500 });
        }

        // Get all shapes and analyze
        const shapes = await client.getAllShapes();
        const gemini = new GeminiService(geminiKey);
        const analysis = await gemini.analyzeBoard(shapes);
        
        return NextResponse.json({ 
          success: true, 
          analysis 
        });
      }

      case "disconnect": {
        const client = aiClients.get(roomId);
        if (client) {
          client.disconnect();
          aiClients.delete(roomId);
        }
        
        return NextResponse.json({ 
          success: true, 
          message: "AI disconnected from room" 
        });
      }

      default:
        return NextResponse.json({ 
          error: "Unknown action" 
        }, { status: 400 });
    }
  } catch (error) {
    console.error("AI API error:", error);
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 });
  }
}