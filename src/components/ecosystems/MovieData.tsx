import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, PixelRatio } from "react-native";
import type { IMovie } from "../../store/models";
import * as Font from "expo-font";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../store/actions/movieActions";
import type { State } from "../../store/reducers";

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
        OpenSans: require("../../../assets/fonts/OpenSans.ttf"),
      });

      setFontsLoaded(true);
    };

    return (
      <View style={styles.container}>
        <View style={styles.titleArea}>
          <Text style={styles.movieTitle}>{movie?.title}</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10 / PixelRatio.get(),
            }}
          >
            {genreState?.genres?.map((genre) => (
              <View
                key={genre}
                style={{
                  backgroundColor: "#202020",
                  alignSelf: "flex-start",
                  borderRadius: 10,
                  paddingLeft: 20 / PixelRatio.get(),
                  paddingRight: 20 / PixelRatio.get(),
                  marginTop: 20 / PixelRatio.get(),
                  marginRight: 20 / PixelRatio.get(),
                  paddingVertical: 5 / PixelRatio.get(),
                }}
              >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 100 / PixelRatio.get(),
    paddingRight: 100 / PixelRatio.get(),
  },

  titleArea: {},

  movieTitle: {
    fontFamily: "OpenSans",
    color: "white",
    letterSpacing: -1,
    fontSize: 50 / PixelRatio.get(),
  },

  genre: {
    fontFamily: "OpenSans",
    color: "#707070",
    letterSpacing: 0,
    fontSize: 30 / PixelRatio.get(),
  },
  overview: {
    marginTop: 100 / PixelRatio.get(),
  },
  overviewBody: {
    fontFamily: "OpenSans",
    color: "#707070",
    marginTop: 20 / PixelRatio.get(),
  },
});
