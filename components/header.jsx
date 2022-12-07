import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppBar, IconButton, Button, Avatar, ActivityIndicator, Stack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useLazyQuery } from "@apollo/client";
import query from "../query/queries"
import { myDb } from "../db/db";
import user from "../store/user";
import burgerMenu from "../store/burger";


export const Header = observer(()=>{

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loadingState, setLoading] = useState(false);
    let loggedIn = user.ifLogin;
    let burger = burgerMenu.isOpen;

    const [ checkUserServer, {loading, error, data} ] = useLazyQuery(query.checkUser);

    async function checkUser(){
        let userData = await myDb.getUser();
        if(userData){
            setUsername(userData.login);
            setPassword(userData.password);
            checkUserServer({ variables: { username: userData.login, password: userData.password } });
        } else user.setIfLogin(false);

    }
    
    useEffect(()=>{
        checkUser();
        // myDb.newUser("test", "202cb962ac59075b964b07152d234b70");
        // myDb.deletteUser()
    },[]);

    useEffect(() => {
        if (!loading) {
            if(data){
                if (data.checkUser.message === "OK") user.setIfLogin(true);
                setLoading(false);
            }
        } else setLoading(true);
      }, [loading]);

      const setMenu = ()=>{
        burgerMenu.setOpen(!burger);
      }
    
      return (
        <AppBar
            style={{ zIndex: 3 }}
          title="Messenger"
          leading={props => (
            <IconButton
              icon={props => burger? <Icon name="close" {...props} onPress={()=>{setMenu()}} /> : <Icon name="menu" {...props} onPress={()=>{setMenu()}} />}
              {...props}
            />
          )}
          trailing={props =>
            loggedIn ? (
                loadingState ? (
                    <Stack center style={{ width: 48, height: 48 }}>
                        <ActivityIndicator size="small" color="on-primary" />
                    </Stack>
                ) : (
                    <IconButton
                        icon={<Avatar label="Anton" size={28} />}
                        // onPress={() => setLoggedIn(!loggedIn)}
                        {...props}
                    />
                )
                
            ) : (
                loadingState? (
                    <Stack center style={{ width: 48, height: 48 }}>
                        <ActivityIndicator size="small" color="on-primary" />
                    </Stack>
                ) : (
                    <Button
                        variant="text"
                        title="Login"
                        compact
                        style={{ marginEnd: 4 }}
                        // onPress={() => setLoggedIn(!loggedIn)}
                        {...props}
                    />
                )
            ) 
          }
          
        />
      );
});