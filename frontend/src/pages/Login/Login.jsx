import React from "react";
import styles from "./Login.module.css";
import TextInput from "../../components/TextInput/TextInput";
import { useFormik } from "formik";
import loginSchema from "../../schemas/loginSchema";
const Login = () => {
  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: loginSchema,
  });
  return (
    <>
      <div className={styles.loginWrapper}>
        <div className={styles.loginHeader}>Log In to your Account</div>
        <TextInput
          type="text"
          value={values.username}
          name="username"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="user Nane"
          error={errors.username && touched.username ? 1 : undefined}
          errormessage={errors.username}
        />
        <TextInput
          type="password"
          value={values.password}
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Password"
          error={errors.password && touched.password ? 1 : undefined}
          errormessage={errors.password}
        />
        <button className={styles.loginBtn}>Login</button>
        <span>
          Don't have an Account?{" "}
          <button className={styles.createAccount}>Register</button>
        </span>
      </div>
    </>
  );
};

export default Login;
