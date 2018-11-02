import { createStackNavigator } from 'react-navigation'
import MainStack from './main'
import modals from './modals'

const RootStack = createStackNavigator(
    {
        Main: {
            screen: MainStack
        },
        ...modals
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
)

export default RootStack