import React from 'react'
import { Table, Popconfirm, Button, Icon } from 'antd';
import styles from './Recommend.less'

function Recommend({
  recommendData,          // 最新推荐数据
  recommendLoading,
  recommendPageIndex,     // 推荐当前页数
  recommendPageSize,      // 当前条数
  recommendTotal,         // 总条数

  /** 方法 */
  AddOrEditRecommend,     // 新增编辑推荐
  removeRecommend,        // 删除推荐
  recommendTableChange,   // 管理列表状态改变(分页等)
}){
  const columns = [{
    width: 125,
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 250,
    title: '图片',
    dataIndex: 'image',
    key: 'image',
    render: (text, record) => (
        <div>
            { text != undefined && text != '' && text != null ?　<img src={text} width="250px" height="60px"/>　: '无' }
        </div>
    ),
  }, {
    width: 250,
    title: '链接',
    dataIndex: 'link',
    key: 'link',
  },{
    width: 125,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },{
    width: 100,
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render:(text,record) => (
      <div>
        <a className={styles.check} onClick={() => AddOrEditRecommend('edit',record)}>编辑</a>
        <Popconfirm title="是否删除" onConfirm={() => removeRecommend(record)}>
          <a className={styles.check}>删除</a>
        </Popconfirm>
      </div>

    )
  }]

  // 分页
  const paginationProps = {
    current : recommendPageIndex + 1,
    pageSize : recommendPageSize,
    total: recommendTotal,
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
          <div className="table-handle" key="table-handle">
          </div>
        </div>
        <div className="common-right" style={{width : '40%'}}>
          <div className="table-operations" >
            <Button type="primary" onClick={() => AddOrEditRecommend('add')}><Icon type="plus" />新增</Button>
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={recommendData}
        loading={recommendLoading}
        pagination={paginationProps}
        onChange={recommendTableChange}
        bordered
        rowKey="id"
        scroll={{ x : 1000 }} />
    </div>
  )
}

export default Recommend
