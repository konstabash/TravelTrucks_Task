import { Link } from "react-router-dom";
import clsx from "clsx";
import s from "./ButtonLink.module.css";

const ButtonLink = ({ to, className, children, ...rest }) => {
  return (
    <Link to={to} className={clsx(s.button, className && className)} {...rest}>
      {children}
    </Link>
  );
};

export default ButtonLink;
