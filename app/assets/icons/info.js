import React from "react";
import Svg, { Path } from "react-native-svg";

const Info = props => (
  <Svg width={22} height={22} {...props}>
    <Path
      d="M3.222 18.778A11 11 0 1118.778 3.222 11 11 0 113.222 18.778zM1 11A10 10 0 1011 1 10.011 10.011 0 001 11zm8 6.5V17h1V9.5H9V9h3v8h1v.5zm.5-11.25a1.25 1.25 0 111.25 1.25A1.251 1.251 0 019.5 6.25z"
      fill="#007aff"
      data-name="Button - Info"
    />
  </Svg>
);

export default Info;
