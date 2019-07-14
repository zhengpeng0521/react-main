import React from 'react';
import LabelingListManager from './LabelingListManager';
import LabelingSarchManager from './LabelingSarchManager';
import styles from './Labeling.less';

function SourceManager({
        sourceType,
        filter,
        totalCount,
        dataList,
        listLoading,
        listSelectIds,
        pageIndex,
        pageSize,
        onPageQuery,
        adLabeling,
        adCollectVisible,
        AddOrEditLabelShow,
        AddOrEditLabelCancel,
        AddOrEditLabelSubmit,
        labeledModal,
        onFilterQuery,
        changeSelectIds,
    }) {

    let searchProps = {
        filter,onFilterQuery,
    };
    let listProps = {
        sourceType,
        totalCount,
        dataList,
        listLoading,
        listSelectIds,
        pageIndex,
        pageSize,
        onPageQuery,
        adLabeling,
        adCollectVisible,
        AddOrEditLabelShow,
        AddOrEditLabelCancel,
        AddOrEditLabelSubmit,
        labeledModal,
        changeSelectIds,
    };
    return (
        <div className={styles.source_manager_cont}>

            <div className={styles.source_search_cont}>
                <LabelingSarchManager {...searchProps} />
            </div>

            <div className={styles.source_list_cont}>
                <LabelingListManager {...listProps} />
            </div>
        </div>
    );
}

export default SourceManager;
