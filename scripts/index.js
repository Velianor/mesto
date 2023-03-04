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
const cardTemplate = document.querySelector('#element-template').content.querySelector('.element');
const profileForm = document.querySelector('form[name="profileForm"]')
const cardNewForm = document.querySelector('form[name="newCardForm"]')
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

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener('keydown', closeEsc)

}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

function closeEsc(evt) {
  if(evt.key === 'Escape'){
    closePopup(document.querySelector('.popup_opened'))
  }
}

function createCard(name, link){
  const element = cardTemplate.cloneNode(true);
  const imgOpen = element.querySelector('.element__img');
  imgOpen.src = link;
  imgOpen.alt = name;
  element.querySelector('.element__title').textContent = name;
  

  
  imgOpen.addEventListener('click', function(){
    popupImage.src = link;
    popupImage.alt = name;
    popupImageTitle.textContent = name; 
    openPopup(popupImageContainer)
  });

  const like = element.querySelector('.element__button')
  like.addEventListener('click', function(){
    like.classList.toggle('element__button_active');
  });

  const buttonDelete = element.querySelector('.element__delete')
  buttonDelete.addEventListener('click', function(){
    element.remove();
  });


  return element
}

function initCard(){
  const cards = initialCards.map (function (cardData) {
    return createCard(cardData.name, cardData.link);
  });

  cardsContainer.append(...cards)
};

initCard()



function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  name.textContent = inputName.value;
  description.textContent = inputDescription.value;

  closePopup(popupProfile);
}

popups.forEach((popup)=>{
  popup.addEventListener('click', (evt)=>{
    if(evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')){
      closePopup(popup);
    } 
  })
})




buttonEdit.addEventListener("click", function(){
  openPopup(popupProfile)
  inputName.value = name.textContent;
  inputDescription.value = description.textContent;
});
buttonAdd.addEventListener("click", function(){
  openPopup(popupNewCard)
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

cardNewForm.addEventListener('submit', function (evt){
  evt.preventDefault();
  cardsContainer.prepend(createCard(inputTitle.value, inputImage.value));
  evt.target.reset()
  closePopup(popupNewCard)
})