export class FormValidator{
    constructor(setting, formElement){
        this._setting = setting;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
        this._buttonElement = formElement.querySelector(setting.submitButtonSelector);
        this._inactiveButtonClass = setting.inactiveButtonClass;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._setting.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._setting.errorClass);
      }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._setting.inputErrorClass);
        errorElement.classList.remove(this._setting.errorClass);
        errorElement.textContent = "";
      }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
      }

    _setEventListeners() {
        this._toggleButtonState();
      
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener("input",  () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
          });
        });

      }  

    _hasInvalidInput()  {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
      }


    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableSubmitButton();
        } else {
            this._enableSubmitButton();
        }
      }

    _disableSubmitButton(){
        this._buttonElement.classList.add(this._inactiveButtonClass );
        this._buttonElement.setAttribute('disabled', true)
    }  

    _enableSubmitButton(){
        this._buttonElement.classList.remove(this._inactiveButtonClass );
        this._buttonElement.removeAttribute('disabled')
    }

    resetValidation(){
      this._toggleButtonState();

      this._inputList.forEach((inputElement) =>{
        this._hideInputError(inputElement)
      })
    }

    enableValidation() {
        this._setEventListeners();

        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
          });

          
      };
}

 export const enableValidation = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-save",
    inactiveButtonClass: "popup__button-save_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };