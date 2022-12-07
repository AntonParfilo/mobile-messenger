import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import { Text, StyleSheet, View, Animated, TextInput, Button } from 'react-native';
import burgerMenu from '../store/burger';
import { Login } from './login';
import { Registration } from './registration';
import user from '../store/user';


export const BurgerMenu = observer(()=>{

  const [menuState, setMenuState] = useState(true);
  const fadeAnim = useRef(new Animated.Value(-100)).current;
  let burger = burgerMenu.isOpen;
  let ifLogin = user.ifLogin;

  const menuUp = () => {
    Animated.timing(fadeAnim, {
      toValue: -1200,
      duration: 500,
      useNativeDriver: true
    }).start();
  };
  
  const MenuDown = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  burger? MenuDown() : menuUp();
  

    return(
        <Animated.View style={[style.burgerWrapper, {transform: [{ translateY:  fadeAnim}]}]}>
                
        
                
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
        justifyContent: "center",
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
    }
});