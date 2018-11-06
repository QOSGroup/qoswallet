import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import BaseComponent from '../../components/base'

export default class BackgroundScreen extends BaseComponent {
    constructor(props) {
        super(props)
    }

    static navigationOptions = () => {
        return {
            // headerTitle: '轻钱包'
            header: null
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Image source={this.assets.common.bg}></Image>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'red'
    }
});
