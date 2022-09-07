import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import * as _ from "lodash";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";
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

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const baseImgUrl = "https://image.tmdb.org/t/p";
const ITEM_SIZE = 500 / PixelRatio.get();
const size = "original";
let partitionedArray: Array<Array<IMovie>> = [];

interface Props {
  movies: MovieState["movies"];
  showUpcomingMoviesModal: () => void;
  setCurrentUpcomingMovies: (upcomingMovies: MovieState["movies"]) => void;
  setUpcomingMoviesDate: (upcomingMoviesDate: string) => void;
}
export const UpcomingMovieList: React.FC<Props> = ({
  movies,
  showUpcomingMoviesModal,
  setCurrentUpcomingMovies,
  setUpcomingMoviesDate,
}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const uniqueDates = _.orderBy(
      _.uniq(_.map(movies, "release_date")),
      [],
      ["asc"]
    );

    uniqueDates.map((date) => {
      partitionedArray.push(_.filter(movies, ["release_date", date]));
    });

    loadFonts();
  }, [movies]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [selectedId, setSelectedId] = useState("");

  const getMonth = (date: Date) => {
    const month = date.toString().split("-")[1];

    return months[parseInt(month) - 1];
  };

  const getDay = (date: Date) => {
    let month = date.toString().split("-")[2];
    if (_.isEqual(month.charAt(0), "0")) {
      month = month.charAt(month.length - 1);
    }
    if (
      (month.length > 1 && !_.isEqual(month.charAt(month.length - 2), "1")) ||
      month.length == 1
    ) {
      if (_.isEqual(month.charAt(month.length - 1), "1")) {
        return month + "st";
      } else if (_.isEqual(month.charAt(month.length - 1), "2")) {
        return month + "nd";
      } else if (_.isEqual(month.charAt(month.length - 1), "3")) {
        return month + "rd";
      }
    }
    return month + "th";
  };

  const onPress = (movies: MovieState["movies"]) => {
    // navigation.navigate("MovieScreen", { id });
    showUpcomingMoviesModal();
    setCurrentUpcomingMovies(movies);
    setUpcomingMoviesDate(
      `${getDay(movies[0].release_date)} of ${getMonth(movies[0].release_date)}`
    );
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      OpenSans: require("../../assets/fonts/OpenSans.ttf"),
    });

    setFontsLoaded(true);
  };

  const Item = React.memo(
    ({ item, index }: { item: MovieState["movies"]; index: number }) => {
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
        <TouchableOpacity onPress={() => onPress(item)}>
          <Animated.View
            style={{
              //   backgroundColor: "#eeeeee",
              //   borderRadius: 10,
              //   padding: 20,
              marginVertical: 16 / PixelRatio.get(),
              marginHorizontal: 64 / PixelRatio.get(),
              transform: [{ translateY }],
              opacity,
              borderRadius: 25,
              overflow: "hidden",
              backgroundColor: "#101010",
              width: ITEM_SIZE,
              height: "80%",
              // justifyContent: "center",
            }}
          >
            {/* <Image
            style={styles.moviePoster}
            source={{
              uri: `${baseImgUrl}/${size}/${item[item.length - 1].poster_path}`,
            }}
          /> */}

            {fontsLoaded && (
              <>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "#8A8A8A",
                      alignItems: "flex-start",
                      fontFamily: "OpenSans",
                      marginTop: 50 / PixelRatio.get(),
                      marginLeft: 100 / PixelRatio.get(),
                      fontSize: 70 / PixelRatio.get(),
                    }}
                  >
                    {getDay(item[0].release_date)}
                  </Text>

                  <AntDesign
                    name="right"
                    size={24}
                    color="#454545"
                    style={{
                      alignItems: "flex-end",
                      position: "absolute",
                      right: 0,
                      marginTop: 100 / PixelRatio.get(),
                      marginRight: 50 / PixelRatio.get(),
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: "#454545",
                    textAlign: "left",
                    fontFamily: "OpenSans",
                    marginLeft: 100 / PixelRatio.get(),
                    fontSize: 40 / PixelRatio.get(),
                  }}
                >
                  {getMonth(item[0].release_date)}
                </Text>
              </>
            )}

            <View
              style={{
                marginLeft: 100 / PixelRatio.get(),
                paddingTop: 70 / PixelRatio.get(),
                flexDirection: "row",
              }}
            >
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

  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Animated.FlatList
        contentContainerStyle={styles.movieList}
        data={partitionedArray}
        renderItem={({ item, index }) => <Item item={item} index={index} />}
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
