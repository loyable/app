import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const SCREEN_WIDTH = width;

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#e5e5e5",
    padding: 12,
    borderRadius: 10,
    marginTop: 10
  },
  basicContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  modalContainer: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    padding: 0
  },
  buttonView: {
    width: SCREEN_WIDTH,
    padding: 8,
    borderTopWidth: 0.5,
    borderTopColor: "lightgrey",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  bottomPicker: {
    width: SCREEN_WIDTH
  },
  flag: {
    height: 20,
    width: 30,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "#cecece",
    backgroundColor: "#cecece"
  },
  text: {
    height: 30,
    padding: 0,
    fontSize: 36,
    color: "#525252",
    fontFamily: "CircularStd-Book",
    justifyContent: "center"
  }
});