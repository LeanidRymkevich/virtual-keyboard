import Keyboard from './Keyboard.js';
import {
  enLayout, ruLayout, btnCodes, btnSpecialCodes,
} from './keyboard-layouts.js';
import KeyboardLogic from './KeyboardLogic.js';

const BODY = document.querySelector('body');
const PARAGRAPHS = [
  {
    en: 'The keyboard was created in the Windows operating system',
    ru: 'Клавиатура создана в операционной системе Windows',
  },
  {
    en: 'Press ctrl+alt to change language',
    ru: 'Нажмите ctrl+alt для смены языка',
  },
];

let lang = localStorage.getItem('lang') || 'en';
let display;
let keyboard;
let keyboardLayout;
let info;

function initialKeyboardRendring(where) {
  keyboard = new Keyboard(btnCodes, btnSpecialCodes);
  keyboardLayout = keyboard.getEmptyKeyboard();

  keyboard.addLangMap('en', enLayout);
  keyboard.addLangMap('ru', ruLayout);
  where.append(keyboardLayout);
  keyboard.renderLangMap(keyboardLayout, lang);
}

function renderInfo(where) {
  info = document.createElement('div');
  info.className = 'info';

  let infoRow;
  PARAGRAPHS.forEach((paragraph) => {
    infoRow = document.createElement('p');
    infoRow.className = 'info__row';
    infoRow.textContent = paragraph[lang];
    info.append(infoRow);
  });

  where.append(info);
}

function renderDisplay(where) {
  display = document.createElement('textarea');
  display.className = 'display';
  where.append(display);
}

function initialRendring() {
  const container = document.createElement('div');
  container.className = 'container';
  BODY.append(container);

  renderDisplay(container);
  initialKeyboardRendring(container);
  renderInfo(container);
}

// functions calling

initialRendring();

const logic = new KeyboardLogic(keyboard, keyboardLayout, lang, PARAGRAPHS);
logic.buttonDownHandler();
logic.buttonUpHandler();

window.addEventListener('beforeunload', () => {
  lang = logic.lang;
  localStorage.setItem('lang', lang);
});
