# tldraw + Liveblocks Experiment Plan

## Objective
Implement ProductPeer's core features using tldraw + Liveblocks to evaluate development velocity, extensibility, and product fit.

## Phase 1: Basic Collaborative Canvas

### Feature Set 1A: Setup & Basic Canvas
```bash
# Initialize project
npx create-liveblocks-app@latest --example nextjs-tldraw-whiteboard-storage --api-key
cd tldraw-liveblocks-experiment
```

**Tasks:**
1. [ ] Set up GitHub repository
2. [ ] Configure Liveblocks API keys
3. [ ] Verify basic collaboration works
4. [ ] Add user name/avatar system
5. [ ] Document setup complexity

**Success Criteria:**
- Two users can draw simultaneously
- Changes sync in real-time
- No setup blockers

### Feature Set 1B: Enhance Collaboration Features
**Tasks:**
1. [ ] Implement better presence UI
2. [ ] Add user list sidebar
3. [ ] Improve cursor labels
4. [ ] Add connection status indicator
5. [ ] Test with 5+ concurrent users

**Deliverables:**
- Video of 5 users collaborating
- Performance metrics logged
- Screenshot of presence UI

## Phase 2: Custom Blocks (Card & CardStack)

### Feature Set 2A: Card Shape Implementation
```typescript
// Custom Card Shape
class CardShape extends TLBoxShape {
  static type = 'card' as const
  
  // Implementation details
  getDefaultProps() {
    return {
      title: 'New Card',
      body: '',
      w: 250,
      h: 150,
    }
  }
  
  render() {
    // React component for Card
  }
}
```

**Tasks:**
1. [ ] Create Card custom shape
2. [ ] Add title/body editing
3. [ ] Implement expand modal on click
4. [ ] Style to match ProductPeer aesthetic
5. [ ] Make content collaborative

### Feature Set 2B: CardStack Container
**Tasks:**
1. [ ] Create CardStack shape
2. [ ] Implement Card containment logic
3. [ ] Add drag-drop between stacks
4. [ ] Create "Add Card" button
5. [ ] Test collaborative editing

**Integration Points:**
- Use Liveblocks Storage for Card content
- Sync drag operations through presence
- Handle concurrent edits gracefully

## Phase 3: ProductPeer MVP Features

### Feature Set 3A: Lean Canvas Template
```typescript
// Lean Canvas layout
const LEAN_CANVAS_SECTIONS = [
  { id: 'problem', title: 'Problem', x: 0, y: 0 },
  { id: 'solution', title: 'Solution', x: 300, y: 0 },
  { id: 'key-metrics', title: 'Key Metrics', x: 600, y: 0 },
  // ... 6 more sections
]
```

**Tasks:**
1. [ ] Create template system
2. [ ] Build Lean Canvas layout
3. [ ] Add section labels
4. [ ] Implement template instantiation
5. [ ] Save templates to library

### Feature Set 3B: AI Integration
**Tasks:**
1. [ ] Add AI chat component
2. [ ] Implement "Generate Card" command
3. [ ] Create AI user presence
4. [ ] Connect to Gemini API
5. [ ] Add Problem Expert prototype

**AI Features:**
- Natural language → Card generation
- Assumption analysis
- Simple suggestions

### Feature Set 3C: Access Control
**Tasks:**
1. [ ] Add board privacy settings
2. [ ] Implement share dialog
3. [ ] Create permission levels
4. [ ] Add invite system
5. [ ] Test permission enforcement

## Measurement Framework

### Code Metrics
```typescript
// Track these for each feature
interface ImplementationMetrics {
  linesOfCode: number
  filesModified: number
  timeToImplement: number // hours
  bugsEncountered: number
  documentationQuality: 1-10
}
```

### Performance Benchmarks
- Canvas FPS with 100 shapes
- Sync latency (local → remote)
- Memory usage over time
- Bundle size analysis

### Developer Experience
1. **Setup Friction**
   - Time from zero to working app
   - Number of configuration steps
   - Documentation clarity

2. **Extension Difficulty**
   - Creating custom shapes (1-10)
   - Modifying behavior (1-10)
   - Type safety quality (1-10)

3. **Debugging Experience**
   - Error message quality
   - Dev tools support
   - State inspection ease

## Progress Log Template

```markdown
## Feature Set X: [Feature Name]

### What Worked Well
- 

### Challenges Encountered
- 

### Code Snippet
```typescript
// Most interesting code from today
```

### Implementation Notes
- Key challenges faced
- Solutions implemented
- Dependencies identified

### Comparison Notes
How would this be different in Excalidraw?

### Screenshots/Videos
[Attach progress visuals]
```

## Final Evaluation Criteria

### Technical Scorecard (1-10)
- [ ] Setup complexity
- [ ] Custom shape difficulty
- [ ] Collaboration reliability
- [ ] Performance at scale
- [ ] TypeScript support
- [ ] Bundle size efficiency
- [ ] Debugging experience

### Product Scorecard (1-10)
- [ ] Visual aesthetic fit
- [ ] Feature completeness
- [ ] UX polish level
- [ ] Extensibility potential
- [ ] AI integration ease
- [ ] Future roadmap alignment

### Business Scorecard
- [ ] Implementation complexity level
- [ ] Liveblocks efficiency (API calls)
- [ ] Projected monthly cost at 1K users
- [ ] Vendor lock-in level
- [ ] Community support quality

## Success Metrics

**Phase 1 Success:**
- Collaborative canvas working
- 5+ users tested successfully
- < 100ms sync latency

**Phase 2 Success:**
- Card and CardStack shapes functional
- Drag-drop working smoothly
- Modal editing implemented

**Phase 3 Success:**
- Lean Canvas template complete
- Basic AI integration working
- Permissions system functional

## Resources & References

- tldraw Docs: https://tldraw.dev/docs
- Custom Shapes: https://tldraw.dev/examples/custom-shape
- Liveblocks + tldraw: https://liveblocks.io/examples/tldraw-whiteboard
- tldraw GitHub: https://github.com/tldraw/tldraw
- Community Discord: https://discord.gg/tldraw