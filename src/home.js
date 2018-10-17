import React from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { NativeModules } from "react-native";

const RNBridgeModule = NativeModules.RNBridgeModule

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }

    onPressLearnMore() {
        RNBridgeModule.backToViewController()
    }

    render() {
        const contents = (
            <Text>
                您已进入RN应用
            </Text>
        )
        return (
            <View style={styles.container}>
                <Text style={styles.highScoresTitle}>欢迎!</Text>
                <Text style={styles.scores}>{contents}</Text>
                <Button
                    onPress={this.onPressLearnMore}
                    title="Go back to Native"
                    color="#841584"
                    accessibilityLabel="Go back to Native"
                />
                <Button
                    title="Go to Details"
                    onPress={
                        () =>
                            this.props.navigation.navigate('Details', {
                                itemId: 86,
                                otherParam: 'anything you want here',
                            })
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    },
    highScoresTitle: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    scores: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    }
});