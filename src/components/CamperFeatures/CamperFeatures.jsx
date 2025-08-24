import s from "./CamperFeatures.module.css";
import clsx from "clsx";

const ENGINE_META = {
  diesel: { label: "Diesel", icon: "icon-engine" },
  petrol: { label: "Petrol", icon: "icon-engine" },
  hybrid: { label: "Hybrid", icon: "icon-engine" },
};

const TRANSMISSION_META = {
  automatic: { label: "Automatic", icon: "icon-trans" },
  manual: { label: "Manual", icon: "icon-trans" },
};

const BOOL_FEATURES = [
  { key: "AC", label: "AC", icon: "icon-ac" },
  { key: "bathroom", label: "Bathroom", icon: "icon-bath" },
  { key: "gas", label: "Gas", icon: "icon-gas" },
  { key: "kitchen", label: "Kitchen", icon: "icon-kitchen" },
  { key: "microwave", label: "Microwave", icon: "icon-microwave" },
  { key: "radio", label: "Radio", icon: "icon-radio" },
  { key: "refrigerator", label: "Refrigerator", icon: "icon-fridge" },
  { key: "TV", label: "TV", icon: "icon-tv" },
  { key: "water", label: "Water", icon: "icon-water" },
];

const byLabel = (a, b) =>
  a.label.localeCompare(b.label, undefined, { sensitivity: "base" });

const CamperFeatures = ({ camper, className }) => {
  if (!camper) return null;

  const engineMeta = ENGINE_META[camper.engine] || {
    label: "Engine",
    icon: "icon-engine",
  };
  const transmissionMeta = TRANSMISSION_META[camper.transmission] || {
    label: "Transmission",
    icon: "icon-trans",
  };

  const forced = [
    { key: "engine", ...engineMeta },
    { key: "transmission", ...transmissionMeta },
  ];

  const booleans = BOOL_FEATURES.filter((f) => Boolean(camper[f.key]));
  const features = [...forced, ...booleans].sort(byLabel);

  return (
    <ul className={clsx(s.list, className && className)}>
      {features.map((f) => (
        <li className={s.feature} key={f.key}>
          <svg width="20" height="20" aria-hidden="true">
            <use href={`/src/assets/icons.svg#${f.icon}`} />
          </svg>
          <span>{f.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default CamperFeatures;
