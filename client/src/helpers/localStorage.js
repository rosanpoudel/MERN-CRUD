class LocalDB {
  constructor() {
    this.sessionKey = "user";
  }
  setSession = (data) => {
    return localStorage.setItem(this.sessionKey, JSON.stringify(data));
  };

  deleteSession = () => {
    return localStorage.removeItem(this.sessionKey);
  };

  getToken = () => {
    const itemGot = localStorage.getItem(this.sessionKey);
    if (itemGot !== null) {
      return JSON.parse(itemGot)?.token;
    }
    return null;
  };
}

export default new LocalDB();
