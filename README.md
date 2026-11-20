# NASA Thawing Centre — Website & Dispatch Platform

A website and admin console for a thawing, towing and emergency-assistance business, laid out like ReadyAssist.in.

- **Customers** browse services, book help in under a minute, and **track their technician live** (status, ETA and technician details) using a tracking code.
- **Dispatchers/admins** manage requests, assign technicians, set ETAs, record payments, edit the service catalogue, and see reports.

| Layer | Tech |
| --- | --- |
| Frontend | Next.js 14 (App Router) · TypeScript · Tailwind CSS |
| Backend | Node.js · Express 5 · Mongoose |
| Database | MongoDB (local or Atlas) |
| Auth | JWT (admin) |
| Live updates | Server-Sent Events, with a 30-second polling fallback |

---

## Features

### Public website (`/frontend`)
| Page | What it does |
| --- | --- |
| `/` Home | Hero with quick-book chips, stats, emergency services, how-it-works, why us, testimonials, CTA |
| `/services` | Full catalogue grouped by category (Emergency, Roadside, Fitment, General Repair) |
| `/services/[slug]` | One page per service (13 services, including **Vehicle Thawing**, **Towing** and **Emergency Rescue**) with features, process, FAQs and pricing |
| `/book-service` | Booking form: name, phone, location (with **GPS "use my location"**), service, vehicle, issue. Accepts `?service=slug` to pre-select a service |
| `/track` · `/track/[code]` | **Live tracking**: status timeline, ETA countdown, assigned technician with a call button |
| `/about` | Story, mission, values, team |
| `/contact` | Helpline, WhatsApp, email, map, and a contact form that saves to the admin inbox |
| Everywhere | Responsive mobile-first layout, floating **WhatsApp** chat button, emergency helpline bar |

### Admin console (`/admin`)
| Section | What it does |
| --- | --- |
| **Overview** | KPIs (active, today, completed, revenue, average completion time, free technicians), bookings-per-day chart, status breakdown, top services, latest requests |
| **Bookings** | Search and filter by status, service and date; pagination; CSV export; a toast when new requests arrive (auto-refreshes every 15s); "new booking" for phone-in customers; a detail drawer to **assign a technician, set the ETA, move the status forward, record amount/payment, add notes**, and view history. Each change is pushed live to the customer's tracking page |
| **Technicians** | Add, edit and delete. Availability (Available/Busy) updates automatically on assignment and completion |
| **Customers** | Created automatically from bookings (matched by phone number). Add, edit and delete, with notes |
| **Services** | Add, edit and delete; hide or show; set price and order. Feeds the booking form |
| **Messages** | Contact-form inbox with New / Read / Resolved |
| **Settings** | Change the admin password |

### REST API (`/backend`)
```
Public
  GET    /api/services                    active services
  POST   /api/bookings                    create booking → { code }
  GET    /api/track/:code                 public booking status
  GET    /api/track/:code/stream          live updates (SSE)
  POST   /api/contact                     contact form

Auth
  POST   /api/auth/login                  → { token }
  GET    /api/auth/me
  POST   /api/auth/change-password

Admin (Bearer token)
  GET    /api/bookings?status&service&q&from&to&page&limit
  GET    /api/bookings/export.csv
  GET    /api/bookings/:id
  PATCH  /api/bookings/:id                status, technician, etaMinutes, amount, paymentStatus, adminNotes, note
  DELETE /api/bookings/:id
  CRUD   /api/admin/services | technicians | customers | messages
  GET    /api/admin/customers/:id/bookings
  GET    /api/admin/reports/summary?days=14
```
Booking status flow: `Pending → Assigned → En Route → Arrived → In Progress → Completed` (or `Cancelled`).

Hardening: Helmet, CORS allow-list, rate limiting on public POST endpoints, input validation, central error handler.

---

## Run locally

**You need:** Node 18+ and MongoDB (install [MongoDB Community](https://www.mongodb.com/try/download/community), run `docker run -d -p 27017:27017 mongo:7`, or use a free MongoDB Atlas cluster).

```bash
# 1. Backend
cd backend
cp .env.example .env          # edit MONGO_URI / JWT_SECRET / ADMIN_PASSWORD
npm install
npm run dev                   # http://localhost:4000

# 2. Frontend (new terminal)
cd frontend
cp .env.example .env.local    # set NEXT_PUBLIC_API_URL, phone numbers, address
npm install
npm run dev                   # http://localhost:3000
```

On first start the backend **seeds**:
- the admin user from `ADMIN_EMAIL` / `ADMIN_PASSWORD` (default `admin@nasa-thawing.com` / `ChangeMe#123`, so change it)
- 13 services
- 3 sample technicians

Admin login: http://localhost:3000/admin/login

### Try the full flow
1. Book a service at `/book-service` and note the tracking code.
2. Open `/track/<code>` in one tab and `/admin/bookings` in another.
3. In admin, open the booking, assign a technician, enter an ETA and click **Mark "En Route"**. The tracking tab updates instantly.

---

## Deploy

**Database:** create a MongoDB Atlas cluster and copy the connection string.

**Backend → Render** (or Railway, Fly, or EC2):
- Root directory `backend`, build `npm install`, start `npm start`
- Environment: `MONGO_URI`, `JWT_SECRET` (a long random string), `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLIENT_ORIGIN=https://your-frontend-domain`
- `render.yaml` at the repo root sets this up as a Blueprint.

**Frontend → Vercel:**
- Root directory `frontend`
- Environment: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`, plus the `NEXT_PUBLIC_HELPLINE / WHATSAPP / EMAIL / ADDRESS` values

> SSE needs a host that doesn't buffer responses. Render, Railway and Fly work. If a proxy buffers, the tracking page falls back to polling every 30s.

---

## Before going live — replace placeholder content
- Phone, WhatsApp, email and address: set via `frontend/.env.local`
- Team names and bios: `frontend/app/about/page.tsx`
- Testimonials: `frontend/components/Testimonials.tsx`
- Home-page stats (28 min, 500+, 4.8★): `frontend/app/page.tsx`
- Service copy and prices: `frontend/lib/services.ts` (content pages) and **Admin → Services** (booking-form prices)
- Sample technicians: delete them in **Admin → Technicians**

## Ready for future work
- **Payments:** each booking already has `amount`, `paymentStatus` and `paymentRef`. Add a Razorpay/Stripe order endpoint and a webhook that sets `paymentStatus: 'Paid'`.
- **GPS tracking:** bookings store customer `coordinates`. Add `location {lat,lng}` to Technician, post it from a technician app, and emit it on the same SSE channel (`src/events.js`).
- **Notifications:** hook SMS/WhatsApp (Twilio, MSG91, WhatsApp Cloud API) into `updateBooking` next to `publish(booking)`.
- **Scaling to several API instances:** replace the in-process event bus in `src/events.js` with Redis pub/sub.

## Project structure
```
backend/src
  app.js, server.js, config.js, events.js
  models/        Booking, Service, Technician, Customer, Message, User
  controllers/   booking, service, technician, customer, message, report, auth, crud.factory
  routes/        index + booking/service/auth/admin routes
  middleware/    auth (JWT), error
  utils/         seed, catalog, logger
frontend
  app/           pages (public + /admin)
  components/    Navbar, Footer, BookingForm, LiveTracker, ServiceDetail, admin/*
  lib/           api client & types, services content, site config
```
