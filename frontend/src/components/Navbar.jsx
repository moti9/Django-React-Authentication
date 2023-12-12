import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import AuthAPI from "./AuthAPI";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [cookies, , removeCookie] = useCookies([
    "access_token",
    "refresh_token",
  ]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await AuthAPI.logoutUser();
      if (response.status === 205) {
        setIsAuth(false);
        removeCookie("access_token");
        removeCookie("refresh_token");
        navigate("/");
      }
    } catch (error) {
      // console.error('Logout error:', error.message);
      setIsAuth(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await AuthAPI.checkAuthentication();
        if (response.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        // console.error('Error during authentication check');
        setIsAuth(false);
        navigate("/user/login");
      }
    };

    checkAuth();
  }, [cookies]);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-dark"
        data-bs-theme="dark"
      >
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Auth
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/user/profile">
                  Profile
                </NavLink>
              </li>
            </ul>
            {/* Apply ml-auto to move the following element to the right */}
            <ul className="navbar-nav ml-auto">
              {isAuth ? (
                // Render the logout link for non-authenticated users
                <li className="nav-item">
                  <NavLink className="nav-link" to="#" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </li>
              ) : (
                // Render the links for authenticated users
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/user/signup">
                      Signup
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/user/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
