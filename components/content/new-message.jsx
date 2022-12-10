
import { useMutation } from '@apollo/client';
import { ActivityIndicator, Icon, Stack, Text } from '@react-native-material/core';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableHighlight, TextInput, View } from 'react-native';
import send from "../../images/send.png";
import query from '../../query/queries';
import user from "../../store/user";

export const NewMessage = ()=>{

    const [message, setMessage] = useState("");
    const [addMessage, {data, loading, error}] = useMutation(query.addMessage);
    const username = user.username;
    const password = user.password;

    function sendMessage(){
        if(message.length > 0 && message.length < 900){
            const date = new Date();
            const hours = date.getHours();
            const minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
            const month = date.getMonth()+1;
            const year = date.getFullYear();
            const day = date.getDate();
            const now = hours+":"+minutes+" "+day+"."+month+"."+year;

            addMessage({ variables: {username: username, password: password, message: message, date: now} });
            setMessage("");
        }
        else {
            alert("Ошибка.")
        }
    }

    return(
        <View style={ user.ifLogin? {position: "relative"} : {display: "none"}}>
            <TextInput style={style.newMessage} placeholder="Новое сообщение..." placeholderTextColor="#fff" value={message} onChangeText={ el =>  setMessage(el)}></TextInput>
            <TouchableHighlight style={{ position: "absolute", top: 10, right: 10 }} onPress={()=> sendMessage()}>
                    <Image source={send} style={style.send}></Image>
            </TouchableHighlight>
        </View>
    )
}

const style = StyleSheet.create({
    newMessage:{
        height: 60,
        borderWidth: 1,
        borderTopColor: "#ccc",
        width: "100%",
        paddingRight: 60,
        backgroundColor: "#222E3A",
        padding: 20,
        fontSize: 16,
        color: "#fff"
        
    },
    send:{
        width: 40,
        height: 40,
    }
});