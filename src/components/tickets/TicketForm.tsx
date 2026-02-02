"use client";

import { useState } from "react";
import { ticketAPI } from "@/lib/api";
import { Send, AlertCircle, CheckCircle } from "lucide-react";

interface Props {
  onSuccess?: () => void;
}

export default function TicketForm({ onSuccess }: Props) {
  const [complaint, setComplaint] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);
    setSuccess(false);

    try {
      await ticketAPI.create({ customer_complaint: complaint });
      setComplaint("");
      setSuccess(true);
      onSuccess?.();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(
        error.response?.data?.detail ||
          "Failed to create ticket. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const characterCount = complaint.length;
  const isValid = characterCount >= 10 && characterCount <= 5000;

  return (
    <div className="glass-card">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
        <span className="text-3xl">📝</span>
        Create New Ticket
      </h2>
      <p className="text-slate-400 text-sm mb-6">
        Describe the customer complaint. AI will analyze and generate a draft
        response.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">Ticket created! AI is now processing...</p>
          </div>
        )}

        {/* Textarea */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Customer Complaint
          </label>
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            rows={6}
            placeholder="I've been charged twice for my subscription this month. I need a refund for the duplicate charge and want to understand why this happened..."
            required
            minLength={10}
            maxLength={5000}
            className="input-glass resize-none font-mono text-sm leading-relaxed"
            disabled={isLoading}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-slate-500">Minimum 10 characters</p>
            <p
              className={`text-xs ${characterCount > 4500 ? "text-amber-400" : "text-slate-500"}`}
            >
              {characterCount.toLocaleString()}/5,000
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !isValid}
          className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Creating Ticket...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Create & Process Ticket
            </>
          )}
        </button>

        {/* Info */}
        <p className="text-xs text-center text-slate-500">
          💡 The AI will categorize, score sentiment, determine urgency, and
          draft a response
        </p>
      </form>
    </div>
  );
}
