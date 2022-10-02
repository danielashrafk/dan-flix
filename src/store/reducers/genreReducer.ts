import { ActionType } from "../../utils/constants";

import { genreState } from "../models";

interface FetchAction {
  readonly type: ActionType.FETCH_GENRES;
  payload: string[];
}

const initialGenreState = { genres: [] };

export type genreAction = FetchAction;

const genreReducer = (
  genres: genreState = initialGenreState,

  action: genreAction
) => {
  switch (action.type) {
    case ActionType.FETCH_GENRES:
      return { ...genres, genres: action.payload };

    default:
      return genres;
  }
};

export { genreReducer };
