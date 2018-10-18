import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
// import { Ionicons } from '@expo/vector-icons'

import HomeScreen from './pages/home'
import DetailsScreen from './pages/detail'
import AboutModal from './modals/about'
import Settings from './pages/setting'
import SettingDetailsScreen from './pages/settingdetail'

const MainStack = createStackNavigator(
	{
		Home: HomeScreen,
		Details: DetailsScreen,
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
			headerBackTitle: null
		}
	}
)

const SettingStack = createStackNavigator(
	{
		Settings: Settings,
		SettingsDetails: SettingDetailsScreen,
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

// createBottomTabNavigator
const TabStack = createBottomTabNavigator(
	{
		TabMain: {
			screen: MainStack,
			navigationOptions: ({ navigation }) => {
				let tabBarVisible = true;
				if (navigation.state.index > 0) {
					tabBarVisible = false;
				}

				return {
					tabBarOnPress: (value) => {
						const { routeName } = navigation.state;
						value.defaultHandler();
						console.log(routeName)
					},
					tabBarLabel: '首页',
					tabBarVisible,
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
	}, {
		navigationOptions: () => ({
			tabBarIcon: () => {
				// const { routeName } = navigation.state;		
			}
		}),
		// swipeEnabled: true
	}
)


const RootStack = createStackNavigator(
	{
		Main: {
			screen: TabStack
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
