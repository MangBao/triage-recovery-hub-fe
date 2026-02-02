"use client";

import { useEffect, useRef, useState } from "react";
import { TicketUpdate } from "@/types/ticket";

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/ws/tickets";

export function useTicketWebSocket(ticketIds: number[]) {
  const [lastUpdate, setLastUpdate] = useState<TicketUpdate | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Use ref for WebSocket to avoid re-renders
  const ws = useRef<WebSocket | null>(null);

  // Keep track of ticketIds to subscribe on reconnect/connect
  const ticketIdsRef = useRef(ticketIds);

  // Update ref when props change
  useEffect(() => {
    ticketIdsRef.current = ticketIds;

    if (ws.current?.readyState === WebSocket.OPEN && ticketIds.length > 0) {
      ws.current.send(
        JSON.stringify({
          action: "subscribe",
          ticket_ids: ticketIds,
        }),
      );
    }
  }, [JSON.stringify(ticketIds.sort())]);

  useEffect(() => {
    // Create WebSocket connection ONCE on mount
    const socket = new WebSocket(WS_URL);
    ws.current = socket;

    socket.onopen = () => {
      setIsConnected(true);

      // Subscribe to whatever is current in the ref
      const currentIds = ticketIdsRef.current;
      if (currentIds.length > 0) {
        socket.send(
          JSON.stringify({
            action: "subscribe",
            ticket_ids: currentIds,
          }),
        );
      }
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === "ticket_updated") {
          const data = message.data as TicketUpdate;
          setLastUpdate(data);
        } else if (message.type === "pong") {
          // Keep-alive response
        }
      } catch (e) {
        console.error("❌ [WS] Parse error:", e);
      }
    };

    socket.onclose = (event) => {
      setIsConnected(false);
    };

    socket.onerror = (error) => {
      // Use warn to avoid overlay in Next.js
      console.warn("⚠️ [WS] Connection error (retrying...):", error);
    };

    // Cleanup on unmount only
    return () => {
      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        socket.close();
      }
    };
  }, []); // Empty dependency array = Run once

  return { isConnected, lastUpdate };
}
