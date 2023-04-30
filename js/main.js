import Keyboard from './Keyboard.js';
import {
  enLayout, ruLayout, btnCodes, btnSpecialCodes,
} from './keyboard-layouts.js';

const body = document.querySelector('body');
const keyboardObj = new Keyboard(btnCodes, btnSpecialCodes);

keyboardObj.addLangMap('en', enLayout);
keyboardObj.addLangMap('ru', ruLayout);

body.append(keyboardObj.getEmptyKeyboard());
const keyboard = document.querySelector('.keyboard');
keyboardObj.renderLangMap(keyboard, 'en', true, true);
