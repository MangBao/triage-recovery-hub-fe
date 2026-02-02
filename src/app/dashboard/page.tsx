"use client";

import { useState } from "react";
import TicketList from "@/components/tickets/TicketList";
import TicketForm from "@/components/tickets/TicketForm";
import { Plus, X } from "lucide-react";

export default function DashboardPage() {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTicketCreated = () => {
    setRefreshKey((k) => k + 1);
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Agent Dashboard</h1>
          <p className="text-slate-400 mt-1">
            Manage and respond to customer support tickets
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={showForm ? "btn-secondary" : "btn-primary"}
        >
          {showForm ? (
            <>
              <X className="w-5 h-5 mr-2 inline" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 mr-2 inline" />
              New Ticket
            </>
          )}
        </button>
      </div>

      {/* Create Ticket Form (Collapsible) */}
      {showForm && (
        <div className="animate-slide-up">
          <TicketForm onSuccess={handleTicketCreated} />
        </div>
      )}

      {/* Ticket List */}
      <TicketList key={refreshKey} />
    </div>
  );
}
