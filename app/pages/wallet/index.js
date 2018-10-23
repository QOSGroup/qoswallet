import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import BaseComponent from '../../components/base'

export default class WalletScreen extends BaseComponent {
    constructor(props) {
        super(props)
    }

    static navigationOptions = () => {
        return {
            headerTitle: '钱包'
        }
    }

    render() {
        const contents = (
            <Text>
                Wallet
            </Text>
        )
        return (
            <View style={styles.container}>
                <Text style={styles.scores}>{contents}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    highScoresTitle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    scores: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    left: {
        position: 'absolute',
        left: 10,
        width: 12,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
