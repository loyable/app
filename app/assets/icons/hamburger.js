import React from "react";
import Svg, { LinearGradient, Stop, G, Path } from "react-native-svg";

const Hamburger = props => (
  <Svg height={25} width={30} {...props}>
    <LinearGradient
      id="prefix__a"
      gradientUnits="objectBoundingBox"
      x2={1}
      y1={0.5}
      y2={0.5}
    >
      <Stop offset={0} stopColor="#fff" />
      <Stop offset={0} stopColor="#8e8e93" />
      <Stop offset={1} stopColor="#8e8e93" />
    </LinearGradient>
    <G fill="url(#prefix__a)">
      <Path d="M28.393 3.789H1.607A1.769 1.769 0 010 1.895 1.769 1.769 0 011.607 0h26.786A1.769 1.769 0 0130 1.895a1.769 1.769 0 01-1.607 1.894zM28.393 25H1.607A1.769 1.769 0 010 23.106a1.769 1.769 0 011.607-1.895h26.786A1.769 1.769 0 0130 23.106 1.769 1.769 0 0128.393 25zM28.393 14.395H1.607A1.769 1.769 0 010 12.501a1.769 1.769 0 011.607-1.895h26.786A1.769 1.769 0 0130 12.501a1.769 1.769 0 01-1.607 1.894z" />
    </G>
  </Svg>
);

export default Hamburger;
