import React from 'react';
import {
  Image,
  View,
  Button
} from 'react-native';
import {
  RkComponent,
  RkText,
  RkTheme
} from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';

export class Avatar extends RkComponent {
  componentName = 'Avatar';
  typeMapping = {
    container: {},
    image: {},
    badge: {},
    badgeText: {}
  };

  constructor(props) {
    super(props);
  }

  renderImg(styles) {
    let {image, badge, badgeText} = styles;
    return (
      <View>
        <Image style={image} source={this.props.img}/>
      </View>
    )
  }

  renderBadge(style, textStyle) {
    let symbol;
    let backgroundColor;
    let color;

    switch (this.props.badge) {
      case 'like':
        symbol = FontAwesome.heart;
        backgroundColor = RkTheme.current.colors.badge.likeBackground;
        color = RkTheme.current.colors.badge.likeForeground;
        break;
      case 'follow':
        symbol = FontAwesome.plus;
        backgroundColor = RkTheme.current.colors.badge.plusBackground;
        color = RkTheme.current.colors.badge.plusForeground;
        break;
    }

    return (
      <View style={[style, {backgroundColor}]}>
        <RkText rkType='awesome' style={[textStyle, {color}]}>
          {symbol}
        </RkText>
        <Button onPress={() => this.props.onPress}
  icon={{ name: 'filter-list' }}
  color="#841584"
  accessibilityLabel="Learn more about this purple button"/>
      </View>
    )
  };

  render() {
    let {container, ...other} = this.defineStyles();
    return (
      <View style={[container, this.props.style]}>
        {this.renderImg(other)}
      </View>
    )
  }
}
