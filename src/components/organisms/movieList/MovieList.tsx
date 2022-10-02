import React, { useCallback, useState } from "react";
import {
  View,
  Image,
  PixelRatio,
  Animated,
  TouchableOpacity,
} from "react-native";
import { IMovie, MovieState } from "../../../store/models";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { baseImgUrl } from "../../../utils/constants";
import styles from "./styles";

const ITEM_SIZE = 500 / PixelRatio.get();
const size = "original";

interface Props {
  movies: MovieState["movies"];
  setCurrentMovie: (currentMovie: IMovie) => void;
  onMoviePress: () => void;
}

const SingleItem = ({
  item,
  index,
  onPress,
  scrollX,
}: {
  item: IMovie;
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
    <Animated.View
      style={{
        marginVertical: 16 / PixelRatio.get(),
        marginHorizontal: 64 / PixelRatio.get(),
        transform: [{ translateY }],
        opacity,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.moviePoster}
          source={{
            uri: `${baseImgUrl}/${size}/${item.poster_path}`,
          }}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export const MovieList = React.memo(
  React.forwardRef<BottomSheetModal, Props>(
    ({ movies, setCurrentMovie, onMoviePress }, ref) => {
      const [selectedId, setSelectedId] = useState("");

      const onPress = (item: IMovie) => () => {
        setCurrentMovie(item);
        onMoviePress();
      };

      const scrollX = React.useRef(new Animated.Value(0)).current;

      const _renderItem = useCallback(
        ({ item, index }: { item: IMovie; index: number }) => (
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
            data={movies}
            renderItem={_renderItem}
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
        </View>
      );
    }
  )
);
