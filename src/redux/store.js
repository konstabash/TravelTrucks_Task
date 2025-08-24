import { configureStore } from "@reduxjs/toolkit";
import campersReducer, { FAV_LS_KEY } from "./campers/slice";
import filtersReducer from "./filters/slice";

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
  },
});

store.subscribe(() => {
  const { favorites } = store.getState().campers;
  localStorage.setItem(FAV_LS_KEY, JSON.stringify(favorites));
});
