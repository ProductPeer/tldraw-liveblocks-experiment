# tldraw + Liveblocks AI Experiment

This experiment implements ProductPeer's AI-native vision using tldraw and Liveblocks, where AI is a first-class collaborative user.

## Setup

1. Navigate to the app directory:
```bash
cd app
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env.local`:
```
LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Get your keys from:
- Liveblocks: https://liveblocks.io/dashboard/apikeys
- Gemini: https://aistudio.google.com/app/apikey

4. Run the development server:
```bash
npm run dev
```

5. Open http://localhost:3000

## Features

### AI as Collaborative User
- AI connects to the same room as human users via WebSocket
- Has its own user identity and authentication
- Can create sticky notes on the canvas
- Can analyze board content and provide insights

### How to Use
1. The AI chat interface appears in the bottom-right corner
2. Type a prompt and press Enter to have AI create a sticky note
3. Click "Analyze Board" to get AI insights about your canvas
4. AI-generated sticky notes appear with random positioning

### Architecture
- **Frontend**: React + tldraw + Liveblocks React
- **Backend**: Next.js API routes
- **AI**: Gemini API for content generation
- **Real-time**: Liveblocks for collaboration

### Key Files
- `app/src/services/ai/LiveblocksAIClient.ts` - AI WebSocket client
- `app/src/services/ai/GeminiService.ts` - Gemini integration
- `app/src/app/api/ai/route.ts` - AI operations API
- `app/src/components/AIChat.tsx` - Chat interface

## Current Limitations
- AI cursor/presence not yet visible to other users
- AI doesn't appear in the avatar list
- Limited to sticky note creation (more shapes coming)

## Next Steps
- Implement visible AI presence
- Add more canvas operations
- Create AI "follow mode"
- Implement access management

## Progress Tracking
See `experiment-log.md` for detailed implementation notes and learnings.