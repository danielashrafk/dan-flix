import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  PixelRatio,
  Animated,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import * as Font from "expo-font";
import { useDispatch, useSelector } from "react-redux";
// import * as movieActionCreators from "../actions/movieActions";
// import * as imageActionCreators from "../actions/imageActions";
import { bindActionCreators } from "redux";
import { State } from "../reducers";
import { IMovie, MovieState } from "../models";
import { getGenres, getMovies } from "../actions/movieActions";
import { getImages } from "../actions/imageActions";
import { MovieList } from "../components/MovieList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../App";
import MaskedView from "@react-native-masked-view/masked-view";
import Svg, { Rect } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { getUpcomingMovies } from "../actions/upcomingMovieAction";
import { UpcomingMovieList } from "../components/UpcomingMovieList";
import { MovieData } from "../components/MovieData";
import { RotateInUpLeft } from "react-native-reanimated";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheet,
} from "@gorhom/bottom-sheet";
import Modal from "react-native-modal";

import bottomSheetBackground from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackground";

import CustomBackdrop from "../components/CustomBackdrop";
import { UpcomingMovieData } from "../components/UpcomingMovieData";

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

const baseImgUrl = "https://image.tmdb.org/t/p";
const size = "original";

type Props = NativeStackScreenProps<RootStackParams, "HomeScreen">;
export const HomeScreen: React.FC<Props> = ({ route }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [upcomingMoviesDate, setUpcomingMoviesDate] = useState("");
  const dispatch = useDispatch();

  const sheetRef = useRef<BottomSheetModal>(null);

  const [currentMovie, setCurrentMovie] = useState<Optional<IMovie>>();
  const [currentUpcomingMovies, setCurrentUpcomingMovies] =
    useState<Optional<MovieState["movies"]>>();
  const [isUpcomingMoviesModalVisible, setUpcomingMoviesModalVisible] =
    useState(false);
  const movieState = useSelector((state: State) => state.movies);
  const upcomingMovieState = useSelector(
    (state: State) => state.upcomingMovies
  );

  const onMoviePress = () => {
    sheetRef.current?.present();
    // sheetRef.current?.expand();
  };
  const showUpcomingMoviesModal = () => {
    setUpcomingMoviesModalVisible(!isUpcomingMoviesModalVisible);
  };
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  useEffect(() => {
    loadFonts();
    dispatch(getMovies() as any);
    dispatch(getUpcomingMovies() as any);
    // dispatch(getGenres() as any);
    // console.log(upcomingMovieState?.["movies"]?.["results"]);
    // dispatch(getImages("438148") as any);
    // console.log(movieState?.["movies"]?.["results"]);
    // console.log(imageState);
    // console.log(`${baseImgUrl}/${size}/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg`);
  }, [dispatch]);

  const loadFonts = async () => {
    await Font.loadAsync({
      OpenSans: require("../../assets/fonts/OpenSans.ttf"),
    });

    setFontsLoaded(true);
  };

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const handleSheetChanges = useCallback((index: number) => {
    if (index > 0) {
      setReadMore(true);
    } else {
      setReadMore(false);
    }
  }, []);

  // const customBackground = () => {
  //   return (
  //     <BottomSheetBackground
  //       style={{ backgroundColor: "white" }}
  //       animatedIndex={{
  //         value: 0,
  //       }}
  //       animatedPosition={{
  //         value: 0,
  //       }}
  //     />
  //   );
  // };

  return (
    <>
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

        <View style={styles.body}>
          {/* {(movieState?.["movies"]?.["results"] as MovieState["movies"])?.map(
          (item) => (
            <>
              <Text style={{ color: "white" }}>{item.original_title}</Text>
              <Image
                source={{
                  uri: `${baseImgUrl}/${size}/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg`,
                }}
              />
            </>
          )
        )} */}

          <View style={styles.movieList}>
            <MovieList
              movies={
                movieState?.["movies"]?.["results"] as MovieState["movies"]
              }
              setCurrentMovie={setCurrentMovie}
              ref={sheetRef}
              onMoviePress={onMoviePress}
              // reference={route.params.reference}
            />
          </View>

          <View style={styles.upcomingMovieList}>
            <View style={styles.secondTitleWrap}>
              <Text style={styles.secondTitle}>Upcoming Movies</Text>
            </View>

            <View style={styles.upcomingMoviesWrap}>
              <UpcomingMovieList
                movies={
                  upcomingMovieState?.["movies"]?.[
                    "results"
                  ] as MovieState["movies"]
                }
                showUpcomingMoviesModal={showUpcomingMoviesModal}
                setCurrentUpcomingMovies={setCurrentUpcomingMovies}
                setUpcomingMoviesDate={setUpcomingMoviesDate}
              />
            </View>
          </View>
        </View>

        <View style={styles.footer}></View>
      </View>
      <BottomSheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        // enablePanDownToClose={true}
        // style={styles.movieData}
        backgroundComponent={() => <View style={styles.bottomSheet} />}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} opacity={1}>
            <CustomBackdrop
              animatedIndex={props.animatedIndex}
              imageURI={`${baseImgUrl}/${size}/${currentMovie?.poster_path}`}
            />
          </BottomSheetBackdrop>
        )}
        onChange={handleSheetChanges}
      >
        <MovieData movie={currentMovie} readMore={readMore} />
      </BottomSheetModal>

      <Modal
        isVisible={isUpcomingMoviesModalVisible}
        onBackdropPress={() => showUpcomingMoviesModal()}
        backdropOpacity={0.1}
        animationIn="pulse"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <UpcomingMovieData
          movies={currentUpcomingMovies}
          upcomingMoviesDate={upcomingMoviesDate}
        />
      </Modal>
    </>
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
    flex: 12,
    // justifyContent: "center",
    // alignItems: "center",
    // flexDirection: "row",
    // backgroundColor: "#2E2E2E",
    paddingTop: 0 / PixelRatio.get(),
  },

  footer: {
    flex: 0,
  },

  title: {
    fontFamily: "OpenSans",
    color: "#8A8A8A",
    fontSize: 60 / PixelRatio.get(),
    letterSpacing: -1,
  },
  date: {
    fontFamily: "OpenSans",
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
    flex: 7,
  },
  upcomingMovieList: {
    flex: 5,
    paddingTop: 30 / PixelRatio.get(),
    // justifyContent: "center",
    // flexDirection: "row",
    // alignItems: "center",
  },
  secondTitle: {
    fontFamily: "OpenSans",
    color: "#8A8A8A",
    fontSize: 60 / PixelRatio.get(),
    letterSpacing: -2,

    textAlign: "left",
  },
  secondTitleWrap: {
    flex: 1,
    paddingLeft: 100 / PixelRatio.get(),
  },
  upcomingMoviesWrap: {
    flex: 4,
  },
  // movieData: { backgroundColor: "black" },

  bottomSheet: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    backgroundColor: "black",
    opacity: 0.92,
  },
});
