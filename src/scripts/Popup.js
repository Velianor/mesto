export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose = (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
  };

  setEventListeners() {
    const buttonClose = this._popup.querySelector(".popup__button-close");
    if (buttonClose) {
      buttonClose.addEventListener("click", () => {
        this.close();
      });
    }
    this._popup.addEventListener("click", this._handleOverlayClose);
  }
}
