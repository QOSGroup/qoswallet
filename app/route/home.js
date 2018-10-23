import { createStackNavigator } from 'react-navigation'
import TabStack from './tabs'

const HomeStack = createStackNavigator(
    {
        Tabs: {
            screen: TabStack,
            navigationOptions: {
                header: null
            }
        },
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

export default HomeStack