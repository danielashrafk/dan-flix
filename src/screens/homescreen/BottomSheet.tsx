import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useMemo } from "react";
import { View } from "react-native";
import { useSetRecoilState } from "recoil";
import { MovieData } from "../../components/ecosystems/movieData/MovieData";
import CustomBackdrop from "../../components/molecules/CustomBackdrop";
import { readMoreState } from "../../store/atom";
import { IMovie } from "../../store/models";
import styles from "./styles";

type Props = {
  sheetRef: React.RefObject<BottomSheetModalMethods>;
  currentMovie: Optional<IMovie>;
  currentMovieImgURI: string;
};
export const BottomSheet = React.memo(
  ({ sheetRef, currentMovie, currentMovieImgURI }: Props) => {
    const snapPoints = useMemo(() => ["25%", "50%"], []);
    const setReadMore = useSetRecoilState(readMoreState);
    const handleSheetChanges = (index: number) => {
      if (index > 0) {
        setReadMore(true);
      } else {
        setReadMore(false);
      }
    };

    return (
      <>
        <BottomSheetModal
          ref={sheetRef}
          snapPoints={snapPoints}
          backgroundComponent={() => <View style={styles.bottomSheet} />}
          backdropComponent={(props) => (
            <BottomSheetBackdrop {...props} opacity={1}>
              <CustomBackdrop
                animatedIndex={props.animatedIndex}
                imageURI={currentMovieImgURI}
              />
            </BottomSheetBackdrop>
          )}
          onChange={handleSheetChanges}
        >
          <MovieData movie={currentMovie} />
        </BottomSheetModal>
      </>
    );
  }
);
