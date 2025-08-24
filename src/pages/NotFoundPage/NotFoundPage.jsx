import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={s.wrap}>
      <h1 className={s.code}>404</h1>
      <p className={s.text}>Not Found</p>
    </div>
  );
};

export default NotFoundPage;
