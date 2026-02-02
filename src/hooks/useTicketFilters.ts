"use client";

import { useState, useMemo } from "react";
import { TicketStatus, UrgencyLevel, TicketCategory } from "@/types/ticket";

export interface TicketFilterState {
  status?: TicketStatus;
  urgency?: UrgencyLevel;
  category?: TicketCategory;
  page: number;
}

export function useTicketFilters(perPage: number = 9) {
  const [status, setStatus] = useState<TicketStatus | undefined>();
  const [urgency, setUrgency] = useState<UrgencyLevel | undefined>();
  const [category, setCategory] = useState<TicketCategory | undefined>();
  const [page, setPage] = useState(1);

  // Memoized filters object for API queries
  const filters = useMemo(
    () => ({
      status,
      urgency,
      category,
      page,
      per_page: perPage,
    }),
    [status, urgency, category, page, perPage],
  );

  // Handlers
  const handleStatusChange = (value: string) => {
    setStatus(value ? (value as TicketStatus) : undefined);
    setPage(1);
  };

  const handleUrgencyChange = (value: string) => {
    setUrgency(value ? (value as UrgencyLevel) : undefined);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value ? (value as TicketCategory) : undefined);
    setPage(1);
  };

  const goToPage = (newPage: number) => {
    setPage(newPage);
  };

  const clearFilters = () => {
    setStatus(undefined);
    setUrgency(undefined);
    setCategory(undefined);
    setPage(1);
  };

  const hasFilters = !!(status || urgency || category);

  return {
    state: { status, urgency, category, page },
    filters,
    hasFilters,
    handlers: {
      setStatus: handleStatusChange,
      setUrgency: handleUrgencyChange,
      setCategory: handleCategoryChange,
      goToPage,
      clearFilters,
    },
  };
}
