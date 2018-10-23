import { createStackNavigator } from 'react-navigation'
import HomeStack from './home'

const RootStack = createStackNavigator(
    {
        Main: {
            screen: HomeStack
        },
        // AboutModal: {
        //     // screen: AboutModal
        // }
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
)

export default RootStack