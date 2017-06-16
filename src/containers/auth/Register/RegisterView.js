/**
 * Register Screen
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FormValidation from 'tcomb-form-native';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import AppAPI from '@lib/api';
import { AppStyles, AppSizes, AppColors } from '@theme/';

// Components
import { Alerts, Card, Spacer, Text, Button } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  background: {
    backgroundColor: 'transparent',
    height: AppSizes.screen.height,
    width: AppSizes.screen.width,
  },
  navBarContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    height: AppSizes.screen.height * 0.25,
  },
  navBar: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    height: AppSizes.screen.height * 0.25,
    alignItems:'center',
    justifyContent:'center',
  },
  logo: {
    width: AppSizes.screen.width * 0.35,
    height: AppSizes.screen.width * 0.35,
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
    backgroundColor: AppColors.brand.secondary,
  },
  registerBackground: {
    backgroundColor: AppColors.danger,
  },
  marginRight: {
    marginRight:10,
  },
  bannerTextSize: {
    fontSize: 18,
  },
  roundButton: {
    borderRadius: 10,
    padding: 5,
    alignItems:'center',
    justifyContent:'center',
    width:AppSizes.screen.width * 0.40,
    height:AppSizes.screen.width * 0.10,
  },
  roundButtonText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});


/* Component ==================================================================== */
class Register extends Component {
  static componentName = 'Register';

  static propTypes = {
    register: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    // Email Validation
    const validEmail = FormValidation.refinement(
      FormValidation.String, (email) => {
        const regularExpression = /^.+@.+\..+$/i;

        return regularExpression.test(email);
      },
    );

    // Password Validation - Must be 6 chars long
    const validPassword = FormValidation.refinement(
      FormValidation.String, (password) => {
        if (password.length < 6) return false;
        return true;
      },
    );

    const passwordMatch = FormValidation.refinement(
      FormValidation.String, (cpass) => {
        if(cpass !== this.state.form_fields.Password) return false;
        return true;
      },
    );

    // Phone Validation - Must be 10 chars long
    const validPhone = FormValidation.refinement(
      FormValidation.String, (phone) => {
        if(phone.length !== 10) return false;
        return true;
      },
    );

    const validPAN = FormValidation.refinement(
      FormValidation.String, (pan) => {
        if(pan.length !== 10) return false;
        return true;
      },
    );

    this.state = {
      resultMsg: {
        status: '',
        success: '',
        error: '',
      },
      form_fields: FormValidation.struct({
        Name: FormValidation.String,
        Phone: FormValidation.String,//validPhone,
        PanNumber: FormValidation.String,//validPAN,
        Password: FormValidation.String,//validPassword,
        ConfirmPassword: FormValidation.String,//passwordMatch,
        Terms: FormValidation.Boolean,
      }),
      empty_form_values: {
        Name: '',
        Phone: '',
        PanNumber: '', 
        Password: '',
        Terms: false,
      },
      form_values: {},
      options: {
        auto: 'placeholders',
        placeholderTextColor: '#0000ff',
        color: '#0000ff',
        fields: {
          Name: {
            error: 'Name cannot be blank',
          },
          Password: {
            error: 'Your new password must be more than 6 characters',
            clearButtonMode: 'while-editing',
            secureTextEntry: true,
          },
          ConfirmPassword: {
            error: 'Password and confirm passwords must match.',
            clearButtonMode: 'while-editing',
            secureTextEntry: true,
          },
          PanNumber: {
            error: 'PAN number must be 10 digits',
            autoCapitalize: true,
            clearButtonMode: 'while-editing',
          },
          Phone: {
            error: 'Phone number must be 10 digits',
            keyboardType: 'phone-pad',
          },
          Terms: {
            tintColor: 'green',
          },
        },
      },
    };
  }

  componentDidMount = async () => {
    //TODO: Use this method if necessary.
  }

  /**
    * Register
    */
  register = () => {
    //TODO: Implementation of register
    console.log("Submit form");
  }


  render = () => {
    const Form = FormValidation.form.Form;

    return (
      <ScrollView style={[AppStyles.container]}>
        <View style={[styles.navBarContainer]}>
          <View style={[styles.navBar]}>
            <Image
            source={require('../../../images/logo1.png')}
            style={[styles.logo]} />
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
        </View>
        <View style={[AppStyles.container, styles.background]}>
          <Alerts
            status={this.state.resultMsg.status}
            success={this.state.resultMsg.success}
            error={this.state.resultMsg.error}
          />

          <Form
            ref={(b) => { this.form = b; }}
            type={this.state.form_fields}
            value={this.state.form_values}
            options={this.state.options}
            ctx={AppStyles.formContainer}
            style={[AppStyles.centerAligned, AppStyles.formContainer]}
          />

          <Button
            title={'Register'}
            onPress={this.register}
            borderRadius={10}
            small={true}
            color={'#fff'}
          />
        </View>
      </ScrollView>
    );
  }
}

/* Export Component ==================================================================== */
export default Register;
