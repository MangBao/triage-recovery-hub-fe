export type TicketStatus = "pending" | "processing" | "completed" | "failed";
export type TicketCategory = "Billing" | "Technical" | "Feature Request";
export type UrgencyLevel = "High" | "Medium" | "Low";
export type AIStatus = "success" | "fallback" | "error";

export interface Ticket {
  id: number;
  customer_complaint: string;
  status: TicketStatus;
  category: TicketCategory | null;
  sentiment_score: number | null;
  urgency: UrgencyLevel | null;
  ai_draft_response: string | null;
  ai_status: AIStatus | null;
  agent_edited_response: string | null;
  resolved_at: string | null;
  agent_id: string | null;
  created_at: string;
  updated_at: string;
  error_message: string | null;
}

// Pagination metadata from backend
export interface PaginationMeta {
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
  has_more: boolean;
}

// Updated list response with pagination
export interface TicketListResponse {
  data: Ticket[];
  pagination: PaginationMeta;
}

// Filter options for ticket list
export interface TicketFilters {
  status?: TicketStatus;
  urgency?: UrgencyLevel;
  category?: TicketCategory;
  ai_status?: AIStatus;
  page?: number;
  per_page?: number;
}

export interface CreateTicketRequest {
  customer_complaint: string;
}

export interface UpdateTicketRequest {
  agent_edited_response?: string;
}
