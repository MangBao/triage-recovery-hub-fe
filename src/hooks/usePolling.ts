"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { ticketAPI } from "@/lib/api";
import { Ticket } from "@/types/ticket";

export function usePolling(ticketId: number | null, shouldPoll: boolean) {
  const { data, error, isLoading, mutate } = useSWR<Ticket>(
    ticketId ? ["ticket-poll", ticketId] : null,
    async () => {
      if (!ticketId) throw new Error("No ticket ID");
      const response = await ticketAPI.getById(ticketId);
      return response.data;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000,
      refreshInterval: shouldPoll ? 3000 : 0, // Poll every 3 seconds when processing
    },
  );

  // Stop polling when status changes from processing
  useEffect(() => {
    if (data && data.status !== "pending" && data.status !== "processing") {
      // Status is either completed or failed, no need to poll
    }
  }, [data]);

  return {
    ticket: data,
    isLoading,
    error,
    mutate,
  };
}
