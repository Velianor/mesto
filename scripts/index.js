import { initialCards } from './content.js';
import { Card } from './Card.js';
import { FormValidator, enableValidation } from './FormValidator.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector('.profile__add-button');
const name = document.querySelector(".profile__name");
const description = document.querySelector(".profile__description");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(".popup__input_type_description");
const inputImage = document.querySelector('.popup__input_type_image');
const inputTitle = document.querySelector('.popup__input_type_title');
const cardsContainer = document.querySelector('.elements');
const profileForm = document.querySelector('form[name="profileForm"]');
const cardNewForm = document.querySelector('form[name="newCardForm"]');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

const profileValidator = new FormValidator(enableValidation, profileForm);
const cardValidator = new FormValidator(enableValidation, cardNewForm);

const popupProfile = new Popup('.popup_type_profile');
const popupNewCard = new Popup('.popup_type_new-card');
const popupImageContainer = new Popup('.popup_type_image-popup');
const popups = [popupProfile, popupNewCard, popupImageContainer];

popups.forEach((popup) => {
  popup.setEventListeners();
});

function openPopupImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name;
  popupImageContainer.open();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  name.textContent = inputName.value;
  description.textContent = inputDescription.value;

  popupProfile.close();
}

function createCard(item) {
  const card = new Card(item, '#element-template', openPopupImage);
  return card.generateCard();
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsContainer.prepend(cardElement);
  },
}, '.elements');

cardList.renderItems();

buttonEdit.addEventListener('click', () => {
  inputName.value = name.textContent;
  inputDescription.value = description.textContent;
  popupProfile.open();
  profileValidator.resetValidation();
});

buttonAdd.addEventListener('click', () => {
  popupNewCard.open();
  cardValidator.resetValidation();
});

profileForm.addEventListener('submit', handleProfileFormSubmit);

cardNewForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const cardNew = { name: inputTitle.value, link: inputImage.value };
  cardsContainer.prepend(createCard(cardNew));
  popupNewCard.close();
  evt.target.reset();
});

profileValidator.enableValidation();
cardValidator.enableValidation();
