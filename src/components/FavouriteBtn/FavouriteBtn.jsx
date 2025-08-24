import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { toggleFavorite } from "../../redux/campers/slice";
import { selectIsFavorite } from "../../redux/campers/selectors";
import s from "./FavouriteBtn.module.css";

const FavouriteBtn = ({ camperId }) => {
  const dispatch = useDispatch();
  const isFav = useSelector(selectIsFavorite(camperId));

  return (
    <button
      type="button"
      aria-pressed={isFav}
      onClick={() => dispatch(toggleFavorite(camperId))}
      className={clsx(s.btn)}
    >
      <svg
        className={clsx(s.icon, isFav && s.active)}
        width="36"
        height="24"
        aria-hidden="true"
      >
        <use href={`/icons.svg#icon-heart`} />
      </svg>
    </button>
  );
};

export default FavouriteBtn;
