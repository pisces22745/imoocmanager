import {Select} from 'antd'
import React from 'react'

const Option = Select.Option
export default {
  formatDate (time) {
    if (!time) {
      return ''
    }
    let date = new Date(time)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  },
  pagination (data, callback) {
    return {
      onChange: (current) => {
        callback(current)
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total_count,
      showTotal: () => {
        return `共${data.result.total_count}条`
      },
      showQuickJumper: true
    }
  },
  getOptionList (data) {
    if (!data) {
      return []
    }
    let options = [] //<Option value="0" key="all_key">全部</Option>
    data.map((item) => {
      options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    })
    return options
  }
}
