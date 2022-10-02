export interface IMovie {
  id: string;
  title: string;
  poster_path: string;
  release_date: Date;
  backdrop_path: string;
  genre_ids: Array<number>;
  overview: string;
}

export interface IGenre {
  name: string;
}

export type MovieState = { movies: IMovie[] };

export type genreState = {
  genres: string[];
};

export type apiGenreState = {
  genres: IGenre[];
};
