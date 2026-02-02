import { UrgencyLevel } from "@/types/ticket";
import { URGENCY_BADGE_CLASS } from "@/lib/constants";

interface UrgencyBadgeProps {
  urgency: UrgencyLevel | null;
}

export default function UrgencyBadge({ urgency }: UrgencyBadgeProps) {
  if (!urgency) {
    return <span className="badge-status text-slate-400">—</span>;
  }

  const urgencyIcons: Record<UrgencyLevel, string> = {
    High: "🔴",
    Medium: "🟡",
    Low: "🟢",
  };

  return (
    <span className={URGENCY_BADGE_CLASS[urgency]}>
      <span className="text-xs">{urgencyIcons[urgency]}</span>
      {urgency}
    </span>
  );
}
