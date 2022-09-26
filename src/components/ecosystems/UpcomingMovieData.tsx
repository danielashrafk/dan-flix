import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  PixelRatio,
  Dimensions,
  Animated,
} from "react-native";
import type { IMovie, MovieState } from "../../store/models";
import * as Font from "expo-font";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { baseImgUrl } from "../../utils/constants";

const size = "original";

type Props = {
  movies?: MovieState["movies"];
  upcomingMoviesDate: string;
};

export const UpcomingMovieData = React.memo(
  React.forwardRef<BottomSheetModal, Props>(
    ({ movies, upcomingMoviesDate }) => {
      useEffect(() => {
        loadFonts();
      }, []);

      const [fontsLoaded, setFontsLoaded] = useState(false);

      const loadFonts = async () => {
        await Font.loadAsync({
          OpenSans: require("../../../assets/fonts/OpenSans.ttf"),
        });

        setFontsLoaded(true);
      };

      const Item = React.memo(({ item }: { item: IMovie; index: number }) => (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 64 / PixelRatio.get(),
            backgroundColor: "#101010",
            alignSelf: "center",
            paddingTop: 50 / PixelRatio.get(),
            borderRadius: 10,
            paddingHorizontal: 20 / PixelRatio.get(),
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans",
                color: "#707070",
                fontSize: 30 / PixelRatio.get(),
                paddingBottom: 20 / PixelRatio.get(),
              }}
            >
              {item.title}
            </Text>
          </View>
          <View style={{ flex: 2 }}>
            <Image
              style={{
                width: 120 / PixelRatio.get(),
                aspectRatio: 1,
                borderRadius: 100,
                overflow: "hidden",
              }}
              source={{
                uri: `${baseImgUrl}/${size}/${item.poster_path}`,
              }}
            />
          </View>
        </View>
      ));
      const scrollX = React.useRef(new Animated.Value(0)).current;
      return (
        <View
          style={{
            width: Dimensions.get("window").width * 0.6,
            height: Dimensions.get("window").height * 0.3,
            backgroundColor: "black",
            opacity: 0.92,
            borderRadius: 10,
          }}
        >
          <View style={styles.container}>
            <View style={{ alignItems: "center", flex: 1 }}>
              <Text style={styles.movieTitle}>{`${upcomingMoviesDate}`}</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                flex: 4,
              }}
            >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50 / PixelRatio.get(),
  },

  movieTitle: {
    fontFamily: "OpenSans",
    color: "white",
    letterSpacing: -1,
    fontSize: 50 / PixelRatio.get(),
  },
});
