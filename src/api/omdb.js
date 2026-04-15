
import axios from "axios";

const API_KEY = "e5e97278";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query, page = 1, type = "") => {
  const res = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: query,
      page,
      type,
    },
  });

  if (res.data.Response === "False") {
    throw new Error(res.data.Error);
  }

  return res.data;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id,
    },
  });

  if (res.data.Response === "False") {
    throw new Error(res.data.Error);
  }

  return res.data;
};