export type User = {
  id: string;
  email: string;
  role: 'admin' | 'worker';
  name: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  maxWorkers: number;
  registeredWorkers: number;
  createdBy: string;
};

export type Registration = {
  id: string;
  eventId: string;
  workerId: string;
  registeredAt: string;
};
