import React, {Component} from 'react'
import {Card, Button, Table, Form, Select, DatePicker, Modal} from 'antd'
import Utils from '../../utils/utils'
import axios from '../../axios'
import BaseForm from '../../components/BaseForm'

const FormItem = Form.Item
const Option = Select.Option
export default class Order extends Component {
  state = {
    list: []
  }
  params = {
    page: 1
  }
  formList = [{
    type: 'SELECT',
    label: '城市',
    field: 'city',
    placeholder: '全部',
    initialValue: '1',
    width: 80,
    list: [{id: '0', name: '全部'}, {id: '1', name: '北京'}, {id: '2', name: '天津'}, {id: '3', name: '上海'}]
  }, {
    type: '时间查询'
  }, {
    type: 'SELECT',
    label: '订单状态',
    field: 'order_status',
    placeholder: '全部',
    initialValue: '1',
    width: 80,
    list: [{id: '0', name: '全部'}, {id: '1', name: '进行中'}, {id: '2', name: '结束行程'}]
  }]

  componentDidMount () {
    this.requestList()
  }

  handleFilter = (params) => {
    this.params = params
    this.requestList()
  }
  requestList = () => {
    axios.requestList(this, '/order/list', this.params)
  }
  openOrderDetail = () => {
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请先选择一条订单'
      })
      return
    }
    window.open(`/#/common/order/detail/${item.id}`, '_blank')
  }
  onRowClick = (record, index) => {
    this.setState({
      selectedRowKeys: [index],
      selectedItem: record
    })
  }

  render () {
    const selectedRowKeys = this.state.selectedRowKeys;

    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    let columns = [{
      title: '订单编号',
      dataIndex: 'order_sn'
    }, {
      title: '车辆标号',
      dataIndex: 'bike_sn'
    }, {
      title: '用户名',
      dataIndex: 'user_name'
    }, {
      title: '手机号码',
      dataIndex: 'mobile'
    }, {
      title: '里程',
      dataIndex: 'distance',
      render (distance) {
        return distance / 1000 + 'Km';
      }
    }, {
      title: '行驶时长',
      dataIndex: 'total_time'
    }, {
      title: '状态',
      dataIndex: 'status'
    }, {
      title: '开始时间',
      dataIndex: 'start_time',
      render: Utils.formatDate
    }, {
      title: '结束时间',
      dataIndex: 'end_time',
      render: Utils.formatDate
    }, {
      title: '订单金额',
      dataIndex: 'total_fee'
    }, {
      title: '实付金额',
      dataIndex: 'user_pay'
    }]
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
        </Card>
        <Card style={{marginTop: 10}}>
          <Button onClick={this.openOrderDetail}>订单详情</Button>
          <Button>结束订单</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                }
              }
            }}
          />
        </div>
      </div>
    )
  }
}
