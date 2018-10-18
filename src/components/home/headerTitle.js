import React from 'react'
import { Image } from 'react-native'

import Component from '../base'

export default class LogoTitle extends Component {
    render() {
        return (
            <Image
                source={require('../../images/common/logo.png')}
                style={{ width: 76.9, height: 30 }}
            />
        );
    }
}
