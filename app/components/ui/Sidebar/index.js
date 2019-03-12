import React, { Component } from "react";

import { DrawerItems } from "react-navigation";

import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import vars from "../../../config/styles";

import LogoIcon from "../../icons/LogoIcon";

import SidebarItem from "./SidebarItem";

class Sidebar extends Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView
          style={styles.container}
          forceInset={{ top: "always", horizontal: "never" }}
        >
          <View style={styles.logoContainer}>
            <LogoIcon navigation={this.props.navigation} link="Cards" />
          </View>

          <DrawerItems
            itemStyle={styles.sidebarContainer}
            labelStyle={styles.sidebarItem}
            {...this.props}
          />
          {/* <SidebarItem
            name="Home"
            navigation={this.props.navigation}
            link="Home"
          /> */}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20
  },
  sidebarContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  sidebarItem: {
    fontFamily: vars.font.regular,
    fontSize: vars.fontSize.sidebarItem
  }
});

export default Sidebar;
