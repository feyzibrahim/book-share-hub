import React from "react";
import ExIphoneLogo from "../../../components/ExIphoneLogo";
import { NavLink, useNavigate } from "react-router-dom";

import { RiDashboardLine, RiUserHeartLine } from "react-icons/ri";
import { FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { HiOutlineTicket } from "react-icons/hi";
import { BsCardChecklist, BsCreditCard } from "react-icons/bs";
import { AiOutlineTags } from "react-icons/ai";
import { FaUsersCog, FaUsers, FaUserTie } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/userActions";
import { BiBook } from "react-icons/bi";
import { GiPartyFlags } from "react-icons/gi";

const SideNavbar = () => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="h-full overflow-y-scroll scrollbar-hide pb-20">
      <div className="w-40 flex items-center cursor-pointer opacity-70 hover:opacity-100">
        <ExIphoneLogo />
      </div>
      <div className="text-gray-600 font-semibold mt-5">
        <p className="side-nav-sub-title">Menu</p>
        <NavLink className="side-nav-link-sp" to="/admin/">
          <RiDashboardLine />
          Dashboard
        </NavLink>
        <NavLink className="side-nav-link-sp" to="books">
          <BiBook />
          Books
        </NavLink>
        <NavLink className="side-nav-link-sp" to="categories">
          <ImStack />
          Category
        </NavLink>
        <NavLink className="side-nav-link-sp" to="orders">
          <BsCardChecklist />
          Orders
        </NavLink>
        <NavLink className="side-nav-link-sp" to="coupon">
          <HiOutlineTicket />
          Coupon
        </NavLink>
        <NavLink className="side-nav-link-sp" to="banner">
          <AiOutlineTags />
          Banner
        </NavLink>
        <NavLink className="side-nav-link-sp" to="payments">
          <BsCreditCard />
          Payments
        </NavLink>
        <NavLink className="side-nav-link-sp" to="fests">
          <GiPartyFlags />
          Fests
        </NavLink>
        <p className="side-nav-sub-title">User Management</p>
        {user && user.role === "superAdmin" && (
          <NavLink className="side-nav-link-sp" to="manageAdmins">
            <FaUsersCog />
            Manage Admins
          </NavLink>
        )}
        <NavLink className="side-nav-link-sp" to="customers">
          <FaUsers />
          Customers
        </NavLink>
        <NavLink className="side-nav-link-sp" to="Renters">
          <RiUserHeartLine />
          Renters
        </NavLink>
        <NavLink className="side-nav-link-sp" to="publishers">
          <FaUserTie />
          Publishers
        </NavLink>
        <p className="side-nav-sub-title">Other</p>
        <NavLink className="side-nav-link-sp" to="settings">
          <FiSettings />
          Settings
        </NavLink>

        <button
          className="side-nav-link-sp cursor-pointer w-full"
          onClick={handleLogout}
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;
