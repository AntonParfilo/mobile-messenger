import {gql} from "@apollo/client";
const substriptions = {
  
  subscribeMessages: gql`
  subscription{
    newMessage{
      message
      data{
        message
        username
        date
      }
    }
  }
  `,
};

export default substriptions;