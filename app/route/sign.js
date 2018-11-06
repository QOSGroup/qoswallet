import { createStackNavigator } from 'react-navigation'
import CreateScreen from '../pages/sign/create'


const CreateStack = createStackNavigator(
    {
        Create: CreateScreen,
    },
    {
        navigationOptions: {
            headerTransparent: true,
            headerStyle: {
                // backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            // headerTitle: '轻钱包',
            // header: null
        },
    }
)


export default CreateStack