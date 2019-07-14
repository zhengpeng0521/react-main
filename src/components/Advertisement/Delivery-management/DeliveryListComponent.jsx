import React from 'react';
import { Tabs } from 'antd';
import SourceManager from './SourceManager';
const TabPane = Tabs.TabPane;

function DeliveryListComponent({
    sourceType, filter, totalCount, dataList, listLoading, listSelectIds, pageIndex, pageSize, adComList,
    changeSourceType, onFilterQuery, onPageQuery, changeSelectIds, adModuleIds, adCollectVisible, adCollectAdId, handleOpenAdCollect,
    handleChangeAdCollect,handleAdCollectCancle, adCollectAdText, adCollectAdUrl, handleCancleAdCollect, handleCreateAdCollect,
}) {

    let props = {
        filter, totalCount, dataList, listLoading, listSelectIds, pageIndex, pageSize, adComList, changeSourceType, onFilterQuery, onPageQuery, changeSelectIds,
        adModuleIds, adCollectVisible, adCollectAdId, handleOpenAdCollect, handleChangeAdCollect, handleAdCollectCancle, adCollectAdText, adCollectAdUrl, handleCreateAdCollect,
        handleCancleAdCollect,
    };

    function handleSourceTypeChange(sourceType) {
        changeSourceType && changeSourceType(sourceType);
    }
    return (
        <Tabs activeKey={sourceType} onChange={handleSourceTypeChange}>
            <TabPane tab="微活动" key="1"><SourceManager {...props} sourceType="1"  /></TabPane>
            <TabPane tab="微游戏" key="3"><SourceManager {...props} sourceType="3"  /></TabPane>
        </Tabs>
    );
}

export default DeliveryListComponent;
