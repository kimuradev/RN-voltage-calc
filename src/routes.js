import React from 'react';
import {createAppContainer, createDrawerNavigator} from 'react-navigation';
// import {Image} from 'react-native';

import Home from './pages/Home';
import New from './pages/New';

// import Logo from './assets/instagram-logo.png';

export default createAppContainer(
  createDrawerNavigator(
    {
      Home,
      New,
    },
    {
      defaultNavigationOptions: {
        headerTintColor: '#000',
        // headerTitle: (
        //   <Image
        //     style={{ width: 130, height: 30, marginHorizontal: 20 }}
        //     source={Logo}
        //   />
        // ),
        headerBackTitle: null,
      },
      mode: 'modal',
    },
  ),
);
