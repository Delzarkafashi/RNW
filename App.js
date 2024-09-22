import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './screens/HomeScreen';
import ViewItemsScreen from './screens/ViewItemsScreen';
import AddItemScreen from './screens/AddItemScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function AuthTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'lightblue' },
        tabBarIndicatorStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="log-in" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-add" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'View Items') {
              iconName = 'list';
            } else if (route.name === 'Add Item') {
              iconName = 'add-circle';
            } else if (route.name === 'Login/Register') {
              iconName = 'log-in'; // En generisk ikon för Auth
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          showIcon: true,
          labelStyle: { fontSize: 12 },
          style: { backgroundColor: 'lightblue' },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="View Items" component={ViewItemsScreen} />
        <Tab.Screen name="Add Item" component={AddItemScreen} />
        <Tab.Screen name="Login/Register" component={AuthTabs} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
