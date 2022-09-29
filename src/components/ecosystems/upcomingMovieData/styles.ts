import { Dimensions, PixelRatio, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 50 / PixelRatio.get(),
  },

  movieTitle: {
    fontFamily: "OpenSans",
    color: "white",
    letterSpacing: -1,
    fontSize: 50 / PixelRatio.get(),
  },

  itemBody: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 64 / PixelRatio.get(),
    backgroundColor: "#101010",
    alignSelf: "center",
    paddingTop: 50 / PixelRatio.get(),
    borderRadius: 10,
    paddingHorizontal: 20 / PixelRatio.get(),
  },

  itemData: {
    flex: 1,
    justifyContent: "center",
  },

  itemTitle: {
    fontFamily: "OpenSans",
    color: "#707070",
    fontSize: 30 / PixelRatio.get(),
    paddingBottom: 20 / PixelRatio.get(),
  },

  itemImageData: {
    flex: 2,
  },

  itemImage: {
    width: 120 / PixelRatio.get(),
    aspectRatio: 1,
    borderRadius: 100,
    overflow: "hidden",
  },

  modal: {
    width: Dimensions.get("window").width * 0.6,
    height: Dimensions.get("window").height * 0.3,
    backgroundColor: "black",
    opacity: 0.92,
    borderRadius: 10,
  },

  modalTitle: {
    alignItems: "center",
    flex: 1,
  },

  flatList: {
    alignItems: "center",
    flex: 4,
  },
});
