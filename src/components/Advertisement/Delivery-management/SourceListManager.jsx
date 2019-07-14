import React from 'react';
import styles from './SourceManager.less';
import {Table, Button, Popconfirm, Select, Modal, Input, message,} from 'antd';

const Option = Select.Option;

function SourceListManager({
    totalCount, dataList, listLoading, listSelectIds, pageIndex, pageSize, adComList, onPageQuery, changeSelectIds,
    adModuleIds, adCollectVisible, adCollectAdId, adCollectAdText, adCollectAdUrl, handleOpenAdCollect, handleChangeAdCollect, handleCreateAdCollect,

    handleAdCollectCancle, handleCancleAdCollect,
}) {

    function handleTablePageChange(page, filter, sort) {
        onPageQuery && onPageQuery(
            page.current -1,
            page.pageSize,
        );
    }

    function handleShowAd(record) {

    }

    function onAdCollectCancle() {
        console.info('onAdCollectCancle');
        handleAdCollectCancle && handleAdCollectCancle();
    }

    function handleAdCollectSubmit() {
        console.info('handleAdCollectSubmit');
        if(adCollectAdId == undefined || adCollectAdId == '') {
            message.warn('请先选择广告');
            return;
        }
        handleCreateAdCollect && handleCreateAdCollect();
    }

    let columns = [{
        width: 250,
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        render:(text,record) => (
            <div>
                <a className={styles.table_row_handle_item} onClick={()=>handleOpenAdCollect(record.modelId, record.adId)}>投放广告</a>
                {!!(record.adId != undefined) &&
                <Popconfirm title={'确定要取消广告投放吗?'} onConfirm={() => handleCancleAdCollect(record.modelId)}>
                    <a className={styles.table_row_handle_item} style={{color:'#77c8f8'}}>取消投放</a>
                </Popconfirm>
                }
            </div>
        )
    }, {
        title: '模板名称',
        dataIndex: 'modelName',
        key: 'modelName',
    }, {
        title: '广告名称',
        dataIndex: 'adName',
        key: 'adName',
        render:(text,record) =>(
            <div>{text||''}</div>
        )
    }];

    let paginationProps = {
        current : pageIndex + 1,
        pageSize : pageSize,
        total: totalCount,
        showSizeChanger: true,
        showQuickJumper :true,
        showTotal(){
            return '总共'+totalCount+'条数据';
        }
    };

    const rowSelection = {
        selectedRowKeys: listSelectIds,
        onChange: (selectedRowKeys, selectedRows) => {
            changeSelectIds && changeSelectIds(selectedRowKeys);
        },
    };

    let adOpts = adComList && adComList.map(function(adItem, adIndex) {
            return (
                <Option key={'ad_item_' + adIndex} value={adItem.id} >{adItem.name}</Option>
            )
        });

    return (
        <div className={styles.source_list_content}>

            <div className={styles.list_bar_cont}>
                <div className={styles.bar_text}>操作:</div>
                <div className={styles.bar_item}>
                    <Button
                        type="ghost"
                        onClick={()=>handleOpenAdCollect()}
                        disabled={!(listSelectIds && listSelectIds.length > 0)}
                        loading={listLoading}
                    >
                    投放广告
                    </Button>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={dataList}
                loading={listLoading}
                pagination={paginationProps}
                rowSelection={rowSelection}
                onChange={handleTablePageChange}
                bordered
                rowKey="modelId"
                scroll={{ x : 1500 }} />

            <Modal
                title="投放广告"
                visible={adCollectVisible}
                onOk={handleAdCollectSubmit}
                onCancel={onAdCollectCancle}
                maskClosable={false}
            >
                <div>
                    <div className={styles.form_item_line}>
                        <div className={styles.form_item_label}>选择广告</div>
                        <div className={styles.form_item_content}>
                            <Select value={adCollectAdId} onChange={handleChangeAdCollect} style={{width: '100%'}} >
                                {adOpts || []}
                            </Select>
                        </div>
                    </div>

                    <div className={styles.form_item_line}>
                        <div className={styles.form_item_label}>广告文字</div>
                        <div className={styles.form_item_content}>
                            <Input style={{width: '100%'}} value={adCollectAdText} disabled />
                        </div>
                    </div>

                    <div className={styles.form_item_line}>
                        <div className={styles.form_item_label}>广告链接</div>
                        <div className={styles.form_item_content}>
                            <Input style={{width: '100%'}} value={adCollectAdUrl} disabled />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default SourceListManager;
