import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import { Dropdown } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className='nav-bar'>
      <div className='nav-content'>
        <Link to='/'>
          <h1>W-Log</h1>
        </Link>
        <div className='search-bar'>
          <input type='text' placeholder='Search WebLog...'></input>
        </div>

        <div className='navigation'>
          <Link to='/blogs'>
            <h3>
              <span>
                <ArticleIcon />
              </span>
              Articles
            </h3>
          </Link>
          <Link to='/about'>
            <h3>
              <span>
                <NotificationsNoneIcon />
              </span>
              Notifications
            </h3>
          </Link>
          {userData ? (
            <>
              <Link to='/account'>
                <Dropdown label={<PersonIcon />} className='rounded-full'>
                  <Dropdown.Header>
                    <span className='block text-sm'>Bonnie Green</span>
                    <span className='block truncate text-sm font-medium'>
                      bonnie@flowbite.com
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
                  <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
                  <Dropdown.Item icon={HiCurrencyDollar}>
                    Earnings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>
                </Dropdown>
              </Link>
            </>
          ) : (
            <>
              <Link to='/login'>
                <h3>
                  <span>
                    <LoginIcon />
                  </span>
                  Login/Register
                </h3>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
