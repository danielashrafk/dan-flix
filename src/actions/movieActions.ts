import { Dispatch } from "redux";
import { AxiosError } from "axios";
import * as api from "../api";
import { ActionType } from "../constants/actionTypes";
import { Action } from "../reducers/movieReducer";
import { genreAction } from "../reducers/genreReducer";
import { MovieState } from "../models";
import * as _ from "lodash";

export const getMovies = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await api.fetchMovies();
      dispatch({ type: ActionType.FETCH_ALL, payload: data });
      return data.data;
    } catch (error: any) {
      console.log(error.response.data);
      // console.log(error);
      return error.response.data;
    }
  };
};

export const getGenres = (genres: Optional<number[]> = []) => {
  return async (dispatch: Dispatch<genreAction>) => {
    try {
      const { data } = await api.fetchGenres();
      const genreData = data["genres"];
      // console.log(genreData);
      let result: any[] = [];
      for (let i = 0; i < genres?.length; i++) {
        let temp = _.filter(genreData, { id: genres?.[i] });
        result.push(temp[0]["name"]);
      }

      dispatch({ type: ActionType.FETCH_GENRES, payload: result });
      // console.log(data);
      return result;
    } catch (error: any) {
      console.log(error.response.data);
      // console.log(error);
      return error.response.data;
    }
  };
};
