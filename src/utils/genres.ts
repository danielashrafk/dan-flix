import { apiGenreState } from "../store/models";
import * as _ from "lodash";

export const _getGenres = (
  genres: Optional<number[]> = [],
  genreData: apiGenreState["genres"]
) => {
  let result: string[] = [];
  for (let i = 0; i < genres?.length; i++) {
    let temp: apiGenreState["genres"];
    temp = _.filter(genreData, { id: genres?.[i] }) as apiGenreState["genres"];
    result.push(temp[0]["name"]);
  }

  return result;
};
