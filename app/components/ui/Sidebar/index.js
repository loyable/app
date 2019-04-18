import React, { Component } from "react";

import { FlatList } from "react-native";

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
    const sidebarItems = [
      {
        name: "Impostazioni",
        link: ""
      },
      {
        name: "Il mio account",
        link: ""
      },
      {
        name: "Cambia numero",
        link: ""
      },
      {
        name: "Istruzioni d'uso",
        link: ""
      },
      {
        name: "Contattaci",
        link: ""
      },
      {
        name: "Chi siamo",
        link: ""
      },
      {
        name: "Logout",
        link: "Logout"
      }
    ];
    return (
      <ScrollView>
        <SafeAreaView
          style={styles.container}
          forceInset={{ top: "always", horizontal: "never" }}
        >
          <View style={styles.logoContainer}>
            <LogoIcon navigation={this.props.navigation} link="Cards" />
          </View>

          {this.getSidebarItems(sidebarItems)}
        </SafeAreaView>
      </ScrollView>
    );
  }
  getSidebarItems(items) {
    return (
      <FlatList
        data={items}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <SidebarItem
            name={item.name}
            navigation={this.props.navigation}
            link={item.link}
          />
        )}
      />
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
