import { makeAutoObservable } from "mobx";

class store {
  constructor() {
    makeAutoObservable(this);
  }

  messages = [
    {username: "null", message: "null", date: "null"}
  ];

  setMessages = (messages)=>{
    this.messages = messages;
  }

  updateMessages = (message)=>{
    this.messages.push(message);
  }

}
export default new store();
