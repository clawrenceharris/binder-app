import assets from "./assets";

const tintColorLight = '#2D3035';
const tintColorDark = '#DEDEDE';
const tintColorAccent = "#40BFFF"
const tintColorPrimary = "#40BFFF"
const accentColor = '#8C3BD7'
export default {
  light: {
    text: '#000',
    background: 'white',
    tint: '#1F1F1F',
    primary: tintColorPrimary,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    lightGray: '#EFEFEF',
    chatBackground: assets.chat_background,
    accent: accentColor,
    red: '#FD6464',


    gray: '626262'
  },
  dark: {
    red: '#FD6464',
    text: '#fff',
    background: 'darkgray',
    tint: 'white',
    primary: tintColorPrimary,
    gray: 'f2f2f2',
    lightGray: 'black',
    chatBackground: assets.chat_background_dark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    accent: accentColor

  },
};


