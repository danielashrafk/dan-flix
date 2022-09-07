import { ActionType } from "../constants/actionTypes";

import { IMovie, MovieState } from "../models";

interface FetchAction {
  readonly type: ActionType.FETCH_UPCOMING;
  payload: MovieState;
}

const initialMovieState = { movies: [] };

export type Action = FetchAction;

const upcomingMovieReducer = (
  movies: MovieState = initialMovieState,
  action: Action
) => {
  switch (action.type) {
    case ActionType.FETCH_UPCOMING:
      //   console.log(action);
      //   consolsse.log("hi");
      return { ...movies, movies: action.payload };

    default:
      return movies;
  }
};

export { upcomingMovieReducer };
