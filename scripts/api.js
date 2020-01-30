class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  get(path) {
    return fetch(`${this.url}${path}`, {
      headers: this.headers
    });
  }

  //Обновляем информацию о пользователе
  updateInfo(path, event) {
    return fetch(`${this.url}${path}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: event.currentTarget.elements.name.value,
        about: event.currentTarget.elements.job.value
      })
    });  
  }


  // другие методы работы с API
  status(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, переходим в catch
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  error(err) {
    return console.log(err); // выведем ошибку в консоль
  }
}