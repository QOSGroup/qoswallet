import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
// import { Ionicons } from '@expo/vector-icons'
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './pages/home'
import DetailsScreen from './pages/detail'
import AboutModal from './modals/about'
import Settings from './pages/setting'
import SettingDetailsScreen from './pages/settingdetail'

const MainStack = createStackNavigator(
	{
		Home: HomeScreen,
	},
	{
		initialRouteName: 'Home',
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#f4511e',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
			headerBackTitle: null,
		},
	}
)

const SettingStack = createStackNavigator(
	{
		Settings: Settings,

	},
	{
		initialRouteName: 'Settings',
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#f4511e',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
			headerBackTitle: null,
		},
	},
);

const TabStack = createBottomTabNavigator(
	{
		TabMain: {
			screen: MainStack,
			navigationOptions: ({ navigation }) => {
				return {
					tabBarOnPress: (value) => {
						const { routeName } = navigation.state;
						value.defaultHandler();
						console.log(routeName)
					},
					tabBarLabel: '首页',
				}
			}
		},
		Settings: {
			screen: SettingStack,
			navigationOptions: ({ navigation }) => ({
				tabBarOnPress: (value) => {
					const { routeName } = navigation.state;
					value.defaultHandler();
					console.log(routeName)
				},
				tabBarLabel: '设置',
			})
		},
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === 'TabMain') {
					iconName = `home${focused ? '' : '-outline'}`;
				} else if (routeName === 'Settings') {
					iconName = `settings${focused ? '' : '-outline'}`;
				}

				// You can return any component that you like here! We usually use an
				// icon component from react-native-vector-icons
				return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
			},
		}),
		tabBarOptions: {
			activeTintColor: 'tomato',
			inactiveTintColor: 'gray',
		},
	}
)

const HomeStack = createStackNavigator(
	{
		Tabs: {
			screen: TabStack,
			navigationOptions: {
				header: null
			}
		},
		Details: DetailsScreen,
		SettingsDetails: SettingDetailsScreen,
	}, {
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#f4511e',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
			headerBackTitle: null,
		}
	}
)

const RootStack = createStackNavigator(
	{
		Main: {
			screen: HomeStack
		},
		AboutModal: {
			screen: AboutModal
		}
	},
	{
		mode: 'modal',
		headerMode: 'none',
	}
)

export default RootStack
