import { Dispatch } from "redux";
import * as api from "../../services/api";
import { ActionType } from "../../utils/constants";
import { Action } from "../reducers/movieReducer";

export const getUpcomingMovies = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await api.fetchUpcomingMovies();
      dispatch({ type: ActionType.FETCH_UPCOMING, payload: data });
      return data.data;
    } catch (error: any) {
      console.log(error.response.data);
      return error.response.data;
    }
  };
};
