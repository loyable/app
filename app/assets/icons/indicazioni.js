import React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

const Indicazioni = props => (
  <Svg width={46.365} height={46.365} {...props}>
    <G data-name="Ellipse 19" fill="none" stroke="#007aff" strokeWidth={2}>
      <Circle cx={23.182} cy={23.182} r={23.182} stroke="none" />
      <Circle cx={23.182} cy={23.182} r={22.182} />
    </G>
    <Path
      d="M35.961 21.815L25.026 10.88a1.567 1.567 0 00-2.215 0L11.877 21.815a1.567 1.567 0 000 2.215l10.935 10.934a1.566 1.566 0 002.215 0l10.934-10.935a1.567 1.567 0 000-2.215zm-4.931.613l-4.111 3.794a.391.391 0 01-.656-.287v-2.622h-4.688v3.125a.391.391 0 01-.391.391h-1.565a.391.391 0 01-.391-.391v-3.907a1.563 1.563 0 011.563-1.562h5.469v-2.624a.391.391 0 01.656-.287l4.112 3.8a.391.391 0 01.002.57z"
      fill="#007aff"
    />
  </Svg>
);

export default Indicazioni;
