import React from 'react';
import SourceSearchManager from './SourceSearchManager';
import SourceListManager from './SourceListManager';
import styles from './SourceManager.less';

function SourceManager({
    filter, totalCount, dataList, listLoading, listSelectIds, pageIndex, pageSize, adComList,
    onFilterQuery, onPageQuery, changeSelectIds, adModuleIds, adCollectVisible, adCollectAdId, handleOpenAdCollect,
    handleChangeAdCollect, handleAdCollectCancle, adCollectAdText, adCollectAdUrl, handleCancleAdCollect, handleCreateAdCollect,
    }) {

    let searchProps = {
        filter, adComList, onFilterQuery,
    };

    let listProps = {
        totalCount, dataList, listLoading, listSelectIds, pageIndex, pageSize, adComList, onPageQuery,
        changeSelectIds, adModuleIds, adCollectVisible, adCollectAdId, handleOpenAdCollect,
        handleChangeAdCollect, handleAdCollectCancle, adCollectAdText, adCollectAdUrl, handleCreateAdCollect,handleCancleAdCollect,
    };
    return (
        <div className={styles.source_manager_cont}>

            <div className={styles.source_search_cont}>
                <SourceSearchManager {...searchProps} />
            </div>

            <div className={styles.source_list_cont}>
                <SourceListManager {...listProps} />
            </div>
        </div>
    );
}

export default SourceManager;
