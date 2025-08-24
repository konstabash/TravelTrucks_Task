import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setFilters } from "../../redux/filters/slice";
import s from "./CamperFilters.module.css";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Schema = Yup.object({
  location: Yup.string()
    .trim()
    .max(100, "Too many characters")
    .matches(/^[\p{L}\d\s,.'-]*$/u, "Invalid characters"),
  equipment: Yup.object({
    AC: Yup.boolean(),
    automatic: Yup.boolean(),
    kitchen: Yup.boolean(),
    TV: Yup.boolean(),
    bathroom: Yup.boolean(),
  }),
  vehicleType: Yup.string()
    .oneOf(["panelTruck", "fullyIntegrated", "alcove"])
    .nullable()
    .transform((v) => (v === "" ? null : v))
    .notRequired(),
});

const CamperFilters = () => {
  const dispatch = useDispatch();
  const EQ_KEYS = ["AC", "automatic", "kitchen", "TV", "bathroom"];

  const parseParams = (sp) => {
    const location = (sp.get("location") || "").trim();
    const vehicleType = sp.get("vehicle") || null;
    const eqList = (sp.get("equipment") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const equipment = {
      AC: false,
      automatic: false,
      kitchen: false,
      TV: false,
      bathroom: false,
    };
    eqList.forEach((k) => {
      if (k in equipment) equipment[k] = true;
    });

    return { location, vehicleType, equipment };
  };

  const toSearchParams = ({ location, equipment, vehicleType }) => {
    const params = {};
    if (location) params.location = location;
    const eq = EQ_KEYS.filter((k) => equipment[k]);
    if (eq.length) params.equipment = eq.join(",");
    if (vehicleType) params.vehicle = vehicleType;
    return params;
  };

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fromUrl = parseParams(searchParams);
    dispatch(setFilters(fromUrl));
  }, [searchParams.toString()]);

  return (
    <div className={s.container}>
      <Formik
        initialValues={parseParams(searchParams)}
        enableReinitialize
        validationSchema={Schema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(vals) => {
          const payload = {
            location: vals.location.trim(),
            equipment: vals.equipment,
            vehicleType: vals.vehicleType,
          };
          setSearchParams(toSearchParams(payload));
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={s.locationContainer}>
            <label htmlFor="location" className={s.label}>
              Location
            </label>
            <Field name="location">
              {({ field }) => (
                <div
                  className={s.inputWrap}
                  data-filled={field.value?.trim() ? "true" : "false"}
                >
                  <svg
                    className={s.mapIcon}
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <use href="/src/assets/icons.svg#icon-map" />
                  </svg>

                  <input
                    id="location"
                    placeholder="City"
                    className={s.field}
                    {...field}
                  />
                </div>
              )}
            </Field>
            <ErrorMessage name="location" component="div" className={s.error} />
            <span className={s.filtersTitle}>Filters</span>
            <span className={s.groupHeader}>Vehicle equipment</span>
            <div className={s.line} />
            <div className={s.chips}>
              <button
                type="button"
                className={`${s.chip} ${values.equipment.AC ? s.active : ""}`}
                onClick={() =>
                  setFieldValue("equipment.AC", !values.equipment.AC)
                }
              >
                <svg className={s.chipIcon} width="32" height="32">
                  <use href="/src/assets/icons.svg#icon-ac"></use>
                </svg>
                AC
              </button>
              <button
                type="button"
                className={`${s.chip} ${
                  values.equipment.automatic ? s.active : ""
                }`}
                onClick={() =>
                  setFieldValue(
                    "equipment.automatic",
                    !values.equipment.automatic
                  )
                }
              >
                <svg className={s.chipIcon} width="32" height="32">
                  <use href="/src/assets/icons.svg#icon-trans"></use>
                </svg>
                Automatic
              </button>
              <button
                type="button"
                className={`${s.chip} ${
                  values.equipment.kitchen ? s.active : ""
                }`}
                onClick={() =>
                  setFieldValue("equipment.kitchen", !values.equipment.kitchen)
                }
              >
                <svg className={s.chipIcon} width="32" height="32">
                  <use href="/src/assets/icons.svg#icon-kitchen"></use>
                </svg>
                Kitchen
              </button>
              <button
                type="button"
                className={`${s.chip} ${values.equipment.TV ? s.active : ""}`}
                onClick={() =>
                  setFieldValue("equipment.TV", !values.equipment.TV)
                }
              >
                <svg className={s.chipIcon} width="32" height="32">
                  <use href="/src/assets/icons.svg#icon-tv"></use>
                </svg>
                TV
              </button>
              <button
                type="button"
                className={`${s.chip} ${
                  values.equipment.bathroom ? s.active : ""
                }`}
                onClick={() =>
                  setFieldValue(
                    "equipment.bathroom",
                    !values.equipment.bathroom
                  )
                }
              >
                <svg className={s.chipIcon} width="32" height="32">
                  <use href="/src/assets/icons.svg#icon-bath"></use>
                </svg>
                Bathroom
              </button>
            </div>
            <h4 className={s.groupHeader}>Vehicle type</h4>
            <div className={s.line} />

            <div className={s.chips}>
              <button
                type="button"
                className={`${s.chip} ${
                  values.vehicleType === "panelTruck" ? s.active : ""
                }`}
                onClick={() =>
                  setFieldValue(
                    "vehicleType",
                    values.vehicleType === "panelTruck" ? null : "panelTruck"
                  )
                }
              >
                <svg className={s.chipIcon} width="32" height="32">
                  <use href="/src/assets/icons.svg#icon-grid-1x2"></use>
                </svg>
                Van
              </button>
              <button
                type="button"
                className={`${s.chip} ${
                  values.vehicleType === "fullyIntegrated" ? s.active : ""
                }`}
                onClick={() =>
                  setFieldValue(
                    "vehicleType",
                    values.vehicleType === "fullyIntegrated"
                      ? null
                      : "fullyIntegrated"
                  )
                }
              >
                <svg className={s.chipIcon} width="32" height="32">
                  <use href="/src/assets/icons.svg#icon-grid"></use>
                </svg>
                Fully Integrated
              </button>
              <button
                type="button"
                className={`${s.chip} ${
                  values.vehicleType === "alcove" ? s.active : ""
                }`}
                onClick={() =>
                  setFieldValue(
                    "vehicleType",
                    values.vehicleType === "alcove" ? null : "alcove"
                  )
                }
              >
                <svg className={s.chipIcon} width="32" height="32">
                  <use href="/src/assets/icons.svg#icon-grid-3x3"></use>
                </svg>
                Alcove
              </button>
            </div>
            <div className={s.actions}>
              <button type="submit" className={s.searchBtn}>
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CamperFilters;
