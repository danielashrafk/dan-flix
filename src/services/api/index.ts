import axios from "axios";

const API = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/movie/popular?api_key=6fd14070bdbdccd1fc6038ec54910449",
});

const upcomingAPI = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/movie/upcoming?api_key=6fd14070bdbdccd1fc6038ec54910449",
});
const genresAPI = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/genre/movie/list?api_key=6fd14070bdbdccd1fc6038ec54910449",
});

export const fetchMovies = () => API.get("");
export const fetchUpcomingMovies = () => upcomingAPI.get("");
export const fetchGenres = () => genresAPI.get("");
