import React from "react";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.messenger");
import user from "../store/user";

class Database {
  dbInit() {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS user (login TEXT, password TEXT)",
        (txObj, resultSet) => {},
        (txObj, error) => {}
      );
    });
  }

  async getUser(){
      let promise = new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
          tx.executeSql(
          "SELECT * FROM user",
          null,
          (txObj, {rows}) => resolve(rows._array[0]),
          (txObj, error) => console.log("Error! ", error)
          );
        });
      });
      let result = await promise;
    
    return result;
  };

  newUser (username, password){

        function add(){
            db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO user (login, password) values (?, ?)",
                    [username, password],
                    (txObj, {rows}) => user.setIfLogin(true),
                    (txObj, error) => console.log("Error", error)
                );
            });
        }

        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM user",
                null,
                (txObj, {rows}) => rows._array.length? console.log("User is already isset") : add(),
                (txObj, error) => console.log("Error ", error)
            );
        });
  };

  deletteUser (){
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM user",
        null,
        (txObj, resultSet) => {user.setIfLogin(false)},
        (txObj, error) => console.log("Error", error)
      );
    });
};
}

export const myDb = new Database();
