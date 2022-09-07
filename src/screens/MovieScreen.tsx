import React, { useState, useEffect, Dispatch } from "react";
import { View, Text, StyleSheet, Image, PixelRatio } from "react-native";
import * as Font from "expo-font";
import { useDispatch, useSelector } from "react-redux";
// import * as movieActionCreators from "../actions/movieActions";
// import * as imageActionCreators from "../actions/imageActions";
import { bindActionCreators } from "redux";
import { State } from "../reducers";
import { IMovie, MovieState } from "../models";
import { getMovies } from "../actions/movieActions";
import { getImages } from "../actions/imageActions";
import { MovieList } from "../components/MovieList";
import { ThunkActionDispatch } from "redux-thunk";
import { Action } from "../reducers/imageReducer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../App";

const getCurrentDate = () => {
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

  var date = new Date().getDate();
  var month = new Date().getMonth();

  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
  return "Today, " + date + " " + months[month]; //format: dd-mm-yyyy;
};

// interface ItemProps {
//   item: IMovie;

//   onPress: () => void;

//   backgroundColor: String;

//   textColor: String;
// }

type Props = NativeStackScreenProps<RootStackParams, "MovieScreen">;

export const MovieScreen: React.FC<Props> = ({ route }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const dispatch = useDispatch();

  //   const { getMovies } = bindActionCreators(movieActionCreators, dispatch);

  //   const { getImages } = bindActionCreators(imageActionCreators, dispatch);

  const movieState = useSelector((state: State) => state.movies);

  const imageState = useSelector((state: State) => state.images);

  console.log(route.params.id);

  useEffect(() => {
    loadFonts();
    dispatch(getMovies() as any);
    // dispatch(getImages("438148") as any);
    // console.log(movieState?.["movies"]?.["results"]?.[2]);
    // console.log(imageState);
    // console.log(`${baseImgUrl}/${size}/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg`);
  }, [dispatch]);

  const loadFonts = async () => {
    await Font.loadAsync({
      "edu-beginner": require("../../assets/fonts/EduBeginner.ttf"),
    });
    setFontsLoaded(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View style={styles.textArea}>
          {fontsLoaded && (
            <>
              <Text style={styles.title}> Hey Daniel</Text>
              <Text style={styles.date}> {`${getCurrentDate()}`}</Text>
            </>
          )}
        </View>
        <View style={styles.profile}>
          <Image
            style={styles.image}
            source={{ uri: "https://picsum.photos/seed/picsum/200/300" }}
          />
        </View>
      </View>

      <View style={styles.body}></View>

      <View style={styles.movies}></View>

      <View style={styles.footer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  navigation: {
    flex: 3,
    // textAlign: "left",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  textArea: {
    paddingLeft: 100 / PixelRatio.get(),
    paddingTop: 100 / PixelRatio.get(),
  },

  body: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#2E2E2E",
    paddingTop: 200 / PixelRatio.get(),
  },

  movies: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#E6E6FA",
  },

  footer: {
    flex: 1,
  },

  title: {
    fontFamily: "edu-beginner",
    color: "#8A8A8A",
    fontSize: 70 / PixelRatio.get(),
  },
  date: {
    fontFamily: "edu-beginner",
    color: "#454545",
    fontSize: 40 / PixelRatio.get(),
    paddingTop: 20 / PixelRatio.get(),
  },
  profile: {
    alignItems: "flex-end",
    paddingRight: 100 / PixelRatio.get(),
    paddingTop: 100 / PixelRatio.get(),
  },
  image: {
    width: 150 / PixelRatio.get(),
    height: 150 / PixelRatio.get(),
    borderRadius: 150 / PixelRatio.get() / 2,
    overflow: "hidden",
    borderWidth: 3,
    // borderColor: "red",
  },
  movieList: {
    flex: 1,
  },
});
