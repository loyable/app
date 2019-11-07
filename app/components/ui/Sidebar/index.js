import React, { Component } from "react";
import { FlatList } from "react-native";
import { View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import PropTypes from "prop-types";

//Global variables
import text from "../../../config/text";

//Logo icon
import LogoIcon from "../../icons/LogoIcon";

//Sidebar Item object
import SidebarItem from "./SidebarItem";

/*
  PROPS:
  - navigation: navigation object (required)
*/
class Sidebar extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  render() {
    const sidebarItems = text.sidebar.items;

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
  }
});

export default Sidebar;
