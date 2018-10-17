import { createStackNavigator } from 'react-navigation'
import HomeScreen from './pages/home'
import DetailsScreen from './pages/detail'

const RootStack = createStackNavigator(
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
		},
	},
)

export default RootStack
