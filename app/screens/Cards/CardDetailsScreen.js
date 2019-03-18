import React, { Component } from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";

import Card from "../../components/ui/Card";

//global vars
import vars from "../../config/styles";

import CardAnalyticsCircle from "./CardAnalyticsCircle";

class CardDetailsScreen extends Component {
  render() {
    const card = this.props.navigation.getParam("card");

    return (
      <ScrollView style={styles.container}>
        <View style={styles.cardContainer}>
          <Card
            settings={card}
            showInfo={false}
            navigation={this.props.navigation}
            navigateTo="none"
          />
        </View>
        <View style={styles.cardInfoContainer}>
          <View style={styles.cardDetailsContainer}>
            <Text style={styles.title}>{card.header.text1.value}</Text>
            <View style={styles.cardAnalyticsContainer}>
              <View style={styles.cardAnalyticsItem}>
                <CardAnalyticsCircle
                  number={card.marked}
                  color="#fff"
                  backgroundColor="#72E81F"
                />
                <Text style={styles.cardAnalyticsItemText}>bollini</Text>
              </View>
              <View style={styles.cardAnalyticsItem}>
                <CardAnalyticsCircle
                  number={card.settings.marks.total - card.marked}
                  color="#fff"
                  backgroundColor="#C812FF"
                />
                <Text style={styles.cardAnalyticsItemText}>mancanti</Text>
              </View>
            </View>
            <Text style={styles.descriptionTitle}>Descrizione</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              harum accusamus pariatur quam labore at aliquam eius dolorum
              voluptates excepturi, iure, deleniti perspiciatis dolores autem
              delectus sapiente aspernatur soluta inventore enim veniam
              necessitatibus hic corporis itaque! Nostrum et officia, quis nobis
              accusantium accusamus repellat a velit perferendis, aperiam magnam
              aspernatur.
            </Text>
          </View>
          <View style={styles.cardDetailsContainer}>
            {/* Cronologia */}
            <Text style={styles.cardHistoryTitle}>Cronologia</Text>
            <View style={styles.cardHistoryContainer}>
              <View style={styles.cardHistoryItem}>
                <View style={styles.cardHistoryIcon}>
                  <CardAnalyticsCircle
                    number="+1"
                    size={35}
                    fontSize={22}
                    color="#fff"
                    backgroundColor="#FFC445"
                  />
                </View>
                <View style={styles.cardHistoryTextContainer}>
                  <Text style={styles.cardHistoryText}>Bollino aggiunto</Text>
                </View>
                <View style={styles.cardHistoryDateContainer}>
                  <Text style={styles.cardHistoryDate}>04/01/2019 16:05</Text>
                </View>
              </View>
              <View style={styles.cardHistoryItem}>
                <View style={styles.cardHistoryIcon}>
                  <CardAnalyticsCircle
                    number="+2"
                    size={35}
                    fontSize={22}
                    color="#fff"
                    backgroundColor="#FFC445"
                  />
                </View>
                <View style={styles.cardHistoryTextContainer}>
                  <Text style={styles.cardHistoryText}>Bollini aggiunti</Text>
                </View>
                <View style={styles.cardHistoryDateContainer}>
                  <Text style={styles.cardHistoryDate}>05/01/2019 14:05</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4"
  },
  cardContainer: {
    padding: 12
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
    fontFamily: vars.font.bold,
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
export default CardDetailsScreen;
