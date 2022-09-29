import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import type { IMovie } from "../../../store/models";
import * as Font from "expo-font";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../../store/actions/movieActions";
import type { State } from "../../../store/reducers";
import styles from "./styles";

type Props = {
  movie?: IMovie;
  readMore: boolean;
};

export const MovieData = React.memo(
  React.forwardRef<BottomSheetModal, Props>(({ movie, readMore }, ref) => {
    const dispatch = useDispatch();

    const genreState = useSelector((state: State) => state.genres);
    useEffect(() => {
      dispatch(getGenres(movie?.genre_ids) as any);
      loadFonts();
    }, []);

    const [fontsLoaded, setFontsLoaded] = useState(false);

    const loadFonts = async () => {
      await Font.loadAsync({
        OpenSans: require("../../../../assets/fonts/OpenSans.ttf"),
      });

      setFontsLoaded(true);
    };

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
            numberOfLines={!readMore ? 2 : undefined}
          >
            {movie?.overview}
          </Text>
        </View>
      </View>
    );
  })
);
