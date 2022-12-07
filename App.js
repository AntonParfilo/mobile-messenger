import { useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, Image } from "react-native";
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
  useEffect(() => {
    myDb.dbInit();
  }, []);
  return (
    <ApolloProvider client={client}>
      <View style={styles.wrapper}>
        <StatusBar hidden={true} />
        <ImageBackground source={bg} style={styles.background}>
          <Header />
          <BurgerMenu />
        </ImageBackground>
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
});
