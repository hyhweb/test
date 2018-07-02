import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Tabs,Table } from 'antd';
import classNames from 'classnames';
import {connect} from "dva/index";
import StandardTable from 'components/StandardTable';
@connect(({ user, loading }) => ({
  user,
  loading: loading.models.rule,
}))
@Form.create()
class UserList extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedRows: 0
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/getList',
    });
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'user/getList',
      payload: params,
    });
  };
  render(){
    const {
      user: { list,data },
      loading,
    } = this.props;
const {selectedRows}= this.state;

    const columns = [{
      title: '姓名',
      dataIndex: 'user_name',
      key: 'user_name',
    }, {
      title: '头像',
      dataIndex: 'header_url',
      key: 'header_url',
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    }];
    return(
      <div>
        <Table
          dataSource={list}
          columns={columns}
          loading={loading}
          onSelectRow={this.handleSelectRows}
          onChange={this.handleStandardTableChange}
        />
        <StandardTable
          selectedRows={selectedRows}
          loading={loading}
          data={data}
          columns={columns}
          onSelectRow={this.handleSelectRows}
          onChange={this.handleStandardTableChange}
        />
      </div>
    )
  }
}
export  default  Form.create()(UserList)
