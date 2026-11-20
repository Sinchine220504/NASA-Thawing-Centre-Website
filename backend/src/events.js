import { EventEmitter } from 'events';

// In-process event bus used to push live booking updates to SSE subscribers.
// For multi-instance deployments swap this for Redis pub/sub.
export const bus = new EventEmitter();
bus.setMaxListeners(1000);

export const bookingChannel = (code) => `booking:${code}`;
