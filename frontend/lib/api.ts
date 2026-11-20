export const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000').replace(/\/$/, '');

export const TOKEN_KEY = 'ntc_admin_token';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type Opts = Omit<RequestInit, 'body'> & { body?: unknown; auth?: boolean };

export async function api<T = any>(path: string, { body, auth, headers, ...init }: Opts = {}): Promise<T> {
  const h: Record<string, string> = { ...(headers as Record<string, string>) };
  if (body !== undefined) h['Content-Type'] = 'application/json';
  if (auth && typeof window !== 'undefined') {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) h.Authorization = `Bearer ${token}`;
  }
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api${path}`, {
      ...init,
      headers: h,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, 'Cannot reach the server. Please call our helpline if this is urgent.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    if (res.status === 401 && auth && typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      if (!window.location.pathname.startsWith('/admin/login')) window.location.href = '/admin/login';
    }
    throw new ApiError(res.status, data.message || `Request failed (${res.status})`);
  }
  return data as T;
}

/* ---------- Shared types ---------- */

export const BOOKING_STATUSES = ['Pending', 'Assigned', 'En Route', 'Arrived', 'In Progress', 'Completed', 'Cancelled'] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export interface Technician {
  _id: string;
  name: string;
  phone: string;
  skills: string[];
  vehicleNumber?: string;
  zone?: string;
  status: 'Available' | 'Busy' | 'Off Duty';
  rating?: number;
  isActive?: boolean;
}

export interface Booking {
  _id: string;
  code: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  location: string;
  coordinates?: { lat?: number; lng?: number };
  serviceType: string;
  vehicleType: string;
  vehicleNumber?: string;
  issueDescription?: string;
  status: BookingStatus;
  statusHistory: { status: BookingStatus; note?: string; at: string }[];
  technician?: Technician | null;
  etaMinutes?: number;
  etaAt?: string;
  adminNotes?: string;
  amount: number;
  paymentStatus: 'Unpaid' | 'Paid' | 'Refunded';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export type PublicBooking = Pick<
  Booking,
  'code' | 'fullName' | 'serviceType' | 'vehicleType' | 'location' | 'status' | 'statusHistory' | 'etaMinutes' | 'etaAt' | 'createdAt' | 'updatedAt' | 'completedAt'
> & { technician: { name: string; phone: string; vehicleNumber?: string } | null };

export interface ServiceDoc {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  icon: string;
  basePrice: number;
  isActive: boolean;
  order: number;
}

export interface Customer {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
  totalBookings: number;
  lastBookingAt?: string;
  createdAt: string;
}

export interface Message {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'New' | 'Read' | 'Resolved';
  createdAt: string;
}

export const statusStyle: Record<string, string> = {
  Pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  Assigned: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
  'En Route': 'bg-primary-50 text-primary-700 ring-1 ring-primary-200',
  Arrived: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
  'In Progress': 'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
  Completed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Cancelled: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
};

export const inr = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
