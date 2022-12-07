import { makeAutoObservable } from "mobx";

class Loading {
  constructor() {
    makeAutoObservable(this);
  }
  
  loadingState = {
    checkUser: false,
    registration: false,
    logout: false,
    getMessages: false,
    getUsers: false
  }

  isLoading = false;

  setLoadnig = (type, newState) => {
    this.loadingState[type] = newState;
    let mwLoading = 0;
    for(let value in this.loadingState){
      if(this.loadingState[value]) mwLoading++;
    }
    mwLoading? this.isLoading = true : this.isLoading = false;
  };

}
export default new Loading();
