export class Card {
  constructor(data, handleCardClick, templateSelector) {
    this._name = data.name;
    this._image = data.link;
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

  _setEventListener() {
    this._elementButtonDelete = this._element.querySelector(".element__button");
    this._elementImg = this._element.querySelector(".element__img");

    this._elementButtonDelete.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });

    this._elementImg.addEventListener("click", () => {
      this._handleCardClick(this._name, this._image);
    });
  }

  _handleLikeClick() {
    this._elementButtonDelete.classList.toggle("element__button_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListener();

    this._element.querySelector(".element__title").textContent = this._name;
    this._elementImg.alt = this._name;
    this._elementImg.src = this._image;

    return this._element;
  }
}
