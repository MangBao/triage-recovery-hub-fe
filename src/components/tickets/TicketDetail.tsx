"use client";

import { useState, useEffect } from "react";
import { useTicket } from "@/hooks/useTicket";
import { useTicketWebSocket } from "@/hooks/useTicketWebSocket";
import { ticketAPI } from "@/lib/api";
import StatusBadge from "@/components/ui/StatusBadge";
import UrgencyBadge from "@/components/ui/UrgencyBadge";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  CATEGORY_ICONS,
  getSentimentDescription,
  formatRelativeTime,
} from "@/lib/constants";
import {
  ArrowLeft,
  Save,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  MessageSquare,
  Brain,
} from "lucide-react";
import Link from "next/link";

interface Props {
  ticketId: number;
}

export default function TicketDetail({ ticketId }: Props) {
  const [editedResponse, setEditedResponse] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const [agentId, setAgentId] = useState("agent_001");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Initial fetch (no polling) - Updates handled by WebSocket
  const { ticket, mutate, isLoading } = useTicket(ticketId);

  // WebSocket Integration for Real-time Updates
  const { lastUpdate } = useTicketWebSocket([ticketId]);

  useEffect(() => {
    if (lastUpdate && lastUpdate.id === ticketId) {
      // Update SWR cache immediately without revalidation
      mutate(lastUpdate, false);
    }
  }, [lastUpdate, ticketId, mutate]);

  const isProcessing =
    ticket?.status === "pending" || ticket?.status === "processing";

  // Initialize edited response
  const agentEditedResponse = ticket?.agent_edited_response;
  const aiDraftResponse = ticket?.ai_draft_response;

  useEffect(() => {
    // Prioritize existing agent edit, then AI draft, then empty
    const initialContent = agentEditedResponse || aiDraftResponse || "";
    // Only update if we have content to show, or creating a fresh state
    if (initialContent) {
      setEditedResponse(initialContent);
    }
  }, [agentEditedResponse, aiDraftResponse]);

  // Save edited response
  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await ticketAPI.update(ticketId, {
        agent_edited_response: editedResponse,
      });
      mutate();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // Resolve ticket
  const handleResolve = async () => {
    if (!agentId.trim()) return;
    setIsResolving(true);
    try {
      await ticketAPI.resolve(ticketId, agentId);
      mutate();
    } finally {
      setIsResolving(false);
    }
  };

  if (isLoading && !ticket) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="glass-card text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Ticket not found
        </h3>
        <p className="text-slate-400 mb-6">
          The ticket you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/dashboard" className="btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const sentiment = ticket.sentiment_score
    ? getSentimentDescription(ticket.sentiment_score)
    : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Header Card */}
      <div className="glass-card">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Ticket #{ticket.id}
            </h1>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Created {formatRelativeTime(ticket.created_at)}
              </span>
              {ticket.agent_id && (
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {ticket.agent_id}
                </span>
              )}
            </div>
          </div>
          <StatusBadge status={ticket.status} />
        </div>

        {/* Complaint */}
        <div className="mb-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-400 mb-3">
            <MessageSquare className="w-4 h-4" />
            Customer Complaint
          </h3>
          <p className="text-slate-200 leading-relaxed bg-slate-800/50 rounded-xl p-4 border border-white/5">
            {ticket.customer_complaint}
          </p>
        </div>

        {/* AI Analysis - Only show if processed */}
        {ticket.category && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category */}
            <div className="bg-slate-800/30 rounded-xl p-4 border border-white/5">
              <h4 className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                Category
              </h4>
              <p className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-2xl">
                  {/* Safe access with fallback */}
                  {CATEGORY_ICONS[ticket.category] || "📁"}
                </span>
                {ticket.category}
              </p>
            </div>

            {/* Urgency */}
            <div className="bg-slate-800/30 rounded-xl p-4 border border-white/5">
              <h4 className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                Urgency
              </h4>
              <div className="mt-1">
                <UrgencyBadge urgency={ticket.urgency} />
              </div>
            </div>

            {/* Sentiment */}
            <div className="bg-slate-800/30 rounded-xl p-4 border border-white/5">
              <h4 className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                Sentiment Score
              </h4>
              <p className="text-lg font-semibold text-white">
                {ticket.sentiment_score}/10
                {sentiment && (
                  <span className={`text-sm ml-2 ${sentiment.color}`}>
                    ({sentiment.label})
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="mt-6 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 text-blue-400">
              <div className="w-5 h-5 rounded-full border-2 border-blue-400/30 border-t-blue-400 animate-spin" />
              <span className="font-medium">
                AI is analyzing the complaint...
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-2">
              This usually takes 3-5 seconds. The page will update
              automatically.
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {ticket.status === "failed" && ticket.error_message && (
        <div className="glass-card bg-red-500/10 border-red-500/30">
          <div className="flex items-start gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Processing Failed</p>
              <p className="text-sm text-red-400/80 mt-1">
                {ticket.error_message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AI Draft Response - Editable */}
      {ticket.ai_draft_response && (
        <div className="glass-card">
          <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
            <Brain className="w-5 h-5 text-primary-400" />
            AI Draft Response
          </h3>
          <textarea
            value={editedResponse}
            onChange={(e) => setEditedResponse(e.target.value)}
            rows={8}
            className="input-glass resize-none leading-relaxed"
            placeholder="Edit the AI-generated response..."
          />
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-slate-500">
              {editedResponse !== ticket.ai_draft_response &&
                "• Unsaved changes"}
            </p>
            <button
              onClick={handleSave}
              disabled={
                isSaving || editedResponse === ticket.agent_edited_response
              }
              className="btn-secondary flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <LoadingSpinner size="sm" />
                  Saving...
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Resolve Section */}
      {ticket.status === "completed" &&
        !ticket.resolved_at &&
        ticket.ai_draft_response && (
          <div className="glass-card">
            <h3 className="text-lg font-bold text-white mb-4">
              Resolve Ticket
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Agent ID
                </label>
                <input
                  type="text"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  placeholder="Enter your agent ID"
                  className="input-glass"
                />
              </div>
              <button
                onClick={handleResolve}
                disabled={isResolving || !agentId.trim()}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isResolving ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Resolving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Mark as Resolved
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      {/* Already Resolved */}
      {ticket.resolved_at && (
        <div className="glass-card bg-green-500/10 border-green-500/30">
          <div className="flex items-center gap-3 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <div>
              <p className="font-semibold">Ticket Resolved</p>
              <p className="text-sm text-green-400/80">
                Resolved by {ticket.agent_id} on{" "}
                {new Date(ticket.resolved_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
