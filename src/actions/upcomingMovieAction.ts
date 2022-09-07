import { Dispatch } from "redux";
import { AxiosError } from "axios";
import * as api from "../api";
import { ActionType } from "../constants/actionTypes";
import { Action } from "../reducers/movieReducer";
import { MovieState } from "../models";

export const getUpcomingMovies = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await api.fetchUpcomingMovies();
      dispatch({ type: ActionType.FETCH_UPCOMING, payload: data });
      return data.data;
    } catch (error: any) {
      console.log(error.response.data);
      // console.log(error);
      return error.response.data;
    }
  };
};
