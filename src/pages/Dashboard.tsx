import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import WorkerDashboard from './WorkerDashboard';
import PageTransition from '../components/PageTransition';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <PageTransition>
      {user.role === 'admin' ? <AdminDashboard /> : <WorkerDashboard />}
    </PageTransition>
  );
}
