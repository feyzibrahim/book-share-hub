import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

// Redux
import { getUserDataFirst } from "./redux/actions/userActions";

// General
import Home from "./page/public/Home";
import Contact from "./page/public/Contact";
import About from "./page/public/About";
import Error404 from "./page/public/Error404";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Auth
import Login from "./page/auth/Login";
import Register from "./page/auth/Register";
import ValidateOTP from "./page/auth/ValidateOTP";
import ForgetPassword from "./page/auth/ForgetPassword";

// User
import Dashboard from "./page/Dashboard";
import ProductDetails from "./page/user/ProductDetails";
import Cart from "./page/user/Cart";
import UserFestsPage from "./page/user/fests";
import Checkout from "./page/user/Checkout";
import OrderHistory from "./page/user/OrderHistory";
import ProfilePage from "./page/user/ProfilePage";
import OrderDetail from "./page/user/OrderDetails/OrderDetail";
import ProfileDashboard from "./page/user/profileDashboard";
import Dash from "./page/user/profileDashboard/pages/Dash";
import Wallet from "./page/user/profileDashboard/pages/wallet";
import Addresses from "./page/user/profileDashboard/pages/addresses";
import TrackOrder from "./page/user/profileDashboard/pages/trackOrder";
import WishList from "./page/user/profileDashboard/pages/wishlist";
import BuyNow from "./page/user/buyNow";

// Admin
import AdminDash from "./page/admin/Dashboard";
import AdminHome from "./page/admin/pages/AdminHome";
import Banner from "./page/admin/pages/banner/Banner";
import Payments from "./page/admin/pages/payments/Payments";
import Settings from "./page/admin/pages/Settings";
import Help from "./page/admin/pages/Help";

import ManageAdmins from "./page/admin/pages/admins/ManageAdmins";
import Customers from "./page/admin/pages/customer/Customers";

import Products from "./page/admin/pages/products/Products";
import AddProducts from "./page/admin/pages/products/AddProducts";
import EditProduct from "./page/admin/pages/products/EditProduct";

import Categories from "./page/admin/pages/categories/Categories";
import CreateCategory from "./page/admin/pages/categories/CreateCategory";
import EditCategory from "./page/admin/pages/categories/EditCategory";

import Orders from "./page/admin/pages/Order/Orders";
import OrderDetails from "./page/admin/pages/Order/OrderDetails";
import ReturnRequests from "./page/admin/pages/Order/ReturnRequests";

import Coupon from "./page/admin/pages/coupon/Coupon";
import CreateCoupon from "./page/admin/pages/coupon/CreateCoupon";
import EditCoupon from "./page/admin/pages/coupon/EditCoupon";
import FindCoupons from "./page/user/profileDashboard/pages/findCoupons";
import OrderConfirmation from "./page/user/components/OrderConfirmation";
import SettingsPage from "./page/user/profileDashboard/pages/settings";

import RenterDashboard from "./page/renter/RenterDashboard";
import RenterHome from "./page/renter/pages/RenterHome";
import AddLendProducts from "./page/renter/pages/products/AddLendProducts";
import RenterSettings from "./page/renter/pages/RenterSettings";
import PublisherDashboard from "./page/publisher/PublisherDashboard";
import PublisherHome from "./page/publisher/pages/PublisherHome";
import PublisherSettings from "./page/publisher/pages/PublisherSettings";
import AddPublishProducts from "./page/publisher/pages/products/AddPublishProducts";
import PublisherProducts from "./page/publisher/pages/products/PublisherProducts";
import RenterProducts from "./page/renter/pages/products/RenterProducts";
import Renters from "./page/admin/pages/renter/Renters";
import Publishers from "./page/admin/pages/publisher/Publishers";
import EditPublisherProduct from "./page/publisher/pages/products/EditPublisherProduct";
import EditRenterProduct from "./page/renter/pages/products/EditRenterProduct";

import FestsPage from "./page/admin/pages/fests/FestsPage";
import CreateFest from "./page/admin/pages/fests/CreateFest";
import EditFest from "./page/admin/pages/fests/EditFest";
import FestDetails from "./page/user/fests/FestDetails";
import AdminFeedbackPage from "./page/admin/pages/fests/feedback/AdminFeedbackPage";
import OrdersPublisher from "./page/publisher/pages/Order/OrdersPublisher";
import RentBook from "./page/user/rent";
import OrdersRenter from "./page/renter/pages/Order/OrdersRenter";
import SellerDashboard from "./page/seller/SellerDashboard";
import SellerProducts from "./page/seller/pages/products/SellerProducts";
import EditSellerProduct from "./page/seller/pages/products/EditSellerProduct";
import OrdersSeller from "./page/seller/pages/Order/OrdersSeller";
import SellerHome from "./page/seller/pages/SellerHome";
import SellerSettings from "./page/seller/pages/SellerSettings";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getUserDataFirst());
    }
  }, [dispatch, user]);

  const ProtectedRoute = ({ element }) => {
    const { user } = useSelector((state) => state.user);

    return user ? element : <Navigate to="/login" />;
  };
  const NavigateToProperRoute = () => {
    const { user } = useSelector((state) => state.user);

    if (!user) {
      return <Home />;
    }

    if (user.role === "buyer") {
      return <Dashboard />;
    }

    if (user.role === "admin" || user.role === "superAdmin") {
      return <Navigate to="/admin/" />;
    }
    if (user.role === "renter") {
      return <Navigate to="/renter/" />;
    }
    if (user.role === "publisher") {
      return <Navigate to="/publisher/" />;
    }
    if (user.role === "seller") {
      return <Navigate to="/seller/" />;
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <BrowserRouter>
        {user ? user.role === "buyer" && <Navbar /> : <Navbar />}

        <Routes>
          <Route path="/" element={<NavigateToProperRoute />} />
          <Route path="/fests" element={<UserFestsPage />} />
          <Route path="/fests/:id" element={<FestDetails />} />

          {/* Auth Pages */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="otp" element={<ValidateOTP />} />
          <Route path="forgot-password" element={<ForgetPassword />} />

          {/* General Pages */}
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />

          {/* User Routes */}
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route
            path="/checkout"
            element={<ProtectedRoute element={<Checkout />} />}
          />
          <Route
            path="/order-confirmation"
            element={<ProtectedRoute element={<OrderConfirmation />} />}
          />
          <Route
            path="/buy-now"
            element={<ProtectedRoute element={<BuyNow />} />}
          />
          <Route
            path="/rent"
            element={<ProtectedRoute element={<RentBook />} />}
          />

          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<ProfileDashboard />} />}
          >
            <Route index element={<Dash />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="order-history" element={<OrderHistory />} />
            <Route path="order-history/detail/:id" element={<OrderDetail />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="track-order" element={<TrackOrder />} />
            <Route path="wishlist" element={<WishList />} />
            <Route path="find-coupons" element={<FindCoupons />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Admin Routes */}
          {user && user.role === "superAdmin" ? (
            <Route path="/admin/*" element={<AdminRoutes />} />
          ) : (
            <Route path="/admin" element={<Navigate to="/" />} />
          )}

          {/* Renter Routes */}

          {user && user.role === "renter" ? (
            <Route path="/renter/*" element={<RenterRoutes />} />
          ) : (
            <Route path="/renter" element={<Navigate to="/" />} />
          )}
          {user && user.role === "publisher" ? (
            <Route path="/publisher/*" element={<PublisherRoutes />} />
          ) : (
            <Route path="/publisher" element={<Navigate to="/" />} />
          )}
          {user && user.role === "seller" ? (
            <Route path="/seller/*" element={<SellerRoutes />} />
          ) : (
            <Route path="/seller" element={<Navigate to="/" />} />
          )}

          <Route path="*" element={<Error404 />} />
        </Routes>
        {user ? user.role === "user" && <Footer /> : <Footer />}
      </BrowserRouter>
    </>
  );
}

export default App;

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDash />}>
        <Route index element={<AdminHome />} />
        <Route path="books" element={<Products />} />
        <Route path="books/add" element={<AddProducts />} />
        <Route path="books/edit/:id" element={<EditProduct />} />

        <Route path="categories" element={<Categories />} />
        <Route path="categories/create" element={<CreateCategory />} />
        <Route path="categories/edit/:id" element={<EditCategory />} />

        <Route path="orders" element={<Orders />} />
        <Route path="orders/detail/:id" element={<OrderDetails />} />
        <Route path="orders/return-requests" element={<ReturnRequests />} />
        <Route
          path="orders/return-requests/detail/:id"
          element={<OrderDetails />}
        />

        <Route path="sellers" element={<ManageAdmins />} />

        <Route path="coupon" element={<Coupon />} />
        <Route path="coupon/create" element={<CreateCoupon />} />
        <Route path="coupon/edit/:id" element={<EditCoupon />} />

        <Route path="fests" element={<FestsPage />} />
        <Route path="fests/create" element={<CreateFest />} />
        <Route path="fests/edit/:id" element={<EditFest />} />
        <Route path="fests/edit/:id/feedback" element={<AdminFeedbackPage />} />

        <Route path="banner" element={<Banner />} />
        <Route path="payments" element={<Payments />} />
        <Route path="customers" element={<Customers />} />
        <Route path="Renters" element={<Renters />} />
        <Route path="publishers" element={<Publishers />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

function RenterRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RenterDashboard />}>
        <Route index element={<RenterHome />} />
        <Route path="books" element={<RenterProducts />} />
        <Route path="books/add" element={<AddLendProducts />} />
        <Route path="books/edit/:id" element={<EditRenterProduct />} />

        <Route path="orders" element={<OrdersRenter />} />
        <Route path="orders/detail/:id" element={<OrderDetails />} />
        <Route path="orders/return-requests" element={<ReturnRequests />} />
        <Route
          path="orders/return-requests/detail/:id"
          element={<OrderDetails />}
        />
        <Route path="settings" element={<RenterSettings />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

function PublisherRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublisherDashboard />}>
        <Route index element={<PublisherHome />} />
        <Route path="books" element={<PublisherProducts />} />
        <Route path="books/add" element={<AddPublishProducts />} />
        <Route path="books/edit/:id" element={<EditPublisherProduct />} />

        <Route path="orders" element={<OrdersPublisher />} />
        <Route path="orders/detail/:id" element={<OrderDetails />} />
        <Route path="orders/return-requests" element={<ReturnRequests />} />
        <Route
          path="orders/return-requests/detail/:id"
          element={<OrderDetails />}
        />
        <Route path="settings" element={<PublisherSettings />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
function SellerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SellerDashboard />}>
        <Route index element={<SellerHome />} />
        <Route path="books" element={<SellerProducts />} />
        <Route path="books/add" element={<AddPublishProducts />} />
        <Route path="books/edit/:id" element={<EditSellerProduct />} />

        <Route path="orders" element={<OrdersSeller />} />
        <Route path="orders/detail/:id" element={<OrderDetails />} />
        <Route path="orders/return-requests" element={<ReturnRequests />} />
        <Route
          path="orders/return-requests/detail/:id"
          element={<OrderDetails />}
        />
        <Route path="settings" element={<SellerSettings />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
