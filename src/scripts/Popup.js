export class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._handleOverlayClose);
      }  
  
    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
      document.removeEventListener('click', this._handleOverlayClose);
    }
  
    _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    }

    _handleOverlayClose = (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          this.close();
        }
      }
    
  
      setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__button-close');
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            this.close();
          });
        }
        document.addEventListener('click', this._handleOverlayClose);
      }
      
  }
  