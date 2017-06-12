/**
 * API JWT Auth Functions
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
 /* global fetch console */
import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';

// Consts and Libs
import AppAPI from '@lib/api';
import { APIConfig } from '@constants/';

export default class JWT {
  static apiToken = ''
  apiCredentials = {}
  userInfo = {}  

  /**
    * Authenticate
    */
  getToken = credentials => new Promise(async (resolve, reject) => {
    // Check any existing tokens - if still valid, use it, otherwise login
    const apiToken = this.getStoredToken ? await this.getStoredToken() : false;
    if (apiToken) return resolve(apiToken);

    // Use credentials or AsyncStore Creds?
    if (credentials && typeof credentials === 'object' && credentials.email && credentials.password) {
      this.apiCredentials.email = credentials.email;
      this.apiCredentials.password = credentials.password;

      // Save new Credentials to AsyncStorage
      await AsyncStorage.setItem('api/credentials', JSON.stringify(this.apiCredentials));

    // Check if credentials are in AsyncStorage
    } else {
      await this.getStoredCredentials();
    }

    // No credentials, we can't do anything
    if (!this.apiCredentials || !this.apiCredentials.email || !this.apiCredentials.password) {
      return reject({
        data: { status: 403 },
        message: 'Credentials missing (JWT.getToken).',
      });
    }

    // Let's try logging in
    return AppAPI[APIConfig.tokenKey].get(null, null).then(async (res) => {
      if (!res.success) {
        return reject(res);
      }

      const tokenIsNowValid = this.tokenIsValid ? await this.tokenIsValid(res.data.session) : undefined;
      if (!tokenIsNowValid) return reject(res);

      // Set token in AsyncStorage + memory
      if (this.storeToken) await this.storeToken(res);

      return resolve(res);
    }).catch(err => reject(err));
  })

  /**
    * Retrieves Token from Storage
    */
  getStoredToken = async () => {
    if (!this.apiToken) this.apiToken = await AsyncStorage.getItem('api/token');
    const validToken = this.apiToken ? await this.tokenIsValid(this.apiToken) : false;
    if (this.apiToken && !validToken) this.apiToken = null;

    return this.apiToken;
  }

  /**
    * Retrieves Stored Login Credentials from Storage
    */
  getStoredCredentials = async () => {
    let storedCredsStr = '';
    if (!this.apiCredentials) storedCredsStr = await AsyncStorage.getItem('api/credentials');
    const storedCreds = storedCredsStr ? JSON.parse(storedCredsStr) : false;

    if (storedCreds && typeof storedCreds === 'object' && storedCreds.username && storedCreds.password) {
      this.apiCredentials = storedCreds;
    }

    return this.apiCredentials;
  }

  /**
    * Adds Token to AsyncStorage
    */
  storeToken = async (token) => {
    await AsyncStorage.setItem('api/token', token.data.session);
    this.apiToken = token.data.session;
  }

  /**
    * Deletes Token and saved credentials
    * Used for logout
    */
  deleteToken = async () => {
    await AsyncStorage.setItem('api/token', '');
    await AsyncStorage.setItem('api/credentials', '');
    this.apiToken = '';
  }

  /**
    * Tests whether a token is valid
    */
  tokenIsValid = (token, userId = null) => {
    if(token === 'undefined' || null === token) {
      return false;
    } else {
      return true;
    }
  }

  /**
    * Adds Token to AsyncStorage
    */
  storeUserInfo = (userinfo) => {
    AsyncStorage.setItem('api/userInfo', JSON.stringify(userinfo));
    this.userInfo = userinfo;
  }

  /**
    * Retrieves Stored Login Credentials from Storage
    */
  getUserInfo = () => {
    let storedUserInfo = '';
    if (!this.userInfo) storedUserInfo = AsyncStorage.getItem('api/userInfo');
    const storedInfo = storedUserInfo ? JSON.parse(storedUserInfo) : false;

    if (storedInfo && typeof storedInfo === 'object' && storedInfo.email && storedInfo.address_id) {
      this.userInfo = storedInfo;
    }

    return this.userInfo;
  }
}
