import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon, Popover,message,Input} from 'antd';
import style from './RegistrationForm.less';
import QRCode from 'qrcode.react';

/*租户信息table*/
function RegistrationFormList({
    registrationPageIndex,        //列表页码
    registrationPageSize,         //列表一页条数
    registrationLoading,          //列表加载状态
    registrationTotal,            //列表内容总条数
    registrationTableContent,     //列表内容

    registrationTableOnFilter,    //点击筛选
    registrationTableOnChange,    //table分页等条件改变事件
    AddregistrationMessageChange,    //新增渠道
    DeleregistrationMessageChange, //删除渠道
    AddConfigurationModalChange,  //点击添加编辑表单
    registrationTableOnExport,   //导出列表

  }) {
    var saveFile = function(data){

        var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = data;
        save_link.download = "二维码";
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
    };

    var qrCodeImage = document.getElementsByTagName('canvas');
    let currentTouchCanvas = undefined;

    function downLoudQrcode(url, id){
        registrationTableContent&&registrationTableContent.map((item, index) =>{
            if(id === item.id) {
                if(qrCodeImage.length > 0) {
                   currentTouchCanvas = qrCodeImage[index];
                }
            }
        })

        var data = currentTouchCanvas.toDataURL();
        saveFile(data);
    }
    function copyLink(id){
        var copyobject = document.getElementById(id);
        copyobject.select();
        document.execCommand("Copy");
        message.success('复制成功');
    };

    const columns = [{
        width: 80,
        title: '注册渠道',
        dataIndex: 'channelName',
        key: 'channelName',
    }, {
        width: 140,
        title: '渠道链接',
        dataIndex: 'channelUrl',
        key: 'channelUrl',
        render:(text,record) =>(
            <div style={{height:'100%'}}>
                <Input type='text' id={record.id} style={{width:'100%',
    height:'50px',border:'0',outline:'none',background:'#fff'}} value={text} onChange={()=>{}} />
                <span style={{color:'blue',marginLeft:'15px',cursor:'pointer'}} onClick={() =>copyLink(record.id)}>复制</span>
            </div>
        )
    }, {
        width: 80,
        title: '渠道二维码',
        dataIndex: 'channelUrl',
        key: 'qrcode',
        render:(text,record) =>(
            <div style={{height:'100%'}}>
                <QRCode value={text} size={100} />
                <span style={{color:'blue',marginLeft:'15px',cursor: 'pointer'}} onClick={() => downLoudQrcode(text, record.id)}>下载</span>
            </div>
        )
    },{
        width: 100,
        title: '回调地址',
        dataIndex: 'returnUrl',
        key: 'returnUrl',
    }, {
        width: 80,
        title: '配置表单',
        dataIndex: 'haveForm',
        key: 'haveForm',
        render:(text,record) => (
            <div>
              { '0' == text ?
                    <a onClick={() => AddConfigurationModalChange(record ,text)} style={{color:'red'}}>添加</a>
                   :
                    <a onClick={() => AddConfigurationModalChange(record ,"1")}>编辑</a>
                }
            </div>
        )
    }, {
        width: 60,
        title: 'PV',
        dataIndex: 'pvAmount',
        key: 'pvAmount',
    }, {
        width: 60,
        title: 'UV',
        dataIndex: 'uvAmount',
        key: 'uvAmount',
    },{
        width: 60,
        title: '注册量',
        dataIndex: 'registerAmount',
        key: 'registerAmount',
    }, {
        width: 100,
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
    }, {
        width: 60,
        title: '操作',
        dataIndex: 'option',
        key: 'option',
        render:(text,record) => (
            <div>
                <Popconfirm title={<p>确定<strong style={{color:'#77c8f8'}}>删除</strong>吗?</p>} onConfirm={() => DeleregistrationMessageChange(record.id)}>
                    <a style={{color:'red'}}>删除</a>
                 </Popconfirm>
            </div>
        )

    }];

	let paginationProps = {
        current : registrationPageIndex + 1,
        pageSize : registrationPageSize,
        total: registrationTotal,
        showSizeChanger: true,
        showQuickJumper :true,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };

    return (
        <div className="table-bg">
            <div className="common-over">
                <div className="common-left" style={{width : '60%'}}>
                    <div className="table-handle" >
                        <Button key='export' type="primary" onClick={registrationTableOnExport}><Icon type="export" />按查询结果导出</Button>
                    </div>
                </div>
                <div className="common-right" style={{width : '40%'}}>
                    <div className="table-operations" >
                        <Button key='addTet' type="primary" onClick={AddregistrationMessageChange} ><Icon type="plus"/>新增</Button>
                        <Button key='filter' type="primary" onClick={registrationTableOnFilter}><Icon type="filter" />筛选</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={registrationTableContent}
                loading={registrationLoading}
                pagination={paginationProps}
                onChange={registrationTableOnChange}
                bordered
                rowKey="id"
                scroll={{ x : 1500 }} />
        </div>
    );
}

export default RegistrationFormList;
