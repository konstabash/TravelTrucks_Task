import ImageCard from "../ImageCard/ImageCard.jsx";
import clsx from "clsx";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ gallery = [], name, className, onSelect }) => {
  return (
    <ul className={clsx(s.gallery, className && className)}>
      {gallery.map((img, idx) => (
        <li key={img.thumb || img.original || idx}>
          <ImageCard
            src={img.thumb}
            alt={`${name ? `${name} ` : ""}photo ${idx + 1}`}
            onClick={() => onSelect?.(img, idx)}
          />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
