import React, { useEffect, useState } from "react";
import { View, Text, Image, Animated } from "react-native";
import type { IMovie, MovieState } from "../../../store/models";
import * as Font from "expo-font";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { baseImgUrl } from "../../../utils/constants";
import styles from "./styles";

const size = "original";

type Props = {
  movies?: MovieState["movies"];
  upcomingMoviesDate: string;
};

export const UpcomingMovieData = React.memo(
  React.forwardRef<BottomSheetModal, Props>(
    ({ movies, upcomingMoviesDate }, ref) => {
      useEffect(() => {
        loadFonts();
      }, []);

      const [fontsLoaded, setFontsLoaded] = useState(false);

      const loadFonts = async () => {
        await Font.loadAsync({
          OpenSans: require("../../../../assets/fonts/OpenSans.ttf"),
        });

        setFontsLoaded(true);
      };

      const Item = React.memo(({ item }: { item: IMovie; index: number }) => (
        <View style={styles.itemBody}>
          <View style={styles.itemData}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
          <View style={styles.itemImageData}>
            <Image
              style={styles.itemImage}
              source={{
                uri: `${baseImgUrl}/${size}/${item.poster_path}`,
              }}
            />
          </View>
        </View>
      ));
      const scrollX = React.useRef(new Animated.Value(0)).current;
      return (
        <View style={styles.modal}>
          <View style={styles.container}>
            <View style={styles.modalTitle}>
              <Text style={styles.movieTitle}>{`${upcomingMoviesDate}`}</Text>
            </View>
            <View style={styles.flatList}>
              <Animated.FlatList
                contentContainerStyle={{
                  alignItems: "center",
                }}
                data={movies}
                renderItem={({ item, index }) => (
                  <Item item={item} index={index} />
                )}
                keyExtractor={(item) => item.id}
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
          </View>
        </View>
      );
    }
  )
);
