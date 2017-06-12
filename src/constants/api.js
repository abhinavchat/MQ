/**
 * API Config
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

export default {
  // The URL we're connecting to
  hostname: 'http://www.atcostretail.co.in',

  // Map shortnames to the actual endpoints, so that we can
  // use them like so: AppAPI.ENDPOINT_NAME.METHOD()
  //  NOTE: They should start with a /
  //    eg.
  //    - AppAPI.recipes.get()
  //    - AppAPI.users.post()
  //    - AppAPI.favourites.patch()
  //    - AppAPI.blog.delete()
  endpoints: new Map([
    ['login', '/index.php?route=rest/login/login'], // If you change the key, update the reference below
    ['token', '/index.php?route=feed/rest_api/session'], //to get SessionId
    ['logout', '/index.php?route=rest/logout/logout'],
    ['meals', '/index.php?route=rest/logout/logout']
  ]),

  // Which 'endpoint' key deals with our tokens?
  tokenKey: 'token',
};
