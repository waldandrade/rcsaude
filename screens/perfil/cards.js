import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  Modal,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import {
  RkText,
  RkCard,
  RkButton,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {LinearGradient} from 'expo';
import {data} from '../../data';
import {PasswordTextInput} from '../../components/passwordTextInput';
import {UIConstants} from '../../config/appConstants';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import {Avatar} from '../../components/avatar';
import { ImagePicker, Constants } from 'expo';
import { Articles1 } from '../articles/articles1';
import { updatePhoto } from '../../actions';
import Icon from 'react-native-vector-icons/Ionicons'; // 4.4.2

class Cards extends React.Component {
  static navigationOptions = {
    title: 'Perfil'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.data = data.getCards();
    this.state = {
      page: 'BENEFICIOS',
      modalVisible: false,
      nome: props.screenProps.nome
    };

    this.user = data.getUser(1);
  }

  _getCardStyle(type) {
    switch (type) {
      case 'visa':
        return {
          gradient: ['#00555a','#002d4b'],
          icon: require('../../assets/icons/visaIcon.png')
        };
      case 'mastercard':
        return {
          gradient: ['#00555a','#002d4b'],
          icon: require('../../assets/icons/masterCardIcon.png')
        };
      case 'axp':
        return {
          gradient: ['#00555a','#002d4b'],
          icon: require('../../assets/icons/rcSaudeIcon.png')
        };
    }
  }

  _formatCurrency(amount, currency) {
    let symbol;
    switch (currency) {
      case 'usd':
        symbol = '$';
        break;
      case 'eur':
        symbol = '€';
        break;
    }
    return `${symbol}${amount}`;
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: true
    });

    var img = `data:image/jpeg;base64,${result.base64}`;

    if (!result.cancelled) {
      this.props.screenProps.dispatch(updatePhoto(img));
    }
  }

  _prepareCardNo(cardNo) {
    let re = /\*+/;
    let parts = cardNo.split(re);
    return {firstPart: parts[0], lastPart: parts[1]}
  }

  _renderFooter() {
    return (
      <View style={styles.footer}>
      </View>
    )
  }

  _goToPage(page) {
    this.setState({page: page});
  }

  _renderItem(info) {

    let {gradient, icon} = this._getCardStyle(info.item.type);
    let {firstPart, lastPart} = this._prepareCardNo(info.item.cardNo);

    return (
      <RkCard rkType='credit' style={styles.card}>
        <TouchableOpacity delayPressIn={70}
                          activeOpacity={0.8}>
          <LinearGradient colors={gradient}
                          start={{x: 0.0, y: 0.5}}
                          end={{x: 1, y: 0.5}}
                          style={styles.background}>
            <View rkCardHeader>
              <RkText rkType='header4 inverseColor'></RkText>
              <Image source={icon}/>
            </View>
            <View rkCardContent>
              <View style={styles.cardNoContainer}>
                <RkText style={styles.cardNo} rkType='header2 inverseColor'>0000</RkText>
                <RkText style={[styles.cardNo]} rkType='header2 inverseColor'>0066</RkText>
                <RkText style={[styles.cardNo]} rkType='header2 inverseColor'>8659</RkText>
                <RkText style={styles.cardNo} rkType='header2 inverseColor'>6450</RkText>
              </View>
              <RkText style={styles.date} rkType='header6 inverseColor'>val {info.item.date}</RkText>
            </View>
            <View rkCardFooter>
              <View>
                <RkText rkType='header4 inverseColor'>WALDNEY S ANDRADE</RkText>
                <RkText rkType='header6 inverseColor'>Natal-RN</RkText>
              </View>
              <RkText
                rkType='header2 inverseColor'></RkText>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </RkCard>
    )
  }

  render() {
    return (
      <ScrollView style={styles.root}>
        <View style={[styles.header, styles.bordered]}>
          <Avatar img={this.user.photo} rkType='big' onPress={this._pickImage}/>
          <TouchableOpacity style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:100,
       height:100,
       backgroundColor:'#fff',
       borderRadius:100,
     }} onPress={this._pickImage}>
            <Icon name={'ios-brush'} size={10} color="#01a699"/>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <RkButton style={styles.button} rkType='clear link white'>CARTÃO</RkButton>
        </View>
        <FlatList style={styles.list}
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={() => this._renderFooter()}
                  keyExtractor={(item) => item.id}
                  data={this.data}
                  renderItem={(info) => this._renderItem(info)}/>
      </ScrollView>
    )
  }
}

RkTheme.setType('RkButton', 'white', {
  color: "#000000"
});

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: '#FFFFF0',
    flex: 1
  },
  header: {
    backgroundColor: '#002d4b',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 17
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
  },
  list: {
    marginHorizontal: 16,
  },
  card: {
    marginVertical: 8,
  },
  background: {
    borderRadius: 7,
  },
  cardNoContainer: {
    flexDirection: 'row'
  },
  cardNo: {
    marginHorizontal: 8,
  },
  cardPlaceholder: {
    paddingTop: 4,
  },
  date: {
    marginTop: scaleVertical(20)
  },
  footer: {
    marginTop: 8,
    marginBottom: scaleVertical(16),
    alignItems: 'center'
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: 42
  },
  buttons: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  button: {
    flex: 1,
    alignSelf: 'center'
  },
  popup: {
    backgroundColor: theme.colors.screen.base,
    marginTop: scaleVertical(70),
    marginHorizontal: 37,
    borderRadius: 7
  },
  popupOverlay: {
    backgroundColor: theme.colors.screen.overlay,
    flex: 1,
    marginTop: UIConstants.HeaderHeight
  },
  popupContent: {
    alignItems: 'center',
    margin: 16
  },
  popupHeader: {
    marginBottom: scaleVertical(45)
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: theme.colors.border.base
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  }
}));

const mapStateToProps = (state) => {
  return {
    nome: state.nome
  }
}

const Perfil = connect(
  mapStateToProps
)(({ nome }) => {
    return (
      <Cards screenProps={{nome}}/>
    );
});

export class PerfilCards extends React.Component {
  static navigationOptions = {
    title: 'Perfil'.toUpperCase()
  };

  render() {
    return (<Perfil />);
  }
}
