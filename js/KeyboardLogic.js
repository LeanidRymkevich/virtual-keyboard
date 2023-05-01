export default class KeyboardLogic {
  constructor(keyboard, keyboardLayout, lang, PARAGRAPHS) {
    this.lang = lang;
    this.keyboard = keyboard;
    this.keyboardLayout = keyboardLayout;
    this.isShiftPressed = false;
    this.isCapslockPressed = false;
    this.ctrlPressed = '';
    this.altPressed = '';
    this.PARAGRAPHS = PARAGRAPHS;
    this.mouseDownButton = null;
    this.repeat = false;
  }

  buttonDownHandler() {
    this.keyDownHandler();
    this.mouseDownHandler();
  }

  buttonUpHandler() {
    this.keyUpHandler();
    this.mouseUpHandler();
  }

  keyDownHandler() {
    document.addEventListener('keydown', (event) => {
      const buttonCode = event.code;
      if (event.target === document.querySelector('.display')) event.preventDefault();
      if (!this.keyboard.layout.join().split(',').includes(buttonCode)) return;
      if (buttonCode.includes('Alt') || buttonCode === 'Tab') event.preventDefault();
      this.repeat = event.repeat;
      const keyboardButton = this.keyboardLayout.querySelector(`[data--btn-code=${buttonCode}]`);
      this.downHandler(keyboardButton, buttonCode, event);
    });
  }

  keyUpHandler() {
    document.addEventListener('keyup', (event) => {
      if (event.target === document.querySelector('.display')) event.preventDefault();
      const buttonCode = event.code;
      if (!this.keyboard.layout.join().split(',').includes(buttonCode)) return;
      const keyboardButton = this.keyboardLayout.querySelector(`[data--btn-code=${buttonCode}]`);
      this.upHandler(keyboardButton, buttonCode);
    });
  }

  mouseDownHandler() {
    document.addEventListener('mousedown', (event) => {
      const keyboardButton = event.target.closest('.keyboard__button');
      this.mouseDownButton = keyboardButton;
      if (!keyboardButton) return;
      this.repeat = event.repeat;
      const buttonCode = keyboardButton.dataset.BtnCode;
      this.downHandler(keyboardButton, buttonCode);
    });
  }

  mouseUpHandler() {
    document.addEventListener('mouseup', (event) => {
      const keyboardButton = event.target.closest('.keyboard__button');
      // to prevent fast mouse leaving without active removing
      if (this.mouseDownButton) {
        if (!keyboardButton) {
          this.mouseDownButton.classList.remove('keyboard__button_active');
          return;
        }
        if (this.mouseDownButton !== keyboardButton) {
          this.mouseDownButton.classList.remove('keyboard__button_active');
        }
        const buttonCode = keyboardButton.dataset.BtnCode;
        this.upHandler(keyboardButton, buttonCode);
      }
    });
  }

  downHandler(keyboardButton, buttonCode) {
    if (buttonCode === 'CapsLock' && !this.repeat) {
      this.isCapslockPressed = !this.isCapslockPressed;
      keyboardButton.classList.toggle('keyboard__button_active');
      this.keyboard.renderLangMap(
        this.keyboardLayout,
        this.lang,
        this.isShiftPressed,
        this.isCapslockPressed,
      );
    } else {
      keyboardButton.classList.add('keyboard__button_active');
    }

    function changeLang() {
      this.lang = this.lang === 'en' ? 'ru' : 'en';
      this.keyboard.renderLangMap(
        this.keyboardLayout,
        this.lang,
        this.isShiftPressed,
        this.isCapslockPressed,
      );

      const info = document.querySelector('.info');
      const rows = info.querySelectorAll('.info__row');
      for (let i = 0; i < rows.length; i += 1) {
        rows[i].textContent = this.PARAGRAPHS[i][this.lang];
      }
    }

    if (buttonCode.includes('Control') && !this.repeat) {
      this.ctrlPressed = buttonCode.replace('Control', '');
      if (this.altPressed === this.ctrlPressed) {
        changeLang.bind(this)();
      }
    }

    if (buttonCode.includes('Alt') && !this.repeat) {
      this.altPressed = buttonCode.replace('Alt', '');
      if (this.altPressed === this.ctrlPressed) {
        changeLang.bind(this)();
      }
    }

    if (buttonCode.includes('Shift')) {
      this.isShiftPressed = true;
      this.keyboard.renderLangMap(
        this.keyboardLayout,
        this.lang,
        this.isShiftPressed,
        this.isCapslockPressed,
      );
    }

    this.displayInput(keyboardButton, buttonCode);
  }

  upHandler(keyboardButton, buttonCode) {
    if (buttonCode !== 'CapsLock') {
      keyboardButton.classList.remove('keyboard__button_active');
    }

    if (buttonCode.includes('Control')) {
      this.ctrlPressed = '';
      this.repeat = false;
    }

    if (buttonCode.includes('Alt')) {
      this.altPressed = '';
      this.repeat = false;
    }

    if (buttonCode.includes('Shift')) {
      this.isShiftPressed = false;
      this.keyboard.renderLangMap(
        this.keyboardLayout,
        this.lang,
        this.isShiftPressed,
        this.isCapslockPressed,
      );
    }
  }

  displayInput(keyboardButton, buttonCode) {
    const display = document.querySelector('.display');
    const start = display.selectionStart;
    const end = display.selectionEnd;

    if (!this.keyboard.specialBtns.includes(buttonCode)) {
      display.value += keyboardButton.textContent;
    } else if (buttonCode === 'Tab') {
      display.value += '    ';
    } else if (buttonCode === 'Enter') {
      display.value += '\n';
    } else if (buttonCode === 'Backspace') {
      if (start === end) {
        if (start !== 0) {
          display.value = display.value.slice(0, start - 1) + (display.value[start] ? display.value.slice(start) : '');
          display.selectionStart = start - 1;
          display.selectionEnd = start - 1;
        }
      } else {
        display.value = display.value.slice(0, start) + display.value.slice(end);
        display.selectionStart = start;
        display.selectionEnd = start;
      }
    } else if (buttonCode === 'Delete') {
      if (start === end) {
        if (display.value.length !== 0) {
          display.value = display.value.slice(0, start) + (display.value[start + 1] ? display.value.slice(start + 1) : '');
          display.selectionStart = start;
          display.selectionEnd = start;
        }
      } else {
        display.value = display.value.slice(0, start) + display.value.slice(end);
        display.selectionStart = start;
        display.selectionEnd = start;
      }
    } else if (buttonCode === 'Space') {
      display.value += ' ';
    } else if (buttonCode.includes('Arrow')) {
      display.value += keyboardButton.textContent;
    }
  }
}
