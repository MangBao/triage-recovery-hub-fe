"use client";

import useSWR from "swr";
import { ticketAPI } from "@/lib/api";
import {
  TicketListResponse,
  TicketFilters,
  PaginationMeta,
} from "@/types/ticket";

export function useTickets(filters: TicketFilters = {}) {
  const filterKey = JSON.stringify(filters, Object.keys(filters).sort());

  const { data, error, isLoading, mutate } = useSWR<TicketListResponse>(
    ["tickets", filterKey],
    async () => {
      const response = await ticketAPI.list(filters);
      return response.data;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false, // Disable refresh on network reconnect
      dedupingInterval: 5000,
      keepPreviousData: true,
    },
  );

  return {
    tickets: data?.data || [],
    pagination:
      data?.pagination ||
      ({
        total: 0,
        page: 1,
        per_page: 20,
        total_pages: 0,
        has_more: false,
      } as PaginationMeta),
    isLoading,
    error,
    mutate,
  };
}
