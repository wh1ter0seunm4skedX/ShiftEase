import { User, Event } from '../types';

    export const mockUsers: User[] = [
      { id: '1', email: 'admin1@example.com', role: 'admin', name: 'Admin One' },
      { id: '2', email: 'admin2@example.com', role: 'admin', name: 'Admin Two' },
      { id: '3', email: 'worker1@example.com', role: 'worker', name: 'Worker One' },
      { id: '4', email: 'worker2@example.com', role: 'worker', name: 'Worker Two' },
      { id: '5', email: 'worker3@example.com', role: 'worker', name: 'Worker Three' },
      { id: '6', email: 'worker4@example.com', role: 'worker', name: 'Worker Four' },
      { id: '7', email: 'worker5@example.com', role: 'worker', name: 'Worker Five' },
    ];

    export const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Summer Youth Workshop',
        description: 'Annual summer workshop for local youth',
        date: '2024-07-15',
        maxWorkers: 3,
        registeredWorkers: 1,
        createdBy: '1',
      },
      {
        id: '2',
        title: 'Weekend Sports Program',
        description: 'Sports activities and coaching for teenagers',
        date: '2024-04-20',
        maxWorkers: 4,
        registeredWorkers: 2,
        createdBy: '2',
      },
    ];
