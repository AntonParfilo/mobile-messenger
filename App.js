import { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ImageBackground } from "react-native";
import { Header } from "./components/header";
import bg from "./images/background.jpg";
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { myDb } from "./db/db";
import { BurgerMenu } from "./components/burger-menu";
import { Content } from "./components/content/content";
import { Subscribe } from "./components/content/subscribe";
import { StatusBar } from "expo-status-bar";
import * as Device from 'expo-device';

const wsLink = new GraphQLWsLink(
  createClient({
    // url: `ws://localhost:4000/graphql`,
    url: `wss://messenger-server.onrender.com/graphql`,
  })
);

const httpLink = new HttpLink({
  // uri: 'http://localhost:4000/graphql',
  uri: "https://messenger-server.onrender.com/graphql",
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default function App() {
  let userAgent = Device.osName;
  useEffect(() => {
    myDb.dbInit();
  }, []);
  return (
    <ApolloProvider client={client}>
      <StatusBar hidden={false}/>
      <View style={styles.wrapper}>
        <ImageBackground source={bg} style={styles.background}>
          <Header />
          <BurgerMenu />
          <Subscribe component={<Content/>} />
        </ImageBackground>
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 40
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
});
