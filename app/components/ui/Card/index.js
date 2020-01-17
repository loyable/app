import React, { Component } from "react";

import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";

// Import libraries
import { connect } from "react-redux";

// Import global variables
import vars from "../../../config/styles";

// Import redux actions
import { SET_ACTIVE_MERCHANT } from "../../../store/actions";

// Import components
import CardItem from "./CardItem";
import Info from "../../../assets/icons/info";

/*
  PROPS:
  - settings: object
  - showInfo: boolean (not showing title and address) for details screens
  - navigation: object
  - navigateTo: string (screen to navigate after)
*/

// Map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

// Map redux dispatch function to properties
const mapDispatchToProps = dispatch => {
  return {
    SET_ACTIVE_MERCHANT: merchant => {
      dispatch(SET_ACTIVE_MERCHANT(merchant));
    }
  };
};

class Card extends Component {
  static defaultProps = {
    showInfo: true,
    navigateTo: "CardDetails"
  };

  static propTypes = {
    settings: PropTypes.object.isRequired,
    showInfo: PropTypes.bool,
    navigation: PropTypes.object.isRequired,
    navigateTo: PropTypes.string
  };

  render() {
    // Set merchant variable
    const merchant = this.props.settings;

    // Get styles
    const styles = StyleSheet.create(this.getStyles(merchant));

    // If merchant is hidden
    if (!merchant.hidden) {
      return (
        <View style={styles.container}>
          {/* Get CardItem */}
          {this.getCards(merchant)}

          {/* Show Info */}
          {this.props.showInfo && (
            <TouchableWithoutFeedback
              onPress={() => {
                this.setActiveMerchant(merchant);
              }}
            >
              <View style={styles.infoContainer}>
                <View>
                  <Text style={styles.name}>{merchant.merchant.name}</Text>

                  <Text style={styles.address}>
                    {merchant.merchant.address}
                  </Text>
                </View>
                <Info />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      );
    } else {
      return null;
    }
  }

  setActiveMerchant(merchant) {
    if (this.props.navigateTo !== "none") {
      // Set active merchant
      this.props.SET_ACTIVE_MERCHANT(merchant);

      // Navigate to Merchant Details screen
      this.props.navigation.navigate("MerchantDetails");
    }
  }

  getCards(merchant) {
    // Remove cards that are hidden
    const cards = merchant.cards.map(card => {
      if (card.hidden === false) {
        return card;
      }
    });
    if (cards.length > 0) {
      return (
        <FlatList
          data={cards}
          horizontal={cards.length !== 1}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item._id}
          renderItem={({ item }) => {
            return (
              <CardItem
                settings={item}
                navigation={this.props.navigation}
                multiple={cards.length !== 1}
                navigateTo={this.props.navigateTo}
              />
            );
          }}
        />
      );
    } else {
      return null;
    }
  }

  getStyles(merchant) {
    return {
      container: {
        marginTop: 0,
        marginBottom: 12
      },
      infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 12,
        marginTop: -15,
        paddingTop: 24,
        paddingBottom: 8,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        zIndex: -1,
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowColor: "#333333",
        shadowOpacity: 0.1,
        shadowRadius: 4
      },
      name: {
        fontSize: 22,
        fontFamily: vars.font.bold,
        color: "#000000",
        textAlign: "left",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: 22,
        letterSpacing: 0
      },
      address: {
        fontSize: 16,
        fontFamily: vars.font.regular,
        color: "#696969",
        textAlign: "left",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: 16,
        letterSpacing: 0
      }
    };
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
