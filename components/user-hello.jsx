import { observer } from 'mobx-react-lite';
import { Avatar, IconButton } from '@react-native-material/core';
import React from 'react';
import { Text, View, Button, TouchableHighlight } from 'react-native';
import user from '../store/user';
import { myDb } from '../db/db';

export const UserHello = observer(()=>{

    let username = user.username;

    const logout = ()=>{
        user.setIfLogin(false);
        user.setUsername("");
        user.setPassword("");
        myDb.deletteUser(); 
    }

    return(
        <View style={{paddingTop: 30, paddingBottom: 30, alignItems: "center", width: "100%", position: "relative"}}>
            <IconButton icon={<Avatar label={username} size={100} />} />
            <Text style={{marginTop: 30, fontSize: 30, color: "#7DD3FC"}} >Привет, {username}!</Text>
            <TouchableHighlight style={{ position: "absolute", top: 20, right: 20 }} >
                <Button style={{ marginTop: 20 }} color="#1C2026" title="Выйти" onPress={() => logout()} />
            </TouchableHighlight>
        </View>
    )
});