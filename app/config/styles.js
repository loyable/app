export default (vars = {
  font: {
    regular: "CircularStd-Book",
    bold: "CircularStd-Bold"
  },
  color: {
    background: "#fff",
    primary: "#6812FF",
    secondary: "#77E81F",
    title: "#3C3C3C",
    subtitle: "#696969",
    description: "#8E8E8E",
    inputBorder: "#E5E5E5",
    activeTab: "#0070F5",
    inactiveTab: "#8E8E93",
    sidebarItem: "#696969",
    sidebarContainer: "#fff",
    searchInputText: "#7b7b7b",
    searchInputBackground: "#f4f4f4",
    switchInactiveBackground: "#f4f4f4",
    switchInactiveIcon: "#9a9a9a",
    switchActiveBackground: "#0070f5",
    switchActiveIcon: "#fff",
    noCardsText: "#696969",
    cardBackground: "#000",
    cardTitle: "#000",
    cardAddress: "#696969",
    cardFooter: "#fff",
    cardText: "#fff",
    cardBoxBackgroundColor: "#fff",
    activityIndicator: "#000"
  },
  fontSize: {
    title: 30,
    subtitle: 22,
    description: 18,
    button: 24,
    sidebarItem: 20,
    searchInput: 18,
    noCardsText: 24,
    cardTitle: 22,
    cardAddress: 16,
    cardFooter: 14,
    cardText1: 20,
    cardText2: 16
  },
  headerStyle: {
    height: 60,
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    elevation: 0
  },
  header: {
    paddingHorizontal: 20,
    paddingLeftBackArrow: 10
  },
  card: {
    container: {
      marginBottom: 15 //margin under each card
    },
    logo: {
      marginBottom: 10,
      marginRight: 10
    },
    infoContainer: {
      marginHorizontal: 5,
      marginTop: 5,
      marginBottom: 0
    },
    marks: {
      total: 10,
      marked: 0,
      rows: 2,
      rowSpacing: 20,
      style: {
        justifyContent: "space-evenly",
        padding: 1
      },
      mark: {
        style: {
          backgroundColor: "#000"
        }
      }
    },
    style: {
      height: 200,
      borderRadius: 10, //borderRadius of card
      padding: 10, //padding inside of card
      marginBottom: 5, //margin between card and card title
      shadow: {
        color: "#333",
        offset: {
          width: 3,
          height: 0
        },
        opacity: 0.1,
        radius: 4
      },
      borderWidth: 0,
      borderColor: "",
      elevation: 1
    }
  },
  cardGrid: {
    padding: 6,
    margin: 6,
    style: {
      height: 100,
      borderRadius: 10,
      shadow: {
        color: "#333",
        offset: {
          width: 3,
          height: 0
        },
        opacity: 0.1,
        radius: 4
      },
      elevation: 1
    }
  },
  cardDetails: {
    style: {
      shadow: {
        color: "#000",
        offset: {
          width: 0,
          height: 0
        },
        opacity: 0.1,
        radius: 6
      }
    }
  }
});
