import { useSubscription } from '@apollo/client';
import React, { useEffect } from 'react';
import subscriptions from "../../query/subscriptions"
import messages from '../../store/messages';

export const Subscribe = (props)=>{

const { loading, error, data } = useSubscription(subscriptions.subscribeMessages);

  useEffect(()=>{
    if(error) alert("Network error");
    if(!loading && data) messages.updateMessages(data.newMessage.data);
    else console.log("Ожидаем новые сообщения...");
  },[data]);

  return props.component;
}