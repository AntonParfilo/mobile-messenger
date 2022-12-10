import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, View, Animated, TextInput, Button, ScrollView } from 'react-native';
import burgerMenu from '../store/burger';
import { Login } from './login';
import { Registration } from './registration';
import user from '../store/user';
import { BurgerHeader } from './burger-header';
import { UserHello } from './user-hello';
import { UserCard } from './user-card';
import { useQuery } from '@apollo/client';
import query from '../query/queries';
import { ActivityIndicator, Stack } from '@react-native-material/core';


export const BurgerMenu = observer(()=>{

  const { loading, error, data } = useQuery(query.getUsers);

  const [menuState, setMenuState] = useState(true);
  const fadeAnim = useRef(new Animated.Value(-100)).current;
  let burger = burgerMenu.isOpen;
  let ifLogin = user.ifLogin;
  let users = user.users;

    const menuUp = () => {
    Animated.timing(fadeAnim, {
      toValue: -1200,
      duration: 300,
      useNativeDriver: true
    }).start();
  };
  
  const MenuDown = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  burger? MenuDown() : menuUp();
  
  useEffect(() => {
    if (!loading) {
      user.setUsers(data.getUsers);
    }
  }, [data]);

  const usersView = users.map((el, index)=>{
      return <UserCard key={index} username = {el.username} agent = {el.agent} />
  });

    return(
        <Animated.View style={[style.burgerWrapper, {transform: [{ translateY:  fadeAnim}]}]}>

          { loading? 
            <Stack center style={{ width: 128, height: 128, alignSelf: "center" }}>
              <ActivityIndicator size="large" color="on-primary" />
            </Stack> :
            ifLogin? <UserHello /> :  <BurgerHeader/>
          }
          <ScrollView style={style.other}>
                <Text style={{fontSize: 20, marginBottom: 20, textAlign: "center", width: "100%", color: "#fff"}} >Другие участники</Text>
                { loading? 
                  <Stack center style={{ width: 128, height: 128, alignSelf: "center" }}>
                    <ActivityIndicator size="large" color="on-primary" />
                  </Stack> :
                  usersView
                }
          </ScrollView>

        </Animated.View>
    )
});

const style = StyleSheet.create({
    burgerWrapper:{
        backgroundColor: "#14191F",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 2,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 50,
    },
    login:{
      width: "95%",
      backgroundColor: "#1C2026",
      borderRadius: 10,
      padding: 15,
      alignItems: "center"
    },
    input: {
      height: 40,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      marginBottom: 20,
      marginTop: 5,
      width: "100%",
      paddingHorizontal: 15
    },
    other: {
      backgroundColor: "#1C2026",
      // marginTop: 40,
      width: "100%",
      // alignItems: "flex-start",
      flex: 1,
      padding: 20
    }
});