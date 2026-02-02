import axios, { AxiosInstance } from "axios";
import {
  Ticket,
  TicketListResponse,
  CreateTicketRequest,
  UpdateTicketRequest,
  TicketFilters,
} from "@/types/ticket";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout for AI processing
});

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Suppress 404 errors as they are handled by the UI
    if (error.response?.status !== 404) {
      console.error("API Error:", error.response?.data || error.message);
    }
    return Promise.reject(error);
  },
);

export const ticketAPI = {
  // Create a new ticket (triggers async AI processing)
  create: (data: CreateTicketRequest) => api.post<Ticket>("/tickets", data),

  // List tickets with filters and pagination
  list: (filters: TicketFilters = {}) => {
    const params: Record<string, string | number | undefined> = {};

    if (filters.status) params.status = filters.status;
    if (filters.urgency) params.urgency = filters.urgency;
    if (filters.category) params.category = filters.category;
    if (filters.ai_status) params.ai_status = filters.ai_status;
    if (filters.page) params.page = filters.page;
    if (filters.per_page) params.per_page = filters.per_page;

    return api.get<TicketListResponse>("/tickets", { params });
  },

  // Get single ticket by ID
  getById: (id: number) => api.get<Ticket>(`/tickets/${id}`),

  // Update ticket (agent edits response)
  update: (id: number, data: UpdateTicketRequest) =>
    api.patch<Ticket>(`/tickets/${id}`, data),

  // Resolve ticket
  resolve: (id: number, agentId: string) =>
    api.post<Ticket>(`/tickets/${id}/resolve`, null, {
      params: { agent_id: agentId },
    }),
};

export default api;
