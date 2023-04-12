import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, {handleSubmitForm}) {
      super(popupSelector);
      this._handleSubmitForm = handleSubmitForm;
      this._form = this._popup.querySelector('.popup__form');
      this._inputList = this._form.querySelectorAll('.popup__input')
    }
  
    _getInputValues() {
      
      this._values = {};
      this._inputList.forEach(input => {
        this._values[input.name] = input.value
      });
      return this._values;
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleSubmitForm(this._getInputValues());
        this.close();
      });
    }
  
    close() {
      super.close();
      this._form.reset();
    }
  }
  