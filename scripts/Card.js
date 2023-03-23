export class Card{
    constructor(data, templateSelector, handleOpenPopup) {
        this._name = data.name;
        this._image = data.link;
        this._templateSelector = templateSelector;
        this._handleOpenPopup = handleOpenPopup;
    }

    _getTemplate(){
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
        return cardElement;
    }

    _setEventListener(){
        this._element.querySelector('.element__button').addEventListener('click', () => {
            this._handleLikeClick();
        })
        
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._handleDeleteClick();
        })

        this._element.querySelector('.element__img').addEventListener('click', () => {
            this._handleOpenPopup(this._name, this._image);
        })
    }

    _handleLikeClick() {
        this._element.querySelector('.element__button').classList.toggle('element__button_active');
    }

    _handleDeleteClick(){
        this._element.remove();
    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__img').alt = this._name;
        this._element.querySelector('.element__img').src = this._image;

        this._setEventListener();
        return this._element;
    }
}