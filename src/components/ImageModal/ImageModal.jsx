import { useEffect, useState } from "react";
import Modal from "react-modal";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

const modalStyles = {
  overlay: { backgroundColor: "rgba(0,0,0,0.6)" },
  content: {
    inset: "10%",
    padding: 0,
    border: "none",
    background: "transparent",
    overflow: "hidden",
  },
};

export default function ImageModal({
  isOpen,
  images = [],
  startIndex = 0,
  onRequestClose,
}) {
  const [index, setIndex] = useState(startIndex);
  const count = images.length;
  const img = images[index];

  useEffect(() => {
    if (isOpen) setIndex(startIndex);
  }, [isOpen, startIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
      if (e.key === "Escape") onRequestClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, count, onRequestClose]);

  const next = () => setIndex((i) => (i + 1) % count);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  const handleViewerClick = (e) => {
    if (e.currentTarget === e.target) onRequestClose?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick
      style={modalStyles}
      contentLabel="Image preview"
    >
      <div className={s.viewer} onClick={handleViewerClick}>
        {img && (
          <img
            className={s.image}
            src={img.original}
            alt=""
            onClick={count > 1 ? next : undefined}
          />
        )}

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              className={`${s.arrow} ${s.prev}`}
              onClick={prev}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next image"
              className={`${s.arrow} ${s.next}`}
              onClick={next}
            >
              ›
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
