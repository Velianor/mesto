import { initialCards } from './content.js';
import {Card} from './Card.js';
import { FormValidator, enableValidation} from './FormValidator.js'

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll(".popup");
const name = document.querySelector(".profile__name");
const description = document.querySelector(".profile__description");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(".popup__input_type_description");
const inputImage =document.querySelector('.popup__input_type_image')
const inputTitle = document.querySelector('.popup__input_type_title')
const popupProfile = document.querySelector('.popup_type_profile')
const popupNewCard = document.querySelector('.popup_type_new-card')
const cardsContainer = document.querySelector('.elements');
const buttonSave = popupNewCard.querySelector('.popup__button-save')
const profileForm = document.querySelector('form[name="profileForm"]')
const cardNewForm = document.querySelector('form[name="newCardForm"]')
const popupImageContainer = document.querySelector('.popup_type_image-popup')
const popupImage = document.querySelector('.popup__image')
const popupImageTitle = document.querySelector('.popup__image-title') 

const profileValidator = new FormValidator(enableValidation, profileForm);
const cardValidator =  new FormValidator(enableValidation, cardNewForm);


function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener('keydown', closeEsc)

}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeEsc)
}

function closeEsc(evt) {
  if(evt.key === 'Escape'){
    closePopup(document.querySelector('.popup_opened'))
  }
}


function openPopupImage(name, link){
  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name; 
  openPopup(popupImageContainer)
};


function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  name.textContent = inputName.value;
  description.textContent = inputDescription.value;

  closePopup(popupProfile);
}

function createCard(item) {
  const card = new Card(item, '#element-template', openPopupImage);
  return card.generateCard();
}

popups.forEach((popup)=>{
  popup.addEventListener('click', (evt)=>{
    if(evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')){
      closePopup(popup);
    } 
  })
})


initialCards.forEach((item) => {
  cardsContainer.append(createCard(item))
})


buttonEdit.addEventListener("click", function(){
  openPopup(popupProfile)
  inputName.value = name.textContent;
  inputDescription.value = description.textContent;
});
buttonAdd.addEventListener("click", function(){
  openPopup(popupNewCard)
  buttonSave.setAttribute('disabled', true);
  buttonSave.classList.add('popup__button-save_disabled')
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

cardNewForm.addEventListener('submit', function (evt){
  evt.preventDefault();

  const cardNew = {name: inputTitle.value, link: inputImage.value}
  cardsContainer.prepend(createCard(cardNew));
  closePopup(popupNewCard)
  evt.target.reset()
})

profileValidator.enableValidation();
cardValidator.enableValidation();