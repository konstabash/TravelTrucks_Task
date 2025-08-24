import { NavLink } from "react-router-dom";
import s from "./AppNav.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(isActive && s.active);
};

const AppNav = () => {
  return (
    <nav className={s.list}>
      <NavLink to="/" end className={buildLinkClass}>
        Home
      </NavLink>

      <NavLink to="catalog" end className={buildLinkClass}>
        Catalog
      </NavLink>
    </nav>
  );
};
export default AppNav;
