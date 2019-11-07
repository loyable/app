import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";

import PropTypes from "prop-types";

// Import libraries
import { connect } from "react-redux";

// Import global variables
import vars from "../../../config/styles";

// Import redux actions
import { SET_ACTIVE_CARD } from "../../../store/actions";

// Import components
import Box from "./Box";

const SCREEN_WIDTH = Dimensions.get("window").width;

/*
  PROPS:
  - settings: object
  - multiple: boolean to adjust margins
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
    SET_ACTIVE_CARD: card => {
      dispatch(SET_ACTIVE_CARD(card));
    }
  };
};

class CardItem extends Component {
  static defaultProps = {
    navigateTo: "CardDetails",
    multiple: false
  };

  static propTypes = {
    settings: PropTypes.object.isRequired,
    navigateTo: PropTypes.string,
    multiple: PropTypes.bool
  };

  createGrid(marked, card, styles) {
    /*
      PARAMS:
      - marked
      - card
      - styles
    */

    // Variables destructuring
    const { marks } = card;
    const { total, rows } = marks;

    // Number of columns
    const columns = Math.floor(total / rows);

    // Counter marked
    let markedCounter = marked ? marked : 0;

    // Init grid
    let grid = [];

    // Loop rows
    for (let i = 0; i < rows; i++) {
      let row = [];

      //Loop columns
      for (let j = 0; j < columns; j++) {
        // If counter === 0 empty mark
        if (markedCounter === 0) {
          row.push(<Box key={"col" + j} marks={marks} />);

          // If counter != 0 mark with image
        } else {
          row.push(<Box key={"col" + j} marks={marks} marked={true} />);
          markedCounter--;
        }
      }
      // Insert row into grid
      grid.push(
        <View key={"row" + i} style={styles.row}>
          {row}
        </View>
      );
    }
    // Return grid
    return grid;
  }

  setActiveCard() {
    if (this.props.navigateTo !== "none") {
      // Set active merchant
      this.props.SET_ACTIVE_CARD(card);

      // Navigate to Merchant Details screen
      this.props.navigation.navigate("MerchantDetails");
    }
  }

  render() {
    // Set variables
    const item = this.props.settings;
    const { card, marked } = item;

    const styles = StyleSheet.create(this.getStyles(card));

    switch (card.design) {
      case "vertical":
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              this.setActiveCard(item);
            }}
          >
            <View style={styles.card}>
              <View style={styles.header}>
                {card.header.logo.verticalPosition === "center" && (
                  <View style={styles.textContainer}>
                    <Text style={styles.text1}>{card.header.text1.value}</Text>
                    <Text style={styles.text2}>{card.header.text2.value}</Text>
                  </View>
                )}
                <Image
                  style={styles.logo}
                  source={{
                    uri: card.header.logo.src
                  }}
                />
                {card.header.logo.verticalPosition !== "center" && (
                  <View style={styles.textContainer}>
                    <Text style={styles.text1}>{card.header.text1.value}</Text>
                    <Text style={styles.text2}>{card.header.text2.value}</Text>
                  </View>
                )}
                {card.footer.value !== "" && (
                  <Text style={styles.footer}>{card.footer.value}</Text>
                )}
              </View>
              <View style={styles.rowContainer}>
                {this.createGrid(marked, card, styles)}
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      default:
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              this.setActiveCard(item);
            }}
          >
            <View style={styles.card}>
              <View style={styles.header}>
                {card.header.logo.verticalPosition === "center" && (
                  <View style={styles.textContainer}>
                    <Text style={styles.text1}>{card.header.text1.value}</Text>
                  </View>
                )}
                <Image
                  style={styles.logo}
                  source={{
                    uri: card.header.logo.src
                  }}
                />
                {card.header.logo.verticalPosition === "center" && (
                  <View style={styles.textContainer}>
                    <Text style={styles.text2}>{card.header.text2.value}</Text>
                  </View>
                )}
                {card.header.logo.verticalPosition !== "center" && (
                  <View style={styles.textContainer}>
                    <Text style={styles.text1}>{card.header.text1.value}</Text>
                    <Text style={styles.text2}>{card.header.text2.value}</Text>
                  </View>
                )}
              </View>
              <View style={styles.rowContainer}>
                {this.createGrid(marked, card, styles)}
              </View>
              {card.footer.value !== "" && (
                <Text style={styles.footer}>{card.footer.value}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        );
    }
  }

  getStyles(card) {
    return {
      card: {
        marginHorizontal: this.props.multiple ? 5 : 12,
        width: SCREEN_WIDTH - 24,
        flexDirection: card.design === "vertical" ? "row" : "column", //row if vertical | column if horizontal
        backgroundColor: card.style.hasOwnProperty("backgroundColor")
          ? card.style.backgroundColor
          : "#000000",

        height: card.style.hasOwnProperty("height") ? card.style.height : 200,
        padding: card.style.hasOwnProperty("padding") ? card.style.padding : 10,
        shadowColor: "#333333",
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderRadius: card.style.hasOwnProperty("borderRadius")
          ? card.style.borderRadius
          : 10,
        borderWidth: card.style.hasOwnProperty("borderWidth")
          ? card.style.borderWidth
          : 0,
        borderColor: card.style.hasOwnProperty("borderColor")
          ? card.style.borderColor
          : "#000000",
        elevation: 1
      },
      rowContainer: {
        flex: card.design === "vertical" ? 1 : 0
      },
      row: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: card.marks.hasOwnProperty("rowSpacing")
          ? card.marks.rowSpacing / 2
          : 20 / 2
      },
      header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start"
      },
      // {
      //     flex: 1,
      //     flexDirection:
      //       card.header.logo.verticalPosition !== "center"
      //         ? "column"
      //         : "row",
      //     alignItems:
      //       card.header.logo.verticalPosition !== "center"
      //         ? "center"
      //         : "flex-start",
      //     justifyContent: "space-between"
      //   }
      logo: {
        width: card.header.logo.hasOwnProperty("width")
          ? card.header.logo.width
          : 150,
        height: card.header.logo.hasOwnProperty("height")
          ? card.header.logo.height
          : 100,
        marginBottom: card.header.logo.hasOwnProperty("marginBottom")
          ? card.header.logo.marginBottom
          : 0,
        marginRight: card.header.logo.hasOwnProperty("marginRight")
          ? card.header.logo.marginRight
          : 0
      },
      textContainer: {
        flex: card.design === "vertical" ? 0 : 1
      },
      text1: {
        fontSize: card.header.text1.hasOwnProperty("fontSize")
          ? card.header.text1.fontSize
          : 20,
        fontFamily: card.header.text1.hasOwnProperty("fontFamily")
          ? card.header.text1.fontFamily
          : vars.font.regular,
        color: card.header.text1.hasOwnProperty("color")
          ? card.header.text1.color
          : "#ffffff",
        textAlign: card.header.text1.hasOwnProperty("textAlign")
          ? card.header.text1.textAlign
          : "left",
        fontStyle: card.header.text1.hasOwnProperty("fontStyle")
          ? card.header.text1.fontStyle
          : "normal",
        fontWeight: card.header.text1.hasOwnProperty("fontWeight")
          ? card.header.text1.fontWeight
          : "normal",
        lineHeight: card.header.text1.hasOwnProperty("lineHeight")
          ? card.header.text1.lineHeight
          : 20,
        letterSpacing: card.header.text1.hasOwnProperty("letterSpacing")
          ? card.header.text1.letterSpacing
          : 0
      },
      text2: {
        fontSize: card.header.text2.hasOwnProperty("fontSize")
          ? card.header.text2.fontSize
          : 16,
        fontFamily: card.header.text2.hasOwnProperty("fontFamily")
          ? card.header.text2.fontFamily
          : vars.font.regular,
        color: card.header.text2.hasOwnProperty("color")
          ? card.header.text2.color
          : "#ffffff",
        textAlign: card.header.text2.hasOwnProperty("textAlign")
          ? card.header.text2.textAlign
          : "left",
        fontStyle: card.header.text2.hasOwnProperty("fontStyle")
          ? card.header.text2.fontStyle
          : "normal",
        fontWeight: card.header.text2.hasOwnProperty("fontWeight")
          ? card.header.text2.fontWeight
          : "normal",
        lineHeight: card.header.text2.hasOwnProperty("lineHeight")
          ? card.header.text2.lineHeight
          : 16,
        letterSpacing: card.header.text2.hasOwnProperty("letterSpacing")
          ? card.header.text2.letterSpacing
          : 0
      },
      footer: {
        fontSize: card.footer.hasOwnProperty("fontSize")
          ? card.footer.fontSize
          : 14,
        fontFamily: card.footer.hasOwnProperty("fontFamily")
          ? card.footer.fontFamily
          : vars.font.regular,
        color: card.footer.hasOwnProperty("color")
          ? card.footer.color
          : "#ffffff",
        textAlign: card.footer.hasOwnProperty("textAlign")
          ? card.footer.textAlign
          : "left",
        fontStyle: card.footer.hasOwnProperty("fontStyle")
          ? card.footer.fontStyle
          : "normal",
        fontWeight: card.footer.hasOwnProperty("fontWeight")
          ? card.footer.fontWeight
          : "normal",
        lineHeight: card.footer.hasOwnProperty("lineHeight")
          ? card.footer.lineHeight
          : 14,
        letterSpacing: card.footer.hasOwnProperty("letterSpacing")
          ? card.footer.letterSpacing
          : 0
      }
    };
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardItem);
