import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    Navigate,
    useLocation
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Landing from './pages/Landing';
import NavBar from './components/NavBar';
import LoginRegister from './pages/LoginRegister';

import "./styles/index.css";
import Footer from './components/Footer';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import SendEmail from './pages/SendEmail';
import ForgotPasswordCode from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategory from './pages/admin/AdminCategory';

const PrivateRoute = ({ children, isAdmin }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token) {
        return <Navigate to="/auth?mode=login" />;
    }
    if (isAdmin && user && !user.isAdmin) {
        return <Navigate to="/user/dashboard" />;
    }
    if (!isAdmin && user && user.isAdmin) {
        return <Navigate to="/admin/dashboard" />;
    }
    return children;
};

function Layout() {
    const location = useLocation();
    const showNavBar = !location.pathname.startsWith('/auth') &&
        !location.pathname.startsWith('/user/changePassword') &&
        !location.pathname.startsWith('/user/editProfile') &&
        !location.pathname.startsWith('/user/userProfile') &&
        !location.pathname.startsWith('/sendEmail') &&
        !location.pathname.startsWith('/resetCode') &&
        !location.pathname.startsWith('/resetPassword');

    const showFooter = !location.pathname.startsWith('/auth') &&
        !location.pathname.startsWith('/admin') &&
        !location.pathname.startsWith('/user/changePassword') &&
        !location.pathname.startsWith('/user/editProfile') &&
        !location.pathname.startsWith('/user/userProfile') &&
        !location.pathname.startsWith('/sendEmail') &&
        !location.pathname.startsWith('/resetCode') &&
        !location.pathname.startsWith('/resetPassword');

    return (
        <>
            {showNavBar && <NavBar />}
            <Outlet />
            {showFooter && <Footer />}
        </>
    );
}

function App() {
    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Landing />} />
                    <Route path="auth" element={<LoginRegister />} />
                    <Route path='/sendEmail' element={<SendEmail />} />
                    <Route path='/resetCode' element={<ForgotPasswordCode />} />
                    <Route path='/resetPassword' element={<ResetPassword />} />

                    {/* User public routes */}
                    <Route path="user/dashboard" element={<UserDashboard />} />

                    
                    {/* User private routes */}

                    
                    {/* Admin routes */}
                    <Route path="admin/dashboard" element={<PrivateRoute isAdmin={true}><AdminDashboard /></PrivateRoute>} />
                    <Route path="admin/products" element={<PrivateRoute isAdmin={true}><AdminProducts /></PrivateRoute>} />
                    
                    <Route path="admin/category" element={<PrivateRoute isAdmin={true}><AdminCategory /></PrivateRoute>} />
                    
        
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
