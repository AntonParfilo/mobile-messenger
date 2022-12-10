import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar, IconButton } from '@react-native-material/core';

export const UserCard = (props)=>{

    return(
        <View style={style.userCard}>
            <IconButton icon={<Avatar label={ props.username } size={60} autoColor />} />
            <Text style={style.username}>{ props.username }</Text>
            <Text style={style.useragent}>({ props.agent })</Text>
        </View>
    )
}

const style = StyleSheet.create({
    userCard: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        paddingLeft: "20%",
        alignSelf: "flex-start"
    },
    username:{
        marginHorizontal: 10,
        color: "#7DD3FC"
    },
    useragent: {
        color: "#999999"
    }
});