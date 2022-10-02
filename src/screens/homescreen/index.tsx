import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image } from "react-native";
import { useDispatch } from "react-redux";
import { IMovie, MovieState } from "../../store/models";
import { MoviesList } from "./MoviesList";
import { UpcomingMovies } from "./UpcomingMovies";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation";
import { getUpcomingMovies } from "../../store/actions/upcomingMovieAction";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Modal from "react-native-modal";
import { getCurrentDate } from "../../utils/dates";
import { UpcomingMovieData } from "../../components/ecosystems/upcomingMovieData/UpcomingMovieData";
import { baseImgUrl } from "../../utils/constants";
import styles from "./styles";
import { BottomSheet } from "./BottomSheet";
const size = "original";

type Props = NativeStackScreenProps<RootStackParams, "HomeScreen">;
export const HomeScreen: React.FC<Props> = React.memo(({ route }) => {
  const [upcomingMoviesDate, setUpcomingMoviesDate] = useState("");
  const dispatch = useDispatch();

  const sheetRef = useRef<BottomSheetModal>(null);

  const [currentMovie, setCurrentMovie] = useState<Optional<IMovie>>();
  const [currentUpcomingMovies, setCurrentUpcomingMovies] =
    useState<Optional<MovieState["movies"]>>();
  const [isUpcomingMoviesModalVisible, setUpcomingMoviesModalVisible] =
    useState(false);
  const currentMovieImgURI = `${baseImgUrl}/${size}/${currentMovie?.poster_path}`;
  const onMoviePress = () => {
    sheetRef.current?.present();
  };
  const showUpcomingMoviesModal = () => {
    setUpcomingMoviesModalVisible(!isUpcomingMoviesModalVisible);
  };

  useEffect(() => {
    dispatch(getUpcomingMovies() as any);
  }, [dispatch]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.navigation}>
          <View style={styles.textArea}>
            <>
              <Text style={styles.title}> Hey Daniel</Text>
              <Text style={styles.date}> {`${getCurrentDate()}`}</Text>
            </>
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

      <BottomSheet
        sheetRef={sheetRef}
        currentMovie={currentMovie}
        currentMovieImgURI={currentMovieImgURI}
      />

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
});
