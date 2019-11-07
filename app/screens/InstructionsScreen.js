import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";

import vars from "../config/styles";

import Dot from "../components/ui/Instructions/Dot";

import LogoBianco from "../assets/icons/logobianco";

const { width, height } = Dimensions.get("window");
class InstructionsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 1,
      lastIndex: undefined
    };
  }

  componentDidMount() {
    this.setState({ lastIndex: this.guide.props.children.length });
  }

  renderPagination() {
    const dots = [];
    for (var i = 1; i <= this.state.lastIndex; i++) {
      dots.push(<Dot key={i} active={this.state.activeIndex === i} />);
    }
    return dots;
  }

  scrollToPage(page) {
    this.guide.scrollTo({
      x: (page - 1) * width
    });
  }

  render() {
    const { activeIndex, lastIndex } = this.state;

    const skipText = "Salta",
      continueText = "Continua";

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={ref => {
            this.guide = ref;
          }}
          horizontal={true}
          style={styles.scrollview}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onMomentumScrollEnd={e => {
            let page = 1;
            const offsetX = e.nativeEvent.contentOffset.x;
            if (offsetX !== 0) {
              page = offsetX / width + 1;
            }
            this.setState({ activeIndex: page });
          }}
        >
          <ImageBackground
            source={require("../assets/img/instructions/instructions-1.jpg")}
            style={styles.background}
          >
            <View style={styles.overlay}>
              <SafeAreaView style={styles.container}>
                <View>
                  <Text style={styles.title}>L'applicazione</Text>
                  <Text style={styles.description}>
                    Loyable semplifica la gestione delle tessere fedeltà da
                    parte dell'utente che potrà averle sempre a portata di
                    smartphone.
                  </Text>
                </View>
              </SafeAreaView>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require("../assets/img/instructions/instructions-2.jpg")}
            style={styles.background}
          >
            <View style={styles.overlay}>
              <SafeAreaView style={styles.container}>
                <View>
                  <Text style={styles.title}>Come funziona?</Text>
                  <Text style={styles.description}>
                    Gli esercenti convenzionati presenti sulla mappa possono
                    associare al tuo account la loro tessera fedeltà.
                  </Text>
                </View>
              </SafeAreaView>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require("../assets/img/instructions/instructions-3.jpg")}
            style={styles.background}
          >
            <View style={styles.overlay}>
              <SafeAreaView style={styles.container}>
                <View>
                  <Text style={styles.description}>
                    Dovrai semplicemente mostrare il tuo codice QR personale
                    alla cassa!
                  </Text>
                  <Text style={styles.title}>Facile no?</Text>
                </View>
              </SafeAreaView>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require("../assets/img/instructions/instructions-4.jpg")}
            style={styles.background}
          >
            <View style={styles.overlay}>
              <SafeAreaView style={styles.container}>
                <View>
                  <Text style={styles.description}>
                    Per ogni esercente potrai visionare i dati storici di ogni
                    tessera fedeltà associata al tuo account!
                  </Text>
                  <Text style={styles.title}>Cosa aspetti?</Text>
                  <Text style={styles.title}>Iniziamo!</Text>
                </View>
              </SafeAreaView>
            </View>
          </ImageBackground>
        </ScrollView>
        <SafeAreaView style={styles.logoContainer}>
          <LogoBianco style={styles.logo} />
        </SafeAreaView>
        <SafeAreaView style={styles.controls}>
          <View style={styles.pagination}>{this.renderPagination()}</View>
          <TouchableWithoutFeedback
            onPress={() => {
              if (activeIndex === lastIndex) {
                this.props.navigation.navigate("CardsList");
              } else {
                this.scrollToPage(lastIndex);
              }
            }}
          >
            <Text style={styles.skip}>
              {activeIndex !== lastIndex ? skipText : continueText}
            </Text>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollview: {
    flex: 1
  },
  background: {
    width,
    height
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  container: {
    marginHorizontal: 15,
    marginTop: 200
  },
  logoContainer: {
    position: "absolute",
    top: 40,
    left: 15,
    marginVertical: 50
  },
  logo: {
    width: 120,
    height: 60
  },
  title: {
    fontFamily: vars.font.regular,
    fontSize: 36,
    color: "#fff"
  },
  description: {
    fontFamily: vars.font.regular,
    fontSize: 22,
    color: "#fff"
  },
  controls: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30
  },
  skip: {
    fontFamily: vars.font.bold,
    fontSize: 20,
    color: "#fff"
  },
  pagination: {
    flexDirection: "row"
  }
});

export default InstructionsScreen;
