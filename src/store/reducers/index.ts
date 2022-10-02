import { combineReducers } from "redux";
import { genreReducer } from "./genreReducer";
import { movieReducer } from "./movieReducer";
import { upcomingMovieReducer } from "./upcomingMovieReducer";

const reducers = combineReducers({
  movies: movieReducer,
  upcomingMovies: upcomingMovieReducer,
  genres: genreReducer,
});

export type State = ReturnType<typeof reducers>;

export { reducers };
