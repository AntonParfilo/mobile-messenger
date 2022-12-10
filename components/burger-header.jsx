import React from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Login } from './login';
import { LoginContainer } from './login-container';
import { Registration } from './registration';
import { RegistrationContainer } from './registration-container';

const FirstRoute = () => (
    <LoginContainer />
  );
  
  const SecondRoute = () => (
    <RegistrationContainer />
  );
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

export const BurgerHeader = ()=>{

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Вход' },
      { key: 'second', title: 'Регистрация' },
    ]);

    return(
            <View style={{width: "100%", height: "50%"}}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
            </View>
    )
}