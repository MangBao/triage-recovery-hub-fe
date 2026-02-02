"use client";

import { useState, useMemo, useEffect } from "react";
import { useTickets } from "@/hooks/useTickets";
import { useTicketWebSocket } from "@/hooks/useTicketWebSocket";
import TicketCard from "./TicketCard";
import { LoadingGrid } from "@/components/ui/LoadingSpinner";
import {
  Filter,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { TicketStatus, UrgencyLevel, TicketCategory } from "@/types/ticket";

import { useTicketFilters } from "@/hooks/useTicketFilters";

const FILTER_SELECT_CLASS =
  "appearance-none bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 hover:border-primary-500/50 rounded-xl text-sm py-2.5 pl-4 pr-10 text-white cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500";

interface Props {
  refreshTrigger?: number;
}

export default function TicketList({ refreshTrigger = 0 }: Props) {
  const perPage = 9;
  const { state, filters, hasFilters, handlers } = useTicketFilters(perPage);
  const { status, urgency, category, page } = state;
  const { tickets, pagination, isLoading, error, mutate } = useTickets(filters);

  // WebSocket Integration for List
  const ticketIds = useMemo(() => tickets.map((t) => t.id), [tickets]);
  const { lastUpdate } = useTicketWebSocket(ticketIds);

  // Revalidate when parent triggers refresh (Soft Reload)
  useEffect(() => {
    if (refreshTrigger > 0) {
      mutate();
    }
  }, [refreshTrigger, mutate]);

  // Refresh list when any visible ticket updates
  useEffect(() => {
    if (lastUpdate) {
      // UX: Show toast for completed background tasks
      // Only show if the status has actually changed (prevents toasts on page reload/snapshot)
      const existingTicket = tickets.find((t) => t.id === lastUpdate.id);
      const isStatusChanged = existingTicket?.status !== lastUpdate.status;

      if (isStatusChanged) {
        if (lastUpdate.status === "completed") {
          toast.info(`Ticket #${lastUpdate.id} analyzed successfully`, {
            description: `Category: ${lastUpdate.category} • Urgency: ${lastUpdate.urgency}`,
            icon: "🤖",
          });
        } else if (lastUpdate.status === "failed") {
          toast.error(`Ticket #${lastUpdate.id} processing failed`);
        }
      }

      // Optimistic Update: Directly update the cache without triggering an API call
      mutate(
        (currentData) => {
          if (!currentData) return currentData;

          const updatedTickets = currentData.data.map((t) =>
            t.id === lastUpdate.id ? { ...t, ...lastUpdate } : t,
          );

          return {
            ...currentData,
            data: updatedTickets,
          };
        },
        { revalidate: false },
      );
    }
  }, [lastUpdate, mutate]);

  const handleRefresh = () => mutate();

  // Memoize pagination logic
  const visiblePages = useMemo(() => {
    if (pagination.total_pages <= 1) return [];

    return Array.from(
      { length: pagination.total_pages },
      (_, i) => i + 1,
    ).filter(
      (p) => p === 1 || p === pagination.total_pages || Math.abs(p - page) <= 1,
    );
  }, [pagination.total_pages, page]);

  if (error) {
    return (
      <div className="glass-card bg-red-500/10 border-red-500/30">
        <div className="flex items-center gap-3 text-red-400">
          <AlertCircle className="w-5 h-5" />
          <div>
            <p className="font-medium">Failed to load tickets</p>
            <p className="text-sm text-red-400/80">
              Make sure the backend is running at http://localhost:8000
            </p>
          </div>
        </div>
        <button onClick={handleRefresh} className="mt-4 btn-secondary text-sm">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Premium Filters Bar - Single Row */}
      <div className="glass-card !p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Filter Icon & Label */}
          <div className="flex items-center gap-2 text-primary-400">
            <Filter className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Filters
            </span>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-white/10 hidden sm:block" />

          {/* Filter Selects - Horizontal */}
          <div className="flex flex-1 flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="relative group">
              <select
                value={status || ""}
                onChange={(e) => handlers.setStatus(e.target.value)}
                className={FILTER_SELECT_CLASS}
              >
                <option value="">📋 All Status</option>
                <option value="pending">⏳ Pending</option>
                <option value="processing">⚙️ Processing</option>
                <option value="completed">✅ Completed</option>
                <option value="failed">❌ Failed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-primary-400 transition-colors" />
            </div>

            {/* Urgency Filter */}
            <div className="relative group">
              <select
                value={urgency || ""}
                onChange={(e) => handlers.setUrgency(e.target.value)}
                className={FILTER_SELECT_CLASS}
              >
                <option value="">🎯 All Urgency</option>
                <option value="High">🔴 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-primary-400 transition-colors" />
            </div>

            {/* Category Filter */}
            <div className="relative group">
              <select
                value={category || ""}
                onChange={(e) => handlers.setCategory(e.target.value)}
                className={FILTER_SELECT_CLASS}
              >
                <option value="">📁 All Categories</option>
                <option value="Billing">💳 Billing</option>
                <option value="Technical">🔧 Technical</option>
                <option value="Feature Request">💡 Feature Request</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-primary-400 transition-colors" />
            </div>

            {/* Clear Filters */}
            {hasFilters && (
              <button
                onClick={handlers.clearFilters}
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-500/10"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>

          {/* Right Side: Count & Refresh */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-lg">
              <span className="font-semibold text-white">
                {pagination.total}
              </span>{" "}
              ticket
              {pagination.total !== 1 ? "s" : ""}
            </span>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 text-sm py-2 px-4 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 hover:border-primary-500/50 text-white transition-all duration-300 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Loading State - Only when strictly empty */}
      {isLoading && tickets.length === 0 && <LoadingGrid />}

      {/* Empty State */}
      {!isLoading && tickets.length === 0 && (
        <div className="glass-card text-center py-16">
          <div className="text-6xl mb-4">🎫</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No tickets found
          </h3>
          <p className="text-slate-400 mb-6">
            {hasFilters
              ? "Try adjusting your filters"
              : "Create your first ticket to get started"}
          </p>
          {hasFilters && (
            <button
              onClick={handlers.clearFilters}
              className="btn-secondary text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Tickets Grid - Show if we have data, even if updating */}
      {tickets.length > 0 && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 stagger-children">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.total_pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => handlers.goToPage(page - 1)}
                disabled={page === 1}
                className="btn-secondary py-2 px-3 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1">
                {visiblePages.map((p, index, arr) => (
                  <span key={p} className="flex items-center">
                    {index > 0 && arr[index - 1] !== p - 1 && (
                      <span className="px-2 text-slate-500">...</span>
                    )}
                    <button
                      onClick={() => handlers.goToPage(p)}
                      className={`min-w-[40px] py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        p === page
                          ? "bg-primary-600 text-white shadow-glow"
                          : "btn-secondary"
                      }`}
                    >
                      {p}
                    </button>
                  </span>
                ))}
              </div>

              <button
                onClick={() => handlers.goToPage(page + 1)}
                disabled={!pagination.has_more}
                className="btn-secondary py-2 px-3 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <p className="text-center text-sm text-slate-500">
            Showing {(page - 1) * perPage + 1} -{" "}
            {Math.min(page * perPage, pagination.total)} of {pagination.total}
          </p>
        </>
      )}
    </div>
  );
}
