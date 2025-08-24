import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const CamperPage = lazy(() => import("./pages/CamperPage/CamperPage"));
const CamperFeaturesMenu = lazy(() =>
  import("./components/CamperFeaturesMenu/CamperFeaturesMenu")
);
const CamperReviewsMenu = lazy(() =>
  import("./components/CamperReviewsMenu/CamperReviewsMenu")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="catalog/:camperId" element={<CamperPage />}>
          <Route path="features" element={<CamperFeaturesMenu />}></Route>
          <Route path="reviews" element={<CamperReviewsMenu />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
