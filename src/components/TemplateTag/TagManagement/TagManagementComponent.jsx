import React from 'react';
import { Tabs } from 'antd';
import TagManagementList from './TagManagementList';
const TabPane = Tabs.TabPane;

function DeliveryListComponent({
        labelListContent,
        labelGroupListContent,
        addLabelFormVisible,
        addLabelButtonLoading,
        labelListType,
        AddOrEditLabelGroupsModal,  //添加或编辑标签组
        AddOrEditLabelModal,        //添加或编辑标签
        deleLabelGroups,            //删除标签组
        deleLabel,                  //删除标签
        moveLabelGroups,            //移动标签组
        moveLabel,                  //移动标签
        labelSubmit,                //修改或编辑提交
        labelGroupsIndex,            //选取标签组的索引
        handleAdCollectCancle,      //添加或编辑标签取消
        handleAdCollectSubmit,      //添加或编辑标签提交
        addOrEditlabel,             //添加或编辑变标签名的值
        onCheckLabelGroup,
        sourceTypeChang, //更改tab选中key
}) {

    let props = {
        labelListContent,
        labelGroupListContent,
        addLabelFormVisible,
        addLabelButtonLoading,
        labelListType,
        AddOrEditLabelGroupsModal,  //添加或编辑标签组
        AddOrEditLabelModal,        //添加或编辑标签
        deleLabelGroups,            //删除标签组
        deleLabel,                  //删除标签
        moveLabelGroups,            //移动标签组
        moveLabel,                  //移动标签
        labelSubmit,                //修改或编辑提交
        labelGroupsIndex,            //选取标签组的索引
        handleAdCollectCancle,      //添加或编辑标签取消
        handleAdCollectSubmit,      //添加或编辑标签提交
        addOrEditlabel,             //添加或编辑变标签名的值
        onCheckLabelGroup,
        

    };
    
    return (
        <Tabs defaultactiveKey="1"  onChange={sourceTypeChang} >
            <TabPane tab="微活动" key="1"><TagManagementList {...props} sourceType="1" /></TabPane>
            <TabPane tab="微游戏" key="2"><TagManagementList {...props} sourceType="2" /></TabPane>
        </Tabs> 
    );
 
}

export default DeliveryListComponent;
