import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList
} from "react-native";

import vars from "../../../config/styles";

import Box from "./Box";

/*
  PROPS:
  - settings: object
*/

class Card extends Component {
  createGrid(card, styles) {
    /*
      Funzione createGrid()
      PARAMETRI:
      - card
      - styles
    */

    //Destrutturo le variabili
    const { marked, settings } = card;

    const { marks } = settings;

    const { total, rows } = marks;

    //Calcolo il numero di colonne
    const columns = Math.floor(total / rows);

    //Inizializzo il contatore
    let markedCounter = marked;

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
    const card = this.props.settings;

    const styles = StyleSheet.create(this.getStyles(card));

    if (card.settings.design === "vertical") {
      return (
        <View style={styles.container}>
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

              <Text style={styles.footer}>{card.footer.value}</Text>
            </View>
            <View style={styles.rowContainer}>
              {this.createGrid(card, styles)}
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{card.settings.text.title.value}</Text>

            <Text style={styles.address}>
              {card.settings.text.address.value}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
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
              {this.createGrid(card, styles)}
            </View>
            <Text style={styles.footer}>{card.footer.value}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{card.settings.text.title.value}</Text>

            <Text style={styles.address}>
              {card.settings.text.address.value}
            </Text>
          </View>
        </View>
      );
    }
  }

  getStyles(card) {
    return {
      container: {
        marginBottom: vars.card.container.marginBottom
      },
      card: {
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
        marginBottom: card.settings.style.marginBottom
          ? card.settings.style.marginBottom
          : vars.card.style.marginBottom,
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
      infoContainer: {
        marginHorizontal: vars.card.infoContainer.marginHorizontal,
        marginVertical: vars.card.infoContainer.marginVertical
      },
      title: {
        fontSize: card.settings.text.title.fontSize
          ? card.settings.text.title.fontSize
          : vars.fontSize.cardTitle,
        fontFamily: card.settings.text.title.fontFamily
          ? card.settings.text.title.fontFamily
          : vars.font.bold,
        color: card.settings.text.title.color
          ? card.settings.text.title.color
          : vars.color.cardTitle,
        textAlign: card.settings.text.title.textAlign
          ? card.settings.text.title.textAlign
          : "left",
        fontStyle: card.settings.text.title.fontStyle
          ? card.settings.text.title.fontStyle
          : "normal",
        fontWeight: card.settings.text.title.fontWeight
          ? card.settings.text.title.fontWeight
          : "normal",
        lineHeight: card.settings.text.title.lineHeight
          ? card.settings.text.title.lineHeight
          : card.settings.text.title.fontSize
          ? card.settings.text.title.fontSize
          : vars.fontSize.cardTitle + 5,
        letterSpacing: card.settings.text.title.letterSpacing
          ? card.settings.text.title.letterSpacing
          : 0
      },
      address: {
        fontSize: card.settings.text.address.fontSize
          ? card.settings.text.address.fontSize
          : vars.fontSize.cardAddress,
        fontFamily: card.settings.text.address.fontFamily
          ? card.settings.text.address.fontFamily
          : vars.font.regular,
        color: card.settings.text.address.color
          ? card.settings.text.address.color
          : vars.color.cardAddress,
        textAlign: card.settings.text.address.textAlign
          ? card.settings.text.address.textAlign
          : "left",
        fontStyle: card.settings.text.address.fontStyle
          ? card.settings.text.address.fontStyle
          : "normal",
        fontWeight: card.settings.text.address.fontWeight
          ? card.settings.text.address.fontWeight
          : "normal",
        lineHeight: card.settings.text.address.lineHeight
          ? card.settings.text.address.lineHeight
          : card.settings.text.address.fontSize
          ? card.settings.text.address.fontSize
          : vars.fontSize.cardAddress,
        letterSpacing: card.settings.text.address.letterSpacing
          ? card.settings.text.address.letterSpacing
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

export default Card;
