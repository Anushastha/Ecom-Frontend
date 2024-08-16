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
import useSessionCheck from './hooks/useSessionCheck';

import "./styles/index.css";
import Footer from './components/Footer';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import SendEmail from './pages/SendEmail';
import ForgotPasswordCode from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategory from './pages/admin/AdminCategory';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import AdminCategoryProduct from './pages/admin/AdminCategoryProduct';
import ProductDetails from './pages/user/ProductDetails';
import Wishlist from './pages/user/Wishlist';
import Cart from './pages/user/Cart';
import OrdersPage from './pages/user/Orders';
import ChangePassword from './pages/user/ChangePassword';
import EditProfile from './pages/user/EditProfile';
import UserProfile from './pages/user/UserProfile';
import ExpiredPassChange from './pages/user/ExpiredPassChange';

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
        !location.pathname.startsWith('/resetPassword') &&
        !location.pathname.startsWith('/changeExpiredPassword');

    const showFooter = !location.pathname.startsWith('/auth') &&
        !location.pathname.startsWith('/admin') &&
        !location.pathname.startsWith('/user/changePassword') &&
        !location.pathname.startsWith('/user/editProfile') &&
        !location.pathname.startsWith('/user/userProfile') &&
        !location.pathname.startsWith('/sendEmail') &&
        !location.pathname.startsWith('/resetCode') &&
        !location.pathname.startsWith('/resetPassword') &&
        !location.pathname.startsWith('/changeExpiredPassword');

    // useSessionCheck();

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
                    <Route path='/changeExpiredPassword' element={<ExpiredPassChange />} />

                    {/* User public routes */}
                    <Route path="user/dashboard" element={<UserDashboard />} />
                    <Route path="user/dashboard/productDetails/:id" element={<ProductDetails />} />

                    {/* User private routes */}
                    <Route path="user/wishlist" element={<PrivateRoute><Wishlist /> </PrivateRoute>} />
                    <Route path="user/orders" element={<PrivateRoute><OrdersPage /> </PrivateRoute>} />
                    <Route path="user/cart" element={<PrivateRoute><Cart /> </PrivateRoute>} />
                    <Route path="user/changePassword" element={<PrivateRoute><ChangePassword /> </PrivateRoute>} />
                    <Route path="user/editProfile/:id" element={<PrivateRoute><EditProfile /> </PrivateRoute>} />
                    <Route path="user/userProfile" element={<PrivateRoute><UserProfile /> </PrivateRoute>} />


                    {/* Admin routes */}
                    <Route path="admin/dashboard" element={<PrivateRoute isAdmin={true}><AdminDashboard /></PrivateRoute>} />
                    <Route path="admin/products" element={<PrivateRoute isAdmin={true}><AdminProducts /></PrivateRoute>} />
                    <Route path="admin/products/editProduct/:id" element={<PrivateRoute isAdmin={true}><AdminEditProduct /></PrivateRoute>} />
                    <Route path="admin/category" element={<PrivateRoute isAdmin={true}><AdminCategory /></PrivateRoute>} />
                    <Route path="admin/category/products/:id" element={<PrivateRoute isAdmin={true}><AdminCategoryProduct /></PrivateRoute>} />

                    {/* <Route element={<UserRoutes />}>
                        <Route path="user/wishlist" element={<Wishlist />} />
                        <Route path="user/orders" element={<OrdersPage />} />
                        <Route path="user/cart" element={<Cart />} />
                        <Route path="user/changePassword" element={<ChangePassword />} />
                        <Route path="user/editProfile/:id" element={<EditProfile />} />
                        <Route path="user/userProfile" element={<UserProfile />} />
                    </Route> */}

                    {/* <Route element={<AdminRoutes />}>
                        <Route path="admin/dashboard" element={<AdminDashboard />} />
                        <Route path="admin/products" element={<AdminProducts />} />
                        <Route path="admin/products/editProduct/:id" element={<AdminEditProduct />} />
                        <Route path="admin/category" element={<AdminCategory />} />
                        <Route path="admin/category/products/:id" element={<AdminCategoryProduct />} />
                    </Route> */}

                </Route>

            </Routes>
        </Router>
    );
}

export default App;
