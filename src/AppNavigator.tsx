import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from '@utils/theme';
import React from 'react';
import {ActivitiesScreen} from './domain/activity/ActivitiesScreen';
import {ActivityScreen} from './domain/activity/ActivityScreen';

export type TRootStackParamList = {
  Activities: undefined;
  Activity: {type: 'ADD'} | {type: 'EDIT'};
};

const Stack = createNativeStackNavigator<TRootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            title: 'TODO LIST APP',
            headerStyle: {
              backgroundColor: colors.brand.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="Activities" component={ActivitiesScreen} />
          <Stack.Screen name="Activity" component={ActivityScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
