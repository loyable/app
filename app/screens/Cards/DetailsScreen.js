import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

import Card from "../../components/ui/Card";

//global vars
import vars from "../../config/styles";

class DetailsScreen extends Component {
  render() {
    const card = this.props.navigation.getParam("card");
    console.log(card);
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Card settings={card} showInfo={false} />
        </View>
        <View style={styles.cardInfoContainer}>
          <Text style={styles.title}>{card.settings.text.title.value}</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio modi
            dicta impedit possimus. Repellendus, praesentium.
          </Text>
          <Text style={styles.address}>{card.settings.text.address.value}</Text>
        </View>
        <Button
          onPress={() => this.props.navigation.navigate("CardDetails")}
          title="Go to Card Details"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4"
  },
  cardContainer: {
    padding: 12
  },
  cardInfoContainer: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: vars.cardDetails.style.shadow.color,
    shadowOffset: vars.cardDetails.style.shadow.offset,
    shadowOpacity: vars.cardDetails.style.shadow.opacity,
    shadowRadius: vars.cardDetails.style.shadow.radius,
    elevation: 1
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
  address: {
    fontSize: 16,
    fontFamily: vars.font.regular,
    color: vars.color.description,
    marginTop: 10
  }
});

export default DetailsScreen;
