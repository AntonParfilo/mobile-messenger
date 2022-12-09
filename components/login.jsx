import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, View, Animated, TextInput, Button } from 'react-native';
import query from "../query/queries";
import user from "../store/user";
import md5 from "react-native-md5";
import { myDb } from "../db/db";


export const Login = () => {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  

  const [checkUser, { loading, error, data, refetch, networkStatus }] =
    useLazyQuery(query.checkUser, {
      variables: { username: login, password: md5.hex_md5(password) },
      notifyOnNetworkStatusChange: true,
    });
  if (error) {
    console.log("error");
  }

  const send = ()=>{
    alert("send")
    if (login && password) {
      let errorState = "";
      let arr = [
        login.split(" ").join(""),
        password.split(" ").join(""),
      ];
      arr.forEach((el) => {
        if (el.length < 3 || el.length > 15 || !/^[a-zA-Z0-9]+$/.test(el)) {
          errorState = "От 3 до 15 символов. Только латинские символы и цифры.";
        }
      });
      if (errorState.length) alert(errorState);
      else {
        refetch({ username: login, password: md5.hex_md5(password) });
      }
    }
  }

  useEffect(() => {
    if (data && !loading) {
      console.log(data)
      if (data.checkUser.message === "OK") {
        myDb.newUser(data.checkUser.data.username, data.checkUser.data.password);
        user.setIfLogin(true);
        user.setUsername(data.checkUser.data.username);
        user.setPassword(data.checkUser.data.password);
      }
      if (data.checkUser.message === "Error")
        alert("Неправильный логин или пароль");
    }
  }, [networkStatus, data]);

  return (
    <View style={style.login}>
      <Text>Login</Text>
      <TextInput style={style.input} onChange={el => setLogin(el.nativeEvent.text)}> </TextInput>
      <Text>Password</Text>
      <TextInput style={style.input} onChange={el => setPassword(el.nativeEvent.text)}></TextInput>
      <Button title="Войти" onPress={() => send()} />
    </View>
  );
};

const style = StyleSheet.create({
    login:{
      width: "95%",
      // backgroundColor: "#1C2026",
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