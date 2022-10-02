import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/reducers";
import { IMovie, MovieState } from "../../store/models";
import { getMovies } from "../../store/actions/movieActions";
import { MovieList } from "../../components/organisms/movieList/MovieList";

type Props = {
  onMoviePress: () => void;
  setCurrentMovie: (movie: Optional<IMovie>) => void;
};
export const MoviesList = ({ onMoviePress, setCurrentMovie }: Props) => {
  const dispatch = useDispatch();

  const movieState = useSelector((state: State) => state.movies);

  useEffect(() => {
    dispatch(getMovies() as any);
  }, [dispatch]);

  return (
    <>
      <MovieList
        movies={movieState?.["movies"]?.["results"] as MovieState["movies"]}
        setCurrentMovie={setCurrentMovie}
        onMoviePress={onMoviePress}
      />
    </>
  );
};
