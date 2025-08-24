import s from "./CatalogPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import CamperFilters from "../../components/CamperFilters/CamperFilters.jsx";
import CamperList from "../../components/CamperList/CamperList.jsx";
import Container from "../../components/Container/Container.jsx";
import { useEffect } from "react";
import { fetchAllCampers } from "../../redux/campers/operations.js";
import { selectFilteredCampers } from "../../redux/filters/selectors.js";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectFilteredCampers);

  useEffect(() => {
    dispatch(fetchAllCampers());
  }, [dispatch]);

  return (
    <Container className={s.container}>
      <CamperFilters />
      <CamperList items={campers} total={campers.length} />
    </Container>
  );
};

export default CatalogPage;
