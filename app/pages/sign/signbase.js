// import React from 'react'
import BaseComponent from '../../components/base'

export default class SignBaseComponent extends BaseComponent {

    constructor(props) {
        super(props)
        this.offsetTop = this.STATUSBAR_HEIGHT + 22
        this.top = this.STATUSBAR_HEIGHT + this.HEADER_HEIGHT
    }

}