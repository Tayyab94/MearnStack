

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar/navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import styles from "./App.module.css"
import Protected from "./components/Protected/protected";
import ErrorPage from "./pages/Error/ErrorPage";

function App() {
  const isAuth = false;
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <div className={styles.layout}>
          <Navbar />
          <Routes>
            <Route
              path='/'
              exact
              element={<div className={styles.main}>
                <Home />
              </div>}
            />

            <Route
              path='crypto'
              exact
              element={<div className={styles.main}>
                <div>Crypt</div>
              </div>}
            />

            <Route
              path='blog'
              exact
              element={
                <Protected isAuthenticated={isAuth}>
                  <div className={styles.main}>
                    <div>Blog Page</div>
                  </div>
                </Protected>

              }
            />
            <Route
              path='submit'
              exact
              element={
                <Protected isAuthenticated={isAuth}>
                  <div className={styles.main}>
                    <div>Blog Submit page </div>
                  </div>
                </Protected>

              }
            />

            <Route
              path='login'
              exact
              element={<div className={styles.main}>
                <div>Login page</div>
              </div>}
            />
            <Route
              path='register'
              exact
              element={<div className={styles.main}>
                <div>Register</div>
              </div>}
            />

            <Route
              path="*"
              element={<div className={styles.main}>
                <ErrorPage />
              </div>} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
