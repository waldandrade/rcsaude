import React, { Component } from 'react';
import {
  DrawerNavigator,
  StackNavigator
} from 'react-navigation';
import { View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import {AppRoutes} from './config/navigation/routesBuilder';
import LoginUI from "./components/LoginUI";
import ChatUI from "./components/ChatUI"
import rootReducer from './reducers';
import { fetchMessages, checkUserExists, loadfonts } from './actions';
import Expo, { AppLoading, Font } from 'expo';
import SocketIOClient from 'socket.io-client';
import { Cards } from './screens/perfil';
import {withRkTheme} from 'react-native-ui-kitten';
import {bootstrap} from './config/bootstrap';
import {data} from './data'
import * as Screens from './screens';
import track from './config/analytics';

bootstrap();
data.populateData();

console.ignoredYellowBox = [
  'Setting a timer'
];

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware
    )
);

// src/App.js
const LoginOrChat = connect(
    (state) => ({
        authorized: state.user.authorized
    })
)(({ authorized, dispatch }) => {
    if (authorized) {
        return (<KittenApp />);
    }else{
        // dispatch(loadfonts());
        dispatch(checkUserExists());
        return (<Screens.SplashScreen />);
    }
});

async function getNotificationAsync() {
  const { Notifications, Permissions } = Expo;
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status === 'granted') {
    alert('ok');
  } else {
    throw new Error('Location permission not granted');
  }
}


async function alertIfRemoteNotificationsDisabledAsync() {
  const { Permissions } = Expo;
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    await getNotificationAsync();
  }
}

class App extends Component {

  state = {
    loaded: false
  };

  constructor(props) {
    super(props);
    // Creating the socket-client instance will automatically connect to the server.
    this.socket = SocketIOClient('http://172.30.3.2:3000', { transports: ['websocket'] });

    this.socket.emit('enter room', {"room":20, "message":"Olá Mundo!"});
  }

  componentWillMount() {
    this._loadAssets();
  }

  _loadAssets = async() => {
    await Font.loadAsync({
      'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
      'fontawesome': require('./assets/fonts/fontawesome.ttf'),
      'icomoon': require('./assets/fonts/icomoon.ttf'),
      'Righteous-Regular': require('./assets/fonts/Righteous-Regular.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    });
    this.setState({loaded: true});
  };

    render() {

        if (!this.state.loaded) {
          return <AppLoading />;
        }

        return (
            <Provider store={store}>
               <LoginOrChat />
            </Provider>
        );
    }
}

// let SideMenu = withRkTheme(Screens.SideMenu);
const KittenApp = StackNavigator({
  Home: {
    screen: DrawerNavigator({
        Home: {
          screen: ChatUI,
        }
      },
      {
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle'
      })
  }
}, {
  headerMode: 'none',
});

class Inicio extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <KittenApp
          onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = getCurrentRouteName(currentState);
            const prevScreen = getCurrentRouteName(prevState);

            if (prevScreen !== currentScreen) {
              track(currentScreen);
            }
          }}
        />
      </View>
    );
  }
}

export default App;
