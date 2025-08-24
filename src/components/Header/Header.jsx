import { Link } from "react-router-dom";
import s from "./Header.module.css";
import AppNav from "../AppNav/AppNav.jsx";
import Container from "../Container/Container.jsx";

const Header = () => {
  return (
    <header className={s.header}>
      <Container className={s.container}>
        <Link className={s.title} to="/">
          <img src="/src/assets/images/title.png" alt="TravelTrucks" />
        </Link>
        <AppNav />
      </Container>
    </header>
  );
};
export default Header;
