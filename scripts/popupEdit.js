// класс попап редактирование
class PopupEdit extends Popup {
  constructor(container, user, api) {
    super(container);
    this.api = api;
    this.user = user;
  }
  open(event) {
    if (event.target.classList.contains("user-info__edit-button")) {
      this.container.classList.add("popup_is-opened");
      const [name, job] = this.form.elements;
      name.value = this.user.name.textContent;
      job.value = this.user.about.textContent;
    }
  }
  close(event) {
    if (event.target.classList.contains("popup__close")) {
      this.container.classList.remove("popup_is-opened");
    }
  }
  submit(path, event) {
    // Правильно что используете  event.preventDefault();
    event.preventDefault();
    this.api
      .updateInfo(path, event)
      .then(this.api.status)
      .then(received => {
        this.user.name.textContent = received.name;
        this.user.about.textContent = received.about;
      })
      .catch(this.api.error);

    this.container.classList.remove("popup_is-opened");
  }
}