import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  equipment: {
    AC: false,
    automatic: false,
    kitchen: false,
    TV: false,
    bathroom: false,
  },
  vehicleType: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation(state, { payload }) {
      state.location = payload;
    },
    setFilters(state, { payload }) {
      if ("location" in payload) state.location = payload.location;
      if ("equipment" in payload) state.equipment = payload.equipment;
      if ("vehicleType" in payload) state.vehicleType = payload.vehicleType;
    },
  },
});

export const { setLocation, setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
