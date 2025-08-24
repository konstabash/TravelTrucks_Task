import clsx from "clsx";

const LoadMoreBtn = ({ onClick, className }) => (
  <button type="button" onClick={onClick} className={clsx(className)}>
    Load more
  </button>
);

export default LoadMoreBtn;
