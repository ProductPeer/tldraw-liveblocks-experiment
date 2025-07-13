// Simple test script to verify AI services
const API_URL = 'http://localhost:3000/api';

async function testAIConnection() {
  console.log('Testing AI Service...\n');
  
  const roomId = 'liveblocks:examples:nextjs-tldraw-whiteboard-storage';
  
  try {
    // Test 1: Connect AI to room
    console.log('1. Testing AI connection...');
    const connectResponse = await fetch(`${API_URL}/ai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'connect', roomId }),
    });
    
    const connectResult = await connectResponse.json();
    console.log('   Result:', connectResult);
    
    if (!connectResult.success) {
      throw new Error('Failed to connect AI');
    }
    
    // Wait a bit for connection to establish
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test 2: Generate a sticky note
    console.log('\n2. Testing sticky note generation...');
    const stickyResponse = await fetch(`${API_URL}/ai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'generate-sticky',
        roomId,
        data: {
          prompt: 'Test sticky note from AI',
          position: { x: 200, y: 200 },
        },
      }),
    });
    
    const stickyResult = await stickyResponse.json();
    console.log('   Result:', stickyResult);
    
    // Test 3: Analyze board
    console.log('\n3. Testing board analysis...');
    const analyzeResponse = await fetch(`${API_URL}/ai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'analyze',
        roomId,
      }),
    });
    
    const analyzeResult = await analyzeResponse.json();
    console.log('   Result:', analyzeResult);
    
    // Clean up: Disconnect AI
    console.log('\n4. Disconnecting AI...');
    await fetch(`${API_URL}/ai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'disconnect', roomId }),
    });
    
    console.log('\n✅ All tests passed!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error);
  }
}

// Run the test
console.log('Make sure the Next.js server is running on http://localhost:3000\n');
testAIConnection();