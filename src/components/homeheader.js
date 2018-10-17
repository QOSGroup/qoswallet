import React from 'react'
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'

import Component from './base'

export default class LogoTitle extends Component {

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.left}>
                    <TouchableOpacity onPress={this.backToWallet}>
                        <Image
                            source={require('react-navigation-stack/dist/views/assets/back-icon.png')}
                            style={{ width: 12, height: 21 }}
                        />
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../images/common/logo.png')}
                    style={{ width: 76.9, height: 30 }}
                />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: 'relative'
    },
    left: {
        position: 'absolute',
        left: 10,
        width: 12,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    }
});