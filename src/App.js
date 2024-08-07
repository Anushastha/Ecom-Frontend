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
import "./styles/index.css";

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LoginRegister from './pages/LoginRegister'
import AdminDashboard from './pages/admin/AdminDashboard';

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

                    <Route path="user/dashboard" element={<Colleges />} />

                    <Route path="admin/dashboard" element={<PrivateRoute isAdmin={true}><AdminDashboard /></PrivateRoute>} />

                </Route>
            </Routes>
        </Router>
    );
}

export default App;
