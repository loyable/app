import React from "react";
import Svg, { Path, G, Circle } from "react-native-svg";

const Chiama = props => (
  <Svg width={46.365} height={46.365} {...props}>
    <Path
      d="M32.735 32.747l.972-4.211a.978.978 0 00-.563-1.113l-4.535-1.944a.969.969 0 00-1.134.279l-2.008 2.454a15.006 15.006 0 01-7.175-7.175l2.454-2.008a.971.971 0 00.275-1.134l-1.939-4.535a.983.983 0 00-1.118-.567l-4.211.972a.971.971 0 00-.753.947A18.786 18.786 0 0031.788 33.5a.971.971 0 00.947-.753z"
      fill="#007aff"
    />
    <G data-name="Ellipse 19" fill="none" stroke="#007aff" strokeWidth={2}>
      <Circle cx={23.182} cy={23.182} r={23.182} stroke="none" />
      <Circle cx={23.182} cy={23.182} r={22.182} />
    </G>
  </Svg>
);

export default Chiama;
