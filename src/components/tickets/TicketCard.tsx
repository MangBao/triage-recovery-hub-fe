import Link from "next/link";
import { Ticket } from "@/types/ticket";
import StatusBadge from "@/components/ui/StatusBadge";
import UrgencyBadge from "@/components/ui/UrgencyBadge";
import {
  CATEGORY_ICONS,
  URGENCY_BORDER_CLASS,
  formatRelativeTime,
} from "@/lib/constants";

interface TicketCardProps {
  ticket: Ticket;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  const borderClass = ticket.urgency
    ? URGENCY_BORDER_CLASS[ticket.urgency]
    : "";

  return (
    <Link
      href={`/dashboard/${ticket.id}`}
      className="block h-full"
      prefetch={false}
    >
      <div
        className={`glass-card cursor-pointer h-full flex flex-col ${borderClass}`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg text-white">
              Ticket #{ticket.id}
            </h3>
            <p className="text-sm text-slate-400">
              {formatRelativeTime(ticket.created_at)}
            </p>
          </div>
          <StatusBadge status={ticket.status} />
        </div>

        {/* Complaint Preview */}
        <p className="text-slate-300 text-sm mb-4 line-clamp-2 flex-grow">
          {ticket.customer_complaint}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-3">
            {ticket.category && (
              <span className="flex items-center gap-1.5 text-sm text-slate-300">
                <span>{CATEGORY_ICONS[ticket.category]}</span>
                {ticket.category}
              </span>
            )}
            {ticket.sentiment_score && (
              <span className="text-xs text-slate-500">
                Sentiment: {ticket.sentiment_score}/10
              </span>
            )}
          </div>
          <UrgencyBadge urgency={ticket.urgency} />
        </div>

        {/* Processing Indicator */}
        {/* Processing Indicator */}
        {(ticket.status === "processing" || ticket.status === "pending") && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-sm text-blue-400">
              <div className="w-4 h-4 rounded-full border-2 border-blue-400/30 border-t-blue-400 animate-spin" />
              {ticket.status === "pending"
                ? "Queueing analysis..."
                : "AI is analyzing..."}
            </div>
          </div>
        )}

        {/* Error Message */}
        {ticket.status === "failed" && ticket.error_message && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-xs text-red-400 line-clamp-1">
              ❌ {ticket.error_message}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
