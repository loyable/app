import React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style, title */

const LogoBianco = props => (
  <Svg viewBox="0 0 283.46 91.83" {...props}>
    <Defs>
      <LinearGradient
        id="prefix__Sfumatura_senza_nome_159"
        x1={-59.58}
        y1={213.07}
        x2={-86.78}
        y2={281.02}
        gradientTransform="rotate(40.5 245.12 296.325)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0} stopColor="#9e0d05" />
        <Stop offset={0.79} stopColor="#ff0d05" />
        <Stop offset={1} stopColor="#9e0d05" />
      </LinearGradient>
      <LinearGradient
        id="prefix__Sfumatura_senza_nome_22"
        x1={-62.23}
        y1={224.03}
        x2={-65.63}
        y2={230.18}
        gradientTransform="rotate(40.5 245.12 296.325)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0} stopColor="#9e0d05" />
        <Stop offset={0.49} stopColor="#ff0d05" />
        <Stop offset={1} stopColor="#9e0d05" />
      </LinearGradient>
    </Defs>
    <G id="prefix__Livello_2" data-name="Livello 2">
      <G id="prefix__Livello_1-2" data-name="Livello 1">
        <Path
          className="prefix__cls-1"
          d="M0 70.71V0h4.78v70.71zM75.4 23.51l14.14 40.23-2.49 7-16.73-47.23zm30.88 0h5.07l-24 68.32h-5.08zM119.32 56.67c0-7.27 4.79-12.45 16.24-13l12.15-.49v4.48L135 48.3c-7.27.3-10.85 3.09-10.85 8.27v2.89c0 4 3.38 7.57 8.56 7.57a9.82 9.82 0 005.88-1.59l9.16-6.08v5.08l-10.56 7a7.79 7.79 0 01-2.79.4c-9.26 0-15-5.28-15-13.25zm31.28-19.12c0-7.47-4.58-10.36-13.45-10.36l-13.94 1V23.4c6.87-.69 12.15-1 15.84-1 7.17 0 16.33 2.89 16.33 15.64v32.67h-4.78zM174.7 55.28c0 8.06 4.48 12 13.55 12s13.74-4 13.74-12v-3.39h4.78v3.78q0 16.14-18.52 16.14c-12.25 0-18.33-5.38-18.33-16.14V0h4.78zm32.07-6.38H202v-9.66c0-8.27-3.68-12.15-9.56-12.15a10.34 10.34 0 00-5.68 1.69l-9.16 6.08v-5l10.66-7.07a7.79 7.79 0 012.79-.4c10.35 0 15.73 6 15.73 15.14zM224.3 70.71V0h4.78v70.71zM283.46 49.5h-36.65V39c0-10.65 5-16.63 18.43-16.63s18.22 6 18.22 16.63zm-36.65 4.38v-1.39h4.78v2.69c0 4.28 1.6 7.27 4.78 9.16A23 23 0 00268 67.13a77 77 0 0013.84-1v4.58a96.42 96.42 0 01-14.54 1.1c-13.62 0-20.49-5.98-20.49-17.93zm31.87-9.16v-8c0-5.88-4.68-9.86-13.44-9.86-8.37 0-13.65 3.59-13.65 10.06v7.77z"
        />
        <Path
          d="M62 64.14a24.7 24.7 0 11-11.15-39.53c5.68 7.91 8.61 21 14.27 34.92A24.39 24.39 0 0162 64.14z"
          fill="url(#prefix__Sfumatura_senza_nome_159)"
        />
        <Path
          d="M65.12 59.53c-14.78-6.65-15.24-22.64-14.27-34.92 5.68 7.91 8.61 21.05 14.27 34.92z"
          fill="url(#prefix__Sfumatura_senza_nome_22)"
        />
      </G>
    </G>
  </Svg>
);

export default LogoBianco;
