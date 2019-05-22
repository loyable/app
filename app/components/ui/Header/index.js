import React, { Component } from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";

//Import Icons
import LogoIcon from "../../icons/LogoIcon";
import HamburgerIcon from "../../icons/HamburgerIcon";
import QRCodeIcon from "../../icons/QRCodeIcon";
import BackIcon from "../../icons/BackIcon";
import vars from "../../../config/styles";

/*
  PROPS:
  - backArrow: boolean (show the back arrow)
  - showBottomShadow: boolean (show the bottom shadow)
*/

class Header extends Component {
  static defaultProps = {
    backArrow: false,
    showBottomShadow: false
  };

  render() {
    const styles = StyleSheet.create(this.getStyles());

    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          {this.props.backArrow ? (
            <View style={styles.backArrow}>
              <BackIcon navigation={navigation} />
            </View>
          ) : (
            <View style={styles.hamburger}>
              <HamburgerIcon navigation={navigation} />
            </View>
          )}
          <View style={styles.logo}>
            <LogoIcon navigation={navigation} link="Cards" />
          </View>
          <View style={styles.qrcode}>
            <QRCodeIcon navigation={navigation} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  getStyles() {
    return {
      header: {
        height: vars.headerStyle.height,
        backgroundColor: vars.headerStyle.backgroundColor,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: this.props.showBottomShadow ? "#000" : undefined,
        shadowOffset: {
          width: 0,
          height: this.props.showBottomShadow ? 3 : 0
        },
        shadowOpacity: this.props.showBottomShadow ? 0.1 : 0,
        shadowRadius: this.props.showBottomShadow ? 2 : 0
      },
      headerContainer: {
        backgroundColor: "#fff"
      },
      backArrow: {
        flex: 1,
        alignItems: "flex-start"
      },
      hamburger: {
        flex: 1,
        alignItems: "flex-start"
      },
      logo: {
        flex: 1,
        alignItems: "center"
      },
      qrcode: {
        flex: 1,
        alignItems: "flex-end"
      }
    };
  }
}

export default Header;
