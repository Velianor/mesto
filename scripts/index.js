const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelectorAll(".popup__button-close");
const addButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll(".popup");
const name = document.querySelector(".profile__name");
const description = document.querySelector(".profile__description");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(".popup__input_type_description");
const inputImage =document.querySelector('.popup__input_type_image')
const inputTitle = document.querySelector('.popup__input_type_title')
const formElement = document.querySelector(".popup__form");
const popupProfile = document.querySelector('.popup_type_profile')
const popupNewcard = document.querySelector('.popup_type_new-card')
const elementsContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');
const profileForm = document.querySelector('form[name="profileForm"]')
const newCardForm = document.querySelector('form[name="newCardForm"]')
const popupImageContainer = document.querySelector('.popup_type_image-popup')
const popupImage = document.querySelector('.popup__image')
const popupImageTitle = document.querySelector('.popup__image-title') 


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function opened(popupElement) {
  popupElement.classList.add("popup_opened");

}

function close(popupElement) {
  popupElement.classList.remove("popup_opened");
}

function workCard(name, link){
  const element = elementTemplate.cloneNode(true);
  element.querySelector('.element__img').src = link;
  element.querySelector('.element__title').textContent = name;

  const openImg = element.querySelector('.element__img');
  openImg.addEventListener('click', function(){
    popupImage.src = link;
    popupImage.alt = name;
    popupImageTitle.textContent = name; 
    opened(popupImageContainer)
  });

  const like = element.querySelector('.element__button')
  like.addEventListener('click', function(){
    like.classList.toggle('element__button_active');
  });

  const deleteButton = element.querySelector('.element__delete')
  deleteButton.addEventListener('click', function(){
    element.remove();
  });


  return element
}

function initCard(){
  const cards = initialCards.map (function (elm) {
    return workCard(elm.name, elm.link);
  });

  elementsContainer.append(...cards)
};

initCard()



function handleFormSubmit(evt) {
  evt.preventDefault();

  name.textContent = inputName.value;
  description.textContent = inputDescription.value;

  close(popupProfile);
}

popups.forEach((popup)=>{
  popup.addEventListener('click', (evt)=>{
    if(evt.target.classList.contains('popup_opened')){
      close(popup);
    }
    if(evt.target.classList.contains('popup_close')){
      close(popup);
    }
  })
})




editButton.addEventListener("click", function(){
  opened(popupProfile)
  inputName.value = name.textContent;
  inputDescription.value = description.textContent;
});
addButton.addEventListener("click", function(){
  opened(popupNewcard)
});

profileForm.addEventListener("submit", handleFormSubmit);

newCardForm.addEventListener('submit', function (evt){
  evt.preventDefault();
  elementsContainer.prepend(workCard(inputTitle.value, inputImage.value));
  evt.target.reset()
  close(popupNewcard)
})