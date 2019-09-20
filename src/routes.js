import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  Button,
} from 'react-navigation';

import Home from './pages/Home';
import Theory from './pages/Theory';

export default createAppContainer(
  createStackNavigator(
    {
      Home,
      Theory,
    },
    {
      defaultNavigationOptions: {
        // headerLeft: (
        //   <Button
        //     onPress={() => props.navigation.navigate('DrawerOpen')}
        //     title="="
        //   />
        // ),
        title: 'Voltage Divider Calculator',
        headerTintColor: '#3366ff',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: {
          textAlign: 'center',
          flexGrow: 1,
        },

        headerBackTitle: null,
      },
      mode: 'modal',
    },
  ),
);
