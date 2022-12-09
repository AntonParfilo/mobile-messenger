import React, { useState } from "react";
import { Text, StyleSheet, View, Animated, TextInput, Button } from 'react-native';


export const Login = (props) => {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={style.login}>
      <Text>Login</Text>
      <TextInput style={style.input} onChangeText={el => setLogin(el)} ></TextInput>
      <Text>Password</Text>
      <TextInput style={style.input} onChangeText={el => setPassword(el)} ></TextInput>
      <Button title="Войти" onPress={() => props.func(login, password)} />
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