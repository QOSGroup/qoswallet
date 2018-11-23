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
        console.log('dddd')
        console.log('this.screenW', this.screenW)
        return (
            <View style={styles.container}>
                <Image style={{ width: this.screenW, height: this.getScaleHeigth(776) }}
                    source={this.assets.common.bg}></Image>
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
    },
    bg: {
        width: '100%'
    }
});
