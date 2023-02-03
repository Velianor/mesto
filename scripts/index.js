let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__button-close");
let popup = document.querySelector(".popup");
let name = document.querySelector(".profile__name");
let description = document.querySelector(".profile__description");
let inputName = document.querySelector(".popup__input_type_name");
let inputDescription = document.querySelector(".popup__input_type_description");
let formElement = document.querySelector(".popup__form");

function opened() {
  popup.classList.add("popup_opened");
  inputName.value = name.textContent;
  inputDescription.value = description.textContent;
}

function close() {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  name.textContent = inputName.value;
  description.textContent = inputDescription.value;

  close();
}

editButton.addEventListener("click", opened);
closeButton.addEventListener("click", close);
addEventListener("submit", handleFormSubmit);
