import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { navItems } from '@dummyData/Sidebar';
import ButtonCard from '@components/ButtonCard';
import { MdLogout } from 'react-icons/md';
import { useAuth } from '@hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashboardLayout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Improved active route detection
  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== '/dashboard' && location.pathname.startsWith(path));
  };

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:relative z-40 w-64 bg-blue-800 text-white
          h-full flex flex-col transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          shadow-xl
        `}
      >
        <div className="flex flex-col h-full p-6 space-y-8">
          {/* Close button for mobile */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              {user?.username || 'Dashboard'}
            </h2>
            <button 
              onClick={toggleSidebar}
              className="lg:hidden text-white hover:text-blue-200"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => isMobile && setSidebarOpen(false)}
                className={`
                  flex items-center py-3 px-4 rounded-lg transition-all
                  ${isActive(item.path) ? 
                    'bg-blue-600 shadow-md font-semibold' : 
                    'hover:bg-blue-700 hover:shadow-md'}
                `}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Info at bottom */}
          <div className="pt-4 border-t border-blue-700">
            <div className="flex items-center space-x-3">
              <FaUserCircle size={32} className="text-blue-200" />
              <div>
                <p className="font-medium">{user?.firstName}</p>
                <p className="text-sm text-blue-200 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Fixed Header */}
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar}
                className="lg:hidden text-gray-600 hover:text-gray-800 mr-4"
              >
                <FaBars size={20} />
              </button>
              <h1 className="text-lg font-semibold text-gray-800">
                {navItems.find(item => isActive(item.path))?.label || 'Dashboard'}
              </h1>
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <ButtonCard
                onClick={() => setShowDropdown(!showDropdown)}
                className="!p-0 !bg-transparent !shadow-none hover:!bg-transparent flex items-center gap-2 focus:outline-none"
              >
                <span className="hidden md:inline text-sm text-gray-600">
                  {user?.username || 'User'}
                </span>
                <div className="relative">
                  <FaUserCircle
                    size={28}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  />
                </div>
              </ButtonCard>

              {showDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100"
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-medium text-gray-800">{user?.firstName}</p>
                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <ButtonCard
                    onClick={handleLogout}
                    loading={loading}
                    size="medium"
                    color="primary"
                    className="w-full text-left justify-start px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <div className="flex items-center gap-2">
                      <MdLogout />
                      Logout
                    </div>
                  </ButtonCard>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;