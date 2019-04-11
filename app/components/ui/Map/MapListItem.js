import React, { Component } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image
} from "react-native";

import vars from "../../../config/styles";

class MapListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 100
    };
  }
  render() {
    const merchant = this.props.settings;

    const styles = StyleSheet.create(this.getStyles(merchant));

    return (
      <TouchableWithoutFeedback
        onPress={() =>
          this.props.navigation.navigate("DetailsMapList", {
            merchant,
            navigateTo: "CardMapListDetails"
          })
        }
      >
        <View style={styles.item}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={{
                uri: merchant.merchant.logo.src
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{merchant.merchant.name}</Text>
            <Text style={styles.description}>
              {merchant.merchant.description}
            </Text>
            <View style={styles.infoContainer}>
              <Text style={styles.distance}>3,7 km</Text>
              <Text style={styles.info}>Info</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  getStyles(merchant) {
    let width = this.state.size - 20,
      height = this.state.size - 20;
    if (merchant.merchant.logo.width >= merchant.merchant.logo.height) {
      height =
        (width * merchant.merchant.logo.height) / merchant.merchant.logo.width;
    } else {
      width =
        (height * merchant.merchant.logo.width) / merchant.merchant.logo.height;
    }
    return {
      item: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        borderRadius: 8,
        marginTop: 10,
        marginHorizontal: 12
      },
      iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#fff",
        backgroundColor: merchant.merchant.logo.backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        margin: 5
      },
      icon: {
        width,
        height
      },
      textContainer: {
        flex: 1,
        padding: 5
      },
      title: {
        fontFamily: vars.font.bold,
        color: vars.color.title,
        fontSize: 20
      },
      description: {
        color: vars.color.subtitle,
        fontFamily: vars.font.regular,
        fontSize: 14
      },
      infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
      },
      distance: {
        color: vars.color.description,
        fontFamily: vars.font.regular,
        fontSize: 16
      },
      info: {
        color: "#0070F5",
        fontFamily: vars.font.bold,
        fontSize: 16
      }
    };
  }
}

export default MapListItem;
