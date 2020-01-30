//подключение к серверу
const api = new Api({
    url: 'http://95.216.175.5/cohort6',
    headers: {
        authorization: 'f3ac0165-929d-4f0b-a0f7-3358575c163c',
        'Content-Type': 'application/json'
    }
});

//переменные
const popup = document.querySelector('.popup');
// формы
const userForm = document.forms.user;
const cardForm = document.forms.new;
// валидация
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const popupUserButton = document.querySelector('.popup__user-add-button');
const placeInput = document.querySelector('#place');
const linkInput = document.querySelector('#link');
const popupCardButton = document.querySelector('.popup__button');
const message = {
    validationLength: 'Должно быть от 2 до 30 символов',
    validationRequired: 'Это обязательное поле',
    validationLink: 'Здесь должна быть ссылка',
    validationDone: ''
};

//карточка
const card = new Card();
//место под карточки
const cardList = new CardList(document.querySelector(".places-list"), card, api);

//добавление карточек
cardList.render("/cards");

//Блок user-info
//const userInfo = new UserInfo(document.querySelector(".user-info"));
const userInfoDoc = document.querySelector(".user-info");
const userInfo = new UserInfo(userInfoDoc, api);
userInfo.getUserInfo("/users/me");

//Попап Edit
const edit = new PopupEdit(
    document.querySelector(".popup-edit"),
    userInfo,
    api
);

//Попап Place
const place = new PopupPlace(
    document.querySelector(".popup"),
    cardList
);

//Попап Image
const image = new PopupImage(document.querySelector(".popup_type_image"));

/*валидация*/
function handleValidate(event) {
    validate(event.target);
}

nameInput.addEventListener('input', handleValidate);
jobInput.addEventListener('input', handleValidate);
placeInput.addEventListener('input', handleValidate);
linkInput.addEventListener('input', handleValidate);

function cardValidate() {
    if (validate(placeInput) && validate(linkInput)) {
        popupCardButton.classList.add('popup__button-is-active');
        popupCardButton.removeAttribute('disabled');
    } else {
        popupCardButton.classList.remove('popup__button-is-active');
        popupCardButton.setAttribute('disabled', true);
    }
}

function userValidate() {
    if (validate(nameInput) && validate(jobInput)) {
        popupUserButton.classList.add('popup__button-is-active');
        popupUserButton.removeAttribute('disabled');
    } else {
        popupUserButton.classList.remove('popup__button-is-active');
        popupUserButton.setAttribute('disabled', true);
    }
}

userForm.addEventListener('input', userValidate);
cardForm.addEventListener('input', cardValidate);

function checkLink() {
    const str = cardForm.elements.link.value;
    return str.startsWith('https://') && !str.includes(' ') && !str.includes('"') && !str.includes(',') && str.includes('.');
}

function validate(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    if (element.id === 'link') {
        if (checkLink()) {
            // можно лучше: Для валидации используйте кастомный метод validation
            // https: //developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Constraint_API%27s_element.setCustomValidity() 
            errorElement.textContent = message.validationDone;
            errorElement.classList.remove('error-message__visible');
            return true;
        } else {
            errorElement.textContent = message.validationLink;
            errorElement.classList.add('error-message__visible');
            return false;
        }
        // Правильно что используете строгое сравнение в проекте '==='
    } else if (element.value.length === 0) {
        errorElement.textContent = message.validationRequired;
        errorElement.classList.add('error-message__visible');
        return false;
    } else if (element.value.length < 2 || element.value.length > 30) {
        errorElement.textContent = message.validationLength;
        errorElement.classList.add('error-message__visible');
        return false;
    } else {
        errorElement.textContent = message.validationDone;
        errorElement.classList.remove('error-message__visible');
        return true;
    }
}

//изменение формы edit
edit.form.addEventListener("submit", event => {
    edit.submit("/users/me", event);
});
//добавление новой карточки
place.form.addEventListener("submit", event => {
    place.submit(event);
});

//Лайк иудаление карточки
cardList.container.addEventListener("click", event => {
    card.like(event);
    card.remove(event);
});

//Открытие попапа edit и place
userInfoDoc.addEventListener("click", event => {
    edit.open(event);
    place.open(event);
});

const root = new Root(document.querySelector(".root"));
//Открытие и закрытие картинки, edit, place
root.container.addEventListener("click", event => {
    image.open(event);
    image.close(event);
    place.close(event);
    edit.close(event);
});
/**
 * Здравствуйте
 * Хорошая организация классов и кодовой базы. Вы молодцы, проработали хорошо задание
 *
 * Можно лучше : Ну catch я бы перенёс в класс Api. Api это больше является прослойкой,
 * и информация о том что сервер не работает при обновлении профиля всё таки должна исходить из класса Api
 *
 * можно лучше:  initialCards не нужен, удалите его. Вы же сейчас карточки получаете из класса Api
 *
 * Работа принимается
*/