import { createStackNavigator } from 'react-navigation'
import MainStack from './main'

const RootStack = createStackNavigator(
    {
        Main: {
            screen: MainStack
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