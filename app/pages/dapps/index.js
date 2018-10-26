import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import BaseComponent from '../../components/base'
import QRCode from 'react-native-qrcode-svg'

export default class DAppsScreen extends BaseComponent {
    constructor(props) {
        super(props)
    }

    static navigationOptions = () => {
        return {
            headerTitle: 'DApps'
        }
    }

    render() {
        const contents = (
            <Text>
                DApps
            </Text>
        )
        let logoFromFile =  require('../../images/common/logoforcode.png')
        return (
            <View style={styles.container}>
                <Text style={styles.scores}>{contents}</Text>
                <View>
                    <QRCode
                        logo={logoFromFile}
                        size={220}
                        logoSize={50}
                        logoBackgroundColor='transparent'
                        value="https://github.com/QOSGroup"
                    />
                </View>
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
