import React, { Component } from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";

//Import Icons
import LogoIcon from "../../icons/LogoIcon";
import HamburgerIcon from "../../icons/HamburgerIcon";
import QRCodeIcon from "../../icons/QRCodeIcon";
import BackIcon from "../../icons/BackIcon";
import vars from "../../../config/styles";

class Header extends Component {
  static defaultProps = {
    backArrow: false
  };

  render() {
    const styles = StyleSheet.create({
      header: {
        height: vars.headerStyle.height,
        backgroundColor: vars.headerStyle.backgroundColor,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
    });

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
}

export default Header;
