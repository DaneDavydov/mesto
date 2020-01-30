//контейнер с карточками
class CardList {
  constructor(container, cardTemplate, api) {
    this.container = container;
    this.cardTemplate = cardTemplate;
    this.api = api;
  }
  addCard(name, link) {
    const card = this.cardTemplate.create(name, link);
    this.container.insertAdjacentHTML("beforeend", card);
  }
  render(path) {
    this.api
      .get(path)
      .then(this.api.status)
      .then(cards => {
        cards.forEach(card => {
          //  Можно лучше: В качестве параметров передавайте не переменные, а объект
          //  если вы в ходе развития проекта захотите добавить переменных, то вам придётся менять код во многих местах 
          this.addCard(card.name, card.link);
        });
      })
      .catch(this.api.error);
  }
}