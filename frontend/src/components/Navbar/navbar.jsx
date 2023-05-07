import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  // const isAuthenticated = false;
  const [isAuth, setIsAuth] = useState(false);
  return (
    <>
      <nav className={styles.navbar}>
        <NavLink
          to="/"
          className={`${styles.logo} ${({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle} `}
        >
          Coin-Bounce
        </NavLink>
        <NavLink
          to={"/Home"}
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
          to={"crypto"}
        >
          Crypto Currency
        </NavLink>
        <NavLink
          to={"blog"}
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Blog
        </NavLink>
        <NavLink
          to={"submit"}
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Blog Post
        </NavLink>

        {isAuth === false ? (
          <div>
            {" "}
            <NavLink
              to={"login"}
              className={({ isActive }) =>
                isActive ? styles.activeStyle : styles.inActiveStyle
              }
            >
              <button className={styles.loginBtn}>Login</button>
            </NavLink>
            <NavLink
              to={"register"}
              className={({ isActive }) =>
                isActive ? styles.activeStyle : styles.inActiveStyle
              }
            >
              <button className={styles.register}>Register</button>
            </NavLink>
          </div>
        ) : (
          <>
            <NavLink
              to={"Logout"}
              className={({ isActive }) =>
                isActive ? styles.activeStyle : styles.inActiveStyle
              }
            >
              <button
                className={styles.loginBtn}
                onClick={() => setIsAuth(true)}
              >
                Logout
              </button>
            </NavLink>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
