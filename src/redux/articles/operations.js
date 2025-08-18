import api from "../../utils/api";
import { setArticles } from "./slice";

export const fetchArticles = () => async (dispatch) => {
  try {
    const { data } = await api.get("/articles");
    dispatch(setArticles(data));
  } catch (error) {
    console.error("Failed to fetch articles", error);
  }
};
