//Класс Popup
export default class Popup {
  constructor(container) {
    this.container = container;
    this.button = this.container.querySelector("button");
    this.form = this.container.querySelector("form");
  }
}
