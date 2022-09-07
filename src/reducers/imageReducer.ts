import { ActionType } from "../constants/actionTypes";

import { ImageState } from "../models";

interface FetchAction {
  readonly type: ActionType.FETCH_IMAGES;
  payload: ImageState;
}

const initialState = {
  image: "",
};

export type Action = FetchAction;

export default (images: ImageState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.FETCH_IMAGES:
      //   console.log(action);
      return { ...images, image: action.payload };

    default:
      return images;
  }
};
