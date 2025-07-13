"use client";

import { useState, useEffect } from "react";
import styles from "./AIChat.module.css";

interface AIChatProps {
  roomId: string;
}

export function AIChat({ roomId }: AIChatProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Connect AI to room when component mounts
    connectAI();
    
    return () => {
      // Disconnect when component unmounts
      disconnectAI();
    };
  }, [roomId]);

  const connectAI = async () => {
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "connect", roomId }),
      });
      
      if (response.ok) {
        setIsConnected(true);
        setMessage("ProductPeer AI connected!");
      }
    } catch (error) {
      console.error("Failed to connect AI:", error);
      setMessage("Failed to connect AI");
    }
  };

  const disconnectAI = async () => {
    try {
      await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "disconnect", roomId }),
      });
    } catch (error) {
      console.error("Failed to disconnect AI:", error);
    }
  };

  const generateStickyNote = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate-sticky",
          roomId,
          data: {
            prompt,
            position: { 
              x: 100 + Math.random() * 400, 
              y: 100 + Math.random() * 300 
            },
          },
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        setMessage(`Created sticky note: "${result.content}"`);
        setPrompt("");
      } else {
        setMessage("Failed to create sticky note");
      }
    } catch (error) {
      console.error("Failed to generate sticky note:", error);
      setMessage("Error generating sticky note");
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeBoard = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "analyze",
          roomId,
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        setMessage(result.analysis);
      } else {
        setMessage("Failed to analyze board");
      }
    } catch (error) {
      console.error("Failed to analyze board:", error);
      setMessage("Error analyzing board");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.aiChat}>
      <div className={styles.header}>
        <h3>ProductPeer AI</h3>
        <span className={styles.status}>
          {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
        </span>
      </div>
      
      <div className={styles.content}>
        {message && (
          <div className={styles.message}>{message}</div>
        )}
        
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && generateStickyNote()}
            placeholder="Ask AI to create a sticky note..."
            disabled={!isConnected || isLoading}
            className={styles.input}
          />
          <button
            onClick={generateStickyNote}
            disabled={!isConnected || isLoading || !prompt.trim()}
            className={styles.button}
          >
            Generate
          </button>
        </div>
        
        <button
          onClick={analyzeBoard}
          disabled={!isConnected || isLoading}
          className={styles.button}
        >
          Analyze Board
        </button>
      </div>
    </div>
  );
}