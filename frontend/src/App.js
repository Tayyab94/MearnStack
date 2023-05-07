

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar/navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import styles from "./App.module.css"

function App() {
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
              element={<div className={styles.main}>
                <div>Blog Page</div>
              </div>}
            />
            <Route
              path='submit'
              exact
              element={<div className={styles.main}>
                <div>Blog Submit page </div>
              </div>}
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
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
