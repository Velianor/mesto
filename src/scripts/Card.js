export class Card {
  constructor(
    data,
    myId,
    { handleCardClick, handleLikeIconClick, handleDeleteIconClick },
    templateSelector
  ) {
    this._name = data.name;
    this._image = data.link;
    this._alt = data.alt;
    this._like = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._handleLikeIconClick = handleLikeIconClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._myId = myId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._elementButtonLike = this._element.querySelector(".element__button");
    this._elementImg = this._element.querySelector(".element__img");
    this._elementDelete = this._element.querySelector(".element__delete");

    this._element.querySelector(".element__title").textContent = this._name;
    this._elementImg.alt = this._name;
    this._elementImg.src = this._image;

    this._setEventListener();
    this.setLikeCheck(this._like);

    if (this._ownerId !== this._myId) {
      this._elementDelete.remove();
    }

    return this._element;
  }

  getId() {
    return this._cardId;
  }

  setLikeCheck(arrLikes) {
    this._like = arrLikes;
    this._likeCheck = this._element.querySelector(".element__button-check");
    this._likeCheck.textContent = this._like.length;
    if (this.isLiked()) {
      this.addLike();
    } else {
      this.removeLike();
    }
  }

  isLiked() {
    return this._like.some(data => data._id === this._myId);
  }

  addLike() {
    this._elementButtonLike.classList.add("element__button_active");
  }

  removeLike() {
    this._elementButtonLike.classList.remove("element__button_active");
  }

  handleCardClick() {
    this._handleCardClick(this._name, this._image);
  }

  deleteCard() {
    this._element.remove();
  }

  _setEventListener() {
    this._elementButtonLike.addEventListener("click", () => {
      this._handleLikeIconClick(this._cardId, this);
    });

    this._elementDelete.addEventListener("click", () => {
      this._handleDeleteIconClick(this._cardId, this);
    });

    this._elementImg.addEventListener("click", () => {
      this._handleCardClick(this._name, this._image);
    });
  }
}
