import TicketDetail from "@/components/tickets/TicketDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TicketDetailPage({ params }: Props) {
  const { id } = await params;
  const ticketId = parseInt(id, 10);

  if (isNaN(ticketId)) {
    return (
      <div className="glass-card text-center py-12">
        <h2 className="text-xl font-semibold text-white mb-2">
          Invalid Ticket ID
        </h2>
        <p className="text-slate-400">The ticket ID must be a valid number.</p>
      </div>
    );
  }

  return <TicketDetail ticketId={ticketId} />;
}
