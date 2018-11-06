import React from 'react'
import { View, Text, StyleSheet, Image, Button, NavigationActions } from 'react-native'
import SignBaseComponent from './signbase'

export default class CreateScreen extends SignBaseComponent {
    constructor(props) {
        super(props)
        this.goto = this.goto.bind(this);
    }

    goto(){
        console.log('--------------------------')
        const navigateAction = NavigationActions.navigate({
            routeName: 'All',

            params: {},

            action: NavigationActions.navigate({ routeName: 'AboutModal' }),
        });
        this.props.navigation.dispatch(navigateAction) 
    }

    static navigationOptions = (props) => {
        const {navigate} = props.navigation;
        // console.log(dispatch)
        console.log('--------------------------')
        // const navigateAction = NavigationActions.navigate({
        //     routeName: 'All',

        //     params: {},

        //     action: NavigationActions.navigate({ routeName: 'AboutModal' }),
        // });
        return {
            // headerTitle: '轻钱包',
            headerRight: (
                <Button
                    style={styles.headerRight}
                    onPress={() => { navigate('All') }}
                    title="先逛逛"
                    color="#fff"
                />
            ),
        }
    }

    render() {
        const contents = (
            <Text>
                Wallet
            </Text>
        )
        return (
            <View style={{ ...styles.container, paddingTop: this.top }}>
                <Image style={styles.bg} source={this.assets.common.bg}></Image>
                <View>

                </View>
                <Text style={styles.scores}>{contents}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    cardWrap: {

    },
    headerRight: {
        color: '#fff',
        marginRight: 10,
        fontSize: 14
    },
    bg: {
        width: '100%',
        height: 388,
        position: 'absolute',
        top: 0,
        left: 0
    }
});
