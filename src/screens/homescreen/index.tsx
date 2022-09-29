import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { View, Text, StyleSheet, Image, PixelRatio } from "react-native";
import * as Font from "expo-font";
import { useDispatch } from "react-redux";
import { IMovie, MovieState } from "../../store/models";
import { MoviesList } from "./MoviesList";
import { UpcomingMovies } from "./UpcomingMovies";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation";
import { getUpcomingMovies } from "../../store/actions/upcomingMovieAction";
import { MovieData } from "../../components/ecosystems/movieData/MovieData";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import Modal from "react-native-modal";
import { getCurrentDate } from "../../utils/dates";
import CustomBackdrop from "../../components/molecules/CustomBackdrop";
import { UpcomingMovieData } from "../../components/ecosystems/upcomingMovieData/UpcomingMovieData";
import { baseImgUrl } from "../../utils/constants";

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

  const onMoviePress = () => {
    sheetRef.current?.present();
  };
  const showUpcomingMoviesModal = () => {
    setUpcomingMoviesModalVisible(!isUpcomingMoviesModalVisible);
  };
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  useEffect(() => {
    loadFonts();

    dispatch(getUpcomingMovies() as any);
  }, [dispatch]);

  const loadFonts = async () => {
    await Font.loadAsync({
      OpenSans: require("../../../assets/fonts/OpenSans.ttf"),
    });

    setFontsLoaded(true);
  };

  const handleSheetChanges = useCallback((index: number) => {
    if (index > 0) {
      setReadMore(true);
    } else {
      setReadMore(false);
    }
  }, []);

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
          <View style={styles.movieList}>
            <MoviesList
              setCurrentMovie={setCurrentMovie}
              onMoviePress={onMoviePress}
            />
          </View>

          <View style={styles.upcomingMovieList}>
            <View style={styles.secondTitleWrap}>
              <Text style={styles.secondTitle}>Upcoming Movies</Text>
            </View>

            <View style={styles.upcomingMoviesWrap}>
              <UpcomingMovies
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
        onBackdropPress={showUpcomingMoviesModal}
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
  },
  movieList: {
    flex: 7,
  },
  upcomingMovieList: {
    flex: 5,
    paddingTop: 30 / PixelRatio.get(),
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

  bottomSheet: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    backgroundColor: "black",
    opacity: 0.92,
  },
});
