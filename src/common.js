import React, {Component} from 'react'
import {Row} from 'antd'
import 'antd/dist/antd.css'
import Header from './components/Header'
import './style/common.less'

export default class Common extends Component {
  render () {
    return (
      <div>
        <Row className="simple-page">
          <Header menuType="second"/>
        </Row>
        <Row className="content">
          {this.props.children}
        </Row>
      </div>
    )
  }
}
