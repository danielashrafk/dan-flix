import { PixelRatio, StyleSheet } from "react-native";

export default StyleSheet.create({
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
    fontFamily: "Arial",
    color: "#8A8A8A",
    fontSize: 60 / PixelRatio.get(),
    letterSpacing: -1,
  },
  date: {
    fontFamily: "Arial",
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
    fontFamily: "Arial",
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
