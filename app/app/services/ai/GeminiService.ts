import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateStickyNoteContent(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(`
        You are ProductPeer AI, an AI collaborator on an infinite canvas.
        Generate a concise sticky note content (max 50 words) based on this prompt: ${prompt}
        
        Be helpful, direct, and focused on business ideation and validation.
        Do not include any formatting or quotes, just the text content.
      `);
      
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error("Error generating content:", error);
      return "Error generating content";
    }
  }

  async analyzeBoard(shapes: any[]): Promise<string> {
    try {
      // Convert shapes to a simple text representation
      const boardContent = shapes
        .filter(shape => shape.props?.text)
        .map(shape => shape.props.text)
        .join("\n");

      const result = await this.model.generateContent(`
        You are ProductPeer AI, analyzing a business ideation board.
        Here's what's on the board:
        ${boardContent}
        
        Provide a brief analysis (max 100 words) identifying:
        1. Key themes
        2. Potential risks or assumptions
        3. One actionable next step
        
        Be concise and helpful.
      `);
      
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error("Error analyzing board:", error);
      return "Error analyzing board";
    }
  }
}