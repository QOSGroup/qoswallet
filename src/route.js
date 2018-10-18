import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
// import { Ionicons } from '@expo/vector-icons'

import HomeScreen from './pages/home'
import DetailsScreen from './pages/detail'
import AboutModal from './modals/about'
import Settings from './pages/setting'

// import tStack from './pages/test'


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
		},
	},
);

const SettingStack = createStackNavigator(
	{
		Settings: Settings,
		SettingsDetails: DetailsScreen,
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
			headerBackTitle: null
		},
	},
);

const TabStack = createBottomTabNavigator(
	{
		Main: MainStack,
		Settings: SettingStack,
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
