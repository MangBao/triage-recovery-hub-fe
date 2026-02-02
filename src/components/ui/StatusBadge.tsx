import { TicketStatus } from "@/types/ticket";
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/constants";

interface StatusBadgeProps {
  status: TicketStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`badge border ${STATUS_COLORS[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
