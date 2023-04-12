import './pages/index.css';
import { initialCards } from "./scripts/content.js";
import { Card } from "./scripts/Card.js";
import { FormValidator, enableValidation } from "./scripts/FormValidator.js";
import { Section } from "./scripts/Section.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { UserInfo } from "./scripts/UserInfo.js";

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(
  ".popup__input_type_description"
);

const profileForm = document.querySelector('form[name="profileForm"]');
const cardNewForm = document.querySelector('form[name="newCardForm"]');

const profileValidator = new FormValidator(enableValidation, profileForm);
const cardValidator = new FormValidator(enableValidation, cardNewForm);
const popupImageContainer = new PopupWithImage(".popup_type_image-popup");
const userInfo = new UserInfo(".profile__name", ".profile__description");

const popupProfile = new PopupWithForm(".popup_type_profile", {
  handleSubmitForm: () => {
    userInfo.setUserInfo(inputName.value, inputDescription.value);
  },
});

function createCard(item) {
  const card = new Card(
    item,
    () => {
      popupImageContainer.open(item.name, item.link);
    },
    "#element-template"
  );
  return card.generateCard();
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".elements"
);



const popupNewCard = new PopupWithForm(".popup_type_new-card", {
  handleSubmitForm: (item) => {
    cardList.addItem(createCard(item));
    popupNewCard.close();
  },
});



buttonEdit.addEventListener("click", () => {
  popupProfile.open();
  inputName.value = userInfo.getUserInfo().name;
  inputDescription.value = userInfo.getUserInfo().info;
  profileValidator.resetValidation();
});

buttonAdd.addEventListener("click", () => {
  popupNewCard.open();
  cardValidator.resetValidation();
});

cardList.renderItems();

popupProfile.setEventListeners();
popupNewCard.setEventListeners();
popupImageContainer.setEventListeners();

profileValidator.enableValidation();
cardValidator.enableValidation();
