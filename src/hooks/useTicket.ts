"use client";

import useSWR from "swr";
import { ticketAPI } from "@/lib/api";
import { Ticket } from "@/types/ticket";

export function useTicket(ticketId: number | null) {
  const { data, error, isLoading, mutate } = useSWR<Ticket>(
    ticketId ? ["ticket", ticketId] : null,
    async () => {
      if (!ticketId) throw new Error("No ticket ID");
      const response = await ticketAPI.getById(ticketId);
      return response.data;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 2000,
    },
  );

  return {
    ticket: data,
    isLoading,
    error,
    mutate,
  };
}
