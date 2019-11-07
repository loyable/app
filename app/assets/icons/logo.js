import React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */

const Logo = props => (
  <Svg viewBox="0 0 648.2 209.98" {...props}>
    <Defs>
      <LinearGradient
        id="prefix__a"
        x1={194.14}
        y1={724.3}
        x2={131.92}
        y2={879.68}
        gradientTransform="rotate(40.5 1046.326 348.341)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0} stopColor="#9e0d05" />
        <Stop offset={0.79} stopColor="#ff0d05" />
        <Stop offset={1} stopColor="#9e0d05" />
      </LinearGradient>
      <LinearGradient
        id="prefix__b"
        x1={188.06}
        y1={749.37}
        x2={180.29}
        y2={763.43}
        gradientTransform="rotate(40.5 1046.326 348.341)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0} stopColor="#9e0d05" />
        <Stop offset={0.49} stopColor="#ff0d05" />
        <Stop offset={1} stopColor="#9e0d05" />
      </LinearGradient>
    </Defs>
    <G data-name="Livello 2">
      <G data-name="Livello 1">
        <Path d="M0 161.7V0h10.93v161.7zM172.42 53.75l32.34 92-5.7 15.94L160.8 53.75zm70.6 0h11.62L199.75 210h-11.62zM272.86 129.59c0-16.63 10.93-28.47 37.12-29.61l27.79-1.14v10.25l-29.15 1.37c-16.63.68-24.83 7.06-24.83 18.9V136c0 9.1 7.75 17.31 19.59 17.31 5.46 0 10-1.14 13.44-3.65l20.95-13.89v11.61l-24.15 16a18 18 0 01-6.37.91c-21.18 0-34.39-12.07-34.39-30.29zm71.51-43.73c0-17.08-10.47-23.68-30.75-23.68l-31.88 2.27V53.52c15.72-1.59 27.79-2.28 36.21-2.28 16.4 0 37.35 6.61 37.35 35.76v74.7h-10.93zM399.49 126.4c0 18.45 10.25 27.56 31 27.56 21 0 31.43-9.11 31.43-27.56v-7.74h10.93v8.65q0 36.9-42.36 36.9c-28 0-41.9-12.3-41.9-36.9V0h10.93zm73.33-14.58h-10.93V89.73c0-18.9-8.42-27.73-21.89-27.73a23.52 23.52 0 00-13 3.87l-20.9 13.84V68.33l24.36-16.18a18.1 18.1 0 016.38-.91c23.69 0 36 13.67 36 34.62zM512.92 161.7V0h10.93v161.7zM648.2 113.19h-83.81V89.28c0-24.37 11.38-38 42.13-38s41.68 13.67 41.68 38zm-83.81 10V120h10.93v6.14c0 9.8 3.64 16.63 10.93 21 7.52 4.32 16.4 6.37 26.65 6.37 12.52 0 23.23-.68 31.65-2.27v10.46a220.54 220.54 0 01-33.25 2.51c-31.2 0-46.91-13.67-46.91-41zm72.88-20.95V84c0-13.44-10.71-22.55-30.75-22.55-19.13 0-31.2 8.2-31.2 23v17.76z" />
        <Path
          d="M141.79 146.68a56.48 56.48 0 11-25.51-90.4c13 18.08 19.68 48.14 32.63 79.84a55.93 55.93 0 01-7.12 10.56z"
          fill="url(#prefix__a)"
        />
        <Path
          d="M148.91 136.12c-33.8-15.19-34.86-51.75-32.63-79.84 12.98 18.08 19.72 48.14 32.63 79.84z"
          fill="url(#prefix__b)"
        />
      </G>
    </G>
  </Svg>
);

export default Logo;
