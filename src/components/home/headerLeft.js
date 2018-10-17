import React from 'react'
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'

import Component from '../base'

export default class HeaderLeft extends Component {
    render() {
        return (
            <View style={styles.left}>
                <TouchableOpacity onPress={this.backToWallet}>
                    <Image
                        source={require('react-navigation-stack/dist/views/assets/back-icon.png')}
                        style={{ width: 12, height: 21 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    left: {
        position: 'absolute',
        left: 10,
        width: 12,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
