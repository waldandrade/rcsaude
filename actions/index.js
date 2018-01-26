import firebase from '../firebase';
import DeviceInfo from 'react-native-device-info';
import FCM, { FCMEvent, NotificationType, WillPresentNotificationResult, RemoteNotificationResult } from 'react-native-fcm';
import { Platform } from 'react-native';
import Expo, { Font } from 'expo';

export const addMessage = (msg) => ({
    type: 'ADD_MESSAGE',
    ...msg
});

export const sendMessage = (text, user) => {
    return function (dispatch) {
        let msg = {
                text: text,
                time: Date.now(),
                author: {
                    email: user.email
                }
            };

        const newMsgRef = firebase.database()
                                  .ref('messages')
                                  .push();
        msg.id = newMsgRef.key;
        newMsgRef.set(msg);

        dispatch(addMessage(msg));
    };
};

export const startFetchingMessages = () => ({
    type: 'START_FETCHING_MESSAGES'
});

export const receivedMessages = () => ({
    type: 'RECEIVED_MESSAGES',
    receivedAt: Date.now()
});

export const fetchMessages = () => {
    return function (dispatch) {
        dispatch(startFetchingMessages());

        firebase.database()
                .ref('messages')
                .orderByKey()
                .limitToLast(20)
                .on('value', (snapshot) => {
                    // gets around Redux panicking about actions in reducers
                    setTimeout(() => {
                        const messages = snapshot.val() || [];

                        dispatch(receiveMessages(messages))
                    }, 0);
                });
    }
}

export const receiveMessages = (messages) => {
    return function (dispatch) {
        Object.values(messages).forEach(msg => dispatch(addMessage(msg)));

        dispatch(receivedMessages());
    }
}

export const updateMessagesHeight = (event) => {
    const layout = event.nativeEvent.layout;

    return {
        type: 'UPDATE_MESSAGES_HEIGHT',
        height: layout.height
    }
}



//
// User actions
//

export const setEmail = (email) => ({
    type: 'SET_EMAIL',
    email
});

export const setPassword = (password) => ({
    type: 'SET_PASSWORD',
    password
});

export const login = () => {
    return function (dispatch, getState) {
        dispatch(startAuthorizing());

        const { email, password } = getState().user;

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
          firebase.auth()
                  .signInWithEmailAndPassword(email, password)
                  .then(() => {

                      firebase.database()
                              .ref(`users/${Expo.Constants.deviceId}`)
                              // .ref(`users/${DeviceInfo.getUniqueID()}`)
                              .set({
                                  email
                              });

                      startChatting(dispatch);
                  });
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }
}

const loadAssets = async() => {
  await Font.loadAsync({
    'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
    'fontawesome': require('../assets/fonts/fontawesome.ttf'),
    'icomoon': require('../assets/fonts/icomoon.ttf'),
    'Righteous-Regular': require('../assets/fonts/Righteous-Regular.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
  });
};

export const loadfonts = () => {
  return function (dispatch, getState) {

    loadAssets();

    dispatch(fontLoaded());

  }
}

export const checkUserExists = () => {
    return function (dispatch, getState) {
        dispatch(startAuthorizing());

        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            firebase.database()
              .ref(`users/${Expo.Constants.deviceId}`)
              //.ref(`users/teste`)
              .once('value', (snapshot) => {
                  const val = snapshot.val();

                  if (val === null) {
                      dispatch(userNoExist());
                  }else{
                      dispatch(setEmail(val.email));
                      startChatting(dispatch);
                  }
              })
          }
        });
    }
}

const startChatting = function (dispatch) {
    dispatch(userAuthorized());
    dispatch(fetchMessages());
    // FCM.requestPermissions();
    // FCM.getFCMToken()
    //    .then(token => {
    //        console.log(token)
    //    });
    // FCM.subscribeToTopic('secret-chatroom');
    //
    // FCM.on(FCMEvent.Notification, async (notif) => {
    //    console.log(notif);
    //
    //    if (Platform.OS === 'ios') {
    //        switch (notif._notificationType) {
    //            case NotificationType.Remote:
    //                notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
    //                break;
    //            case NotificationType.NotificationResponse:
    //                notif.finish();
    //                break;
    //            case NotificationType.WillPresent:
    //                notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
    //                break;
    //          }
    //        }
    // });
    //
    // FCM.on(FCMEvent.RefreshToken, token => {
    //    console.log(token);
    // });
}

export const startAuthorizing = () => ({
    type: 'USER_START_AUTHORIZING'
});

export const userAuthorized = () => ({
    type: 'USER_AUTHORIZED'
});

export const userNoExist = () => ({
    type: 'USER_NO_EXIST'
});

export const fontLoaded = () => ({
  type: 'FONT_LOADED'
})
