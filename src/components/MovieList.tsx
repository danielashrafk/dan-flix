import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  PixelRatio,
  FlatList,
  Animated,
  TouchableOpacity,
  TouchableHighlightBase,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackComponent,
} from "react-native";
import { IMovie, MovieState } from "../models";
import { RootStackParams } from "../../App";
import { MovieData } from "./MovieData";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const baseImgUrl = "https://image.tmdb.org/t/p";
const ITEM_SIZE = 500 / PixelRatio.get();
const size = "original";

interface Props {
  movies: MovieState["movies"];
  setCurrentMovie: (currentMovie: IMovie) => void;
  onMoviePress: () => void;
  // reference: any;
}

export const MovieList = React.memo(
  React.forwardRef<BottomSheetModal, Props>(
    ({ movies, setCurrentMovie, onMoviePress }, ref) => {
      // const navigation =
      //   useNavigation<NativeStackNavigationProp<RootStackParams>>();
      const [selectedId, setSelectedId] = useState("");

      const onPress = (item: IMovie) => {
        // navigation.navigate("MovieScreen", { id });
        setCurrentMovie(item);
        onMoviePress();
      };

      const Item = React.memo(
        ({ item, index }: { item: IMovie; index: number }) => {
          const inputRange = [
            (index - 1) * (ITEM_SIZE + 128 / PixelRatio.get()),
            index * (ITEM_SIZE + 128 / PixelRatio.get()),
            (index + 1) * (ITEM_SIZE + 128 / PixelRatio.get()),
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50 / PixelRatio.get(), 0],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              style={{
                //   backgroundColor: "#eeeeee",
                //   borderRadius: 10,
                //   padding: 20,
                marginVertical: 16 / PixelRatio.get(),
                marginHorizontal: 64 / PixelRatio.get(),
                transform: [{ translateY }],
                opacity,
              }}
            >
              <TouchableOpacity onPress={() => onPress(item)}>
                <Image
                  style={styles.moviePoster}
                  source={{
                    uri: `${baseImgUrl}/${size}/${item.poster_path}`,
                  }}
                />
              </TouchableOpacity>
            </Animated.View>
          );
        }
      );

      const scrollX = React.useRef(new Animated.Value(0)).current;
      return (
        <View style={styles.container}>
          <Animated.FlatList
            contentContainerStyle={styles.movieList}
            data={movies}
            renderItem={({ item, index }) => <Item item={item} index={index} />}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            horizontal
            decelerationRate={0}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            initialNumToRender={2}
          />

          {/* <MovieData movie={currentMovie} setShowMovie={setShowMovie} ref={ref} /> */}
        </View>
      );
    }
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  moviePoster: {
    width: ITEM_SIZE,
    height: "100%",
    borderRadius: 25,
    overflow: "hidden",
  },
  movieList: {
    paddingLeft: 100 / PixelRatio.get(),
    paddingRight: 100 / PixelRatio.get(),
    paddingTop: 50 / PixelRatio.get(),
  },
  movie: {},
});
