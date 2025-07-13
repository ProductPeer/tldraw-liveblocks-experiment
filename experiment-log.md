# tldraw + Liveblocks Experiment Log

## Initial Setup

### What Worked Well
- Cloning the Liveblocks example was straightforward
- Project structure is clean and well-organized
- tldraw + Liveblocks integration is already set up with:
  - Real-time collaboration via WebSocket
  - Presence management (cursors, avatars)
  - Storage sync using LiveMap
  - Authentication flow

### Key Findings
1. **Architecture**: The example uses:
   - Next.js App Router
   - Liveblocks for real-time sync
   - tldraw for the canvas
   - Random user generation for demo purposes

2. **Collaboration Model**:
   - Users connect via WebSocket to Liveblocks rooms
   - Each user has presence data (cursor position, selection, etc.)
   - Canvas state is stored in Liveblocks Storage (LiveMap)
   - Changes are synced bidirectionally between tldraw and Liveblocks

3. **Authentication**:
   - Currently uses random user generation
   - Liveblocks session created via API route
   - User info includes: id, name, color, avatar

### Challenges for AI Integration
1. **AI as a User**: Need to create a special AI user that:
   - Connects to the same room as humans
   - Has its own presence/cursor
   - Can manipulate canvas elements
   - Shows up in the user list

2. **WebSocket Connection**: AI needs to:
   - Connect via WebSocket (not just API calls)
   - Maintain persistent connection
   - Handle reconnection logic

3. **Canvas Operations**: AI must be able to:
   - Create shapes (sticky notes, text, etc.)
   - Read current board state
   - Understand spatial relationships

## Phase 1 Implementation: AI as Collaborative User

### What I Built
1. **AI User in Database**:
   - Added "ProductPeer AI" as a special user
   - Custom avatar using DiceBear API
   - Distinct color (#FF6B6B) for visibility

2. **AI Authentication**:
   - Created `/api/ai-auth` endpoint
   - AI gets full Liveblocks session access
   - Uses same permission model as humans

3. **LiveblocksAIClient**:
   - Connects to rooms via WebSocket
   - Syncs with board state
   - Can create sticky notes programmatically
   - Reads all shapes for analysis

4. **Gemini Integration**:
   - Service class for AI content generation
   - Generates contextual sticky note content
   - Analyzes board content for insights

5. **AI Chat Interface**:
   - Fixed position UI component
   - Shows AI connection status
   - Allows users to prompt AI for sticky notes
   - "Analyze Board" feature for insights

### Technical Architecture
```
Frontend (React)
├── AIChat Component
│   └── Calls AI API endpoints
│
Backend (Next.js API Routes)
├── /api/ai-auth (AI authentication)
├── /api/ai (AI operations)
│   ├── connect: AI joins room
│   ├── generate-sticky: Creates notes
│   ├── analyze: Board analysis
│   └── disconnect: AI leaves
│
AI Services
├── LiveblocksAIClient
│   ├── WebSocket connection
│   ├── Store synchronization
│   └── Shape operations
└── GeminiService
    ├── Content generation
    └── Board analysis
```

### Current Status
- ✅ AI can authenticate and connect to rooms
- ✅ AI can create sticky notes on the canvas
- ✅ AI can read and analyze board content
- ✅ Basic chat interface for user interaction
- ⚠️ AI presence/cursor not yet visible
- ⚠️ AI doesn't show in avatar list yet

### Key Learnings
1. **Liveblocks Client SDK**: Can be used server-side for AI
2. **tldraw Store**: Shapes are stored as records with specific structure
3. **Real-time Sync**: LiveMap handles conflict resolution automatically
4. **AI Context**: Board state can be read for contextual responses

### Next Steps for Enhanced AI Presence
1. Implement AI cursor visibility
2. Add AI to presence/avatar list
3. Show AI actions in real-time
4. Add more canvas operations (arrows, text, frames)
5. Implement "follow AI" mode