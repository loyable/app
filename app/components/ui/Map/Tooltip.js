import React, { Component } from "react";

import { StyleSheet, View, Text } from "react-native";

import { connect } from "react-redux";

import { SET_ACTIVE_MERCHANT } from "../../../store/actions";

import vars from "../../../config/styles";

import Utils from "../../../config/utils";

import { Callout } from "react-native-maps";

/*
  PROPS:
  - tooltip.title
  - tooltip.description
  - tooltip.distance
  - tooltip.info

  - navigation
  - merchant
  - distance
*/

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

//map redux dispatch function to properties
const mapDispatchToProps = dispatch => {
  return {
    SET_ACTIVE_MERCHANT: (merchant, callback) => {
      dispatch(SET_ACTIVE_MERCHANT(merchant));
      if (callback) callback();
    }
  };
};

class Tooltip extends Component {
  render() {
    const styles = StyleSheet.create(this.getStyles());

    const { merchant, distance } = this.props;

    if (merchant.hasOwnProperty("merchant")) {
      return (
        <Callout
          tooltip={true}
          onPress={() =>
            this.props.SET_ACTIVE_MERCHANT(merchant, () =>
              this.props.navigation.navigate("DetailsMapView", {
                navigateTo: "CardMapViewDetails"
              })
            )
          }
        >
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>{merchant.merchant.name}</Text>
              <Text style={styles.description}>
                {Utils.truncateString(merchant.merchant.description, 200)}
              </Text>
            </View>
            <View style={styles.footer}>
              <Text style={styles.distance}>{distance}</Text>
            </View>
          </View>
        </Callout>
      );
    } else {
      return (
        <Callout
          tooltip={true}
          onPress={() =>
            this.props.SET_ACTIVE_MERCHANT(merchant, () =>
              this.props.navigation.navigate("DetailsMapView", {
                navigateTo: "CardMapViewDetails"
              })
            )
          }
        >
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>{merchant.name}</Text>
              <Text style={styles.description}>
                {Utils.truncateString(merchant.description, 200)}
              </Text>
            </View>
            <View style={styles.footer}>
              <Text style={styles.distance}>{distance}</Text>
            </View>
          </View>
        </Callout>
      );
    }
  }

  getStyles() {
    return {
      container: {
        width: 169,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingHorizontal: 7,
        paddingVertical: 5,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 0.1
      },
      title: {
        fontSize: 16,
        color: "#3c3c3c",
        fontFamily: vars.font.bold
      },
      description: {
        fontSize: 12,
        color: "#696969",
        fontFamily: vars.font.regular
      },
      footer: {
        flexDirection: "row",
        justifyContent: "space-between"
      },
      distance: {
        fontSize: 10,
        color: "#8e8e8e",
        fontFamily: vars.font.regular
      }
    };
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tooltip);
