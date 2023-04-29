export default class Keyboard {
  constructor(layout, lang) {
    this.layout = layout;
    this.lang = lang;
  }

  renderKeyboard(where) {
    const target = where;
    target.textContent = `${this.layout} + ${this.lang}`;
  }
}
