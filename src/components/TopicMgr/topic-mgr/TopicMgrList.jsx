import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './TopicMgr.less';

function TopicMgrList({
    loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
    tableRowSelectChange,
    tableRowCheckProps,
    tablePageChange,
    tableOnChange,
    tableColumnHeadClick,
    tableOnEditItem,
    tableOnDeleteItem,
    tableOnClearCacheItem,
    tableOnAddEssenceItem,
    tableOnCancleEssenceItem,
    tableOnRecommendItem,
    tableOnPreviewItem,
    tableOnDoUpItem,
    tableOnCreate,
    tableOnFilter,
    tableOnAddEssenceBatch,
    tableOnCancleEssenceBatch,
    tableOnRecommendBatch,
    tableOnDoUpBatch,
    tableOnClearCacheBatch,
    tableOnDeleteBatch,
    tableOnCancleRecommendBatch
  }) {
  const columns = [{
    width: 80,
    title: '主题ID',
    dataIndex: 'id',
    key: 'id'
  }, {
    width: 60,
    title: '频道ID',
    dataIndex: 'channelId',
    key: 'channelId',
  }, {
    width: 100,
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    width: 60,
    title: '作者ID',
    dataIndex: 'authorId',
    key: 'authorId',
  }, {
    width: 100,
    title: '作者',
    dataIndex: 'authorName',
    key: 'authorName',
  }, {
    width: 70,
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    render:(text,record) => (<div>{text==1?"图文":
                                    text==2?"视频":"投票"}</div>),
  }, {
    width: 120,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 100,
    title: '预览',
    dataIndex: 'preview',
    key: 'preview',
    render: (text, record) => <span><a href="javascript:void(0)" onClick={tableOnPreviewItem.bind(this, record.id)} className='common-text-red'>预览</a></span>,
  }, {
    width: 60,
    title: '评论数',
    dataIndex: 'commentCnt',
    key: 'commentCnt',
  }, {
    width: 60,
    title: '浏览数',
    dataIndex: 'viewCnt',
    key: 'viewCnt',
  }, {
    width: 60,
    title: '点赞数',
    dataIndex: 'goodCnt',
    key: 'goodCnt',
  }, {
    width: 60,
    title: '收藏数',
    dataIndex: 'collectCnt',
    key: 'collectCnt',
  }, {
    width: 60,
    title: '打赏数',
    dataIndex: 'rewardCnt',
    key: 'rewardCnt',
  }, {
    width: 60,
    title: '分享数',
    dataIndex: 'shareCnt',
    key: 'shareCnt',
  }, {
    width: 85,
    title: '精华',
    dataIndex: 'essence',
    key: 'essence',
    render: (text, record) => (<span className={text > 0 ? 'common-text-red' : 'common-text-darkgray'}>
                        {text > 0 ?
                        (<Popconfirm title="确定要取消精华吗?" onConfirm={() => tableOnCancleEssenceItem(record.id)}>
                            <span>精华</span>
                        </Popconfirm>)
                        :
                        (<Popconfirm title="确定要设置为精华吗?" onConfirm={() => tableOnAddEssenceItem(record.id)}>
                            <a className="common-table-item-bar">设置为精华</a>
                        </Popconfirm>) }
                        </span>),
  }, {
    width: 85,
    title: '推荐',
    dataIndex: 'recommend',
    key: 'recommend',
    render: (text, record) => (<span className={text > 0 ? 'common-text-red' : 'common-text-darkgray'}>
                        {text > 0 ? '推荐' :
                        (<Popconfirm title="确定要设置为推荐吗?" onConfirm={() => tableOnRecommendItem(record.id)}>
                            <a className="common-table-item-bar">设置为推荐</a>
                        </Popconfirm>) }
                        </span>),
  }, {
    width: 90,
    title: '置顶',
    dataIndex: 'up',
    key: 'up',
    render: (text, record) => (<span className={text > 0 ? 'common-text-red' : 'common-text-darkgray'}>
                        {text > 0 ? '置顶' :
                        (<Popconfirm title="确定要设置为置顶吗?" onConfirm={() => tableOnDoUpItem(record.id)}>
                            <a className="common-table-item-bar">设置为置顶</a>
                        </Popconfirm>) }
                        </span>),
  }, {
    width: 150,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <Popconfirm title="确定要更新缓存吗?" onConfirm={() => tableOnClearCacheItem(record.id)}>
            <a className="common-table-item-bar">更新缓存</a>
        </Popconfirm>
            <a href="javascript:void(0)" onClick={tableOnEditItem.bind(this, record)}>编辑</a>&nbsp;&nbsp;
        <Popconfirm title="确定要删除吗?" onConfirm={() => tableOnDeleteItem(record.id)}>
            <a className="common-table-item-bar" style={{color:'red'}}>删除</a>
        </Popconfirm>
      </p>
    ),
  }];

    //当前是否有选中项
    let hasSelected = selectedRowKeys.length > 0;

    let rowSelection = {
        selectedRowKeys,
        onChange : tableRowSelectChange,
        getCheckboxProps : tableRowCheckProps,
	};

	let paginationProps = {
        total: total,
        showSizeChanger: true,
        showQuickJumper :true,
        onShowSizeChange : tablePageChange,
        onChange : tablePageChange,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };
  return (
    <div className="table-bg">
	    <div className="common-over">
		    <div className="common-left" style={{width : '60%'}}>

			    <div className="table-handle" key="table-handle">
				    <span>批量处理:</span>

                        <Popconfirm placement="top" title="确认要设置为精华吗?" onConfirm={tableOnAddEssenceBatch}>
                            <Button style={{ marginLeft: 8 }} type="primary" type={hasSelected?'primary':'ghost'} disabled={!hasSelected}>精华</Button>
                        </Popconfirm>

                        <Popconfirm placement="top" title="确认要取消精华吗?" onConfirm={tableOnCancleEssenceBatch}>
                            <Button style={{ marginLeft: 8 }} type="primary" type={hasSelected?'primary':'ghost'} disabled={!hasSelected}>取消精华</Button>
                        </Popconfirm>

                        <Popconfirm placement="top" title="确认要推荐吗?" onConfirm={tableOnRecommendBatch}>
                            <Button style={{ marginLeft: 8 }} type="primary" type={hasSelected?'primary':'ghost'} disabled={!hasSelected}>推荐</Button>
                        </Popconfirm>

                        <Popconfirm placement="top" title="确认要取消推荐吗?" onConfirm={tableOnCancleRecommendBatch}>
                            <Button style={{ marginLeft: 8 }} type="primary" type={hasSelected?'primary':'ghost'} disabled={!hasSelected}>取消推荐</Button>
                        </Popconfirm>

                        <Popconfirm placement="top" title="确认要删除吗?" onConfirm={tableOnDeleteBatch}>
                            <Button style={{ marginLeft: 8 }} type="primary" type={hasSelected?'primary':'ghost'} disabled={!hasSelected}>删除</Button>
                        </Popconfirm>

                        <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
                    </div>

					</div>
					<div className="common-right" style={{width : '40%'}}>
						<div className="table-operations" >
                            <Button type="primary" onClick={tableOnCreate}><Icon type="plus" />新增图文帖</Button>
                            <Popconfirm placement="top" title="确认要更新缓存吗?" onConfirm={tableOnClearCacheBatch}>
                                <Button type="primary">更新缓存</Button>
                            </Popconfirm>
							<Button type="primary" onClick={tableOnFilter}><Icon type="filter" />筛选</Button>
						</div>
					</div>
				</div>

				<Table
                    columns={columns}
                    dataSource={list}
                    loading={loading}
                    rowSelection={rowSelection}
                    pagination={paginationProps}
                    onChange={tableOnChange}
                    bordered
                    rowKey="id"
                    scroll={{ x : 1500 }} />
	      </div>
  );
}

TopicMgrList.propTypes = {
    loading : PropTypes.any,
    list: PropTypes.array,
    total : PropTypes.any,
    pageIndex : PropTypes.any,
    pageSize : PropTypes.any,
    selectedRowKeys : PropTypes.any,
    selectRows : PropTypes.any,
    tableRowSelectChange : PropTypes.func,
    tableRowCheckProps : PropTypes.func,
    tablePageChange : PropTypes.func,
    tableOnChange : PropTypes.func,
    tableColumnHeadClick : PropTypes.func,
    tableOnEditItem : PropTypes.func,
    tableOnDeleteItem : PropTypes.func,
    tableOnClearCacheItem : PropTypes.func,
    tableOnRecommendItem : PropTypes.func,
    tableOnCancleRecommendBatch : PropTypes.func,
    tableOnDoUpItem : PropTypes.func,
};

export default TopicMgrList;
