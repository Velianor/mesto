let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__button-close");
let popup = document.querySelector(".popup");
let name = document.querySelector(".profile__name");
let description = document.querySelector(".profile__description");
let inputName = document.querySelector('.popup__input-name');
let inputDescription = document.querySelector('.popup__input-description');
let formElement = document.querySelector('.popup__form');

inputName.value = name.textContent;
inputDescription.value = description.textContent;

function opened() {
  popup.classList.add("popup_opened");
};

function close() {
  popup.classList.remove("popup_opened");
};

editButton.addEventListener("click", opened);
closeButton.addEventListener("click", close);

function handleFormSubmit (evt) {
evt.preventDefault();

inputName.value;
inputDescription.value;

name.textContent = inputName.value;
description.textContent = inputDescription.value;

};

addEventListener('submit', handleFormSubmit);






