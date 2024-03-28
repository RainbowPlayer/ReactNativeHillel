import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuStackScreen from '../Navigation/MenuStackScreen';
import SwiperComponent from '../SwiperComponent/SwiperComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useTheme from '../../hooks/useTheme';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const theme = useTheme();

  const backgroundColor = theme === 'dark' ? 'rgba(51, 51, 51, 0.95)' : 'rgba(255, 255, 255, 0.95)';

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Menu') {
              iconName = focused ? 'restaurant' : 'restaurant-outline';
            } else if (route.name === 'Slider') {
              iconName = focused ? 'images' : 'images-outline';
            }
            const iconColor = theme === 'dark' ? '#ffffff' : '#000000';
            return <Ionicons name={iconName} size={size} color={iconColor} />;
          },
          tabBarStyle: {
            backgroundColor,
          },
          headerStyle: {
            backgroundColor,
          },
          tabBarActiveTintColor: '#007aff',
          tabBarInactiveTintColor: '#8e8e93',
        })}
      >
        <Tab.Screen name="Menu" component={MenuStackScreen} />
        <Tab.Screen name="Slider" component={SwiperComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
