import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import query from '../query/queries';
import user from '../store/user';
import { Registration } from './registration';
import * as Device from 'expo-device';
import { myDb } from '../db/db';


export const RegistrationContainer = ()=>{
  
  const [sendUser, {data, loading, error}] = useMutation(query.addUser);
  
  useEffect(()=>{
    if(!loading && data){
      if(data.addUser.message === "already") alert(data.addUser.data.username+" уже зарегистрирован.");
      else{
        myDb.newUser(data.addUser.data.username, data.addUser.data.password);
        user.setIfLogin(true);
        user.setUsername(data.addUser.data.username);
        user.setPassword(data.addUser.data.password);
      }
    }
  },[data]);

  function checkReg(username, password, cpassword){
    if(username.length && password.length && cpassword.length){
        let error = "";
        let arr = [username.split(" ").join(""), password.split(" ").join(""), cpassword.split(" ").join("")];
        arr.forEach((el) => {
        if (el.length < 3 || el.length > 15 || !/^[a-zA-Z0-9]+$/.test(el)) {
            error= "От 3 до 15 символов. Только латинские символы и цифры.";
        }
        if (arr[1] !== arr[2]) error = "Пароли не совпадают";
        });
        let userAgent = Device.osName;
        if(error.length) alert(error);
     else {
      sendUser({ variables: {username: arr[0], password: arr[1], agent: userAgent} });
     }
    }
  }

    return(
        <Registration func = {checkReg} loading = {loading} />
    )
}