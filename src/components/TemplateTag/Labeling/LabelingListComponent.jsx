import React from 'react';
import { Tabs } from 'antd';
import LabelingManager from './LabelingManager';
const TabPane = Tabs.TabPane;

function DeliveryListComponent({
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
        tabChange,
}) {

    let props = {
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
    };

    return (
        <Tabs activeKey={sourceType} onChange={tabChange}>
            <TabPane tab="微活动" key="1">
                <LabelingManager {...props}  />
            </TabPane>
            <TabPane tab="微游戏" key="2">
                <LabelingManager {...props}  />
            </TabPane>
        </Tabs>
    );
}

export default DeliveryListComponent;
