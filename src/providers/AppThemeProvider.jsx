"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { GlobalStyles } from "@mui/material";
import { useSave } from "../stores/useStores";
import cachedKeys from "../constants/cachedKeys";
import {
  bg,
  black,
  blue,
  danger,
  info,
  orange,
  primary,
  red,
  secondary,
  success,
  warning,
  white,
  grey,
  client,
} from "../constants/color";
import { localStorageFunc } from "../helpers/common";

const lightTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1024,
      xlg: 1200,
      xl: 1600,
      xxl: 1920,
    },
  },
  typography: {
    fontFamily: "noto-sans",
  },
  palette: {
    mode: "light",
    primary: {
      main: "#D0165D",
    },
  },
  colors: {
    custom: {
      borderColor: "rgba(224, 224, 224, 1)",
      background: "#ffffff",
      primaryText: "#3B3E45",
      secondaryText: "#666E7D",
      checkedout: "#12BDB2",
      checkedin: "#8239BC",
      confirmed: "#54A0CA",
      none: "#666E7D",
      scheduled: "#FBB500",
      sidebarBackground: "#F3F4F6",
      switcherActive: "#DCDFE3",
      textRedErrors: "#d32f2f",
    },
    client: {
      cardDark: client["cardDark"],
      white: client["white"],
      lightGray: client["lightGray"],
      midGray: client["midGray"],
      gray: client["gray"],
      grayScale: client["grayScale"],
      grayScale300: client["grayScale300"],
      darkGray: client["darkGray"],
      grayNeutral203: client["grayNeutral203"],
      midBlack: client["midBlack"],
      black: client["black"],
      blue: client["blue"],
      green: client["green"],
      greenLighter: client["greenLighter"],
      brown: client["brown"],
      yellow: client["yellow"],
      red: client["red"],
      coBaltBlue: client["coBaltBlue"],
      coBaltBlueLighter: client["coBaltBlueLighter"],
      backgroundBlue: client["backgroundBlue"],
      grayScaleLighter: client["grayScaleLighter"],
      primaryPurple: client["primaryPurple"],
      borderGray: client["borderGray"],
      blackSubtitle: client["blackSubtitle"],
      lightBlue: client["lightBlue"],
      grayBackground: client["grayBackground"],
      textPaginationBlack: client["textPaginationBlack"],
      titleBlack: client["titleBlack"],
      grayScaleText: client["grayScaleText"],
      pinkBackground: client["pinkBackground"],
      grayBackgroundPreview: client["grayBackgroundPreview"],
      blackBackdropDialog: client["blackBackdropDialog"],
      blackBoxShadowDark: client["blackBoxShadowDark"],
      blackBoxShadowLighter: client["blackBoxShadowLighter"],
      blackBoxShadowLight: client["blackBoxShadowLight"],
    },
    // primary
    primary100: primary[100],
    primary150: primary[150],
    primary200: primary[200],
    primary250: primary[250],
    primary300: primary[300],
    primary350: primary[350],
    primary400: primary[400],
    primary450: primary[450],
    primary500: primary[500],
    primary550: primary[550],
    primary600: primary[600],
    primary650: primary[650],
    primary700: primary[700],
    primary750: primary[750],
    primary800: primary[800],
    primary850: primary[850],
    primary900: primary[900],
    primaryDefault: primary["default"],
    // secondary
    secondary100: secondary[100],
    secondary150: secondary[150],
    secondary200: secondary[200],
    secondary250: secondary[250],
    secondary300: secondary[300],
    secondary350: secondary[350],
    secondary400: secondary[400],
    secondary450: secondary[450],
    secondary500: secondary[500],
    secondary550: secondary[550],
    secondary600: secondary[600],
    secondary650: secondary[650],
    secondary700: secondary[700],
    secondary750: secondary[750],
    secondary800: secondary[800],
    secondary850: secondary[850],
    secondary900: secondary[900],
    secondaryDefault: secondary["default"],
    // info
    info100: info[100],
    info150: info[150],
    info200: info[200],
    info250: info[250],
    info300: info[300],
    info350: info[350],
    info400: info[400],
    info450: info[450],
    info500: info[500],
    info550: info[550],
    info600: info[600],
    info650: info[650],
    info700: info[700],
    info750: info[750],
    info800: info[800],
    info850: info[850],
    info900: info[900],
    infoDefault: info["default"],
    // warning
    warning100: warning[100],
    warning150: warning[150],
    warning200: warning[200],
    warning250: warning[250],
    warning300: warning[300],
    warning350: warning[350],
    warning400: warning[400],
    warning450: warning[450],
    warning500: warning[500],
    warning550: warning[550],
    warning600: warning[600],
    warning650: warning[650],
    warning700: warning[700],
    warning750: warning[750],
    warning800: warning[800],
    warning850: warning[850],
    warning900: warning[900],
    warningDefault: warning["default"],
    // danger
    danger100: danger[100],
    danger150: danger[150],
    danger200: danger[200],
    danger250: danger[250],
    danger300: danger[300],
    danger350: danger[350],
    danger400: danger[400],
    danger450: danger[450],
    danger500: danger[500],
    danger550: danger[550],
    danger600: danger[600],
    danger650: danger[650],
    danger700: danger[700],
    danger750: danger[750],
    danger800: danger[800],
    danger850: danger[850],
    danger900: danger[900],
    dangerDefault: danger["default"],
    // success
    success100: success[100],
    success150: success[150],
    success200: success[200],
    success250: success[250],
    success300: success[300],
    success350: success[350],
    success400: success[400],
    success450: success[450],
    success500: success[500],
    success550: success[550],
    success600: success[600],
    success650: success[650],
    success700: success[700],
    success750: success[750],
    success800: success[800],
    success850: success[850],
    success900: success[900],
    successDefault: success["default"],
    // blue
    blue100: blue[100],
    blue150: blue[150],
    blue200: blue[200],
    blue250: blue[250],
    blue300: blue[300],
    blue350: blue[350],
    blue400: blue[400],
    blue450: blue[450],
    blue500: blue[500],
    blue550: blue[550],
    blue600: blue[600],
    blue650: blue[650],
    blue700: blue[700],
    blue750: blue[750],
    blue800: blue[800],
    blue850: blue[850],
    blue900: blue[900],
    blueDefault: blue["default"],
    // orange
    orange100: orange[100],
    orange150: orange[150],
    orange200: orange[200],
    orange250: orange[250],
    orange300: orange[300],
    orange350: orange[350],
    orange400: orange[400],
    orange450: orange[450],
    orange500: orange[500],
    orange550: orange[550],
    orange600: orange[600],
    orange650: orange[650],
    orange700: orange[700],
    orange750: orange[750],
    orange800: orange[800],
    orange850: orange[850],
    orange900: orange[900],
    orangeDefault: orange["default"],
    // red
    red100: red[100],
    red150: red[150],
    red200: red[200],
    red250: red[250],
    red300: red[300],
    red350: red[350],
    red400: red[400],
    red450: red[450],
    red500: red[500],
    red550: red[550],
    red600: red[600],
    red650: red[650],
    red700: red[700],
    red750: red[750],
    red800: red[800],
    red850: red[850],
    red900: red[900],
    redDefault: red["default"],
    // bg
    bgblack: bg["bgblack"],
    bgwhite: bg["bgwhite"],
    bgslate50: bg["bgslate50"],
    bgslate100: bg["bgslate100"],
    bgslate200: bg["bgslate200"],
    bgslate300: bg["bgslate300"],
    bgslate400: bg["bgslate400"],
    bgslate500: bg["bgslate500"],
    bgslate600: bg["bgslate600"],
    bgslate700: bg["bgslate700"],
    bgslate800: bg["bgslate800"],
    bgslate900: bg["bgslate900"],
    bgslate950: bg["bgslate950"],
    bggray50: bg["bggray50"],
    bggray100: bg["bggray100"],
    bggray200: bg["bggray200"],
    bggray300: bg["bggray300"],
    bggray400: bg["bggray400"],
    bggray500: bg["bggray500"],
    bggray600: bg["bggray600"],
    bggray700: bg["bggray700"],
    bggray800: bg["bggray800"],
    bggray900: bg["bggray900"],
    bggray950: bg["bggray950"],
    bgzinc50: bg["bgzinc50"],
    bgzinc100: bg["bgzinc100"],
    bgzinc200: bg["bgzinc200"],
    bgzinc300: bg["bgzinc300"],
    bgzinc400: bg["bgzinc400"],
    bgzinc500: bg["bgzinc500"],
    bgzinc600: bg["bgzinc600"],
    bgzinc700: bg["bgzinc700"],
    bgzinc800: bg["bgzinc800"],
    bgzinc900: bg["bgzinc900"],
    bgzinc950: bg["bgzinc950"],
    bgneutral50: bg["bgneutral50"],
    bgneutral100: bg["bgneutral100"],
    bgneutral200: bg["bgneutral200"],
    bgneutral300: bg["bgneutral300"],
    bgneutral400: bg["bgneutral400"],
    bgneutral500: bg["bgneutral500"],
    bgneutral600: bg["bgneutral600"],
    bgneutral700: bg["bgneutral700"],
    bgneutral800: bg["bgneutral800"],
    bgneutral900: bg["bgneutral900"],
    bgneutral950: bg["bgneutral950"],
    bgstone50: bg["bgstone50"],
    bgstone100: bg["bgstone100"],
    bgstone200: bg["bgstone200"],
    bgstone300: bg["bgstone300"],
    bgstone400: bg["bgstone400"],
    bgstone500: bg["bgstone500"],
    bgstone600: bg["bgstone600"],
    bgstone700: bg["bgstone700"],
    bgstone800: bg["bgstone800"],
    bgstone900: bg["bgstone900"],
    bgstone950: bg["bgstone950"],
    bgred50: bg["bgred50"],
    bgred100: bg["bgred100"],
    bgred200: bg["bgred200"],
    bgred300: bg["bgred300"],
    bgred400: bg["bgred400"],
    bgred500: bg["bgred500"],
    bgred600: bg["bgred600"],
    bgred700: bg["bgred700"],
    bgred800: bg["bgred800"],
    bgred900: bg["bgred900"],
    bgred950: bg["bgred950"],
    bgorange50: bg["bgorange50"],
    bgorange100: bg["bgorange100"],
    bgorange200: bg["bgorange200"],
    bgorange300: bg["bgorange300"],
    bgorange400: bg["bgorange400"],
    bgorange600: bg["bgorange600"],
    bgorange700: bg["bgorange700"],
    bgorange800: bg["bgorange800"],
    bgorange900: bg["bgorange900"],
    bgorange950: bg["bgorange950"],
    bgamber50: bg["bgamber50"],
    bgamber100: bg["bgamber100"],
    bgamber200: bg["bgamber200"],
    bgamber300: bg["bgamber300"],
    bgamber400: bg["bgamber400"],
    bgamber500: bg["bgamber500"],
    bgamber600: bg["bgamber600"],
    bgamber700: bg["bgamber700"],
    bgamber800: bg["bgamber800"],
    bgamber900: bg["bgamber900"],
    bgamber950: bg["bgamber950"],
    bgyellow50: bg["bgyellow50"],
    bgyellow100: bg["bgyellow100"],
    bgyellow200: bg["bgyellow200"],
    bgyellow300: bg["bgyellow300"],
    bgyellow400: bg["bgyellow400"],
    bgyellow500: bg["bgyellow500"],
    bgyellow600: bg["bgyellow600"],
    bgyellow700: bg["bgyellow700"],
    bgyellow800: bg["bgyellow800"],
    bgyellow900: bg["bgyellow900"],
    bgyellow950: bg["bgyellow950"],
    bglime50: bg["bglime50"],
    bglime100: bg["bglime100"],
    bglime200: bg["bglime200"],
    bglime300: bg["bglime300"],
    bglime400: bg["bglime400"],
    bglime500: bg["bglime500"],
    bglime600: bg["bglime600"],
    bglime700: bg["bglime700"],
    bglime800: bg["bglime800"],
    bglime900: bg["bglime900"],
    bglime950: bg["bglime950"],
    bggreen50: bg["bggreen50"],
    bggreen100: bg["bggreen100"],
    bggreen200: bg["bggreen200"],
    bggreen300: bg["bggreen300"],
    bggreen400: bg["bggreen400"],
    bggreen500: bg["bggreen500"],
    bggreen600: bg["bggreen600"],
    bggreen700: bg["bggreen700"],
    bggreen800: bg["bggreen800"],
    bggreen900: bg["bggreen900"],
    bggreen950: bg["bggreen950"],
    bgemerald50: bg["bgemerald50"],
    bgemerald100: bg["bgemerald100"],
    bgemerald200: bg["bgemerald200"],
    bgemerald300: bg["bgemerald300"],
    bgemerald400: bg["bgemerald400"],
    bgemerald500: bg["bgemerald500"],
    bgemerald600: bg["bgemerald600"],
    bgemerald700: bg["bgemerald700"],
    bgemerald800: bg["bgemerald800"],
    bgemerald900: bg["bgemerald900"],
    bgemerald950: bg["bgemerald900"],
    bgteal50: bg["bgteal50"],
    bgteal100: bg["bgteal100"],
    bgteal200: bg["bgteal200"],
    bgteal300: bg["bgteal300"],
    bgteal400: bg["bgteal400"],
    bgteal500: bg["bgteal500"],
    bgteal600: bg["bgteal600"],
    bgteal700: bg["bgteal700"],
    bgteal800: bg["bgteal800"],
    bgteal900: bg["bgteal900"],
    bgteal950: bg["bgteal950"],
    bgcyan50: bg["bgcyan50"],
    bgcyan100: bg["bgcyan100"],
    bgcyan200: bg["bgcyan200"],
    bgcyan300: bg["bgcyan300"],
    bgcyan400: bg["bgcyan400"],
    bgcyan500: bg["bgcyan500"],
    bgcyan600: bg["bgcyan600"],
    bgcyan700: bg["bgcyan700"],
    bgcyan800: bg["bgcyan800"],
    bgcyan900: bg["bgcyan900"],
    bgcyan950: bg["bgcyan950"],
    bgsky50: bg["bgsky50"],
    bgsky100: bg["bgsky100"],
    bgsky200: bg["bgsky200"],
    bgsky300: bg["bgsky300"],
    bgsky400: bg["bgsky400"],
    bgsky500: bg["bgsky500"],
    bgsky600: bg["bgsky600"],
    bgsky700: bg["bgsky700"],
    bgsky800: bg["bgsky800"],
    bgsky900: bg["bgsky900"],
    bgsky950: bg["bgsky950"],
    bgblue50: bg["bgblue50"],
    bgblue100: bg["bgblue100"],
    bgblue200: bg["bgblue200"],
    bgblue300: bg["bgblue300"],
    bgblue400: bg["bgblue400"],
    bgblue500: bg["bgblue500"],
    bgblue600: bg["bgblue600"],
    bgblue700: bg["bgblue700"],
    bgblue800: bg["bgblue800"],
    bgblue900: bg["bgblue900"],
    bgblue950: bg["bgblue950"],
    bgindigo50: bg["bgindigo50"],
    bgindigo100: bg["bgindigo100"],
    bgindigo200: bg["bgindigo200"],
    bgindigo300: bg["bgindigo300"],
    bgindigo400: bg["bgindigo400"],
    bgindigo500: bg["bgindigo500"],
    bgindigo600: bg["bgindigo600"],
    bgindigo700: bg["bgindigo700"],
    bgindigo800: bg["bgindigo800"],
    bgindigo900: bg["bgindigo900"],
    bgindigo950: bg["bgindigo950"],
    bgviolet50: bg["bgviolet50"],
    bgviolet100: bg["bgviolet100"],
    bgviolet200: bg["bgviolet200"],
    bgviolet300: bg["bgviolet300"],
    bgviolet400: bg["bgviolet400"],
    bgviolet500: bg["bgviolet500"],
    bgviolet600: bg["bgviolet600"],
    bgviolet700: bg["bgviolet700"],
    bgviolet800: bg["bgviolet800"],
    bgviolet900: bg["bgviolet900"],
    bgviolet950: bg["bgviolet950"],
    bgpurple50: bg["bgpurple50"],
    bgpurple100: bg["bgpurple100"],
    bgpurple200: bg["bgpurple200"],
    bgpurple300: bg["bgpurple300"],
    bgpurple400: bg["bgpurple400"],
    bgpurple500: bg["bgpurple500"],
    bgpurple600: bg["bgpurple600"],
    bgpurple700: bg["bgpurple700"],
    bgpurple800: bg["bgpurple800"],
    bgpurple900: bg["bgpurple900"],
    bgpurple950: bg["bgpurple950"],
    bgfuchsia50: bg["bgfuchsia50"],
    bgfuchsia100: bg["bgfuchsia100"],
    bgfuchsia200: bg["bgfuchsia200"],
    bgfuchsia300: bg["bgfuchsia300"],
    bgfuchsia400: bg["bgfuchsia400"],
    bgfuchsia500: bg["bgfuchsia500"],
    bgfuchsia600: bg["bgfuchsia600"],
    bgfuchsia700: bg["bgfuchsia700"],
    bgfuchsia800: bg["bgfuchsia800"],
    bgfuchsia900: bg["bgfuchsia900"],
    bgfuchsia950: bg["bgfuchsia950"],
    bgpink50: bg["bgpink50"],
    bgpink100: bg["bgpink100"],
    bgpink200: bg["bgpink200"],
    bgpink300: bg["bgpink300"],
    bgpink400: bg["bgpink400"],
    bgpink500: bg["bgpink500"],
    bgpink600: bg["bgpink600"],
    bgpink700: bg["bgpink700"],
    bgpink800: bg["bgpink800"],
    bgpink900: bg["bgpink900"],
    bgpink950: bg["bgpink950"],
    bgrose50: bg["bgrose50"],
    bgrose100: bg["bgrose100"],
    bgrose200: bg["bgrose200"],
    bgrose300: bg["bgrose300"],
    bgrose400: bg["bgrose400"],
    bgrose500: bg["bgrose500"],
    bgrose600: bg["bgrose600"],
    bgrose700: bg["bgrose700"],
    bgrose800: bg["bgrose800"],
    bgrose900: bg["bgrose900"],
    bgrose950: bg["bgrose950"],
    white: white["default"],
    black: black["default"],
  },
});

const darkTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1024,
      xlg: 1200,
      xl: 1600,
      xxl: 1920,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#D0165D",
    },
  },
  colors: {
    custom: {
      background: "#2a2b2f",
      backgroundSecondary: "#191919",
      text: "#f9f9f9",
      switchTheme: "#b9cff3",
      textPrimary: "#D0165D",
    },
    client: {
      cardDark: client["cardDark"],
      white: client["white"],
      lightGray: client["lightGray"],
      midGray: client["midGray"],
      gray: client["gray"],
      grayScale: client["grayScale"],
      grayScale300: client["grayScale300"],
      darkGray: client["darkGray"],
      grayNeutral203: client["grayNeutral203"],
      midBlack: client["midBlack"],
      black: client["black"],
      blue: client["blue"],
      green: client["green"],
      greenLighter: client["greenLighter"],
      brown: client["brown"],
      yellow: client["yellow"],
      red: client["red"],
      coBaltBlue: client["coBaltBlue"],
      coBaltBlueLighter: client["coBaltBlueLighter"],
      backgroundBlue: client["backgroundBlue"],
      grayScaleLighter: client["grayScaleLighter"],
      primaryPurple: client["primaryPurple"],
      borderGray: client["borderGray"],
      blackSubtitle: client["blackSubtitle"],
      lightBlue: client["lightBlue"],
      grayBackground: client["grayBackground"],
      textPaginationBlack: client["textPaginationBlack"],
      titleBlack: client["titleBlack"],
      grayScaleText: client["grayScaleText"],
      pinkBackground: client["pinkBackground"],
      grayBackgroundPreview: client["grayBackgroundPreview"],
      blackBackdropDialog: client["blackBackdropDialog"],
      blackBoxShadowDark: client["blackBoxShadowDark"],
      blackBoxShadowLighter: client["blackBoxShadowLighter"],
      blackBoxShadowLight: client["blackBoxShadowLight"],
    },
    // primary
    primary100: primary[100],
    primary150: primary[150],
    primary200: primary[200],
    primary250: primary[250],
    primary300: primary[300],
    primary350: primary[350],
    primary400: primary[400],
    primary450: primary[450],
    primary500: primary[500],
    primary550: primary[550],
    primary600: primary[600],
    primary650: primary[650],
    primary700: primary[700],
    primary750: primary[750],
    primary800: primary[800],
    primary850: primary[850],
    primary900: primary[900],
    primaryDefault: primary["default"],
    // secondary
    secondary100: secondary[100],
    secondary150: secondary[150],
    secondary200: secondary[200],
    secondary250: secondary[250],
    secondary300: secondary[300],
    secondary350: secondary[350],
    secondary400: secondary[400],
    secondary450: secondary[450],
    secondary500: secondary[500],
    secondary550: secondary[550],
    secondary600: secondary[600],
    secondary650: secondary[650],
    secondary700: secondary[700],
    secondary750: secondary[750],
    secondary800: secondary[800],
    secondary850: secondary[850],
    secondary900: secondary[900],
    secondaryDefault: secondary["default"],
    // info
    info100: info[100],
    info150: info[150],
    info200: info[200],
    info250: info[250],
    info300: info[300],
    info350: info[350],
    info400: info[400],
    info450: info[450],
    info500: info[500],
    info550: info[550],
    info600: info[600],
    info650: info[650],
    info700: info[700],
    info750: info[750],
    info800: info[800],
    info850: info[850],
    info900: info[900],
    infoDefault: info["default"],
    // warning
    warning100: warning[100],
    warning150: warning[150],
    warning200: warning[200],
    warning250: warning[250],
    warning300: warning[300],
    warning350: warning[350],
    warning400: warning[400],
    warning450: warning[450],
    warning500: warning[500],
    warning550: warning[550],
    warning600: warning[600],
    warning650: warning[650],
    warning700: warning[700],
    warning750: warning[750],
    warning800: warning[800],
    warning850: warning[850],
    warning900: warning[900],
    warningDefault: warning["default"],
    // danger
    danger100: danger[100],
    danger150: danger[150],
    danger200: danger[200],
    danger250: danger[250],
    danger300: danger[300],
    danger350: danger[350],
    danger400: danger[400],
    danger450: danger[450],
    danger500: danger[500],
    danger550: danger[550],
    danger600: danger[600],
    danger650: danger[650],
    danger700: danger[700],
    danger750: danger[750],
    danger800: danger[800],
    danger850: danger[850],
    danger900: danger[900],
    dangerDefault: danger["default"],
    // success
    success100: success[100],
    success150: success[150],
    success200: success[200],
    success250: success[250],
    success300: success[300],
    success350: success[350],
    success400: success[400],
    success450: success[450],
    success500: success[500],
    success550: success[550],
    success600: success[600],
    success650: success[650],
    success700: success[700],
    success750: success[750],
    success800: success[800],
    success850: success[850],
    success900: success[900],
    successDefault: success["default"],
    // blue
    blue100: blue[100],
    blue150: blue[150],
    blue200: blue[200],
    blue250: blue[250],
    blue300: blue[300],
    blue350: blue[350],
    blue400: blue[400],
    blue450: blue[450],
    blue500: blue[500],
    blue550: blue[550],
    blue600: blue[600],
    blue650: blue[650],
    blue700: blue[700],
    blue750: blue[750],
    blue800: blue[800],
    blue850: blue[850],
    blue900: blue[900],
    blueDefault: blue["default"],
    // orange
    orange100: orange[100],
    orange150: orange[150],
    orange200: orange[200],
    orange250: orange[250],
    orange300: orange[300],
    orange350: orange[350],
    orange400: orange[400],
    orange450: orange[450],
    orange500: orange[500],
    orange550: orange[550],
    orange600: orange[600],
    orange650: orange[650],
    orange700: orange[700],
    orange750: orange[750],
    orange800: orange[800],
    orange850: orange[850],
    orange900: orange[900],
    orangeDefault: orange["default"],
    // red
    red100: red[100],
    red150: red[150],
    red200: red[200],
    red250: red[250],
    red300: red[300],
    red350: red[350],
    red400: red[400],
    red450: red[450],
    red500: red[500],
    red550: red[550],
    red600: red[600],
    red650: red[650],
    red700: red[700],
    red750: red[750],
    red800: red[800],
    red850: red[850],
    red900: red[900],
    redDefault: red["default"],
    // bg
    bgblack: bg["bgblack"],
    bgwhite: bg["bgwhite"],
    bgslate50: bg["bgslate50"],
    bgslate100: bg["bgslate100"],
    bgslate200: bg["bgslate200"],
    bgslate300: bg["bgslate300"],
    bgslate400: bg["bgslate400"],
    bgslate500: bg["bgslate500"],
    bgslate600: bg["bgslate600"],
    bgslate700: bg["bgslate700"],
    bgslate800: bg["bgslate800"],
    bgslate900: bg["bgslate900"],
    bgslate950: bg["bgslate950"],
    bggray50: bg["bggray50"],
    bggray100: bg["bggray100"],
    bggray200: bg["bggray200"],
    bggray300: bg["bggray300"],
    bggray400: bg["bggray400"],
    bggray500: bg["bggray500"],
    bggray600: bg["bggray600"],
    bggray700: bg["bggray700"],
    bggray800: bg["bggray800"],
    bggray900: bg["bggray900"],
    bggray950: bg["bggray950"],
    bgzinc50: bg["bgzinc50"],
    bgzinc100: bg["bgzinc100"],
    bgzinc200: bg["bgzinc200"],
    bgzinc300: bg["bgzinc300"],
    bgzinc400: bg["bgzinc400"],
    bgzinc500: bg["bgzinc500"],
    bgzinc600: bg["bgzinc600"],
    bgzinc700: bg["bgzinc700"],
    bgzinc800: bg["bgzinc800"],
    bgzinc900: bg["bgzinc900"],
    bgzinc950: bg["bgzinc950"],
    bgneutral50: bg["bgneutral50"],
    bgneutral100: bg["bgneutral100"],
    bgneutral200: bg["bgneutral200"],
    bgneutral300: bg["bgneutral300"],
    bgneutral400: bg["bgneutral400"],
    bgneutral500: bg["bgneutral500"],
    bgneutral600: bg["bgneutral600"],
    bgneutral700: bg["bgneutral700"],
    bgneutral800: bg["bgneutral800"],
    bgneutral900: bg["bgneutral900"],
    bgneutral950: bg["bgneutral950"],
    bgstone50: bg["bgstone50"],
    bgstone100: bg["bgstone100"],
    bgstone200: bg["bgstone200"],
    bgstone300: bg["bgstone300"],
    bgstone400: bg["bgstone400"],
    bgstone500: bg["bgstone500"],
    bgstone600: bg["bgstone600"],
    bgstone700: bg["bgstone700"],
    bgstone800: bg["bgstone800"],
    bgstone900: bg["bgstone900"],
    bgstone950: bg["bgstone950"],
    bgred50: bg["bgred50"],
    bgred100: bg["bgred100"],
    bgred200: bg["bgred200"],
    bgred300: bg["bgred300"],
    bgred400: bg["bgred400"],
    bgred500: bg["bgred500"],
    bgred600: bg["bgred600"],
    bgred700: bg["bgred700"],
    bgred800: bg["bgred800"],
    bgred900: bg["bgred900"],
    bgred950: bg["bgred950"],
    bgorange50: bg["bgorange50"],
    bgorange100: bg["bgorange100"],
    bgorange200: bg["bgorange200"],
    bgorange300: bg["bgorange300"],
    bgorange400: bg["bgorange400"],
    bgorange600: bg["bgorange600"],
    bgorange700: bg["bgorange700"],
    bgorange800: bg["bgorange800"],
    bgorange900: bg["bgorange900"],
    bgorange950: bg["bgorange950"],
    bgamber50: bg["bgamber50"],
    bgamber100: bg["bgamber100"],
    bgamber200: bg["bgamber200"],
    bgamber300: bg["bgamber300"],
    bgamber400: bg["bgamber400"],
    bgamber500: bg["bgamber500"],
    bgamber600: bg["bgamber600"],
    bgamber700: bg["bgamber700"],
    bgamber800: bg["bgamber800"],
    bgamber900: bg["bgamber900"],
    bgamber950: bg["bgamber950"],
    bgyellow50: bg["bgyellow50"],
    bgyellow100: bg["bgyellow100"],
    bgyellow200: bg["bgyellow200"],
    bgyellow300: bg["bgyellow300"],
    bgyellow400: bg["bgyellow400"],
    bgyellow500: bg["bgyellow500"],
    bgyellow600: bg["bgyellow600"],
    bgyellow700: bg["bgyellow700"],
    bgyellow800: bg["bgyellow800"],
    bgyellow900: bg["bgyellow900"],
    bgyellow950: bg["bgyellow950"],
    bglime50: bg["bglime50"],
    bglime100: bg["bglime100"],
    bglime200: bg["bglime200"],
    bglime300: bg["bglime300"],
    bglime400: bg["bglime400"],
    bglime500: bg["bglime500"],
    bglime600: bg["bglime600"],
    bglime700: bg["bglime700"],
    bglime800: bg["bglime800"],
    bglime900: bg["bglime900"],
    bglime950: bg["bglime950"],
    bggreen50: bg["bggreen50"],
    bggreen100: bg["bggreen100"],
    bggreen200: bg["bggreen200"],
    bggreen300: bg["bggreen300"],
    bggreen400: bg["bggreen400"],
    bggreen500: bg["bggreen500"],
    bggreen600: bg["bggreen600"],
    bggreen700: bg["bggreen700"],
    bggreen800: bg["bggreen800"],
    bggreen900: bg["bggreen900"],
    bggreen950: bg["bggreen950"],
    bgemerald50: bg["bgemerald50"],
    bgemerald100: bg["bgemerald100"],
    bgemerald200: bg["bgemerald200"],
    bgemerald300: bg["bgemerald300"],
    bgemerald400: bg["bgemerald400"],
    bgemerald500: bg["bgemerald500"],
    bgemerald600: bg["bgemerald600"],
    bgemerald700: bg["bgemerald700"],
    bgemerald800: bg["bgemerald800"],
    bgemerald900: bg["bgemerald900"],
    bgemerald950: bg["bgemerald900"],
    bgteal50: bg["bgteal50"],
    bgteal100: bg["bgteal100"],
    bgteal200: bg["bgteal200"],
    bgteal300: bg["bgteal300"],
    bgteal400: bg["bgteal400"],
    bgteal500: bg["bgteal500"],
    bgteal600: bg["bgteal600"],
    bgteal700: bg["bgteal700"],
    bgteal800: bg["bgteal800"],
    bgteal900: bg["bgteal900"],
    bgteal950: bg["bgteal950"],
    bgcyan50: bg["bgcyan50"],
    bgcyan100: bg["bgcyan100"],
    bgcyan200: bg["bgcyan200"],
    bgcyan300: bg["bgcyan300"],
    bgcyan400: bg["bgcyan400"],
    bgcyan500: bg["bgcyan500"],
    bgcyan600: bg["bgcyan600"],
    bgcyan700: bg["bgcyan700"],
    bgcyan800: bg["bgcyan800"],
    bgcyan900: bg["bgcyan900"],
    bgcyan950: bg["bgcyan950"],
    bgsky50: bg["bgsky50"],
    bgsky100: bg["bgsky100"],
    bgsky200: bg["bgsky200"],
    bgsky300: bg["bgsky300"],
    bgsky400: bg["bgsky400"],
    bgsky500: bg["bgsky500"],
    bgsky600: bg["bgsky600"],
    bgsky700: bg["bgsky700"],
    bgsky800: bg["bgsky800"],
    bgsky900: bg["bgsky900"],
    bgsky950: bg["bgsky950"],
    bgblue50: bg["bgblue50"],
    bgblue100: bg["bgblue100"],
    bgblue200: bg["bgblue200"],
    bgblue300: bg["bgblue300"],
    bgblue400: bg["bgblue400"],
    bgblue500: bg["bgblue500"],
    bgblue600: bg["bgblue600"],
    bgblue700: bg["bgblue700"],
    bgblue800: bg["bgblue800"],
    bgblue900: bg["bgblue900"],
    bgblue950: bg["bgblue950"],
    bgindigo50: bg["bgindigo50"],
    bgindigo100: bg["bgindigo100"],
    bgindigo200: bg["bgindigo200"],
    bgindigo300: bg["bgindigo300"],
    bgindigo400: bg["bgindigo400"],
    bgindigo500: bg["bgindigo500"],
    bgindigo600: bg["bgindigo600"],
    bgindigo700: bg["bgindigo700"],
    bgindigo800: bg["bgindigo800"],
    bgindigo900: bg["bgindigo900"],
    bgindigo950: bg["bgindigo950"],
    bgviolet50: bg["bgviolet50"],
    bgviolet100: bg["bgviolet100"],
    bgviolet200: bg["bgviolet200"],
    bgviolet300: bg["bgviolet300"],
    bgviolet400: bg["bgviolet400"],
    bgviolet500: bg["bgviolet500"],
    bgviolet600: bg["bgviolet600"],
    bgviolet700: bg["bgviolet700"],
    bgviolet800: bg["bgviolet800"],
    bgviolet900: bg["bgviolet900"],
    bgviolet950: bg["bgviolet950"],
    bgpurple50: bg["bgpurple50"],
    bgpurple100: bg["bgpurple100"],
    bgpurple200: bg["bgpurple200"],
    bgpurple300: bg["bgpurple300"],
    bgpurple400: bg["bgpurple400"],
    bgpurple500: bg["bgpurple500"],
    bgpurple600: bg["bgpurple600"],
    bgpurple700: bg["bgpurple700"],
    bgpurple800: bg["bgpurple800"],
    bgpurple900: bg["bgpurple900"],
    bgpurple950: bg["bgpurple950"],
    bgfuchsia50: bg["bgfuchsia50"],
    bgfuchsia100: bg["bgfuchsia100"],
    bgfuchsia200: bg["bgfuchsia200"],
    bgfuchsia300: bg["bgfuchsia300"],
    bgfuchsia400: bg["bgfuchsia400"],
    bgfuchsia500: bg["bgfuchsia500"],
    bgfuchsia600: bg["bgfuchsia600"],
    bgfuchsia700: bg["bgfuchsia700"],
    bgfuchsia800: bg["bgfuchsia800"],
    bgfuchsia900: bg["bgfuchsia900"],
    bgfuchsia950: bg["bgfuchsia950"],
    bgpink50: bg["bgpink50"],
    bgpink100: bg["bgpink100"],
    bgpink200: bg["bgpink200"],
    bgpink300: bg["bgpink300"],
    bgpink400: bg["bgpink400"],
    bgpink500: bg["bgpink500"],
    bgpink600: bg["bgpink600"],
    bgpink700: bg["bgpink700"],
    bgpink800: bg["bgpink800"],
    bgpink900: bg["bgpink900"],
    bgpink950: bg["bgpink950"],
    bgrose50: bg["bgrose50"],
    bgrose100: bg["bgrose100"],
    bgrose200: bg["bgrose200"],
    bgrose300: bg["bgrose300"],
    bgrose400: bg["bgrose400"],
    bgrose500: bg["bgrose500"],
    bgrose600: bg["bgrose600"],
    bgrose700: bg["bgrose700"],
    bgrose800: bg["bgrose800"],
    bgrose900: bg["bgrose900"],
    bgrose950: bg["bgrose950"],
    white: white["default"],
    black: black["default"],
  },
});

export const keyTheme = "theme-mode";

const Theme = {
  light: "light",
  dark: "dark",
};

const switchTheme = {
  [Theme.dark]: darkTheme,
  [Theme.light]: lightTheme,
};

export default function AppThemeProvider(props) {
  const { children } = props;
  const save = useSave();
  const [theme, setTheme] = useState(localStorageFunc?.getItem(keyTheme));

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === Theme.light ? Theme.dark : Theme.light;
      localStorageFunc?.setItem(keyTheme, nextTheme);
      return nextTheme;
    });
  }, []);

  useEffect(() => {
    save(cachedKeys.toggleTheme, toggleTheme);
  }, [save, toggleTheme]);

  return (
    <ThemeProvider theme={switchTheme[theme] || lightTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            // fontFamily: 'Epilogue, sans-serif',
            fontFamily: "Plus Jakarta Sans",
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}
