import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@routes/AppRoutes';
// import { AuthProvider } from '@context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          // hideProgressBar={false}
          // newestOnTop={false}
          // closeOnClick
          // rtl={false}
          // pauseOnFocusLoss
          // draggable
          // pauseOnHover
          // theme="light"
        />
      </BrowserRouter>
    </>
  );
};

export default App;