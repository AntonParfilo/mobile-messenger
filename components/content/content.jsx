import { useQuery } from '@apollo/client';
import { ActivityIndicator, Stack, Text } from '@react-native-material/core';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import query from '../../query/queries';
import smessages from '../../store/messages';
import user from '../../store/user';
import { Message } from './message';
import { NewMessage } from './new-message';

export const Content = observer(()=>{

  let username = user.username;
  let messages = smessages.messages;
  const { loading, error, data } = useQuery(query.getMessages);
  if (error) {
    alert("Network error")
  }

  useEffect(() => {
    if (!loading && data) {
      smessages.setMessages(data.getMessages);
    }
  }, [data]);
  
  const messagesView = messages.map((el, index) => {
    return (
      <Message
        key={index}
        username={el.username}
        message={el.message}
        date={el.date}
      />
    );
  });

    return(
        <View style={style.content}>
            <ScrollView style={style.scroll}
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{        
            this.scrollView.scrollToEnd({animated: true});}}
            >
                {
                loading? 
                <Stack center style={{ width: 58, height: 58, alignSelf: "center" }}>
                    <ActivityIndicator size="large" color="on-primary" />
                </Stack> :
                <View>
                    {messagesView}
                </View>
                }
            </ScrollView>
            <NewMessage />
        </View>
    )
});

const style = StyleSheet.create({
    content:{
        flex: 1,
    },
    scroll:{
        flex: 1
    }
});