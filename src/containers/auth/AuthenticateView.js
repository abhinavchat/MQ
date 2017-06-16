/**
 * Authenticate Screen
 *  - Entry screen for all authentication
 *  - User can tap to login, forget password, signup...
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { AppStyles, AppSizes, AppColors } from '@theme/';

// Components
import { Spacer, Text, Button } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  background: {
    backgroundColor: 'transparent',
    height: AppSizes.screen.height,
    width: AppSizes.screen.width,
  },
  logo: {
    width: AppSizes.screen.width * 0.75,
    resizeMode: 'contain',
  },
  whiteText: {
    color: '#FFF',
  },
  orangText: {
    color: '#e09706',
  },
  greenText: {
    color: '#447a1c',
  },
  blueText: {
    color: '#1b56ad',
  },
  loginBackground: {
    backgroundColor: '#3e4444',
  },
  registerBackground: {
    backgroundColor: AppColors.danger,
  },
  marginRight: {
    marginRight:60,
  },
  bannerTextSize: {
    fontSize: 24,
    paddingBottom: 5,
  },
  bTextSize: {
    fontSize: 24,
    paddingBottom: 5,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/* Component ==================================================================== */
class Authenticate extends Component {
  static componentName = 'Authenticate';

  render = () => (
    <View style={[AppStyles.containerCentered, AppStyles.container, styles.background]}>
      
      <View style={styles.centered}>
        <Image
          source={require('../../images/logo1.png')}
          style={[styles.logo]}
        />
      </View>
      <Spacer size={75} />
      <View style={[AppStyles.containerReversed, styles.centered]}>
        <Text style={[styles.orangText, AppStyles.paddingHorizontal, styles.bannerTextSize]}>
          Learn
        </Text>
        <Text style={[styles.greenText, AppStyles.paddingHorizontal, styles.bannerTextSize]}>
          Play
        </Text>
        <Text style={[styles.blueText, AppStyles.paddingHorizontal, styles.bannerTextSize]}>
          Win
        </Text>
      </View>
      <Spacer size={75} />
      <View style={[AppStyles.row, styles.centered]}>
        <TouchableOpacity
          onPress={Actions.login} 
          style={[AppStyles.roundButton, styles.loginBackground, styles.marginRight]}>
            <Text style={[AppStyles.roundButtonText, styles.whiteText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Actions.signUp}
          style={[AppStyles.roundButton, styles.registerBackground]}>
            <Text style={[AppStyles.roundButtonText, styles.whiteText]}>Register</Text>
        </TouchableOpacity>
      </View>
      </View>
  )
}

/* Export Component ==================================================================== */
export default Authenticate;
