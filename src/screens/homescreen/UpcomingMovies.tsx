import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/reducers";
import { MovieState } from "../../store/models";
import { UpcomingMovieList } from "../../components/organisms/upcomingMovieList/UpcomingMovieList";
import { getUpcomingMovies } from "../../store/actions/upcomingMovieAction";

type Props = {
  showUpcomingMoviesModal: () => void;
  setCurrentUpcomingMovies: (movie: Optional<MovieState["movies"]>) => void;
  setUpcomingMoviesDate: (date: string) => void;
};
export const UpcomingMovies = ({
  showUpcomingMoviesModal,
  setCurrentUpcomingMovies,
  setUpcomingMoviesDate,
}: Props) => {
  const dispatch = useDispatch();

  const upcomingMovieState = useSelector(
    (state: State) => state.upcomingMovies
  );

  useEffect(() => {
    dispatch(getUpcomingMovies() as any);
  }, [dispatch]);

  return (
    <>
      <UpcomingMovieList
        movies={
          upcomingMovieState?.["movies"]?.["results"] as MovieState["movies"]
        }
        showUpcomingMoviesModal={showUpcomingMoviesModal}
        setCurrentUpcomingMovies={setCurrentUpcomingMovies}
        setUpcomingMoviesDate={setUpcomingMoviesDate}
      />
    </>
  );
};
