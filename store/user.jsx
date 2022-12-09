import { makeAutoObservable } from "mobx";

class user {
  constructor() {
    makeAutoObservable(this);
  }

  users = [
    { username: "null",
      agent: "null"
    },
  ];

  ifLogin = false;

  username = "";
  password = "";

  setUsername = (newName) => {
    this.username = newName;
  }

  setPassword = (newPass) => {
    this.password = newPass
    }

  setIfLogin = (value)=>{
    this.ifLogin = value;
  }

  setUsers = (users)=>{
    this.users = users;
  }

  updateUsers = (users)=>{
    this.users.push(users);
  }

}
export default new user();
