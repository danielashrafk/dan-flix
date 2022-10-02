import { PixelRatio, StyleSheet } from "react-native";

const ITEM_SIZE = 500 / PixelRatio.get();

export default StyleSheet.create({
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
  itemDay: {
    color: "#8A8A8A",
    alignItems: "flex-start",
    // fontFamily: "Arial",
    marginTop: 50 / PixelRatio.get(),
    marginLeft: 100 / PixelRatio.get(),
    fontSize: 70 / PixelRatio.get(),
  },
  itemMonth: {
    color: "#454545",
    textAlign: "left",
    // fontFamily: "Arial",
    marginLeft: 100 / PixelRatio.get(),
    fontSize: 40 / PixelRatio.get(),
  },

  arrowIcon: {
    alignItems: "flex-end",
    position: "absolute",
    right: 0,
    marginTop: 100 / PixelRatio.get(),
    marginRight: 50 / PixelRatio.get(),
  },
  movieIcons: {
    marginLeft: 100 / PixelRatio.get(),
    paddingTop: 70 / PixelRatio.get(),
    flexDirection: "row",
  },
});
