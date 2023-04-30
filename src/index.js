import "./pages/index.css";
import { Card } from "./scripts/Card.js";
import { validationConfig } from "./utils/constants.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { Section } from "./scripts/Section.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { PopupWithSubmit } from "./scripts/PopupWithSubmit.js";
import { UserInfo } from "./scripts/UserInfo.js";
import { Api } from "./scripts/Api.js";

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonAvatar = document.querySelector(".profile__button-avatar");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(
  ".popup__input_type_description"
);

const profileForm = document.querySelector('form[name="profileForm"]');
const cardNewForm = document.querySelector('form[name="newCardForm"]');
const avatarForm = document.querySelector('form[name="newAvatar"]');

const profileValidator = new FormValidator(validationConfig, profileForm);
const cardValidator = new FormValidator(validationConfig, cardNewForm);
const avatarValidator = new FormValidator(validationConfig, avatarForm);

const popupImageContainer = new PopupWithImage(".popup_type_image-popup");
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__description",
  ".profile__avatar"
);

let myId = "";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "96377036-74fb-47dd-ae26-39fa8fb3f7f0",
    "content-type": "application/json",
  },
});

function createCard(dataCard) {
  const card = new Card(
    dataCard,
    myId,
    {
      handleCardClick: (name, link) => {
        popupImageContainer.open(name, link);
      },
      handleLikeIconClick: () => {
        if (card.isLiked()) {
          api
            .removeLike(card.getId())
            .then((res) => {
              card.setLikeCheck(res.likes);
            })
            .catch((err) => console.log(`Ошибка: ${err}`));
        } else {
          api
            .addLike(card.getId())
            .then((res) => {
              card.setLikeCheck(res.likes);
            })
            .catch((err) => console.log(`Ошибка: ${err}`));
        }
      },
      handleDeleteIconClick: () => {
        popupDelete.open();
        popupDelete.setSumbitAction(() => {
          api
            .deleteCard(card.getId())
            .then(() => {
              card.deleteCard();
              popupDelete.close();
            })
            .catch((err) => console.log(`Ошибка: ${err}`));
        });
      },
    },
    "#element-template"
  );
  return card.generateCard();
}

const cardSection = new Section(
  {
    renderItems: (dataCard) => {
      cardSection.render(createCard(dataCard));
    }
  },
  ".elements"
);

const popupProfile = new PopupWithForm(".popup_type_profile", {
  handleSubmitForm: (data) => {
    popupProfile.renderLoading(true);
    api
      .changeUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo({ username: data.name, info: data.about });
        popupProfile.close();
      })
      .catch((err) => alert(err))
      .finally(() => {
        popupProfile.renderLoading(false);
      });
  },
});

const popupNewCard = new PopupWithForm(".popup_type_new-card", {
  handleSubmitForm: ({ name, link }) => {
    popupNewCard.renderLoading(true);
    api
      .addNewCard({ name, link })
      .then((item) => {
        cardSection.render(createCard(item));
        popupNewCard.close();
      })

      .catch((err) => alert(err))
      .finally(() => {
        popupNewCard.renderLoading(false);
      });
  },
});

const popupAvatar = new PopupWithForm(".popup_type_avatar", {
  handleSubmitForm: ({ avatar }) => {
    popupAvatar.renderLoading(true);
    api
      .changeAvatar({ avatar })
      .then((data) => {
        userInfo.setUserAvatar({ avatar: data.avatar });
        popupAvatar.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        popupAvatar.renderLoading(false);
      });
  },
});

const popupDelete = new PopupWithSubmit(".popup_type_delete-popup");

buttonEdit.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  popupProfile.open();
  inputName.value = userData.name;
  inputDescription.value = userData.info;
  profileValidator.resetValidation();
});

buttonAdd.addEventListener("click", () => {
  popupNewCard.open();
  cardValidator.resetValidation();
});

buttonAvatar.addEventListener("click", () => {
  popupAvatar.open();
  avatarValidator.resetValidation();
});

popupProfile.setEventListeners();
popupNewCard.setEventListeners();
popupImageContainer.setEventListeners();
popupAvatar.setEventListeners();
popupDelete.setEventListeners();

profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidator.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, card]) => {
    userInfo.setUserInfo({ username: data.name, info: data.about });
    userInfo.setUserAvatar({ avatar: data.avatar });
    myId = data._id;
    cardSection.renderCards(card);
    
  })
  .catch((err) => alert(err + 'ошибка Promise'));
