import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import type { IMovie } from "../../../store/models";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../../store/actions/movieActions";
import type { State } from "../../../store/reducers";
import styles from "./styles";
import { useRecoilValue } from "recoil";
import { readMoreState } from "../../../store/atom";

type Props = {
  movie?: IMovie;
};

export const MovieData = React.memo(
  React.forwardRef<BottomSheetModal, Props>(({ movie }, ref) => {
    const dispatch = useDispatch();

    const genreState = useSelector((state: State) => state.genres);
    useEffect(() => {
      dispatch(getGenres(movie?.genre_ids) as any);
    }, [dispatch]);

    return (
      <View style={styles.container}>
        <View style={styles.titleArea}>
          <Text style={styles.movieTitle}>{movie?.title}</Text>
          <View style={styles.genresDisplay}>
            {genreState?.genres?.map((genre) => (
              <View key={genre} style={styles.genresView}>
                <Text style={styles.genre}>{genre}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.overview}>
          <Text style={styles.movieTitle}>Overview</Text>
          <Text
            style={styles.overviewBody}
            numberOfLines={!useRecoilValue(readMoreState) ? 2 : undefined}
          >
            {movie?.overview}
          </Text>
        </View>
      </View>
    );
  })
);
