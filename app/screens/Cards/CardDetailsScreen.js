import React, { Component } from "react";
import { Text, ScrollView, View, StyleSheet, FlatList } from "react-native";

// Import libraries
import { connect } from "react-redux";

// Import global variables
import vars from "../../config/styles";

// Import components
import CardItem from "../../components/ui/Card/CardItem";
import CardHistoryItem from "../../components/ui/Cards/CardHistoryItem";
import CardCircle from "../../components/ui/Cards/CardCircle";

// Import methods
import { changeHeaderState } from "../../components/ui/Header";

// Map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

class CardDetailsScreen extends Component {
  componentDidMount() {
    this.changeHeader();
  }
  render() {
    // Set variables
    const item = this.props.user.activeCard;
    const card = item.card;
    const total = card.marks.total;
    const marked = item.marked ? item.marked : 0;
    const remaining = total - marked;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.cardContainer}>
          <CardItem
            settings={item}
            navigation={this.props.navigation}
            navigateTo="none"
          />
        </View>
        <View style={styles.cardInfoContainer}>
          <View style={styles.cardDetailsContainer}>
            {card.hasOwnProperty("name") && (
              <Text style={styles.title}>{card.name}</Text>
            )}
            <View style={styles.cardAnalyticsContainer}>
              <View style={styles.cardAnalyticsItem}>
                <CardCircle
                  number={marked}
                  color="#fff"
                  backgroundColor="#72E81F"
                />
                <Text style={styles.cardAnalyticsItemText}>
                  {marked !== 1 ? "bollini" : "bollino"}
                </Text>
              </View>
              <View style={styles.cardAnalyticsItem}>
                <CardCircle
                  number={remaining}
                  color="#fff"
                  backgroundColor="#FF0D05"
                />
                <Text style={styles.cardAnalyticsItemText}>
                  {remaining !== 1 ? "mancanti" : "mancante"}
                </Text>
              </View>
            </View>
            <Text style={styles.descriptionTitle}>Descrizione</Text>
            <Text style={styles.description}>{card.description}</Text>
          </View>
          <View style={styles.cardDetailsContainer}>
            {/* Cronologia */}
            <Text style={styles.cardHistoryTitle}>Cronologia</Text>
            <View style={styles.cardHistoryContainer}>
              {this.getHistory(item.history)}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  getHistory(history) {
    if (history.length === 0) {
      return (
        <View style={styles.noHistoryContainer}>
          <Text style={styles.noHistoryText}>Nessun movimento</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={history}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <CardHistoryItem history={item} />}
      />
    );
  }

  // Change Header State
  changeHeader() {
    this.props.navigation.addListener("didFocus", () => {
      changeHeaderState({
        backArrow: true,
        navigation: this.props.navigation
      });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4"
  },
  cardContainer: {
    paddingVertical: 12
  },
  cardInfoContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1
  },
  cardDetailsContainer: {
    padding: 12
  },
  title: {
    fontSize: 25,
    fontFamily: vars.font.regular,
    color: vars.color.title
  },
  description: {
    fontSize: 16,
    fontFamily: vars.font.regular,
    color: vars.color.subtitle,
    marginTop: 5
  },
  descriptionTitle: {
    fontSize: 20,
    fontFamily: vars.font.bold,
    color: vars.color.title,
    marginTop: 10
  },
  map: {
    height: 150
  },
  cardAnalyticsContainer: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center"
  },
  cardAnalyticsItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  cardAnalyticsItemText: {
    fontSize: 20,
    fontFamily: vars.font.regular,
    padding: 8
  },
  cardAnalyticsTitle: {
    fontFamily: vars.font.bold,
    fontSize: 20
  },
  cardHistoryTitle: {
    fontFamily: vars.font.bold,
    fontSize: 20
  },
  cardHistoryContainer: {
    padding: 12
  },
  cardHistoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  cardHistoryIcon: {},
  cardHistoryTextContainer: {
    marginLeft: 12
  },
  cardHistoryText: {
    fontFamily: vars.font.regular,
    fontSize: 18,
    color: "#3c3c3c"
  },
  cardHistoryDateContainer: {
    flex: 1
  },
  cardHistoryDate: {
    fontFamily: vars.font.regular,
    fontSize: 14,
    color: "#7B7B7B",
    textAlign: "right"
  }
});
export default connect(mapStateToProps)(CardDetailsScreen);
