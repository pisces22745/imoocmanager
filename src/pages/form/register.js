import React, {Component} from 'react'
import {
  Card,
  Form,
  Input,
  Button,
  Icon,
  Checkbox,
  Radio,
  Select,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
  InputNumber
} from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea


class FormRegister extends Component {
  state = {}
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({loading: true});
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, userImg => this.setState({
        userImg,
        loading: false,
      }));
    }
  }
  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue()
    console.log(userInfo)
  }

  render () {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    }
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    }
    return (
      <div>
        <Card title="注册表单">
          <Form layout="horizontal">
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [{
                    required: true,
                    message: '用户名不能为空'
                  }]
                })(<Input placeholder="请输入用户名"/>)
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('userPwd', {
                  initialValue: '',
                  rules: [{
                    required: true,
                    message: '密码不能为空'
                  }]
                })(<Input type="password" placeholder="请输入密码"/>)
              }
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                  initialValue: '1'
                })(
                  <RadioGroup>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: 18
                })(
                  <InputNumber/>
                )
              }
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
              {
                getFieldDecorator('status', {
                  initialValue: ['2', '5']
                })(
                  <Select mode="multiple">
                    <Option value="1">咸鱼一条</Option>
                    <Option value="2">咸鱼两条</Option>
                    <Option value="3">咸鱼三条</Option>
                    <Option value="4">咸鱼四条</Option>
                    <Option value="5">咸鱼五条</Option>
                    <Option value="6">咸鱼六条</Option>
                    <Option value="7">咸鱼七条</Option>
                    <Option value="8">咸鱼八条</Option>
                    <Option value="9">咸鱼九条</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {
                getFieldDecorator('isMarried', {
                  valuePropName: 'checked',
                  initialValue: false
                })(
                  <Switch/>
                )
              }
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {
                getFieldDecorator('birthday', {
                  initialValue: moment('2018-08-08')
                })(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                )
              }
            </FormItem>
            <FormItem label="地址" {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: '浙江省杭州市桐庐县'
                })(
                  <TextArea autosize={{minRows: 2, MaxRows: 6}}/>
                )
              }
            </FormItem>
            <FormItem label="早期时间" {...formItemLayout}>
              {
                getFieldDecorator('time')(
                  <TimePicker/>
                )
              }
            </FormItem>
            <FormItem label="头像" {...formItemLayout}>
              {
                getFieldDecorator('userImg')(
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts"
                    onChange={this.handleChange}
                  >
                    {this.state.userImg ? <img src={this.state.userImg} alt=""/> : <Icon type="plus"></Icon>}
                  </Upload>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('userImg')(
                  <Checkbox>我已阅读过<a href="#">慕课协议</a></Checkbox>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type="primary" onClick={this.handleSubmit}>注册</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(FormRegister)
