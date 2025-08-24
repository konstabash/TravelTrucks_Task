import { useSelector } from "react-redux";
import CamperFeatures from "../CamperFeatures/CamperFeatures.jsx";
import s from "./CamperFeaturesMenu.module.css";
import { selectCurrentCamper } from "../../redux/campers/selectors.js";

const FORM_LABEL = {
  panelTruck: "Panel truck",
  fullyIntegrated: "Fully integrated",
  alcove: "Alcove",
};

const formatSimpleUnit = (v) => {
  if (!v) return "—";
  const str = String(v).trim();
  const m = str.match(/^(\d+(?:\.\d+)?)\s*([ml])$/i);
  return m ? `${m[1]} ${m[2]}` : str;
};

const CamperFeaturesMenu = () => {
  const camper = useSelector(selectCurrentCamper);
  if (!camper) return null;

  const { form, length, width, height, tank, consumption } = camper;

  return (
    <div className={s.container}>
      <CamperFeatures camper={camper} />

      <div>
        <span className={s.detailsTitle}>Vehicle details</span>
        <div className={s.line} />

        <ul className={s.detailsList}>
          <li className={s.detailsItem}>
            <span>Form</span>
            <span>{FORM_LABEL[form] || form || "—"}</span>
          </li>
          <li className={s.detailsItem}>
            <span>Length</span>
            <span>{formatSimpleUnit(length)}</span>
          </li>
          <li className={s.detailsItem}>
            <span>Width</span>
            <span>{formatSimpleUnit(width)}</span>
          </li>
          <li className={s.detailsItem}>
            <span>Height</span>
            <span>{formatSimpleUnit(height)}</span>
          </li>
          <li className={s.detailsItem}>
            <span>Tank</span>
            <span>{formatSimpleUnit(tank)}</span>
          </li>
          <li className={s.detailsItem}>
            <span>Consumption</span>
            <span>{consumption || "—"}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CamperFeaturesMenu;
