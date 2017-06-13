/**
 * User Actions
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import jwtDecode from 'jwt-decode';

import AppAPI from '@lib/api';

/**
  * Login to API and receive Token
  */
export function login(credentials, freshLogin) {
  return dispatch => new Promise(async (resolve, reject) => {
    const userCreds = credentials || null;

    // Force logout, before logging in
    if (freshLogin && AppAPI.deleteToken) await AppAPI.deleteToken();

    if (!AppAPI.getToken) return resolve();

    let creds = {};
    if((null === userCreds) || (userCreds === undefined)) creds = await AppAPI.getStoredCredentials();
    
    // Get a new token from API
    return AppAPI.getToken(userCreds)
      .then((token) => {
        let decodedToken = '';
        if((null !== token) || (null !== token.data) || (null !== token.data.session)) {
          decodedToken = token;
        } else {
          return reject('Token decode failed.');
        }
        
        // Get user details from API, using my token
        return AppAPI.login.post(null, creds)
          .then((userData) => {
            let userInfo = {};
            if(userData.success) {
              AppAPI.storeUserInfo(userData.data);
              userInfo = userData.data;
            } else {
              userInfo = AppAPI.getUserInfo();

            }
            
            dispatch({
              type: 'USER_REPLACE',
              data: userInfo,
            });

            return resolve(userData);
          }).catch(err => reject(err));
      }).catch(err => reject(err));
  });
}

/**
  * Logout
  */
export function logout() {
  return dispatch => new Promise(async (resolve, reject) => {
    return AppAPI.getStoredToken().then((token) => {
        let decodedToken = '';
        if((null !== token) || (null !== token.data) || (null !== token.data.session)) {
          decodedToken = token;
        } else {
          return reject('Token decode failed.');
        }

        // Logout user from API, using my token
        return AppAPI.logout.post(null, null)
          .then((userData) => {
            return AppAPI.deleteToken()
              .then(() => {
                dispatch({
                  type: 'USER_REPLACE',
                  data: {},
                });
              });
          }).catch(err => reject(err));

    }).catch(err => reject(err));;
  });
}

/**
  * Get My User Data
  */
export function getMe() {
  return dispatch => AppAPI.me.get()
    .then((userData) => {
      dispatch({
        type: 'USER_REPLACE',
        data: userData,
      });

      return userData;
    });
}

/**
  * Update My User Data
  * - Receives complete user data in return
  */
export function updateMe(payload) {
  return dispatch => AppAPI.me.post(payload)
    .then((userData) => {
      dispatch({
        type: 'USER_REPLACE',
        data: userData,
      });

      return userData;
    });
}
