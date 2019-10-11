import React, { Component } from "react";
import { Text, ScrollView, View, StyleSheet, FlatList } from "react-native";

import { connect } from "react-redux";

import CardItem from "../../components/ui/Card/CardItem";

//global vars
import vars from "../../config/styles";

import CardHistoryItem from "../../components/ui/Cards/CardHistoryItem";
import CardCircle from "../../components/ui/Cards/CardCircle";

import { changeHeaderState } from "../../components/ui/Header";

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

//map redux dispatch function to properties
const mapDispatchToProps = dispatch => {
  return {};
};

class CardDetailsScreen extends Component {
  componentDidMount() {
    this.props.navigation.addListener("didFocus", () => {
      //Metodo che cambia l'Header
      changeHeaderState({
        backArrow: true,
        navigation: this.props.navigation
      });
    });
  }
  render() {
    const item = this.props.user.activeCard;

    const card = item.card;

    const total = card.settings.marks.total;
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
            {card.settings.hasOwnProperty("name") && (
              <Text style={styles.title}>{card.settings.name}</Text>
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
            <Text style={styles.description}>
              {card.settings.description.value}
            </Text>
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
    shadowColor: vars.cardDetails.style.shadow.color,
    shadowOffset: vars.cardDetails.style.shadow.offset,
    shadowOpacity: vars.cardDetails.style.shadow.opacity,
    shadowRadius: vars.cardDetails.style.shadow.radius,
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardDetailsScreen);
