import React, {PropTypes} from 'react';
import styles from './ActivityModuleMgrComponent.less';
import ListMgrComponent from '../../common/list-mgr/ListMgrComponent';

/**
 * 自定义模板-管理界面
 */
function ActivityModuleMgrComponent({
    listData, selectedKeys, total, pageIndex, pageSize, queryLoading, queryFilter, searchVisible,
    handleQuery, switchSearch,
}) {

    let listColumns = [
        {
            title: '操作',
            key: 'handle',
            dataIndex: 'handle',
            width: 200,
            render: function(text, record, index) {

                return (
                    <div>

                    </div>
                )
            }
        },
        {
            title: '模板编码',
            key: 'moduleCode',
            dataIndex: 'code',
            width: 140,
        },
        {
            title: '模板标题',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: '价格',
            key: 'price',
            dataIndex: 'price',
            width: 150,
        },
        {
            title: '预览',
            key: 'preview_url',
            dataIndex: 'preview_url',
            width: 150,
            render: function(text, record, index) {

                return (
                    <div>

                    </div>
                )
            }
        },
        {
            title: '模板类型',
            key: 'type',
            dataIndex: 'type',
            width: 100,
            render: function(text, record, index) {

                return (
                    <div>

                    </div>
                )
            }
        },
        {
            title: '页面类型',
            key: 'page_type',
            dataIndex: 'page_type',
            width: 100,
            render: function(text, record, index) {

                return (
                    <div>

                    </div>
                )
            }
        },
    ];
    let rowKey = "id";

    let listMgrProps = {
        listData, listColumns, rowKey, selectedKeys, total, pageIndex, pageSize, queryLoading, queryFilter, searchVisible,
        handleQuery, switchSearch,
    };
    return (
        <ListMgrComponent {...listMgrProps} />
    );
}

export default ActivityModuleMgrComponent;
