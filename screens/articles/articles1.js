import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Button
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog'; // 0.9.36
import {SocialBar} from '../../components';
import { WeatherView } from '../../components/WeatherView';
import {data} from '../../data';
import { Constants } from 'expo';
import { logout } from '../../actions';
import { connect } from 'react-redux';
let moment = require('moment');

const scaleAnimation = new ScaleAnimation();

export class Articles1 extends React.Component {
  static navigationOptions = props =>  {
    return {
      title: 'Benefícios'.toUpperCase(),
      headerRight: (
        <Button
          onPress={() => props.screenProps.dispatch(logout())}
          style={{marginRight: 5}}
          title="Sair"
          color="#000"
        />
      ),
      headerStyle: {
        paddingRight: 10
      }
    }
  };

  constructor(props) {
    super(props);
    this.data = data.getArticles();
    this.renderItem = this._renderItem.bind(this);

    this.state = {
      dialogShow: false,
    };

    this.showScaleAnimationDialog = this.showScaleAnimationDialog.bind(this);
  }

  showScaleAnimationDialog() {
    this.scaleAnimationDialog.show();
  }

  _keyExtractor(post, index) {
    return post.id;
  }

  _goToPage(page) {
     // this.props.navigation.navigate('Article', {id: info.item.id});
  }

  _action(page) {
    if(page !== null) {
      this.props.navigation.navigate(page)
    } else {
      this.showScaleAnimationDialog()
    }
  }

  _renderItem(info) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this._action(info.item.page)}
        //onPress={() => this.scaleAnimationDialog.show()}
        >
        <RkCard rkType='backImg'>
          <Image rkCardImg source={info.item.photo}/>
          <View rkCardImgOverlay rkCardContent style={styles.overlay}>
            <RkText rkType='header2 inverseColor'>{info.item.header}</RkText>
            <RkText rkType='secondary2 inverseColor'>{info.item.desc}</RkText>
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    let info = {};
    info.item = this.data[0];

    return (
      <View style={{ flex: 1 }}>
        <FlatList data={this.data}
                  renderItem={this.renderItem}
                  keyExtractor={this._keyExtractor}
                  style={styles.root}/>
        <PopupDialog
          ref={popupDialog => {
            this.scaleAnimationDialog = popupDialog;
          }}
          dialogAnimation={scaleAnimation}
          dialogTitle={<DialogTitle title="ESTAMOS EM CONSTRUÇÃO!" />}
          actions={[
            <DialogButton
              text="VOLTAR"
              onPress={() => {
                this.scaleAnimationDialog.dismiss();
              }}
              key="button-1"
            />,
          ]}
          height={0.6}
          width={0.8}>
          <View style={styles.container}>
            <ImageBackground
              source={{
                uri: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?dpr=1&auto=compress,format&fit=crop&w=1576&h=&q=80&cs=tinysrgb&crop=',
              }}
              style={styles.imageBg}>
              <View style={styles.upperContainer}>
                <View style={styles.locationContainer}>
                  <Text style={styles.location}>{this.state.name}</Text>
                </View>
                <View style={styles.centerContainer}>
                  <View style={styles.tempContainer}>
                    <Text style={styles.temp}>{this.state.temp}</Text>
                    <Text style={styles.degree}>Aguarde</Text>
                  </View>
                  <Text style={styles.status}>{this.state.weather}</Text>
                  <Text style={styles.description}>Logo está opção estará disponível</Text>
                </View>
              </View>
            </ImageBackground>

          </View>
      </PopupDialog>
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: "#00e3aa"
  },
  overlay: {
    justifyContent: 'flex-end',
  },
  footer: {
    width: 240
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  imageBg: {
    flex: 2,
    width: null,
    height: null,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingTop: 20,
  },
  upperContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temp: {
    fontSize: 100,
  },
  degree: {
    fontSize: 50,
    marginTop: -30,
  },
  status: {
    fontSize: 20,
  },
  description: {
    fontSize: 14,
  },
  locationContainer: {
    height: 20,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  location: {
    fontSize: 20,
    color: 'white',
  },
  footer: {
    flex: 1,
  },
  daily: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30,
  },
  dailyText: {
    fontSize: 20,
  }
}));
