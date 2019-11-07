import React from "react";
import Svg, { G, Path } from "react-native-svg";

const BackIcon = props => (
  <Svg width={81.621} height={24.243} {...props}>
    <G data-name="Indietro">
      <G
        data-name="Arrow Right"
        fill="none"
        stroke="#1681ff"
        strokeLinecap="round"
        strokeWidth={3}
      >
        <Path data-name="Line 2" d="M12.121 22.121l-10-10" />
        <Path data-name="Line 3" d="M2.121 12.121l10-10" />
      </G>
    </G>
  </Svg>
);

export default BackIcon;
