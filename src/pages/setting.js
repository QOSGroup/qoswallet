import React from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import LogoTitle from '../components/home/headerTitle'
import HeaderLeft from '../components/home/headerLeft'

import Component from '../components/base'

export default class SettingsScreen extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = () => {
        return {
            // header:null,
            headerLeft: <HeaderLeft />,
            headerTitle: <LogoTitle />,
            headerRight: (
                <Button
                    onPress={() => Alert.alert('欢迎使用QOS-RN应用')}
                    title="关于"
                    color="#fff"
                />
            ),
        }
    }

    render() {
        const contents = (
            <Text>
                您已进入Setting
            </Text>
        )
        return (
            <View style={styles.container}>
                <Text style={styles.highScoresTitle}>欢迎!</Text>
                <Text style={styles.scores}>{contents}</Text>
                <Button
                    onPress={this.backToWallet}
                    title="Go back to Native"
                    color="#841584"
                    accessibilityLabel="Go back to Native"
                />
                <Button
                    title="Go to SettingsDetails"
                    onPress={() =>
                        this.props.navigation.navigate('SettingsDetails', {
                            itemId: 86,
                            otherParam: 'anything you want here',
                        })}
                />
                <Button
                    onPress={() => this.props.navigation.navigate('AboutModal')}
                    title="AboutModal"
                />
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
