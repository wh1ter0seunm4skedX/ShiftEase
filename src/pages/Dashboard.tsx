import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import WorkerDashboard from './WorkerDashboard';
import PageTransition from '../components/PageTransition';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log('Dashboard - Current user:', user);

  useEffect(() => {
    if (!user) {
      console.log('Dashboard - No user found, redirecting to login...');
      navigate('/login');
      return;
    }

    console.log('Dashboard - User role:', user.role);
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <PageTransition>
      {user.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <WorkerDashboard />
      )}
    </PageTransition>
  );
}
