import { Dispatch } from "redux";
import { AxiosError } from "axios";
import * as api from "../api";
import { ActionType } from "../constants/actionTypes";
import { Action } from "../reducers/imageReducer";

export const getImages =
  (poster_path: String) => async (dispatch: Dispatch<Action>) => {
    try {
      // const { data } = await api.fetchImages(poster_path);
      // //   console.log(data.data);
      // dispatch({ type: ActionType.FETCH_IMAGES, payload: data });

      return "";
    } catch (error: any) {
      console.log(error.response.data);
      //   console.log(error);
      return error.response.data;
    }
  };
