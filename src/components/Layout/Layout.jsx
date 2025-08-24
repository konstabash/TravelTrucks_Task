import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ToastContainer
        position="top-right"
        autoClose={2200}
        closeOnClick
        pauseOnHover
        theme="light"
        style={{ zIndex: 99 }}
      />
    </>
  );
};

export default Layout;
