import {gql} from "@apollo/client";
const query = {
  getMessages: gql`
  query {
    getMessages
     {
      id username message date
    }
  }
  `,
  getUsers: gql`
  query {
    getUsers
     {
      username agent
    }
  }
  `,
  checkUser: gql`
  query CheckUser ($username: String $password: String){
    checkUser(username: $username, password: $password) {
      message
      data {
        id
        username
        password
        agent
      }
    }
  }
  `,
  addUser: gql`
  mutation AddUser ($username: String $password: String $agent: String){
    addUser(input: {
      username: $username
      password: $password
      agent: $agent
    }) {
      message data{username, password}
    }
  }
  `,
  addMessage: gql`
  mutation AddMessage ($username: String $password: String $message: String $date: String) {
    addMessage(input: {
    username: $username
    password: $password
    message: $message
    date: $date
  }) {
      message
      data{
        message
      }
    }
  }
  `
};

export default query;