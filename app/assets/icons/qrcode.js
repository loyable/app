import React from "react";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";

const QRCode = props => (
  <Svg width={32} height={32} {...props}>
    <Defs>
      <LinearGradient
        id="prefix__a"
        x2={1}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#fff" />
        <Stop offset={0} stopColor="#8e8e93" />
        <Stop offset={1} stopColor="#8e8e93" />
      </LinearGradient>
    </Defs>
    <Path
      data-name="qrcode"
      d="M0 45.714h13.714V32H0zm4.571-9.143h4.572v4.571H4.571zM18.286 32v13.714H32V32zm9.143 9.143h-4.572v-4.572h4.571zM0 64h13.714V50.286H0zm4.571-9.143h4.572v4.571H4.571zm25.143-4.571H32v9.143h-6.857v-2.286h-2.286V64h-4.571V50.286h6.857v2.286h4.571zm0 11.429H32V64h-2.286zm-4.571 0h2.286V64h-2.286z"
      transform="translate(0 -32)"
      fill="url(#prefix__a)"
    />
  </Svg>
);

export default QRCode;
