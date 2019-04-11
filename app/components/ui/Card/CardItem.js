import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";

import vars from "../../../config/styles";

import Box from "./Box";

const SCREEN_WIDTH = Dimensions.get("window").width;

/*
  PROPS:
  - settings: object
  - showInfo: boolean (not showing title and address) for details screens
  - multiple: boolean to adjust margins
*/

class CardItem extends Component {
  static defaultProps = {
    navigateTo: "CardDetails",
    multiple: false
  };

  createGrid(marked, card, styles) {
    /*
      Funzione createGrid()
      PARAMETRI:
      - merchant
      - card
      - styles
    */

    //Destrutturo le variabili
    const { settings } = card;

    const { marks } = settings;

    const { total, rows } = marks;

    //Calcolo il numero di colonne
    const columns = Math.floor(total / rows);

    //Inizializzo il contatore
    let markedCounter = marked ? marked : 0;

    //Inizializzo la griglia
    let grid = [];

    //Loop righe
    for (let i = 0; i < rows; i++) {
      let row = [];

      //Loop colonne
      for (let j = 0; j < columns; j++) {
        //Se il contatore === 0 inserisci box vuoto
        if (markedCounter === 0) {
          row.push(<Box key={"col" + j} card={marks} />);

          //Se il contatore != 0 inserisci timbro
        } else {
          row.push(<Box key={"col" + j} card={marks} marked={true} />);
          markedCounter--;
        }
      }
      //Inserisco array riga sulla griglia
      grid.push(
        <View key={"row" + i} style={styles.row}>
          {row}
        </View>
      );
    }
    //Output griglia
    return grid;
  }

  render() {
    const item = this.props.settings;

    const card = item.card;
    const marked = item.marked;

    const styles = StyleSheet.create(this.getStyles(card));

    if (card.settings.design === "vertical") {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            if (this.props.navigateTo !== "none") {
              this.props.navigation.navigate(this.props.navigateTo, {
                item
              });
            }
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
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            if (this.props.navigateTo !== "none") {
              this.props.navigation.navigate(this.props.navigateTo, {
                item
              });
            }
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
        flexDirection: card.settings.design === "vertical" ? "row" : "column", //row if vertical | column if horizontal
        backgroundColor: card.settings.style.backgroundColor
          ? card.settings.style.backgroundColor
          : vars.color.cardBackground,
        borderRadius: card.settings.style.borderRadius
          ? card.settings.style.borderRadius
          : vars.card.style.borderRadius,
        height: card.settings.style.height
          ? card.settings.style.height
          : vars.card.style.height,
        padding: card.settings.style.padding
          ? card.settings.style.padding
          : vars.card.style.padding,
        shadowColor: card.settings.style.shadow
          ? card.settings.style.shadow.color
          : vars.card.style.shadow.color,
        shadowOffset: {
          width: card.settings.style.shadow
            ? card.settings.style.shadow.offset.width
            : vars.card.style.shadow.offset.width,
          height: card.settings.style.shadow
            ? card.settings.style.shadow.offset.height
            : vars.card.style.shadow.offset.height
        },
        shadowOpacity: card.settings.style.shadow
          ? card.settings.style.shadow.opacity
          : vars.card.style.shadow.opacity,
        shadowRadius: card.settings.style.shadow
          ? card.settings.style.shadow.radius
          : vars.card.style.shadow.radius,
        borderWidth: card.settings.style.borderWidth
          ? card.settings.style.borderWidth
          : vars.card.style.borderWidth,
        borderColor: card.settings.style.borderColor
          ? card.settings.style.borderColor
          : vars.card.style.boderColor,
        elevation: card.settings.style.elevation
          ? card.settings.style.elevation
          : vars.card.style.elevation
      },
      rowContainer: {
        flex: card.settings.design === "vertical" ? 1 : 0
      },
      row: {
        flexDirection: "row",
        justifyContent: card.settings.marks.style.justifyContent
          ? card.settings.marks.style.justifyContent
          : vars.card.marks.style.justifyContent,
        marginVertical: card.settings.marks.rowSpacing
          ? card.settings.marks.rowSpacing / 2
          : vars.card.marks.rowSpacing / 2
      },
      header:
        card.header.logo.position !== "center"
          ? {
              flex: 1,
              flexDirection: "row",
              alignItems:
                card.header.logo.verticalPosition !== "center"
                  ? "flex-start"
                  : "center"
            }
          : {
              flex: 1,
              flexDirection:
                card.header.logo.verticalPosition !== "center"
                  ? "column"
                  : "row",
              alignItems:
                card.header.logo.verticalPosition !== "center"
                  ? "center"
                  : "flex-start",
              justifyContent: "space-between"
            },
      logo: {
        width: card.header.logo.width,
        height: card.header.logo.height,
        marginBottom:
          card.header.logo.position === "center"
            ? card.header.logo.marginBottom
              ? card.header.logo.marginBottom
              : vars.card.logo.marginBottom
            : 0,
        marginRight:
          card.header.logo.position !== "center"
            ? card.header.logo.marginRight
              ? card.header.logo.marginRight
              : vars.card.logo.marginRight
            : 0
      },
      textContainer: {
        flex: card.settings.design === "vertical" ? 0 : 1
      },
      text1: {
        fontSize: card.header.text1.fontSize
          ? card.header.text1.fontSize
          : vars.fontSize.cardText1,
        fontFamily: card.header.text1.fontFamily
          ? card.header.text1.fontFamily
          : vars.font.regular,
        color: card.header.text1.color
          ? card.header.text1.color
          : vars.color.cardText,
        textAlign: card.header.text1.textAlign
          ? card.header.text1.textAlign
          : "left",
        fontStyle: card.header.text1.fontStyle
          ? card.header.text1.fontStyle
          : "normal",
        fontWeight: card.header.text1.fontWeight
          ? card.header.text1.fontWeight
          : "normal",
        lineHeight: card.header.text1.lineHeight
          ? card.header.text1.lineHeight
          : card.header.text1.fontSize
          ? card.header.text1.fontSize
          : vars.fontSize.cardText1,
        letterSpacing: card.header.text1.letterSpacing
          ? card.header.text1.letterSpacing
          : 0
      },
      text2: {
        fontSize: card.header.text2.fontSize
          ? card.header.text2.fontSize
          : vars.fontSize.cardText2,
        fontFamily: card.header.text2.fontFamily
          ? card.header.text2.fontFamily
          : vars.font.regular,
        color: card.header.text2.color
          ? card.header.text2.color
          : vars.color.cardText,
        textAlign: card.header.text2.textAlign
          ? card.header.text2.textAlign
          : "left",
        fontStyle: card.header.text2.fontStyle
          ? card.header.text2.fontStyle
          : "normal",
        fontWeight: card.header.text2.fontWeight
          ? card.header.text2.fontWeight
          : "normal",
        lineHeight: card.header.text2.lineHeight
          ? card.header.text2.lineHeight
          : card.header.text2.fontSize
          ? card.header.text2.fontSize
          : vars.fontSize.cardText2,
        letterSpacing: card.header.text2.letterSpacing
          ? card.header.text2.letterSpacing
          : 0
      },
      footer: {
        fontSize: card.footer.fontSize
          ? card.footer.fontSize
          : vars.fontSize.cardFooter,
        fontFamily: card.footer.fontFamily
          ? card.footer.fontFamily
          : vars.font.regular,
        color: card.footer.color ? card.footer.color : vars.color.cardFooter,
        textAlign: card.footer.textAlign ? card.footer.textAlign : "left",
        fontStyle: card.footer.fontStyle ? card.footer.fontStyle : "normal",
        fontWeight: card.footer.fontWeight ? card.footer.fontWeight : "normal",
        lineHeight: card.footer.lineHeight
          ? card.footer.lineHeight
          : card.footer.fontSize
          ? card.footer.fontSize
          : vars.fontSize.cardFooter,
        letterSpacing: card.footer.letterSpacing ? card.footer.letterSpacing : 0
      }
    };
  }
}

export default CardItem;
