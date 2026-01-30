import { type Dispatch, type SetStateAction, useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import {
  TbSquareArrowLeftFilled,
  TbSquareArrowRightFilled,
} from "react-icons/tb";
import { VscSignOut } from "react-icons/vsc";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdKeyboardArrowDown,  MdCreditCard } from "react-icons/md";
import SearchModal from "./Tool/SearchModal";
import { useAuth } from "../../../hooks/useAuth";
import { userApi } from "../../../services/api";
import "../../../styles/header.scss";
import {userImg} from '../../../../public';
import { BiReset } from "react-icons/bi";

type Props = {
  showNav: boolean;
  setShowNav: Dispatch<SetStateAction<boolean>>;
};

export const Header = ({ showNav, setShowNav }: Props) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [displayName, setDisplayName] = useState('User');

  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const notifications = ["Notification 1", "Notification 2"];

  useEffect(() => {
    const fetchUserName = async () => {
      if (user?.id) {
        try {
          const userData = await userApi.getUserById(user.id);
          const name = userData?.personalInfo?.fullName || userData?.name || user?.username || 'User';
          setDisplayName(name);
        } catch (error) {
          console.error("Failed to fetch user name:", error);
          setDisplayName(user?.name || user?.username || 'User');
        }
      }
    };

    fetchUserName();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };


  return (
    <header className={`header ${showNav ? "header-open" : "header-closed"}`}>
      <div className="header-container">
        {/* Left Section */}
        <div className="header-left">
          <button
            className="header-toggle"
            onClick={() => setShowNav((prev) => !prev)}
            aria-label={showNav ? "Close sidebar" : "Open sidebar"}
          >
            {showNav ? <TbSquareArrowLeftFilled /> : <TbSquareArrowRightFilled />}
          </button>
        </div>

        <div className="header-center">
          <div className="header-search">
            <SearchModal />
          </div>
        </div>

        {/* Right Section */}
        <div className="header-right">
          <div className="header-docs">
            <a href="#" target="_blank" rel="noopener noreferrer">Docs</a>
          </div>

          {/* Notifications */}
          <div className="header-notification" ref={notificationRef}>
            <button
              className="header-notification-button"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <IoNotificationsOutline className="header-notification-icon" />
              {notifications.length > 0 && (
                <span className="header-notification-badge">{notifications.length}</span>
              )}
            </button>

            {showNotifications && (
              <div className="header-popover">
                <div className="header-popover-header">
                  <p className="header-popover-title">Notifications</p>
                  <button
                    className="header-mark-read"
                    onClick={() => console.log("Mark all as read")}
                  >
                    Mark all as read
                  </button>
                </div>
                <ul className="header-notifications">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <li key={index} className="header-notification-item">
                        {notification}
                      </li>
                    ))
                  ) : (
                    <p className="header-no-notifications">No notifications</p>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="header-menu" ref={userMenuRef}>
            <button
              className="header-menu-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="User menu"
            >
              <img
                src={userImg}
                alt={displayName}
                className="header-user-avatar"
               
              />
              <span className="header-username">
                {displayName}
              </span>
              <MdKeyboardArrowDown
                className={`header-chevron-icon ${showUserMenu ? "header-chevron-open" : ""}`}
              />
            </button>

            {showUserMenu && (
              <div className="header-menu-items">
                <div className="header-menu-content">
                  <Link
                    to="/dashboard/profile"
                    className="header-menu-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <CgProfile className="header-menu-icon" />
                    <span>View profile</span>
                  </Link>
                  <Link
                    to="/credit"
                    className="header-menu-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <MdCreditCard className="header-menu-icon" />
                    <span>Credit card</span>
                  </Link>
                  <Link
                    to="/auth/reset-password"
                    className="header-menu-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <BiReset className="header-menu-icon" />
                    <span>Reset Password</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="header-menu-item"
                  >
                    <VscSignOut className="header-menu-icon" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      {showMobileSearch && (
        <div className="header-mobile-search-modal">
          <div className="header-mobile-search-content">
            <SearchModal />
            <button
              className="header-mobile-search-close"
              onClick={() => setShowMobileSearch(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
</header>
  );
};