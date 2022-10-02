import React, { useMemo } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Image, StyleSheet } from "react-native";

const BackDropImage = React.memo(({ imageURI }: { imageURI: string }) => {
  return (
    <Image
      style={styles.backdropImage}
      source={{
        uri: imageURI,
      }}
    />
  );
});

const CustomBackdrop = React.memo(
  ({ animatedIndex, imageURI }: { animatedIndex: any; imageURI: string }) => {
    // animated variables
    const containerAnimatedStyle = useAnimatedStyle(() => ({
      opacity: interpolate(
        animatedIndex.value,
        [0, 1],
        [0, 1],
        Extrapolate.CLAMP
      ),
    }));

    // styles
    const containerStyle = useMemo(
      () => [
        {
          backgroundColor: "rgba(52, 52, 52, 0.8)",
        },
        containerAnimatedStyle,
      ],
      [containerAnimatedStyle]
    );

    return (
      <Animated.View style={containerStyle}>
        <BackDropImage imageURI={imageURI} />
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  backdropImage: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
    overflow: "hidden",
  },
});

export default CustomBackdrop;
