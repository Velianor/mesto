export class UserInfo {
    constructor(nameElement, infoElement) {
      this._name = document.querySelector(nameElement);
      this._info = document.querySelector(infoElement);
    }
  
    getUserInfo() {
     this._personalInfo = {
        name: this._name.textContent,
        info: this._info.textContent,
      };
      return this._personalInfo
    }
  
    setUserInfo(name, info) {
      this._name.textContent = name;
      this._info.textContent = info;
    }
  }
  