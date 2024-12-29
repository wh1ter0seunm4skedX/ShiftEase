import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import WorkerDashboard from './WorkerDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return user.role === 'admin' ? <AdminDashboard /> : <WorkerDashboard />;
}
