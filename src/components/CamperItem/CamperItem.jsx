import CamperFeatures from "../CamperFeatures/CamperFeatures.jsx";
import s from "./CamperItem.module.css";
import ButtonLink from "../ButtonLink/ButtonLink.jsx";
import FavouriteBtn from "../FavouriteBtn/FavouriteBtn.jsx";
import Reviews from "../Reviews/Reviews.jsx";

const CamperItem = ({ camper }) => {
  if (!camper) return null;
  const { id, name, price, location, gallery, reviews, description } = camper;

  return (
    <div className={s.container}>
      <img className={s.image} src={gallery[0].thumb} alt={name} />
      <div className={s.info}>
        <div className={s.nameRow}>
          <h3 className={s.name}>{name}</h3>
          <div className={s.nameRowPrice}>
            <span>{`€${price}.00`}</span>
            <FavouriteBtn camperId={id} />
          </div>
        </div>
        <div className={s.ratingRow}>
          <Reviews reviews={reviews} />
          <div className={s.ratingRowLocation}>
            <svg className={s.mapIcon} width="16" height="16">
              <use href="/icons.svg#icon-map"></use>
            </svg>
            <p>{location}</p>
          </div>
        </div>
        <p className={s.descr}>{description}</p>
        <CamperFeatures className={s.features} camper={camper} />
        <ButtonLink to={`/catalog/${id}/features`}>Show more</ButtonLink>
      </div>
    </div>
  );
};

export default CamperItem;
