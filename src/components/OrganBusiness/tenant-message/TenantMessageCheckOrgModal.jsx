import React, { PropTypes } from 'react';
import { Table, Form, Modal, Button, Icon } from 'antd';
import TenantMessageAddOrgModal from './TenantMessageAddOrgModal';
import styles from './TenantMessage.less';

const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 18,
    },
};

/*查看租户下所有机构的modal*/
const TenantMessageCheckOrgModal = ({
    tenantId,               //租户ID，用于显示在模态框名称处
    modalVisible,           //查看机构modal是否显示
    orgPageIndex,           //页码
    orgPageSize,            //一页条数
    orgLoading,             //列表加载状态
    orgTotal,               //列表内容总条数
    modalContent,           //模态框中选中租户下的机构数据
    tenantMessageAddOrg,    //table点击新增机构
    tenantMessageAddTet,    //编辑机构

    orgTableOnChange,       //机构分页等条件改变
    orgTableOnEdit,         //列表内点击编辑
    modalCancel,            //关闭modal
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

    //关闭模态框
    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        modalCancel();
    }

    const columns = [{
        width: 80,
        title: '操作',
        dataIndex: 'repeat',
        key: 'repeat',
        render:(text,record)=>(
            <a onClick = {() => orgTableOnEdit(record)}>编辑</a>
        )
    }, {
        width: 80,
        title: '机构ID',
        dataIndex: 'orgId',
        key: 'orgId',
    }, {
        width: 100,
        title: '机构名称',
        dataIndex: 'orgName',
        key: 'orgName',
    }, {
        width: 100,
        title: '机构手机号',
        dataIndex: 'tel',
        key: 'tel',
    }, {
        width: 60,
        title: '系统类型',
        dataIndex: 'orgKind',
        key: 'orgKind',
        render:(text,record) => (
            <div>
                { text == '1' ? '机构' : text == '2' ? <span style = {{ color : '#fff' , background : '#000' , padding : 3 , borderRadius : 5 }}>总部</span> : '' }
            </div>
        )
    }, {
        width: 60,
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render:(text,record) => (
            <div>
                { '0' == text ? '无效'
                   :
                  '1' == text ? <span style={{color:'red'}}>有效</span>
                   :
                  '2' == text ? <a>停用</a>
                   :
                  '未指定'
                }
            </div>
        )
    }, {
        width: 100,
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
    }];

    let paginationProps = {
        current : orgPageIndex + 1,
        pageSize : orgPageSize,
        total: orgTotal,
        showSizeChanger: true,
        showQuickJumper :true,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };

    //模态框标题
    let Title = function(tenantId){
        return(<p>租户ID&nbsp;:&nbsp;<span style={{color:'#ed5736'}}>{tenantId}</span></p>);
    }

    //模态框的属性
    let modalOpts = {
        title: Title(tenantId),
        maskClosable : true,
        visible : modalVisible,
        closable : true,
        width : 900,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="primary" size="large" onClick={handleCancel}>关闭</Button>,
        ],
    };

    return (
        <Modal {...modalOpts}>
            <div className='common-over' style={{height:'40px'}}>
                <Button key='newAdd' type="primary" style={{ float : 'right' }} onClick={() => tenantMessageAddOrg('org')}>新增机构</Button>
                <Button key='newAddHq' type="primary" style={{ float : 'right' , marginRight : 20 }} onClick={() => tenantMessageAddOrg('hq')}>新增总部</Button>
            </div>
            <Table
                columns={columns}
                dataSource={modalContent}
                loading={orgLoading}
                pagination={paginationProps}
                onChange={orgTableOnChange}
                bordered
                rowKey="orgId"
                scroll={{ x : 600 }} />
        </Modal>
    );
};

export default Form.create()(TenantMessageCheckOrgModal);
