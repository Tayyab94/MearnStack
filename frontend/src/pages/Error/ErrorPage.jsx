import React from "react";
import styles from "./ErrorPage.module.css";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className={styles.error}>
      <h1>Error! Page Not found </h1>
      <span>😭</span>

      <div>
        Go to:{" "}
        <Link className={styles.homebtn} to={"/"}>
          Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
