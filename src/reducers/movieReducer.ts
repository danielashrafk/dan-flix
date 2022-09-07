import { ActionType } from "../constants/actionTypes";

import { IMovie, MovieState } from "../models";

interface FetchAction {
  readonly type: ActionType.FETCH_ALL;
  payload: MovieState;
}

interface FetchUpcoming {
  readonly type: ActionType.FETCH_UPCOMING;
  payload: MovieState;
}
const initialMovieState = { movies: [] };

export type Action = FetchAction | FetchUpcoming;

const movieReducer = (
  movies: MovieState = initialMovieState,

  action: Action
) => {
  switch (action.type) {
    case ActionType.FETCH_ALL:
      //   console.log(action);
      //   consolsse.log("hi");
      return { ...movies, movies: action.payload };

    default:
      return movies;
  }
};

export { movieReducer };
