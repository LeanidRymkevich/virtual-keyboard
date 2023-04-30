export default class Keyboard {
  constructor(layout, specialBtns) {
    this.layout = layout;
    this.specialBtns = specialBtns;
    this.langMaps = new Map();
  }

  addLangMap(lang, langMap) {
    this.langMaps.set(lang, langMap);
  }

  getEmptyKeyboard() {
    const keyboard = document.createElement('div');
    keyboard.className = 'keyboard';

    let keyboardRow;
    let keyboardButton;

    this.layout.forEach((row) => {
      keyboardRow = document.createElement('div');
      keyboardRow.className = 'keyboard__row';

      row.forEach((button) => {
        keyboardButton = document.createElement('button');
        keyboardButton.className = 'keyboard__button';
        keyboardButton.dataset.BtnCode = button;
        if (this.specialBtns.includes(button)) {
          keyboardButton.classList.add('keyboard__button_special');
          if (button.includes('Shift')) {
            keyboardButton.classList.add('keyboard__button_shift');
          } else if (button.includes('Alt')) {
            keyboardButton.classList.add('keyboard__button_alt');
          } else if (button.includes('Control')) {
            keyboardButton.classList.add('keyboard__button_ctrl');
          } else if (button.includes('Meta')) {
            keyboardButton.classList.add('keyboard__button_win');
          } else if (button.includes('Arrow') || button === 'Delete') {
            keyboardButton.classList.add('keyboard__button_special');
          } else {
            keyboardButton.classList.add(`keyboard__button_${button.toLowerCase()}`);
          }
        }
        keyboardRow.append(keyboardButton);
      });

      keyboard.append(keyboardRow);
    });

    return keyboard;
  }

  renderLangMap(where, lang, isShiftPressed = false, isCapslockPressed = false) {
    const buttons = where.querySelectorAll('.keyboard__button');
    const langMap = this.langMaps.get(lang);
    let buttonValues;

    if (isShiftPressed) {
      buttonValues = langMap.shift;
    } else {
      buttonValues = langMap.ordinary;
    }

    let counter = 0;
    for (let i = 0; i < buttonValues.length; i += 1) {
      for (let j = 0; j < buttonValues[i].length; j += 1) {
        if (!this.specialBtns.includes(buttons[counter].dataset.BtnCode) && isCapslockPressed) {
          buttons[counter].textContent = buttonValues[i][j].toUpperCase();
        } else {
          buttons[counter].textContent = buttonValues[i][j];
        }
        counter += 1;
      }
    }
  }
}
