//блок user-info
export default class UserInfo {
  constructor(doc, api) {
    this.name = doc.querySelector(".user-info__name");
    this.about = doc.querySelector(".user-info__job");
    this.avatar = doc.querySelector(".user-info__photo");
    this.api = api;
  }

  getUserInfo(path) {
    this.api
      .get(path)
      .then(this.api.status)
      .then(user => {
        this.name.textContent = user.name;
        this.about.textContent = user.about;
        this.avatar.style.backgroundImage = `url(${user.avatar})`;
      })
      .catch(this.api.error);
  }
}