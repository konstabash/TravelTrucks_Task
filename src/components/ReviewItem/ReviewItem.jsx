import s from "./ReviewItem.module.css";

const ReviewItem = ({ name, rating, comment }) => {
  const initial = (name?.trim()?.[0] || "?").toUpperCase();
  const filled = Math.max(0, Math.min(5, Math.floor(rating)));

  return (
    <div className={s.review}>
      <div className={s.headerRow}>
        <div className={s.avatar}>
          <span className={s.avatarText}>{initial}</span>
        </div>

        <div className={s.headerMeta}>
          <span className={s.name}>{name}</span>
          <div className={s.stars} aria-label={`${filled} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`${s.star} ${i < filled ? s.starFilled : ""}`}
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use href="/icons.svg#icon-star" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      <p className={s.comment}>{comment}</p>
    </div>
  );
};

export default ReviewItem;
