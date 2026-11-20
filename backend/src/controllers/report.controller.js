import { Booking } from '../models/Booking.js';
import { Technician } from '../models/Technician.js';
import { Customer } from '../models/Customer.js';
import { Message } from '../models/Message.js';

const ACTIVE = ['Pending', 'Assigned', 'En Route', 'Arrived', 'In Progress'];

export const summary = async (req, res) => {
  const days = Math.min(90, Math.max(7, Number(req.query.days) || 14));
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  since.setDate(since.getDate() - (days - 1));
  const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));

  const [byStatus, byService, daily, revenue, avgCompletion, todayCount, techs, customers, newMessages] = await Promise.all([
    Booking.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Booking.aggregate([{ $group: { _id: '$serviceType', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Booking.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),
    Booking.aggregate([{ $match: { paymentStatus: 'Paid' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
    Booking.aggregate([
      { $match: { status: 'Completed', completedAt: { $exists: true } } },
      { $project: { mins: { $divide: [{ $subtract: ['$completedAt', '$createdAt'] }, 60000] } } },
      { $group: { _id: null, avg: { $avg: '$mins' } } },
    ]),
    Booking.countDocuments({ createdAt: { $gte: startOfToday } }),
    Technician.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Customer.estimatedDocumentCount(),
    Message.countDocuments({ status: 'New' }),
  ]);

  // Fill missing days with zero so charts are continuous
  const dailyMap = Object.fromEntries(daily.map((d) => [d._id, d.count]));
  const series = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(since);
    d.setDate(since.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    series.push({ date: key, count: dailyMap[key] || 0 });
  }

  const statusCounts = Object.fromEntries(byStatus.map((s) => [s._id, s.count]));
  const total = byStatus.reduce((n, s) => n + s.count, 0);

  res.json({
    success: true,
    report: {
      totalBookings: total,
      todayBookings: todayCount,
      activeBookings: ACTIVE.reduce((n, s) => n + (statusCounts[s] || 0), 0),
      completedBookings: statusCounts.Completed || 0,
      cancelledBookings: statusCounts.Cancelled || 0,
      statusCounts,
      byService: byService.map((s) => ({ service: s._id, count: s.count })),
      daily: series,
      revenuePaid: revenue[0]?.total || 0,
      avgCompletionMinutes: avgCompletion[0] ? Math.round(avgCompletion[0].avg) : null,
      technicians: Object.fromEntries(techs.map((t) => [t._id, t.count])),
      customers,
      newMessages,
    },
  });
};
