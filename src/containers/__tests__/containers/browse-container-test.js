/**
 * Test to check if the container is created correctly
 */
/* global it expect jest */
import 'react-native';

import BrowseContainer from '@containers/recipes/Browse/BrowseContainer';

// Check if BrowseContainer is created correctly
test('BrowseContainer is created correctly', () => {
  expect(typeof BrowseContainer).toEqual('function');
});
