export class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._personalInfo = {
      name: this._name.textContent,
      info: this._info.textContent,
    };
    return this._personalInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.username;
    this._info.textContent = data.info;
  }

  setUserAvatar(data){
    this._avatar.src = data.avatar;
  }
}
