import s from "./ImageCard.module.css";

const ImageCard = ({ src, alt, onClick }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
    >
      <img className={s.image} src={src} alt={alt} />
    </div>
  );
};
export default ImageCard;
