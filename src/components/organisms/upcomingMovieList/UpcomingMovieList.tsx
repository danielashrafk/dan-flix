import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  PixelRatio,
  Animated,
  TouchableOpacity,
} from "react-native";
import { IMovie, MovieState } from "../../../store/models";
import { baseImgUrl } from "../../../utils/constants";
import { getDay, getMonth, partitionDates } from "../../../utils/dates";
import styles from "./styles";

const ITEM_SIZE = 500 / PixelRatio.get();
const size = "original";
let partitionedDates: Array<Array<IMovie>> = [];

interface Props {
  movies: MovieState["movies"];
  showUpcomingMoviesModal: () => void;
  setCurrentUpcomingMovies: (upcomingMovies: MovieState["movies"]) => void;
  setUpcomingMoviesDate: (upcomingMoviesDate: string) => void;
}

const SingleItem = React.memo(
  ({
    item,
    index,
    onPress,
    scrollX,
  }: {
    item: MovieState["movies"];
    index: number;
    onPress: () => void;
    scrollX: Animated.Value;
  }) => {
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
      <TouchableOpacity onPress={onPress}>
        <Animated.View
          style={{
            marginVertical: 16 / PixelRatio.get(),
            marginHorizontal: 64 / PixelRatio.get(),
            transform: [{ translateY }],
            opacity,
            borderRadius: 25,
            overflow: "hidden",
            backgroundColor: "#101010",
            width: ITEM_SIZE,
            height: "80%",
          }}
        >
          <>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.itemDay}>{getDay(item[0].release_date)}</Text>

              <AntDesign
                name="right"
                size={24}
                color="#454545"
                style={styles.arrowIcon}
              />
            </View>
            <Text style={styles.itemMonth}>
              {getMonth(item[0].release_date)}
            </Text>
          </>

          <View style={styles.movieIcons}>
            {item.map((item, index) => (
              <Image
                key={index}
                style={{
                  width: 90 / PixelRatio.get(),
                  aspectRatio: 1,
                  borderRadius: 100,
                  overflow: "hidden",
                  marginLeft: index === 0 ? 0 : 20 / PixelRatio.get(),
                }}
                source={{
                  uri: `${baseImgUrl}/${size}/${item.poster_path}`,
                }}
              />
            ))}
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }
);
export const UpcomingMovieList: React.FC<Props> = ({
  movies,
  showUpcomingMoviesModal,
  setCurrentUpcomingMovies,
  setUpcomingMoviesDate,
}) => {
  useEffect(() => {
    partitionedDates = partitionDates(movies);
  }, [movies]);

  const [selectedId, setSelectedId] = useState("");

  const onPress = (movies: MovieState["movies"]) => () => {
    showUpcomingMoviesModal();
    setCurrentUpcomingMovies(movies);
    setUpcomingMoviesDate(
      `${getDay(movies[0].release_date)} of ${getMonth(movies[0].release_date)}`
    );
  };

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const _renderItem = useCallback(
    ({ item, index }: { item: MovieState["movies"]; index: number }) => (
      <SingleItem
        item={item}
        index={index}
        onPress={onPress(item)}
        scrollX={scrollX}
      />
    ),
    [onPress, scrollX]
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        contentContainerStyle={styles.movieList}
        data={partitionedDates}
        renderItem={_renderItem}
        // keyExtractor={(item) => item[item.length - 1].id}
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
    </View>
  );
};
