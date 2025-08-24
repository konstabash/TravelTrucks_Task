import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchAllCampers = createAsyncThunk(
  "campers/fetchAllCampers",
  async (params = {}, thunkAPI) => {
    try {
      const response = await api.get("/campers", { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "articles/fetchCamperById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/campers/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
