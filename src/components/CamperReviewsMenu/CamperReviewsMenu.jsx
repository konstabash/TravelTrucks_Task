import { useSelector } from "react-redux";
import { selectCurrentCamper } from "../../redux/campers/selectors";
import s from "./CamperReviewsMenu.module.css";
import ReviewItem from "../ReviewItem/ReviewItem.jsx";

const CamperReviewsMenu = () => {
  const camper = useSelector(selectCurrentCamper);
  if (!camper) return null;

  const reviews = camper.reviews || [];

  return (
    <div className={s.container}>
      <div className={s.list}>
        {reviews.map((r, i) => (
          <ReviewItem
            key={`${r.reviewer_name || "user"}-${i}`}
            name={r.reviewer_name}
            rating={r.reviewer_rating}
            comment={r.comment}
          />
        ))}
      </div>
    </div>
  );
};

export default CamperReviewsMenu;
