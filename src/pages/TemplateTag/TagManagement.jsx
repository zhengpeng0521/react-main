import React from 'react';
import TagManagementComponent from'../../components/TemplateTag/TagManagement/TagManagementComponent';

import qs from 'qs';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'dva';

function TagManagement({ dispatch,tagManagement }) {
     let {
        
        labelListContent,            //标签内容
        labelLoding,                 //标签加载状态
        labelGroupLoading,           //标签组加载状态
        labelGroupListContent,       //标签组内容
        addLabelFormVisible,         //新增标签或标签组
        addLabelButtonLoading,       //新增标签或标签组提交时按钮是否加载状态
        labelListType,               //tab切换 1.微活动
        labelGroupsIndex,            //选取标签组的索引
        addOrEditlabel,              //添加或编辑变标签名的值
        addOrEditlabelId,            //添加或编辑变标签名的id
        addOrEditLabelChirld,
        lanelState,
        labelType,
    } = tagManagement;

//将Tab的key赋值给labelList
    let sourceTypeChang = function(key){
        
        dispatch({
            type: 'tagManagement/updateState',
            payload:{
                labelListType:key,
                labelGroupsIndex:0,
            }
        });
        dispatch({
            type:'tagManagement/changTba',
            payload:{
                product:key
            }
        })
    
    }

    /*添加或编辑标签组*/
    let AddOrEditLabelGroupsModal = function(type,data){
        if(type=='add'){
            dispatch({
                type: 'tagManagement/updateState',
                payload:{
                    addLabelFormVisible: true,
                    addOrEditlabel:'',
                    lanelState:'add',
                    labelType:'groups',
                }
            });
        }else if(type=='edit'){
             dispatch({
                type: 'tagManagement/updateState',
                payload:{
                   addLabelFormVisible: true,
                   addOrEditlabel:data.groupName,
                   addOrEditlabelId:data.id,
                   lanelState:'edit',
                   labelType:'groups',
                }
            });
        }
    }

    /*添加或编辑标签*/
    let AddOrEditLabelModal = function(type,data){
         if(type=='add'){
            dispatch({
                type: 'tagManagement/updateState',
                payload:{
                    addLabelFormVisible: true,
                    addOrEditlabel:'',
                    lanelState:'add',
                    labelType:'group',
                }
            });
        }else if(type=='edit'){
             dispatch({
                type: 'tagManagement/updateState',
                payload:{
                   addLabelFormVisible: true,
                   addOrEditlabel:data.labelName,
                   addOrEditLabelChirld:data.id,
                   lanelState:'edit',
                   labelType:'group',
                }
            });
        }
    }

    /*删除标签组*/
    let deleLabelGroups = function(data){
         dispatch({
            type: 'tagManagement/labelGroupUpdate',
            payload:{
                id:data.id,
                groupName:data.labelName,
                status:0
            }
        });
		dispatch({
                type: 'tagManagement/updateState',
                payload:{
                    labelGroupsIndex:0,
                }
         });
    }

    /*删除标签*/
    let deleLabel = function(data){
        dispatch({
            type: 'tagManagement/labelUpdate',
            payload:{
                id:data.id,
                labelName:data.labelName,
                status:0
            }
        });
    }

    /*标签组移动*/
    let moveLabelGroups = function(data,index){
        dispatch({
            type: 'tagManagement/labelGroupSorting',
            payload:{
                groupList:JSON.stringify(data),
            }
        });
         dispatch({
            type:'tagManagement/updateState',
            payload:{
                labelGroupsIndex : index,
            }
        })
    }

    /*标签移动*/
    let moveLabel = function(data){
       dispatch({
            type:'tagManagement/labelSorting',
            payload:{
                labelList:JSON.stringify(data),
            }
        })
    }

    /*添加或编辑标签提交*/
    let handleAdCollectSubmit = function(data){
        if(labelType == 'groups'){
           if(lanelState == 'add'){
            
                dispatch({
                    type: 'tagManagement/labelGroupCreate',
                    payload:{
                       groupName:data.labelName,
                       product:labelListType,
                    }
                }); 
            }else if(lanelState == 'edit'){
                dispatch({
                    type: 'tagManagement/labelGroupUpdate',
                    payload:{
                        groupName:data.labelName,
                        status:'1',
                        id:addOrEditlabelId,
                    }
                });
            }
        }else if(labelType == 'group'){
            if(lanelState == 'add'){
                dispatch({
                    type: 'tagManagement/labelCreate',
                    payload:{
                        groupId:addOrEditlabelId,
                        labelName:data.labelName,
                    }
                });
            }else if(lanelState == 'edit'){
                dispatch({
                    type: 'tagManagement/labelUpdate',
                    payload:{
                        id:addOrEditLabelChirld,
                        labelName:data.labelName,
                        status:'1',
                    }
                });
            }
        }
    }

    /*添加或编辑标签取消*/
    let handleAdCollectCancle = function(type,data){
        dispatch({
            type: 'tagManagement/updateState',
            payload:{
                addLabelFormVisible: false,
                addOrEditlabel:'',
                addOrEditlabelId:'',

            }
        });
    }

    /*展开子标签*/
    let onCheckLabelGroup = function(data,index){
         dispatch({
            type: 'tagManagement/getTagList',
            payload:{
                groupId:data,

            }
        });
        dispatch({
            type: 'tagManagement/updateState',
            payload:{
                labelGroupsIndex:index,
                addOrEditlabelId:data,
            }
        });
    }
    let props =  {
        labelListContent,
        labelLoding,
        labelGroupListContent,
        addLabelFormVisible,
        addLabelButtonLoading,
        labelListType,
        AddOrEditLabelGroupsModal,
        AddOrEditLabelModal,
        deleLabelGroups,
        deleLabel,
        moveLabelGroups,
        moveLabel,
        addOrEditlabel,
        addOrEditlabelId,
        handleAdCollectSubmit,
        handleAdCollectCancle,
        labelGroupsIndex,
        onCheckLabelGroup,
        sourceTypeChang
    }
    return (

        <TagManagementComponent {...props}/>
        
  );
}

function mapStateToProps({tagManagement}) {
    return{tagManagement};
}

export default connect(mapStateToProps)(TagManagement);
