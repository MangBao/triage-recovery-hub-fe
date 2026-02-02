import { UrgencyLevel, TicketStatus, TicketCategory } from "@/types/ticket";

// Urgency Badge Classes (using custom badge classes from globals.css)
export const URGENCY_BADGE_CLASS: Record<UrgencyLevel, string> = {
  High: "badge-high",
  Medium: "badge-medium",
  Low: "badge-low",
};

// Urgency Card Border Colors
export const URGENCY_BORDER_CLASS: Record<UrgencyLevel, string> = {
  High: "border-l-4 border-l-red-500",
  Medium: "border-l-4 border-l-amber-500",
  Low: "border-l-4 border-l-green-500",
};

// Status Labels with Emojis
export const STATUS_LABELS: Record<TicketStatus, string> = {
  pending: "⏳ Pending",
  processing: "⚙️ Processing",
  completed: "✅ Completed",
  failed: "❌ Failed",
};

// Status Colors
export const STATUS_COLORS: Record<TicketStatus, string> = {
  pending: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  processing: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  completed: "bg-green-500/20 text-green-300 border-green-500/30",
  failed: "bg-red-500/20 text-red-300 border-red-500/30",
};

// Category Icons and Colors
export const CATEGORY_ICONS: Record<TicketCategory, string> = {
  Billing: "💳",
  Technical: "🔧",
  "Feature Request": "💡",
};

export const CATEGORY_COLORS: Record<TicketCategory, string> = {
  Billing: "bg-purple-500/20 text-purple-300",
  Technical: "bg-orange-500/20 text-orange-300",
  "Feature Request": "bg-cyan-500/20 text-cyan-300",
};

// Sentiment Score Descriptions
export const getSentimentDescription = (
  score: number,
): { label: string; color: string } => {
  if (score <= 3) return { label: "Very Negative", color: "text-red-400" };
  if (score <= 4) return { label: "Negative", color: "text-orange-400" };
  if (score <= 6) return { label: "Neutral", color: "text-yellow-400" };
  if (score <= 8) return { label: "Positive", color: "text-lime-400" };
  return { label: "Very Positive", color: "text-green-400" };
};

// Format date relative to now
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
