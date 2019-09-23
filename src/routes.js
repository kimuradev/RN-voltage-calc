import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import HomeScreen from './pages/Home';
// import TheoryScreen from './pages/Theory';

const MainStack = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    // Theory: {screen: TheoryScreen},
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
);

const MainNavigator = createDrawerNavigator(
  {
    Home: MainStack,
    // Theory: {screen: TheoryScreen},
  },
  {
    intialRouteName: 'Home',
    navigationOptions: {
      headerMode: 'screen',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: 'white',
      },
    },
  },
);

const Routes = createAppContainer(MainNavigator);

export default Routes;
