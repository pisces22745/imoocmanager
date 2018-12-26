import React, {Component} from 'react'

export default class Child extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  componentWillMount () {
    console.log('will Mount')
  }

  componentDidMount () {
    console.log('did Mount')
  }

  componentWillReceiveProps (newProps) {
    console.log('will props' + newProps.name)
  }

  shouldComponentUpdate () {
    console.log('should update')
    return true
  }

  componentWillUpdate () {
    console.log('will update')
  }

  componentDidUpdate () {
    console.log('did update')
  }

  render () {
    return <div>
      <p>这里事子组件，测试子组件的生命周期</p>
      <p>{this.props.name}</p>
    </div>
  }
}
