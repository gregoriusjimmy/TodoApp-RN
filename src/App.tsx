/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './AppNavigator';
import './configs/axiosConfig';
const App = () => {
  return (
    <View style={styles.wrapper}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1},
});

export default App;
