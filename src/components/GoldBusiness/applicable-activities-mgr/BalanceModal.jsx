import React, { PropTypes } from 'react';
import { Modal, Button, Table, Popconfirm, AutoComplete, Input } from 'antd';
import styles from './BalanceModal.less';

let InputGroup = Input.Group;

let BalanceModal = ({
    balanceTableLoading, balanceBtnLoading, balanceVisible, balanceDataList,balanceResultCount, balanceTrialActivityId, balanceFilterUserNickname,tableOnChange,
    balanceCancle,
    balanceSubmit,
    balanceAccessItem,
    balanceRejectItem,
    balanceNicknameFilter,
    nicknameFilterChange,
    tableBalancePageChange,
  }) => {

 let balanceFilterNameList =  balanceDataList && balanceDataList.length > 0 && balanceDataList.map(function(item) {
     return <AutoComplete.Option key={item.user_id} >{item.nickname}</AutoComplete.Option>
 });

  let modalOpts = {
    title: '结算试用活动',
    maskClosable : false,
    style : { top: 20 },
    visible : balanceVisible,
    closable : true,
    width : 1000,
    onOk: balanceSubmit,
    onCancel : balanceCancle,
    footer : [
        <Button key="cancle" type="ghost" size="large" onClick={balanceCancle}> 取 消 </Button>,
        <Popconfirm key="submit_pop" title="确定要驳回剩余所有审核中的用户吗?" onConfirm={balanceSubmit}>
            <Button key="submit" type="primary" size="large"
                disabled={balanceBtnLoading}
                loading={balanceBtnLoading}>结算</Button>
        </Popconfirm>
    ],
  };

    let balanceDataColumn = [{
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        width : 100,
        render: (text, record) => (
          <p>
            <Popconfirm title="确定要审核通过吗?" onConfirm={() => balanceAccessItem(record.id)}>
                <a className="common-table-item-bar">审核通过</a>
            </Popconfirm>
            <Popconfirm title="确定要驳回吗?" onConfirm={() => balanceRejectItem(record.id)}>
                <a className="common-table-item-bar">驳回</a>
            </Popconfirm>
          </p>
        ),
    }, {
        title: '用户编号',
        dataIndex: 'userId',
        key: 'userId',
        width : 100,
    }, {
        title: '用户名称',
        dataIndex: 'nickname',
        key: 'nickname',
        width : 250,
        filterDropdown : <InputGroup key="nickname_filter_dropdown" >
                            <Input key="nickname_filter_dropdown" placeholder="请输入过滤的用户昵称" onChange={nicknameFilterChange} />
                        </InputGroup>,
        onFilter: function(value, record) {
            return record.nickname.includes(value);
        },
        filteredValue : balanceFilterUserNickname,
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width : 100,
        filters: [
            { text: '无效', value: '0' },
            { text: '审核中', value: '1' },
            { text: '审核成功', value: '2' },
            { text: '审核失败', value: '3' },
          ],
        onFilter: (value, record) => record.status.includes(value),
        render: (text, record) => <span>{text == '1' ? <span className="common-text-darkgray">审核中</span> :
                                        text == '2' ?  <span className="common-text-green">审核成功</span> :
                                        text == '3' ?  <span className="common-text-red">审核不通过</span> :
                                        text == '0' ?  <span className="common-text-red">无效</span> :
                                        <span className="common-text-darkgray">其他状态</span>}</span>,
    }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width : 200,
    }, {
        title: '联系方式',
        dataIndex: 'contacterTel',
        key: 'contacterTel',
        width : 150,
    }, {
        title: '收货城市',
        dataIndex: 'province',
        key: 'province',
        width : 200,
        render: (text, record) => <span>{record.province}-{record.city}-{record.area}</span>,
    }, {
        title: '收货地址',
        dataIndex: 'addr',
        key: 'addr',
        width : 200,
        render: (text, record) => <span>{text}</span>,
    }];


    let paginationProps = {
        total: balanceResultCount,
        showSizeChanger: true,
        showQuickJumper :true,
        onShowSizeChange : tableBalancePageChange,
        onChange : tableBalancePageChange,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };

  return (
    <Modal {...modalOpts}>
        <Table
            loading={balanceTableLoading}
            columns={balanceDataColumn}
            dataSource={balanceDataList}
            pagination={paginationProps}
            onChange={tableOnChange}
            bordered
            scroll={{ x : 1300 }}/>
    </Modal>
  );
};

BalanceModal.propTypes = {
    balanceTableLoading : PropTypes.any,
    balanceBtnLoading : PropTypes.any,
    balanceVisible : PropTypes.any,
    balanceDataList : PropTypes.array,
    balanceCancle : PropTypes.func,
    balanceSubmit : PropTypes.func,
    tableBalancePageChange : PropTypes.func,
};

export default BalanceModal;
