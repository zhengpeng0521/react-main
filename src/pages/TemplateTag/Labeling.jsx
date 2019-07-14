import React from 'react';
import { connect } from 'dva';
import LabelingList from'../../components/TemplateTag/Labeling/LabelingListComponent';


function Labeling({ dispatch, labeling}) {
    let{
        sourceType,        //当前展示对象类型  微活动: 1, 微传单: 2, 微游戏: 3,
        filter,             //微活动过滤条件
        totalCount,          //数据总条数
        dataList,           //微活动的数据
        listLoading,     //微活动是否加载中
        listSelectIds,      //微活动-已选中
        pageIndex,
        pageSize,

        searchContent,       //搜索条件

        adLabeling,         //标签列表
        adCollectVisible,   //弹框显示
        labeledModal,       //获取当前模板数据
    } = labeling;

    /*分页*/
    function onPageQuery(pageIndex, pageSize) {
        dispatch({
            type: 'labeling/getTagsGroupsList',
            payload: {
                pageIndex,
                pageSize,
                ...searchContent
            }
        });
    }

    /*查询*/
    function onFilterQuery(data) {
        dispatch({
            type: 'labeling/getTagsGroupsList',
            payload: {
                pageIndex : 0,
                pageSize,
                ...data
            }
        });
    }

    /*弹框显示*/
    function AddOrEditLabelShow(data){
        if(!!listSelectIds && listSelectIds.length == 1){
            for(let i in dataList){
                if(listSelectIds[0] == dataList[i].id){
                    data = dataList[i];
                    break;
                }
            }
        }
        dispatch({
            type: 'labeling/updateState',
            payload: {
               adCollectVisible:true,
               labeledModal:data,
            }
        });
    }

    /*关闭标签弹框*/
    function AddOrEditLabelCancel(){
        dispatch({
            type: 'labeling/updateState',
            payload: {
                adCollectVisible:false,
                labeledModal:'',
                listSelectIds:[],
            }
        });
    }
    /*提交打标签*/
    function AddOrEditLabelSubmit(data){
        dispatch({
           type: 'labeling/setLabeling',
           payload: {
                ...data
             }
         });
        dispatch({
            type: 'labeling/updateState',
            payload: {
                labeledModal:'',
                listSelectIds:[],
				adCollectVisible:false,
            }
        });
    }
     function changeSelectIds(selectedRowKeys, selectedRows) {
        dispatch({
            type: 'labeling/updateState',
            payload: {
                listSelectIds : selectedRowKeys
            }
        });
    }

    /**
     * 标签切换
     */
    function tabChange(e){
        dispatch({
            type: 'labeling/updateState',
            payload: {
                pageIndex : 0,
                sourceType : e,
            }
        });
        dispatch({
            type: 'labeling/getTagGroups',
        });
        dispatch({
            type: 'labeling/getTagsGroupsList',
            payload: {
                pageIndex : 0,
                pageSize,
            }
        });
    }

    let componentProps = {
        sourceType,        //当前展示对象类型  微活动: 1, 微传单: 2, 微游戏: 3,
        filter,             //微活动过滤条件
        totalCount,          //数据总条数
        dataList,           //微活动的数据
        listLoading,     //微活动是否加载中
        listSelectIds,      //微活动-已选中
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
    }

    return (
        <div>
            <LabelingList {...componentProps}/>
        </div>
  );
}

function mapStateToProps({labeling}) {
    return{labeling};
}

export default connect(mapStateToProps)(Labeling);
