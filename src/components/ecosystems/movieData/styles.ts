import { PixelRatio, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 100 / PixelRatio.get(),
    paddingRight: 100 / PixelRatio.get(),
  },

  titleArea: {},

  movieTitle: {
    fontFamily: "Arial",
    color: "white",
    letterSpacing: -1,
    fontSize: 50 / PixelRatio.get(),
  },

  genre: {
    fontFamily: "Arial",
    color: "#707070",
    letterSpacing: 0,
    fontSize: 30 / PixelRatio.get(),
  },
  overview: {
    marginTop: 100 / PixelRatio.get(),
  },
  overviewBody: {
    fontFamily: "Arial",
    color: "#707070",
    marginTop: 20 / PixelRatio.get(),
  },

  genresDisplay: {
    flexDirection: "row",
    marginTop: 10 / PixelRatio.get(),
  },

  genresView: {
    backgroundColor: "#202020",
    alignSelf: "flex-start",
    borderRadius: 10,
    paddingLeft: 20 / PixelRatio.get(),
    paddingRight: 20 / PixelRatio.get(),
    marginTop: 20 / PixelRatio.get(),
    marginRight: 20 / PixelRatio.get(),
    paddingVertical: 5 / PixelRatio.get(),
  },
});
