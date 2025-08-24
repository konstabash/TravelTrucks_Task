import { Link } from "react-router-dom";
import s from "./HomePage.module.css";
import Container from "../../components/Container/Container.jsx";
import ButtonLink from "../../components/ButtonLink/ButtonLink.jsx";

const HomePage = () => {
  return (
    <div className={s.container}>
      <div className={s.background}>
        <Container className={s.homeMenu}>
          <h1 className={s.homeTitle}>Campers of your dreams</h1>
          <span className={s.homeMenuText}>
            You can find everything you want in our catalog
          </span>
          <ButtonLink to="/catalog">View Now</ButtonLink>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
