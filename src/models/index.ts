export interface IMovie {
  id: string;
  title: string;
  poster_path: string;
  release_date: Date;
  backdrop_path: string;
  genre_ids: Array<number>;
  overview: string;
  // description: string,
  // overview: string,
  // poster_path: string
}

// export type MovieState = {
//   movie: IMovie[];
// };

export type MovieState = { movies: IMovie[] };

export type ImageState = {
  image: String;
};

export type genreState = {
  genres: string[];
};
