import axios from "axios";

const API_KEY = "YOUR_KEY";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query, page = 1, type = "") => {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        page,
        type, // API-level filtering (IMPORTANT)
      },
    });

    if (res.data.Response === "False") {
      throw new Error(res.data.Error);
    }

    return res.data;
  } catch (error) {
    throw error.message || "Something went wrong";
  }
};

export const getMovieDetails = async (id) => {
  try {
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
  } catch (error) {
    throw error.message || "Error fetching details";
  }
};
