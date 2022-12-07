import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Animated,
  TextInput,
  Button,
} from "react-native";

export const Registration = () => {
  return (
    <View style={style.reg}>
      <Text>Login</Text>
      <TextInput style={style.input}></TextInput>
      <Text>Password</Text>
      <TextInput style={style.input}></TextInput>
      <Text>Repeat password</Text>
      <TextInput style={style.input}></TextInput>
      <Button title="Войти" onPress={() => alert("Simple Button pressed")} />
    </View>
  );
};

const style = StyleSheet.create({
  reg: {
    width: "95%",
    backgroundColor: "#1C2026",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  input: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    marginTop: 5,
    width: "100%",
    paddingHorizontal: 15,
  },
});
