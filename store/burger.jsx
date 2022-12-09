import { makeAutoObservable } from "mobx";


class burger {
  constructor() {
    makeAutoObservable(this);
  }
 isOpen = false;

 setOpen (newStatus){
    this.isOpen = newStatus;
 }

}
export default new burger();




