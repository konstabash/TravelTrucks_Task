import s from "./Reviews.module.css";

const Reviews = ({ reviews }) => {
  const reviewsNumber = reviews.length;
  const reviewsAverage = (reviews) => {
    if (reviewsNumber === 0) return null;
    const sum = reviews.reduce((acc, r) => acc + r.reviewer_rating, 0);
    return Math.round((sum / reviewsNumber) * 10) / 10;
  };

  return (
    <div className={s.ratingRow}>
      <svg className={s.starIcon} width="16" height="16">
        <use href="/icons.svg#icon-star"></use>
      </svg>
      <span>
        {reviewsNumber
          ? `${reviewsAverage(reviews)} (${reviewsNumber} Reviews)`
          : "No reviews"}
      </span>
    </div>
  );
};
export default Reviews;
