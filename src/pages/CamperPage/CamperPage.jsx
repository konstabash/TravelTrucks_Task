import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { fetchCamperById } from "../../redux/campers/operations";
import { selectCurrentCamper } from "../../redux/campers/selectors";
import s from "./CamperPage.module.css";
import Container from "../../components/Container/Container.jsx";
import Reviews from "../../components/Reviews/Reviews.jsx";
import ImageGallery from "../../components/ImageGallery/ImageGallery.jsx";
import ImageModal from "../../components/ImageModal/ImageModal.jsx";
import clsx from "clsx";
import BookingForm from "../../components/BookingForm/BookingForm.jsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.navElement, isActive && s.active);
};

const CamperPage = () => {
  const { camperId } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCurrentCamper);

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (camperId) dispatch(fetchCamperById(camperId));
  }, [dispatch, camperId]);

  if (!camper) return null;

  const { name, price, location, gallery = [], reviews, description } = camper;

  return (
    <Container className={s.container}>
      <div className={s.detailsBlock}>
        <h3 className={s.name}>{name}</h3>
        <div className={s.ratingRow}>
          <Reviews reviews={reviews} />
          <div className={s.ratingRowLocation}>
            <svg className={s.mapIcon} width="16" height="16">
              <use href="/icons.svg#icon-map"></use>
            </svg>
            <p>{location}</p>
          </div>
        </div>
        <span className={s.price}>{`€${price}.00`}</span>
      </div>

      <ImageGallery
        gallery={gallery}
        name={name}
        className={s.gallery}
        onSelect={(_, i) => {
          setIdx(i);
          setOpen(true);
        }}
      />
      <p className={s.description}>{description}</p>

      <ul className={s.navMenu}>
        <li>
          <NavLink to="features" className={buildLinkClass}>
            Features
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={buildLinkClass}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <div className={s.outlet}></div>
      <div className={s.outletContainer}>
        <Outlet />
        <BookingForm />
      </div>

      <ImageModal
        isOpen={open}
        images={gallery}
        startIndex={idx}
        onRequestClose={() => setOpen(false)}
      />
    </Container>
  );
};

export default CamperPage;
