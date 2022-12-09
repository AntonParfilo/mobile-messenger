import { useLazyQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import query from '../query/queries';
import { Login } from './login';
import md5 from "react-native-md5";
import { myDb } from "../db/db";
import user from '../store/user';

export const LoginContainer = ()=>{


  const [checkUser, { loading, error, data, refetch, networkStatus }] =
    useLazyQuery(query.checkUser, {
      variables: { username: "login", password: md5.hex_md5("password") },
      notifyOnNetworkStatusChange: true,
    });
  if (error) {
    console.log("error");
  }

  const send = (login, password)=>{
    if (login.length && password.length) {
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
      if (data.checkUser.message === "Error") alert("Неправильный логин или пароль");
    }
  }, [networkStatus]);

    return(
        <Login func={send}/>
    )
}