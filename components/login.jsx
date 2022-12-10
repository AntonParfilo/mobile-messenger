import { ActivityIndicator, Stack } from "@react-native-material/core";
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
      <TextInput secureTextEntry={true} style={style.input} onChangeText={el => setPassword(el)} ></TextInput>
      { props.loading? 
        <Stack center style={{ width: 58, height: 58 }}>
          <ActivityIndicator size="small" color="on-primary" />
        </Stack> :
        <Button title="Войти" onPress={() => props.func(login, password)} />
         } 
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