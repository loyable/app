import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";

//Global variables
import vars from "../../../config/styles";

//Import Icons
import LogoIcon from "../../icons/LogoIcon";
import HamburgerIcon from "../../icons/HamburgerIcon";
import QRCodeIcon from "../../icons/QRCodeIcon";
import BackIcon from "../../icons/BackIcon";

/*
  PROPS:
  - backArrow: boolean (show the back arrow) (default: false)
  - showBottomShadow: boolean (show the bottom shadow) (default: false)
  - navigation: navigation object
*/

//Public function to change Header state (es. toggle backArrow)
export function changeHeaderState(params) {
  this.setState({ ...params });
}

class Header extends Component {
  static defaultProps = {
    backArrow: false,
    showBottomShadow: false
  };

  constructor(props) {
    super(props);

    this.state = {
      backArrow: props.backArrow,
      navigation: props.navigation,
      showBottomShadow: props.showBottomShadow
    };

    changeHeaderState = changeHeaderState.bind(this);
  }

  render() {
    const styles = StyleSheet.create(this.getStyles());

    const { navigation } = this.state;
    return (
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          {this.state.backArrow ? (
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
    const { showBottomShadow } = this.state;
    return {
      header: {
        height: vars.header.height,
        backgroundColor: vars.header.backgroundColor,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: showBottomShadow ? "#000" : undefined,
        shadowOffset: {
          width: 0,
          height: showBottomShadow ? 3 : 0
        },
        shadowOpacity: showBottomShadow ? 0.1 : 0,
        shadowRadius: showBottomShadow ? 2 : 0,
        elevation: showBottomShadow ? 1 : 0
      },
      headerContainer: {
        backgroundColor: "#fff"
      },
      backArrow: {
        flex: 1,
        alignItems: "flex-start",
        paddingLeft: vars.header.paddingHorizontal
      },
      hamburger: {
        flex: 1,
        alignItems: "flex-start",
        paddingLeft: vars.header.paddingHorizontal
      },
      logo: {
        flex: 1,
        alignItems: "center"
      },
      qrcode: {
        flex: 1,
        alignItems: "flex-end",
        paddingRight: vars.header.paddingHorizontal
      }
    };
  }
}

export default Header;
