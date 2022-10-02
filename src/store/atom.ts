import { atom, useSetRecoilState } from "recoil";

export const readMoreState = atom({
  key: "readMore",
  default: false,
});
