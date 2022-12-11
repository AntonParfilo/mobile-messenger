import { Avatar, IconButton } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import user from '../../store/user';

export const Message = (props)=>{

    const username = user.username;
    if(props.username === username)
    return(
        <View style={style.mymessageWrapper}>
            <View style={style.mymessagesBody}>
                <Text style={style.username}>{props.username}</Text>
                <Text style={style.message}>{props.message}</Text>
                <Text style={style.date}>{props.date}</Text>
            </View>
            <IconButton style={style.icon} icon={<Avatar label={props.username} autoColor size={40} />} />
        </View>
    )
    else return(
        <View style={style.messageWrapper}>
            <IconButton style={style.icon} icon={<Avatar label={props.username} autoColor size={40} />} />
            <View style={style.messagesBody}>
                <Text style={style.username}>{props.username}</Text>
                <Text style={style.message}>{props.message}</Text>
                <Text style={style.date}>{props.date}</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    messageWrapper: {
        flexDirection: "row",
        marginBottom: 7
    },
    icon: {
        alignSelf: "flex-end"
    },
    messagesBody: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: "#222E3A",
        borderRadius: 10,
        maxWidth: "85%"
    },
    username:{
        color: "#7DD3FC",
        fontSize: 16
    },
    message:{
        color: "#fff"
    },
    date:{
        color: "#7DD3FC",
        alignSelf: "flex-end",
        fontSize: 12
    },

    mymessageWrapper: {
        flexDirection: "row",
        marginBottom: 7,
        alignSelf: "flex-end",
    },
    mymessagesBody: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: "#314152",
        borderRadius: 10,
        maxWidth: "85%"
    }
});