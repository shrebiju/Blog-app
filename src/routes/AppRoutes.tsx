import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '@pages/Dashboard';
import CreatePost from '@pages/Posts/CreatePost';
import EditPost from '@pages/Posts/EditPost';
import ProtectedRoute from '@routes/ProtectedRoute';
import HomePage from '@pages/Homepage';
import { useAuth } from '@hooks/useAuth';
import Login from '@pages/auth/login';
import ListPage from '@pages/Posts/ListPage';
import DashboardHome from '@pages/DashboardHome';
import RegisterPage from '@pages/auth/Register';
const LoginRoute = () => {
  const { isAuthenticated } = useAuth(); 
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }  
  return <Login />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route element={
        <ProtectedRoute>
          <DashboardLayout /> 
        </ProtectedRoute>
      }>
        {/* Dashboard Home */}
        <Route path="/dashboard" element={<DashboardHome />} />
        
        {/* Posts Routes */}
        <Route path="/dashboard/posts/list" element={<ListPage />} />
        <Route path="/dashboard/posts/create" element={<CreatePost />} />
        <Route path="/dashboard/posts/edit/:id" element={<EditPost />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;