import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { navItems } from '@dummyData/Sidebar';
import ButtonCard from '@components/ButtonCard';
import { MdLogout } from 'react-icons/md';
import { useAuth } from '@hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

const DashboardLayout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate('/login');
      toast.success('Log-out successful!');
    } catch (error) {
      toast.error('Logout failed');
    } finally {
      setLoading(false);
      setShowDropdown(false); 
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-6 space-y-4 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold mb-6">
         {user?.username ? `${user.username}` : 'Application Panel'}
        </h2>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`py-2 px-4 rounded hover:bg-blue-600 ${
              location.pathname === item.path ? 'bg-blue-600' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white shadow px-6 py-4">
          <h1 className="text-lg font-semibold text-gray-700">
          <p className="font-medium">
            {user?.firstName ? `${user.firstName}'s Dashboard` : 'Dashboard'}
          </p>
          </h1>
          {/* User Dropdown Area */}
          <div className="relative">
            <ButtonCard
              onClick={() => setShowDropdown(!showDropdown)}
              className="!p-0 !bg-transparent !shadow-none hover:!bg-transparent flex items-center gap-2 focus:outline-none"
              >
                <span className="hidden md:inline text-sm text-gray-600">
                  {user?.username || 'User'}
                </span>
                <FaUserCircle
                  size={28}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                />
            </ButtonCard>

            {showDropdown && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                onMouseLeave={() => setShowDropdown(false)}
              >
                <div className="px-4 py-2 text-sm text-gray-700">
                  <p className="font-medium">{user?.firstName}</p>
                  <p className="text-gray-500 truncate">{user?.email}</p>
                  <p className="text-gray-500 truncate">{user?.email}</p>
                </div>
                <ButtonCard
                  type="submit"
                  onClick={handleLogout}
                  loading={loading}
                  disabled={false}
                  size="medium"
                  color="secondary"
                  className="w-full text-left justify-start px-4 py-2 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <MdLogout className="text-red-500" />
                    Logout
                  </div>
                </ButtonCard>
              </div>
            )}
          </div>
        </header>
        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;