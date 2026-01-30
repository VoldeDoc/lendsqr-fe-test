import { forwardRef, useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../../../../public";
import { logo1 } from "../../../../public";
import { 
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdClose,
} from "react-icons/md";
import { MENU_ITEMS } from "../../../constant/data";
import { handleMenuClick, renderIcon, toggleSection } from "./util";
import { useAuth } from "../../../hooks/useAuth";
import "../../../styles/Sidebar.scss";

type Props = {
  showNav: boolean;
  setShowNav: Dispatch<SetStateAction<boolean>>;
};

export const Sidebar = forwardRef<HTMLElement, Props>(
  ({ showNav, setShowNav }, ref) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [activeMenu, setActiveMenu] = useState<string>(location.pathname);
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
      "Switch Organization": true,
      "CUSTOMERS": true,
      "BUSINESSES": true,
      "SETTINGS": true,
    });

    const handleLogout = () => {
      logout();
      navigate("/login");
      setShowNav(false);
    };

    return (
      <>
        {/* Mobile Overlay */}
        {showNav && (
          <div 
            className="sidebar__overlay"
            onClick={() => setShowNav(false)}
          />
        )}

        <aside
          ref={ref}
          className={`sidebar ${showNav ? "sidebar--open" : "sidebar--closed"}`}
        >
          {/* Close Button (Mobile Only) */}
          <button 
            className="sidebar__close-btn"
            onClick={() => setShowNav(false)}
            aria-label="Close sidebar"
          >
            <MdClose />
          </button>

          {/* Logo */}
          <div className="sidebar__logo">
            {showNav ? (
              <img src={logo} alt="Lendsqr" />
            ) : (
              <div className="sidebar__placeholder">
                <img src={logo1} alt="logo1" />
              </div>
            )}
          </div>

          {/* Menu Items */}
          <ul className="sidebar__menu">
            {MENU_ITEMS.map((item, index) => (
              <li key={index} className="sidebar__menu-item">
                {/* Dashboard Item */}
                {item.isDashboard ? (
                  <div className="sidebar__dashboard-label">
                    {renderIcon(item.icon, item.iconSrc, "sidebar__icon")}
                    {showNav && <span className="sidebar__menu-text">{item.name}</span>}
                  </div>
                ) : item.isLogout ? (
                  /* Logout Item */
                  <>
                    <div className="sidebar__divider" />
                    <button
                      className="sidebar__logout-btn"
                      onClick={handleLogout}
                      aria-label="Logout"
                    >
                      {renderIcon(item.icon, item.iconSrc, "sidebar__icon sidebar__icon--logout")}
                      {showNav && <span className="sidebar__menu-text">{item.name}</span>}
                    </button>
                  </>
                ) : (
                  <>
                    {/* Section Headers with Submenus */}
                    <div
                      className={`sidebar__menu-link ${
                        item.isOrganizationSwitcher 
                          ? "sidebar__menu-link--org-switcher" 
                          : "sidebar__menu-link--section"
                      } ${
                        openSections[item.name] && item.submenus?.some(sub => activeMenu === sub.path) ? "active" : ""
                      }`}
                      onClick={() => toggleSection(item.name, setOpenSections)}
                    >
                      {/* Show icon when sidebar is CLOSED OR when it's the org switcher */}
                      {(!showNav || item.isOrganizationSwitcher) && 
                        renderIcon(item.icon, item.iconSrc, "sidebar__icon")
                      }
                      
                      {/* Show text and arrow only when sidebar is OPEN */}
                      {showNav && (
                        <>
                          <span className="sidebar__menu-text">{item.name}</span>
                          {openSections[item.name] ? (
                            <MdKeyboardArrowUp className="sidebar__arrow" />
                          ) : (
                            <MdKeyboardArrowDown className="sidebar__arrow" />
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Submenus */}
                    {showNav && openSections[item.name] && item.submenus && (
                      <ul className="sidebar__submenu">
                        {item.submenus.map((submenu, subIndex) => (
                          <li key={subIndex} className="sidebar__submenu-item">
                            <a
                              href={submenu.path}
                              className={`sidebar__submenu-link ${
                                activeMenu === submenu.path ? "active" : ""
                              }`}
                              onClick={(e) => {
                                if (submenu.path === "#") {
                                  e.preventDefault();
                                }
                                handleMenuClick(submenu.path, setActiveMenu);
                              }}
                            >
                              {renderIcon(submenu.icon, submenu.iconSrc, "sidebar__submenu-icon")}
                              <span className="sidebar__submenu-text">{submenu.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </>
    );
  }
);