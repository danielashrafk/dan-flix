import { combineReducers } from "redux";
import { genreReducer } from "./genreReducer";
import imageReducer from "./imageReducer";
import { movieReducer } from "./movieReducer";
import { upcomingMovieReducer } from "./upcomingMovieReducer";

const reducers = combineReducers({
  movies: movieReducer,
  upcomingMovies: upcomingMovieReducer,
  images: imageReducer,
  genres: genreReducer,
});

export type State = ReturnType<typeof reducers>;

export { reducers };
