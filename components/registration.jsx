import { ActivityIndicator, Stack } from "@react-native-material/core";
import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Animated,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export const Registration = (props) => {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  return (
    <View style={style.reg}>
      <Text style={{color: "#fff"}}>Login</Text>
      <TextInput style={style.input} onChangeText={el => setLogin(el)} ></TextInput>
      <Text style={{color: "#fff"}}>Password</Text>
      <TextInput secureTextEntry={true} style={style.input} onChangeText={el => setPassword(el)} ></TextInput>
      <Text style={{color: "#fff"}}>Repeat password</Text>
      <TextInput secureTextEntry={true} style={style.input} onChangeText={el => setCpassword(el)}></TextInput>
      { props.loading? 
        <Stack center style={{ width: 58, height: 58 }}>
          <ActivityIndicator size="large" color="on-primary" />
        </Stack> :
        <Button title="Отправить" onPress={() => props.func(login, password, cpassword)} />
      } 
    </View>
    
  );
};

const style = StyleSheet.create({
  reg: {
    width: "95%",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    alignSelf: "center"
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
    color: "#fff"
  },
});
