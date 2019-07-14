import React, {PropTypes} from 'react';
import styles from './ListMgrComponent.less';
import {Button, Table, Upload,} from 'antd';

/**
 * 自定义模板-管理界面
 */
function ListMgrComponent({
    listData, listColumns, rowKey, selectedKeys, total, pageIndex, pageSize, queryLoading, queryFilter, searchVisible,
    handleQuery, switchSearch, handleSelectChange, handlePageChange, handleShowsizeChange,
}) {

    let rowSelectionProps = {
        type: 'checkbox',
        selectedRowKeys: selectedKeys,
        onChange: handleSelectChange,
    };

    let defaultShowToal = function(total, range) {
        return <div>共 {total} 条</div>
    }

    let pageProps = {
        current: pageIndex+1,
        total,
        pageSize,
        showTotal: defaultShowToal,
        onChange: handlePageChange,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        size: 'large',
        onShowSizeChange: handleShowsizeChange,
        showQuickJumper: true,
    };

    return (
        <div className={styles.list_mgr_cont}>

            <div className={styles.bar_cont}>
                <div className={styles.left_bar_cont}>
                    <div className={styles.bar_btn_cont}>
                        <Button type="ghost" icon="delete">删除</Button>
                    </div>

                    <div className={styles.bar_btn_cont}>
                        <Button type="ghost" icon="like-o">上架</Button>
                    </div>

                    <div className={styles.bar_btn_cont}>
                        <Button type="ghost" icon="dislike-o">下架</Button>
                    </div>
                </div>

                <div className={styles.right_bar_cont}>
                    <div className={styles.bar_btn_cont}>
                        <Button type="primary">新增</Button>
                    </div>

                    <div className={styles.bar_btn_cont}>
                        <Button type="primary">筛选</Button>
                    </div>
                </div>
            </div>

            <div className={styles.list_data_cont} style={{height: 'calc(100% - 45px)'}}>
                <Table
                    dataSource={listData}
                    columns={listColumns}
                    rowSelection={rowSelectionProps}
                    pagination={pageProps}
                    bordered
                    loading={queryLoading}
                    rowKey={rowKey}
                    locale={{emptyText: '暂无数据'}}
                    size="middle"
                    scroll={{ x: true, y: 400 }}
                />
            </div>

        </div>
    );
}

export default ListMgrComponent;
