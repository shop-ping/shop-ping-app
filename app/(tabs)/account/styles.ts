import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  containerL: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionL: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    width: "100%",
    minHeight: 200,
    paddingTop: 20,
    marginBottom: 30,
  },
  wrapSubL: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageL: {
    height: "70%",
    marginTop: 0,
    resizeMode: "contain",
  },
  titleL: {
    fontSize: 24,
    fontWeight: "bold",
    width: "80%",
    textAlign: "center",
    marginBottom: 20,
  },
  inputL: {
    width: "80%",
    minHeight: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 8,
    borderRadius: 3,
    fontSize: 15,
  },
  inputTitleL: {
    width: "80%",
    color: "#606060",
    fontSize: 15,
  },
  buttonL: {
    width: "80%",
    marginTop: 15,
    borderRadius: 3,
    height: 40,
    fontSize: 15,
  },
  linkL: {
    width: "80%",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 10,
  },
  inputErrorL: {
    borderColor: "red",
  },
  sectionA: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    height: 100,
    width: "100%",
    paddingTop: 20,
  },
  profileImg: {
    marginTop: -50,
  },
  headerA: {
    fontSize: 16,
    fontWeight: "500",
    width: "80%",
    paddingTop: 20,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  tab: {
    paddingVertical: 10,
    flex: 1,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  selectedTab: {
    borderBottomColor: "#8dbf36",
  },
  tabText: {
    fontSize: 16,
    color: "#000",
  },

  slider: {
    width: "80%",
    backgroundColor: "#8dbf36",
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 10,
  },
  wrapDND: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignContent: "center",
    width: "80%",
  },
  inputTitleDND: {
    color: "#606060",
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 15,
  },

  membershipSlider: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 30,
  },
  membershipContentContainer: {
    paddingRight: 30,
    alignItems: "center",
  },
  card: {
    width: 280,
    height: 250,
    marginHorizontal: 10,
    borderWidth: 2,
    backgroundColor: "#a7d25e",
    borderColor: "#8dbf36",
    borderRadius: 2,
    alignItems: "center",
  },
  featureHeader: {
    width: "100%",
    padding: 20,
    backgroundColor: "#8dbf36",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#8dbf36",
    textAlign: "center",
  },
  cardPrice: {
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
  },
  featureList: {
    marginTop: 20,
    alignItems: "flex-start",
    width: "100%",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    color: "#fff",
    textAlign: "left",
    paddingHorizontal: 30,
  },
  checkmark: {
    color: "#fff",
    marginHorizontal: 10,
  },
  featureText: {
    color: "#fff",
    marginLeft: 10,
  },
});
