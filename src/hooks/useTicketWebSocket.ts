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

  // Reconnection state
  const reconnectAttempt = useRef(0);
  const maxReconnectDelay = 30000; // Cap at 30 seconds
  const baseDelay = 1000;
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const connect = () => {
      // Prevent multiple connections
      if (
        ws.current?.readyState === WebSocket.OPEN ||
        ws.current?.readyState === WebSocket.CONNECTING
      ) {
        return;
      }

      const socket = new WebSocket(WS_URL);
      ws.current = socket;

      socket.onopen = () => {
        console.log("✅ [WS] Connected");
        setIsConnected(true);
        reconnectAttempt.current = 0; // Reset backoff

        // Resubscribe whenever we reconnect
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
            setLastUpdate(message.data as TicketUpdate);
          }
        } catch (e) {
          console.error("❌ [WS] Parse error:", e);
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
        scheduleReconnect();
      };

      socket.onerror = (err) => {
        console.warn("⚠️ [WS] Error:", err);
        socket.close(); // Ensure close triggers reconnect
      };
    };

    const scheduleReconnect = () => {
      const delay = Math.min(
        baseDelay * Math.pow(2, reconnectAttempt.current),
        maxReconnectDelay,
      );

      console.log(
        `⏳ [WS] Reconnecting in ${delay}ms... (Attempt ${reconnectAttempt.current + 1})`,
      );

      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = setTimeout(() => {
        reconnectAttempt.current += 1;
        connect();
      }, delay);
    };

    // Initial connection
    connect();

    // Cleanup
    return () => {
      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);
      if (ws.current) ws.current.close();
    };
  }, []); // Run once on mount, internal logic handles reconnections

  return { isConnected, lastUpdate };
}
