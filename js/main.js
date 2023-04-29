import Keyboard from './Keyboard.js';
import { enLayout, ruLayout, btnCodes } from './keyboard-layouts.js';

const body = document.querySelector('body');
const keyboard = new Keyboard('standart', 'english');

keyboard.renderKeyboard(body);

keyboard.lang = 'ru';

keyboard.renderKeyboard(body);
// keyboard.addEventListener('click', (event) => {
//   const button = event.target.closest('.keyboard__button');
//   if (button) {
//     button.classList.toggle('keyboard__button_active');
//   }
// });

console.log(enLayout);
console.log(ruLayout);
console.log(btnCodes);
