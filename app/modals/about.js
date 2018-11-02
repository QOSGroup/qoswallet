import React from 'react'
import { Text, View, Button } from 'react-native'

import Component from '../components/base'

export default class ModalAbout extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16 }}>This is a QOS Example modal!</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Dismiss"
                />
            </View>
        );
    }
}