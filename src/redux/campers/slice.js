import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCampers, fetchCamperById } from "./operations";

const FAV_KEY = "campers.favorites";
const initialState = {
  items: [],
  total: 0,
  isLoading: false,
  error: null,
  current: null,
  isCurrentLoading: false,
  currentError: null,
  favorites: JSON.parse(localStorage.getItem(FAV_KEY) || "[]"),
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    setCampers(state, action) {
      state.items = action.payload;
    },
    toggleFavorite(state, { payload }) {
      const id = String(payload);
      const i = state.favorites.indexOf(id);
      if (i >= 0) state.favorites.splice(i, 1);
      else state.favorites.push(id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCampers.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.isLoading = false;
      })
      .addCase(fetchAllCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to fetch campers";
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.isCurrentLoading = true;
        state.currentError = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.current = action.payload;
        state.isCurrentLoading = false;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.isCurrentLoading = false;
        state.currentError =
          action.payload || action.error?.message || "Failed to fetch camper";
      });
  },
});

export const { setCampers, toggleFavorite } = campersSlice.actions;
export const FAV_LS_KEY = FAV_KEY;
export default campersSlice.reducer;
