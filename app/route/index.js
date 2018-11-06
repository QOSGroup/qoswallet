import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import MainStack from './main'
import modals from './modals'
import CreateStack from './sign'

const AllStack = createStackNavigator(
    {
        Main: {
            screen: MainStack
        },
        ...modals
    },
    {
        initialRouteName: 'Main',
        mode: 'modal',
        headerMode: 'none',
    }
)

const RootStack = createSwitchNavigator(
    {
        Sign: CreateStack,
        All: AllStack
    },
    {
        initialRouteName: 'Sign'
    }
)

export default RootStack