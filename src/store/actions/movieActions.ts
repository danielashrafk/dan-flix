import { Dispatch } from "redux";
import * as api from "../../services/api";
import { ActionType } from "../../utils/constants";
import { Action } from "../reducers/movieReducer";
import { genreAction } from "../reducers/genreReducer";
import * as _ from "lodash";
import { apiGenreState } from "../models";
import { _getGenres } from "../../utils/genres";

export const getMovies = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await api.fetchMovies();
      dispatch({ type: ActionType.FETCH_ALL, payload: data });
      return data.data;
    } catch (error: any) {
      console.log(error.response.data);
      return error.response.data;
    }
  };
};

export const getGenres = (genres: Optional<number[]> = []) => {
  return async (dispatch: Dispatch<genreAction>) => {
    try {
      const { data } = await api.fetchGenres();
      const genreData = data["genres"];

      let result = _getGenres(genres, genreData);

      dispatch({ type: ActionType.FETCH_GENRES, payload: result });

      return result;
    } catch (error: any) {
      console.log(error.response.data);
      return error.response.data;
    }
  };
};
