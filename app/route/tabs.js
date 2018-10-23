import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DAppsScreen from '../pages/dapps'
import SettingScreen from '../pages/setting'
import WalletScreen from '../pages/wallet'

const DAppsStack = createStackNavigator(
    {
        DApps: DAppsScreen,
    },
    {
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

const WalletStack = createStackNavigator(
    {
        Wallet: WalletScreen,
    },
    {
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

const SettingStack = createStackNavigator(
    {
        Settings: SettingScreen,
    },
    {
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
        DApps: {
            screen: DAppsStack,
            navigationOptions: ({ navigation }) => {
                return {
                    tabBarOnPress: (value) => {
                        const { routeName } = navigation.state;
                        value.defaultHandler();
                        console.log(routeName)
                    },
                    tabBarLabel: 'DApps',
                }
            }
        },
        Wallet: {
            screen: WalletStack,
            navigationOptions: ({ navigation }) => {
                return {
                    tabBarOnPress: (value) => {
                        const { routeName } = navigation.state;
                        value.defaultHandler();
                        console.log(routeName)
                    },
                    tabBarLabel: '钱包',
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
                if (routeName === 'DApps') {
                    iconName = `home${focused ? '' : '-outline'}`;
                } else if (routeName === 'Settings') {
                    iconName = `settings${focused ? '' : '-outline'}`;
                } else {
                    iconName = `wallet${focused ? '' : '-travel'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
)

export default TabStack