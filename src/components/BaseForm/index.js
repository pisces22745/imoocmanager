import React, {Component} from 'react'
import {Input, Select, Form, Button, Checkbox, DatePicker} from 'antd'
import Utils from '../../utils/utils'

const FormItem = Form.Item

// const Option = Select.Option

class FilterForm extends Component {
  initFormList = () => {
    const {getFieldDecorator} = this.props.form
    const formList = this.props.formList
    const formItemList = []
    if (formList && formList.length > 0) {
      formList.map((item) => {
        let {label, field, initialValue = '', placeholder, width, type} = item
        if (type === 'INPUT') {
          const INPUT = <FormItem label={label} key={field}>
            {
              getFieldDecorator(field, {
                initialValue: initialValue
              })(
                <Input type="text" placeholder={placeholder}/>
              )
            }
          </FormItem>
          formItemList.push(INPUT)
        } else if (type === 'SELECT') {
          const SELECT = <FormItem label={label} key={field}>
            {
              getFieldDecorator(field, {
                initialValue: initialValue
              })(
                <Select
                  style={{width: width}}
                  placeholder={placeholder}
                >
                  {Utils.getOptionList(item.list)}
                </Select>
              )
            }
          </FormItem>;
          formItemList.push(SELECT)
        } else if (type === 'CHECKBOX') {
          const CHECKBOX = <FormItem label={label} key={field}>
            {
              getFieldDecorator(field, {
                valuePropName: 'checked',
                initialValue: initialValue
              })(
                <Checkbox>{label}</Checkbox>
              )
            }
          </FormItem>
          formItemList.push(CHECKBOX)
        } else if (type === '时间查询') {
          const begin_time = <FormItem label="订单时间" key="begin_time">
            {
              getFieldDecorator('begin_time')(
                <DatePicker showTime={true} placeholder="请选择查询时间" format="YYYY-MM-DD HH:mm:ss"/>
              )
            }
          </FormItem>
          formItemList.push(begin_time)
          const end_time = <FormItem label="~" colon={false} key="end_time">
            {
              getFieldDecorator('end_time')(
                <DatePicker showTime={true} placeholder="请选择查询时间" format="YYYY-MM-DD HH:mm:ss"/>
              )
            }
          </FormItem>
          formItemList.push(end_time)
        }
      })
      return formItemList
    }
  }
  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue()
    this.props.filterSubmit(fieldsValue)
  }
  reset = () => {
    this.props.form.resetFields()
  }

  render () {
    return (
      <Form layout="inline">
        {this.initFormList()}
        <FormItem>
          <Button type="primary" style={{margin: '0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(FilterForm)
