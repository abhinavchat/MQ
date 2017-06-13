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
  logo: {
    width: AppSizes.screen.width * 0.40,
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
  form: {
    width: AppSizes.screen.width * 0.80,
    flex: 1,
    flexDirection: 'column',
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
        Phone: FormValidation.String,//validPhone,
        PanNumber: FormValidation.String,//validPAN,
        Email: FormValidation.String,//validEmail,
        Password: FormValidation.String,//validPassword,
        ConfirmPassword: FormValidation.String,//passwordMatch,
        Terms: FormValidation.Boolean,
      }),
      empty_form_values: {
        Name: '',
        Phone: '',
        PanNumber: '', 
        Email: '',
        Password: '',
        Terms: false,
      },
      form_values: {},
      options: {
        fields: {
          Email: {
            placeholder: 'john@appleseed.com',
            error: 'Please enter a valid email',
            autoCapitalize: 'none',
            clearButtonMode: 'while-editing',
            keyboardType: 'email-address',
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
            placeholder: 'ABC1234DEF',
            error: 'PAN number must be 10 digits',
            autoCapitalize: true,
            clearButtonMode: 'while-editing',
          },
          Phone: {
            placeholder: 'Phone Number',
            error: 'Phone number must be 10 digits',
            keyboardType: 'phone-pad',
          },
          Terms: {
            label: 'By clicking the checkbox, you accept and agree to <a href="#">our terms and conditions</a>',
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
      <ScrollView style={[AppStyles.containerWhite]}>
        <View style={[AppStyles.containerCentered, AppStyles.containerReversed, styles.background]}>
          <Image
            source={require('../../../images/logo.png')}
            style={[styles.logo]} />
            <View style={[AppStyles.containerCentered, AppStyles.containerReversed, styles.background]}>
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
            style={styles.form}
          />

          <Button
            title={'Register'}
            onPress={this.register}
          />

          <Spacer size={10} />
          </View>
      </ScrollView>
    );
  }
}

/* Export Component ==================================================================== */
export default Register;
