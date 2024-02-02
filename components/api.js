import axios from "axios";

const API_KEY = "d9793288";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (searchTerm) => {
    const response = await axios.get(`${BASE_URL}?s=${searchTerm}&apikey=${API_KEY}`);
    return response.data;
};

export const getMovieDetails = async (movieId) => {
    const response = await axios.get(`${BASE_URL}?i=${movieId}&apikey=${API_KEY}`);
    return response.data;
};