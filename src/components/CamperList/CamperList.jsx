import s from "./CamperList.module.css";
import { useEffect, useMemo, useState } from "react";
import CamperItem from "../CamperItem/CamperItem.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/campers/selectors.js";
import Loader from "../Loader/Loader.jsx";

const STEP = 4;

const CamperList = ({ items = [], total }) => {
  const [visible, setVisible] = useState(STEP);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => setVisible(STEP), [items, total]);

  const list = useMemo(() => items.slice(0, visible), [items, visible]);
  const hasMore = visible < total;

  const handleShowMore = () => setVisible((v) => Math.min(v + STEP, total));

  return (
    <div>
      {isLoading && <Loader className={s.loader} size={50} />}
      <ul className={s.list}>
        {list.map((camper) => (
          <li key={camper.id}>
            <CamperItem camper={camper} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <LoadMoreBtn className={s.loadBtn} onClick={handleShowMore}>
          Show more
        </LoadMoreBtn>
      )}
    </div>
  );
};

export default CamperList;
