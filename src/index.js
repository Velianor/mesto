import './pages/index.css';
import { initialCards } from "./utils/content.js"
import { Card } from "./scripts/Card.js";
import { validationConfig } from "./utils/constants.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { Section } from "./scripts/Section.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { UserInfo } from "./scripts/UserInfo.js";
import { Api } from "./scripts/Api.js";



const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(
  ".popup__input_type_description"
);

const profileForm = document.querySelector('form[name="profileForm"]');
const cardNewForm = document.querySelector('form[name="newCardForm"]');

const profileValidator = new FormValidator(validationConfig, profileForm);
const cardValidator = new FormValidator(validationConfig, cardNewForm);
const popupImageContainer = new PopupWithImage(".popup_type_image-popup");
const userInfo = new UserInfo(".profile__name", ".profile__description", ".profile-avatar");

const popupProfile = new PopupWithForm(".popup_type_profile", {
  handleSubmitForm: (data) => {
    userInfo.setUserInfo(data.name, data.info);
  },
});

let myId = '';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '96377036-74fb-47dd-ae26-39fa8fb3f7f0',
    'content-type': 'application/json'
  },
});

function createCard(dataCard) {
  const card = new Card(
    dataCard,
    () => {
      popupImageContainer.open(dataCard.name, dataCard.link);
    },
    "#element-template"
  );
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (dataCard) => {
      cardSection.addItem(createCard(dataCard));
    },
  },
  ".elements"
);



const popupNewCard = new PopupWithForm(".popup_type_new-card", {
  handleSubmitForm: (dataCard) => {
    cardSection.addItem(createCard(dataCard));
    popupNewCard.close();
  },
});



buttonEdit.addEventListener("click", () => {
  const userData = userInfo.getUserInfo()
  popupProfile.open();
  inputName.value = userData.name;
  inputDescription.value = userData.info;
  profileValidator.resetValidation();
});

buttonAdd.addEventListener("click", () => {
  popupNewCard.open();
  cardValidator.resetValidation();
});

cardSection.renderItems();

popupProfile.setEventListeners();
popupNewCard.setEventListeners();
popupImageContainer.setEventListeners();

profileValidator.enableValidation();
cardValidator.enableValidation();
