import assets from "./assets";

const tintColorLight = '#2D3035';
const tintColorDark = '#DEDEDE';
const tintColorAccent = "#40BFFF"
const tintColorPrimary = "#40BFFF"
const accentColor = '#8C3BD7'
export default {
  light: {
    text: '#000',
    background: '#f4f4f4',
    tint: '#1F1F1F',
    primary: tintColorPrimary,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    lightGray: '#EFEFEF',
    chatBackground: assets.chat_background,
    accent: accentColor,
    red: '#FD6464',
    gray: 'gray',
    green: '#8FFD67',

  },
  dark: {
    red: '#FD6464',
    text: '#fff',
    background: '#333',
    tint: 'white',
    primary: tintColorPrimary,
    gray: 'gray',
    lightGray: 'black',
    chatBackground: assets.chat_background_dark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    accent: accentColor

  },
};


