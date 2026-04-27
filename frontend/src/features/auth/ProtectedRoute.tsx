import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export function ProtectedRoute() {
  const { isAuthenticated, user } = useAuthStore();

  // Redirect to login if not authenticated
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Redirect to student feed if user is not admin
  if (user?.role !== 'admin') return <Navigate to="/" replace />;

  return <Outlet />;
}

export function StudentRoute() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (user?.role === 'admin') return <Navigate to="/admin" replace />;

  return <Outlet />;
}
