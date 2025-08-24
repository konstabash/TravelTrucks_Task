import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./BookingForm.module.css";

const formatDateYMD = (d) =>
  d instanceof Date && !Number.isNaN(d) ? d.toISOString().slice(0, 10) : null;

const formatDateDisplay = (d) => {
  if (!(d instanceof Date) || Number.isNaN(d)) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

export default function BookingForm() {
  const [openCal, setOpenCal] = useState(false);
  const [reqErr, setReqErr] = useState({
    name: false,
    email: false,
    date: false,
  });
  const pickerRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (!pickerRef.current) return;
      if (!pickerRef.current.contains(e.target)) setOpenCal(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div className={s.container}>
      <h3 className={s.title}>Book your campervan now</h3>
      <p className={s.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={{ name: "", email: "", date: null, comment: "" }}
        onSubmit={(vals, { resetForm, setSubmitting }) => {
          const missing = {
            name: !vals.name.trim(),
            email: !vals.email.trim(),
            date: !vals.date,
          };
          setReqErr(missing);
          if (missing.name || missing.email || missing.date) {
            setSubmitting(false);
            return;
          }

          const payload = {
            name: vals.name.trim(),
            email: vals.email.trim(),
            date: formatDateYMD(vals.date),
            comment: vals.comment.trim(),
          };
          console.log("Booking submit:", payload);
          toast.success("Thanks! We’ll contact you soon.");
          resetForm();
          setReqErr({ name: false, email: false, date: false });
          setOpenCal(false);
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className={s.form}>
            <Field name="name">
              {({ field }) => (
                <input
                  {...field}
                  maxLength={64}
                  className={`${s.input} ${reqErr.name ? s.invalid : ""}`}
                  placeholder={reqErr.name ? "Required" : "Name*"}
                  onChange={(e) => {
                    field.onChange(e);
                    if (reqErr.name && e.target.value.trim()) {
                      setReqErr((p) => ({ ...p, name: false }));
                    }
                  }}
                />
              )}
            </Field>

            <Field name="email">
              {({ field }) => (
                <input
                  {...field}
                  type="email"
                  className={`${s.input} ${reqErr.email ? s.invalid : ""}`}
                  placeholder={reqErr.email ? "Required" : "Email*"}
                  onChange={(e) => {
                    field.onChange(e);
                    if (reqErr.email && e.target.value.trim()) {
                      setReqErr((p) => ({ ...p, email: false }));
                    }
                  }}
                />
              )}
            </Field>

            <div className={s.picker} ref={pickerRef}>
              <input
                id="dateInput"
                className={`${s.input} ${s.inputDate} ${
                  reqErr.date ? s.invalid : ""
                }`}
                placeholder={reqErr.date ? "Required" : "Booking date*"}
                value={formatDateDisplay(values.date)}
                onFocus={() => setOpenCal(true)}
                onClick={() => setOpenCal(true)}
                readOnly
              />
              {openCal && (
                <div className={s.calendarWrap}>
                  <Calendar
                    onChange={(d) => {
                      setFieldValue("date", d);
                      setReqErr((p) => ({ ...p, date: false }));
                      setOpenCal(false);
                    }}
                    value={values.date}
                  />
                </div>
              )}
            </div>

            <Field name="comment" as="textarea">
              {({ field }) => (
                <textarea
                  {...field}
                  className={s.textarea}
                  placeholder="Comment"
                  rows={4}
                  maxLength={1000}
                />
              )}
            </Field>

            <button
              type="submit"
              className={s.submitBtn}
              disabled={isSubmitting}
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
