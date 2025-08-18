import { Outlet } from "react-router-dom";
import s from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={s.layout}>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
