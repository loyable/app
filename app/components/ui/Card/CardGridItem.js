import React, { Component } from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";

// Import libraries
import { connect } from "react-redux";

// Import redux actions
import { SET_ACTIVE_MERCHANT } from "../../../store/actions";

/*
  PROPS:
  - settings: object
  - navigation: object
  - navigateTo: string (screen to navigate after)
  - isLastOddItem: boolean
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
    SET_ACTIVE_MERCHANT: (merchant, callback) => {
      dispatch(SET_ACTIVE_MERCHANT(merchant));
      if (callback) callback();
    }
  };
};

class CardGridItem extends Component {
  static defaultProps = {
    navigateTo: "Details"
  };

  static propTypes = {
    settings: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    navigateTo: PropTypes.string,
    isLastOddItem: PropTypes.bool
  };

  render() {
    const merchant = this.props.settings;

    const styles = StyleSheet.create(this.getStyles(merchant.merchant));
    if (!merchant.hidden) {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            this.setActiveMerchant(merchant);
          }}
        >
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={{
                uri: merchant.merchant.logo.src
              }}
            />
          </View>
        </TouchableWithoutFeedback>
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
      this.props.navigation.navigate("MerchantDetails", {
        navigateTo: "CardDetails"
      });
    }
  }

  getStyles(merchant) {
    let width = 130,
      height = 80;
    if (merchant.logo.width >= merchant.logo.height) {
      height = (width * merchant.logo.height) / merchant.logo.width;
    } else {
      width = (height * merchant.logo.width) / merchant.logo.height;
    }

    const margin = 6;

    return {
      container: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        margin,
        marginRight: this.props.isLastOddItem ? margin * 2 + 3 : margin,
        backgroundColor: merchant.logo.backgroundColor,
        borderRadius: 10,
        borderColor: merchant.logo.hasOwnProperty("borderColor")
          ? merchant.logo.borderColor
          : "#ffffff",
        borderWidth: merchant.logo.hasOwnProperty("borderWidth")
          ? merchant.logo.borderWidth
          : 0,
        height: 100,
        shadowColor: "#333333",
        shadowOffset: {
          width: 3,
          height: 0
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1
      },
      logo: {
        width,
        height
      }
    };
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardGridItem);
