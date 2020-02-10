import Popup from './popup';
// класс попап place
export default class PopupPlace extends Popup {
  constructor(container, cardList) {
    super(container);
    this.cardList = cardList;
  }
  open(event) {
    if (event.target.classList.contains("user-info__button")) {
      this.container.classList.add("popup_is-opened");
      this.form.reset();
    }
  }
  close(event) {
    if (event.target.classList.contains("popup__close")) {
      this.container.classList.remove("popup_is-opened");
    }
  }
  submit(event) {
    event.preventDefault();
    const [name, link] = this.form.elements;
    this.cardList.addCard(name.value, link.value);
    this.container.classList.remove("popup_is-opened");
  }
}