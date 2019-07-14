import React, { PropTypes } from 'react';
import { Tabs, Icon } from 'antd';

/*模板1*/
import PublicFirstModalSearch from '../../../components/Back-Deploy/public-modal/PublicModalSearch';   //搜索框(隐藏)
import PublicFirstModalColumnList from '../../../components/Back-Deploy/public-modal/modalOne/PublicModalList';   //栏目列表
import ColumnUrlFirstModal from '../../../components/Back-Deploy/public-modal/modalOne/ColumnUrlModal';   //栏目列表点击链接模态框

import PublicFirstModalColumnAddOrEdit from '../../../components/Back-Deploy/public-modal/modalOne/AddOrEdit/PublicModalColumnAddOrEdit';   //'新增'栏目模态框
import PublicFirstModalTopicAddOrEdit from '../../../components/Back-Deploy/public-modal/modalOne/AddOrEdit/PublicModalTopicAddOrEdit';   //'新增'主题模态框
import PublicFirstModalArticleAddOrEdit from '../../../components/Back-Deploy/public-modal/modalOne/AddOrEdit/PublicModalArticleAddOrEdit';   //'新增'或'编辑'文章模态框

import PublicFirstModalColumnCheckList from '../../../components/Back-Deploy/public-modal/modalOne/Check/PublicModalColumnCheckList';  //栏目列表点击'查看所有主题'
import PublicFirstModalTopicCheckList from '../../../components/Back-Deploy/public-modal/modalOne/Check/PublicModalTopicCheckList';  //主题列表点击'查看所有文章'

/*模板2*/
import PublicSecondModalKeyList from '../../../components/Back-Deploy/public-modal/modalTwo/PublicModalList';   //关键词列表
import KeyUrlSecondModal from '../../../components/Back-Deploy/public-modal/modalTwo/KeyUrlModal';   //关键词列表点击链接模态框
import SetStateSecondModal from '../../../components/Back-Deploy/public-modal/modalTwo/AddOrEdit/PublicModalSetState';   //关键词列表点击链接模态框
import PublicSecondModalKeyAddOrEdit from '../../../components/Back-Deploy/public-modal/modalTwo/AddOrEdit/PublicModalKeyAddOrEdit';   //'新增''修改'关键词
import PublicSecondModalCommentAddOrEdit from '../../../components/Back-Deploy/public-modal/modalTwo/AddOrEdit/PublicModalCommentAddOrEdit';   //'新增''修改'测评项目

import PublicSecondModalKeyEdit from '../../../components/Back-Deploy/public-modal/modalTwo/Check/PublicModalKeyEditList';   //查看测评项目


import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';
const TabPane = Tabs.TabPane;

function PublicModal({ dispatch, publicModal }) {

    let {
        loading,Loading,
        listColumnModalOne,listTopicModalOne,listArticleModalOne,    //模板1列表数据
        listKeyModalTwo,listCommentModalTwo,                    //模板2列表数据
        columnUrlContentModalOne,keyUrlContentModalTwo,   //链接弹框内容
        totalColumnModalOne,totalTopicModalOne,totalArticleModalOne,   //模板1列表数据数量
        totalKeyModalTwo,totalCommentModalTwo,          //模板2列表数据数量
        columnIdModalOne, topicIdModalOne,         //模板1存储列表id和主题id，分页时需要
        keyIdModalTwo,        //模板2存储关键词id，测评项目分页时需要
        pageColumnIndexModalOne, pageColumnSizeModalOne, pageTopicIndexModalOne,pageTopicSizeModalOne,pageArticleIndexModalOne,pageArticleSizeModalOne,     //模板1分页
        pageKeyIndexModalTwo, pageKeySizeModalTwo,pageCommentIndexModalTwo,pageCommentSizeModalTwo,     //模板2分页
        selectedRowKeys, selectedRows,  //list数据
        columnUrlVisibleModalOne,columnAddOrEditModalVisibleModalOne,topicAddOrEditModalVisibleModalOne,articleAddOrEditModalVisibleModalOne,columnEditListVisibleModalOne,topicEditListVisibleModalOne,            //模板1模态框展示

        keyUrlVisibleModalTwo,keyAddOrEditModalVisibleModalTwo,commentEditListVisibleModalTwo,commentAddOrEditModalVisibleModalTwo, PublicModalSetStateVisibleModalTwo,                     //模板2模态框展示

        formLoading,formData,formType,                 //form表单数据
        searchData, searchVisible, searchChannelList,              //search查询框数据
        columnModalTitleModalOne,topicModalTitleModalOne,                                  //模板1模态框标题
        commentModalTitleModalTwo,                    //模板2模态框标题
    } = publicModal;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                selectedRowKeys, selectRows
            },
        });
    };

    //列表行是否能选中
    let tableRowCheckProps = function(record) {
        return true;
    };

    //表格分页、排序、筛选变化时触发
    let tableOnChange = function(pagination, filters, sorter) {
        //TODO
    };

    /*模板1分页*/
    //列表分页 变更
    let tableColumnPageChangeModalOne = function(current, pageColumnSizeModalOne = publicModal.pageColumnSizeModalOne) {
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                pageColumnIndexModalOne : current-1,
                pageColumnSizeModalOne
            },
        });
        dispatch({
            type: 'publicModal/queryColumnModalOne',
            payload: {
                pageColumnIndexModalOne : current-1,
                pageColumnSizeModalOne
            },
        });
    };

    /*模板1分页*/
    //主题页面的分页 变更
    let tableTopicPageChangeModalOne = function(current, pageTopicSizeModalOne = publicModal.pageTopicSizeModalOne){
        console.log('pageTopicSizeModalOne',pageTopicSizeModalOne);
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                pageTopicIndexModalOne : current-1,
                pageTopicSizeModalOne,
            },
        });
        dispatch({
            type: 'publicModal/queryTopicModalOne',
            payload: {
                pageTopicIndexModalOne : current-1,
                pageTopicSizeModalOne,
            },
        });
    };

    /*模板1分页*/
    //文章页面的分页 变更
    let tableArticlePageChangeModalOne = function(current, pageArticleSizeModalOne = publicModal.pageArticleSizeModalOne){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                pageArticleIndexModalOne : current-1,
                pageArticleSizeModalOne,
            },
        });
        dispatch({
            type: 'publicModal/queryArticleModalOne',
            payload: {
                pageArticleIndexModalOne : current-1,
                pageArticleSizeModalOne,
            },
        });
    }

    /*模板2分页*/
    /*关键词列表*/
    let tableKeyPageChangeModalTwo = function(current, pageKeySizeModalTwo = publicModal.pageKeySizeModalTwo){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                pageKeyIndexModalTwo : current-1,
                pageKeySizeModalTwo,
            },
        });
        dispatch({
            type: 'publicModal/queryKeyListModalTwo',
            payload: {
                pageKeyIndexModalTwo : current-1,
                pageKeySizeModalTwo,
            },
        });
    }

    /*模板2分页*/
    /*测评项目列表*/
    let tableCommentPageChangeModalTwo = function(current,pageCommentSizeModalTwo = publicModal.pageCommentSizeModalTwo){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                pageCommentIndexModalTwo : current-1,
                pageCommentSizeModalTwo,
            },
        });
        dispatch({
            type: 'publicModal/queryCommentModalTwo',
            payload: {
                pageCommentIndexModalTwo : current-1,
                pageCommentSizeModalTwo,
            },
        });
    }

    //筛选按钮
    let tableOnFilter = function(){
        dispatch({
            type: 'publicModal/changesearchVisible',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'publicModal/query',
            payload: {
                pageIndex,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'publicModal/query',
            payload: {
                ...searchData,
                pageIndex : 0,
                pageSize,
            },
        });
    };

    /*模板1*/
    /*栏目页面*/
    //栏目列表点击'链接'
    let modalOneTableOnOpenColumnUrl = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                columnUrlVisibleModalOne : true,
            },
        })
    };

    /*模板1*/
    /*栏目页面*/
    //栏目链接栏点击关闭
    let modalOneFormUrlModalCancel = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                columnUrlVisibleModalOne : false,
            },
        })
    };

    /*模板1*/
    /*栏目页面*/
    //栏目列表点击'新增'弹窗
    let modalOneTableOnCreateColumn = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                columnAddOrEditModalVisibleModalOne : true,
                formType:'AddColumnModalOne',
            },
        });
    };

    /*模板1*/
    /*栏目页面*/
    //栏目新增栏点击关闭
    let modalOneFormAddOrEditColumnCancel = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                columnAddOrEditModalVisibleModalOne : false,
            },
        })
    };

    /*模板1*/
    /*栏目页面*/
    //栏目新增编辑提交
    let modalOneFormAddOrEditColumnSubmit = function(data,type){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                formLoading : true,
            },
        });
        if(type=='AddColumnModalOne'){
            console.log('pages 开始');
            dispatch({
                type: 'publicModal/CreateColumnModalOne',
                payload: {
                    ...data
                },
            });
            console.log('pages 结束');
        }else if(type=='EditColumnModalOne'){
            dispatch({
                type: 'publicModal/UpdateColumnModalOne',
                payload: {
                    ...data
                },
            });
        }
    };

    /*模板1*/
    /*栏目页面*/
    //栏目列表点击'查看主题'弹窗
    let modalOneTableOnEditItem = function(data){
        let columnId = data.id;
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                columnEditListVisibleModalOne : true,
                columnModalTitleModalOne : data.title,
                columnIdModalOne : data.id,
            },
        });
        dispatch({
            type: 'publicModal/showTopicModalOne',
            payload: {
                columnId,
            }
        });
    };

    /*模板1*/
    /*栏目页面*/
    //栏目编辑栏点击关闭
    let modalOneFormColumnListCancel = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                columnEditListVisibleModalOne : false,
            },
        })
    };

    /*模板1*/
    /*栏目页面*/
    //栏目点击编辑
    let modalOneTableOnModifyItem = function(data){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                columnAddOrEditModalVisibleModalOne : true,
                formType : 'EditColumnModalOne',
                formData : data,
            },
        })
    }

    /*模板1*/
    /*栏目页面*/
    //栏目列表点击'删除'
    let modalOneTableOnDeleteItem = function(id){
        dispatch({
            type : 'publicModal/deleteColumnModalOne',
            payload : {
                id,
            }
        });
    };

    /*模板1*/
    /*主题页面*/
    //主题新增弹窗
    let modalOneTableOnCreateTopic = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                topicAddOrEditModalVisibleModalOne : true,
                formType : 'AddTopicModalOne',
            },
        })
    };

    /*模板1*/
    /*主题页面*/
    //主题编辑弹窗
    let modalOneTableOnTopicModifyItem = function(data){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                topicAddOrEditModalVisibleModalOne : true,
                formType : 'EditTopicModalOne',
                formData : data,
            },
        })
    }

    /*模板1*/
    /*主题页面*/
    //主题新增 编辑提交
    let modalOneFormAddOrEditTopicSubmit = function(data,type){
         dispatch({
            type: 'publicModal/updateState',
            payload: {
                formLoading : true,
            },
         });
        if(type=='EditTopicModalOne'){
            dispatch({
            type: 'publicModal/UpdateTopicModalOne',
                payload: {
                    ...data,
                },
            });
        }else if(type=='AddTopicModalOne'){
            dispatch({
            type: 'publicModal/CreateTopicModalOne',
                payload: {
                    ...data,
                },
            });
        }
    };

    /*模板1*/
    /*主题页面*/
    //主题新增 编辑关闭
    let modalOneFormAddOrEditTopicCancel = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                topicAddOrEditModalVisibleModalOne : false,
            },
        })
    };

    /*模板1*/
    /*主题页面*/
    //主题页面删除
    let modalOneTableOnTopicDeleteItem = function(id){
        dispatch({
            type: 'publicModal/DeleteTopicModalOne',
            payload: {
                id
            },
        })
    };

    /*模板1*/
    /*主题页面*/
    //主题页面查看文章
    let modalOneTableOnTopicCheckItem = function(data){
        let themeId = data.id;
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                topicEditListVisibleModalOne : true,
                topicModalTitleModalOne : data.themeName,
                topicIdModalOne : data.id,
            },
        });
        dispatch({
            type: 'publicModal/showArticleModalOne',
            payload: {
                themeId,
            }
        });
    };

    /*模板1*/
    /*主题页面*/
    //主题查看文章框点击关闭
    let modalOneFormTopicEditCancel = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                topicEditListVisibleModalOne : false,
            },
        })
    };
    /*模板1*/
    /*文章页面*/
    //文章新增弹窗
    let modalOneTableOnCreateArticle = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                articleAddOrEditModalVisibleModalOne : true,
                formType:'AddArticleModalOne',
            },
        })
    };

    /*模板1*/
    /*文章页面*/

    /*模板1*/
    /*文章页面*/
    //文章页面点击编辑
    let modalOneTableOnArticleEditItem = function(data){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                articleAddOrEditModalVisibleModalOne : true,
                formData:data,
                formType:'EditArticleModalOne',
            },
        })
    };

    /*模板1*/
    /*文章页面*/
    //文章页面新增和编辑弹窗关闭
    let modalOneFormAddOrEditArticleCancel= function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                articleAddOrEditModalVisibleModalOne : false,
            },
        })
    };

    /*模板1*/
    /*文章页面*/
    //文章页面编辑提交
    let modalOneFormAddOrEditArticleSubmit = function(data,type){
        dispatch({
                type: 'publicModal/updateState',
                payload: {
                    formLoading : true,
                },
        });
        if(type=='AddArticleModalOne'){
            dispatch({
                type: 'publicModal/CreateArticleModalOne',
                payload: {
                    ...data,
                },
            });
        }else if(type=='EditArticleModalOne'){
            dispatch({
                type: 'publicModal/UpdateArticleModalOne',
                payload: {
                    ...data,
                },
            });
        }
    };

    /*模板1*/
    /*文章页面*/
    //文章页面点击删除
    let modalOneTableOnArticleDeleteItem = function(id){
        dispatch({
            type: 'publicModal/DeleteArticleModalOne',
            payload: {
                id,
            },
        });
    };



    /*模板2*/
    /*关键词页面*/
    //关键词页面点击'状态栏设置'
    let modalTwoTableOnSetState = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                PublicModalSetStateVisibleModalTwo : true,
            },
        });
        dispatch({
            type: 'publicModal/openSetState',
        });
    }

    //关键词页面'状态栏设置'提交
    let modalTwoSetStateSubmit  = function(data){
        dispatch({
            type: 'publicModal/setStateSubmit',
            payload:{
                ...data,
            }
        });
    }

    //关键词页面'状态栏设置'关闭
    let modalTwoSetStateCancel = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                PublicModalSetStateVisibleModalTwo : false,
            },
        })
    }

    //关键词页面点击链接
    let modalTwoTableOnOpenColumnUrl = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                keyUrlVisibleModalTwo : true,
            },
        })
    };

    /*模板2*/
    /*关键词页面*/
    //关键词页面链接弹窗关闭
    let modalTwoFormUrlModalCancel = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                keyUrlVisibleModalTwo : false,
            },
        })
    };

    /*模板2*/
    /*关键词页面*/
    //关键词页面点击新增
    let modalTwoTableOnCreateKey = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                keyAddOrEditModalVisibleModalTwo : true,
                formType : 'CreateKeyModalTwo',
            },
        })
    };

    /*模板2*/
    /*关键词页面*/
    //关键词页面点击编辑
    let modalTwoTableOnModifyItem = function(data){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                keyAddOrEditModalVisibleModalTwo : true,
                formType : 'EditKeyModalTwo',
                formData : data,
            },
        })
    }

    /*模板2*/
    /*关键词页面*/
    //关键词页面新增框提交
    let modalTwoFormAddOrEditKeySubmit = function(data,type){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                formLoading : true,
            },
        });
        if(type=='CreateKeyModalTwo'){
            dispatch({
                type: 'publicModal/CreateKeyModalTwo',
                payload: {
                    ...data,
                },
            });
        }else if(type=='EditKeyModalTwo'){
            dispatch({
                type: 'publicModal/UpdateKeyModalTwo',
                payload: {
                    ...data,
                },
            });
        }
    };

    /*模板2*/
    /*关键词页面*/
    //关键词新增框关闭
    let modalTwoFormAddOrEditKeyCancel = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                keyAddOrEditModalVisibleModalTwo : false,
            },
        })
    };

    /*模板2*/
    /*关键词页面*/
    //关键词页面点击查看测评项目
    let modalTwoTableOnEditItem = function(data){
        let themeId  = data.id;
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                commentEditListVisibleModalTwo : true,
                commentModalTitleModalTwo : data.themeName,
                keyIdModalTwo : data.id,
            },
        });
        dispatch({
            type: 'publicModal/showCommentModalTwo',
            payload: {
                themeId,
            }
        });
    };

    /*模板2*/
    /*关键词页面*/
    //关键词页面点击删除
    let modalTwoTableOnDeleteItem = function(id){
        dispatch({
            type: 'publicModal/DeleteKeyModalTwo',
            payload: {
                id,
            },
        });
    };

    let publicTopicSearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
    };

    /*模板2*/
    /*测评项目页面*/
    //关闭测评项目页面
    let modalTwoFormCommentEditCancel = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                commentEditListVisibleModalTwo : false,
            },
        });
    };

    /*模板2*/
    /*测评项目页面*/
    //编辑测评项目页面弹出
    let modalTwoTableOnCommentEditItem = function(data){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                commentAddOrEditModalVisibleModalTwo : true,
                formData : data,
                formType : 'UpdateCommentModalTwo',
            },
        });
    };

    /*模板2*/
    /*测评项目页面*/
    //删除测评项目
    let modalTwoTableOnCommentDeleteItem = function(id){
        dispatch({
            type: 'publicModal/deleteCommentModalTwo',
            payload: {
                id
            },
        });
    };

    /*模板2*/
    /*测评项目页面*/
    //新增测评项目页面弹出
    let modalTwoTableOnCreateComment = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                commentAddOrEditModalVisibleModalTwo : true,
                formType : 'CreateCommentModalTwo',
            },
        });
    };

    /*模板2*/
    /*测评项目页面*/
    //测评项目新增编辑页面提交
    let modalTwoFormAddOrEditCommentSubmit = function(data,type){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                formLoading : true,
            },
        });
        if(type=='CreateCommentModalTwo'){
            dispatch({
            type: 'publicModal/createCommentModalTwo',
            payload: {
                ...data,
            },
        });
        }else if(type=='UpdateCommentModalTwo'){
            dispatch({
                type: 'publicModal/updateCommentModalTwo',
                payload: {
                    ...data,
                },
            })
        }
    };

    /*模板2*/
    /*测评项目页面*/
    //新增测评项目页面关闭
    let modalTwoFormAddOrEditCommentCancel = function(){
        dispatch({
            type: 'publicModal/updateState',
            payload: {
                commentAddOrEditModalVisibleModalTwo : false,
            },
        });
    };

    /*模板1*/
    //栏目列表 属性
    let publicFirstTopicColumnListProps = {
        loading, listColumnModalOne, totalColumnModalOne,
        pageColumnIndexModalOne, pageColumnSizeModalOne,
        selectedRowKeys, selectedRows,
        modalOneTableOnEditItem,
        modalOneTableOnModifyItem,
        modalOneTableOnDeleteItem,
        modalOneTableOnCreateColumn,
        tableOnFilter,
        tableColumnPageChangeModalOne,
        tableRowSelectChange,
        tableRowCheckProps,
        tableOnChange,
        modalOneTableOnOpenColumnUrl,
    };

    /*模板1*/
    //栏目列表点击'链接' 属性
    let columnUrlFirstModalProps = {
        columnUrlVisibleModalOne,formLoading,formType,columnUrlContentModalOne,
        modalOneFormUrlModalCancel,
    };

    /*模板1*/
    //栏目列表点击'新增'或'修改' 属性
    let publicFirstModalColumnAddOrEditProps = {
        columnAddOrEditModalVisibleModalOne,formLoading,formType,formData,
        modalOneFormAddOrEditColumnSubmit,
        modalOneFormAddOrEditColumnCancel,
    };

    /*模板1*/
    //主题列表点击'新增'或'修改' 属性
    let publicFirstModalTopicAddOrEditProps = {
        topicAddOrEditModalVisibleModalOne,formLoading,formType,formData,
        modalOneFormAddOrEditTopicSubmit,
        modalOneFormAddOrEditTopicCancel,
    };

    /*模板1*/
    //文章列表点击'新增'或'修改' 属性
    let publicFirstModalArticleAddOrEditProps = {
        articleAddOrEditModalVisibleModalOne,
        formLoading,formType,formData,
        modalOneFormAddOrEditArticleSubmit,
        modalOneFormAddOrEditArticleCancel,
    };

    /*模板1*/
    //主题列表 属性
    let publicFirstModalColumnCheckListProps = {
        loading, formType,listTopicModalOne, totalTopicModalOne,
        pageTopicIndexModalOne, pageTopicSizeModalOne,
        formLoading,columnEditListVisibleModalOne,columnModalTitleModalOne,
        tableOnChange,tableTopicPageChangeModalOne,modalOneFormColumnListCancel,modalOneTableOnTopicCheckItem,
        modalOneTableOnTopicDeleteItem,modalOneTableOnCreateTopic,modalOneTableOnTopicModifyItem,
    };

    /*模板1*/
    //文章列表 属性
    let publicFirstModalTopicCheckListProps = {
        loading,formType, listArticleModalOne, totalArticleModalOne,
        pageArticleIndexModalOne, pageArticleSizeModalOne,
        formLoading,topicEditListVisibleModalOne,
        tableOnChange,tableArticlePageChangeModalOne,modalOneFormTopicEditCancel,modalOneTableOnArticleEditItem,
        modalOneTableOnArticleDeleteItem,modalOneTableOnCreateArticle,topicModalTitleModalOne,
    };

    /*模板2*/
    //关键词列表
    let publicSecondModalKeyListProps = {
        loading,formType, formData,
        listKeyModalTwo, totalKeyModalTwo,
        pageKeyIndexModalTwo, pageKeySizeModalTwo,
        selectedRowKeys, selectedRows,
        modalTwoTableOnModifyItem,
        modalTwoTableOnEditItem,
        modalTwoTableOnDeleteItem,
        modalTwoTableOnCreateKey,
        modalTwoTableOnSetState,
        modalTwoTableOnOpenColumnUrl,
        tableKeyPageChangeModalTwo,
        tableOnFilter,
        tableRowSelectChange,
        tableRowCheckProps,
        tableOnChange,
    };

    /*模板2*/
    //关键词列表点击'状态栏设置' 属性
    let setStateSecondModalProps = {
        PublicModalSetStateVisibleModalTwo,formLoading,formData,
        modalTwoSetStateSubmit,
        modalTwoSetStateCancel,
    }

    //关键词列表点击'链接' 属性
    let keyUrlSecondModalProps = {
        keyUrlVisibleModalTwo,formLoading, formData,formType,keyUrlContentModalTwo,
        modalTwoFormUrlModalCancel,
    };

    /*模板2*/
    //关键词列表点击'新增' '编辑' 属性
    let publicSecondModalKeyAddOrEditProps = {
        keyAddOrEditModalVisibleModalTwo,formLoading,formType,formData,
        modalTwoFormAddOrEditKeySubmit,
        modalTwoFormAddOrEditKeyCancel,
    };

    /*模板2*/
    //测评项目列表点击'新增' '编辑' 属性
    let publicSecondModalCommentAddOrEditProps = {
        commentAddOrEditModalVisibleModalTwo,formLoading,formType,formData,
        modalTwoFormAddOrEditCommentSubmit,
        modalTwoFormAddOrEditCommentCancel,
    };

    /*模板2*/
    //关键词列表点击'查看测评项目' 属性
    let publicSecondModalKeyEditProps = {
        loading, formType,
        listCommentModalTwo,totalCommentModalTwo,
        pageCommentSizeModalTwo,pageCommentIndexModalTwo,
        formLoading,commentEditListVisibleModalTwo,
        tableOnChange,tableCommentPageChangeModalTwo,
        modalTwoFormCommentEditCancel,
        modalTwoTableOnCommentEditItem,
        modalTwoTableOnCommentDeleteItem,
        modalTwoTableOnCreateComment,
        commentModalTitleModalTwo,
    };

    return (
        <div>
           <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >

				{searchVisible ? [
                   <PublicModalSearch {...publicTopicSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="home" />模板1</span>} key="1">
                    <PublicFirstModalColumnList {...publicFirstTopicColumnListProps} />
                    <ColumnUrlFirstModal {...columnUrlFirstModalProps} />
                    <PublicFirstModalColumnAddOrEdit {...publicFirstModalColumnAddOrEditProps} />
                    <PublicFirstModalTopicAddOrEdit {...publicFirstModalTopicAddOrEditProps}/>
                    <PublicFirstModalArticleAddOrEdit {...publicFirstModalArticleAddOrEditProps}/>
                    <PublicFirstModalColumnCheckList {...publicFirstModalColumnCheckListProps} />
                    <PublicFirstModalTopicCheckList {...publicFirstModalTopicCheckListProps} />
                </TabPane>
                <TabPane tab={<span><Icon type="home" />模板2</span>} key="2">
                    <PublicSecondModalKeyList {...publicSecondModalKeyListProps}/>
                    <KeyUrlSecondModal {...keyUrlSecondModalProps} />
                    <SetStateSecondModal {...setStateSecondModalProps} />
                    <PublicSecondModalKeyAddOrEdit {...publicSecondModalKeyAddOrEditProps} />
                    <PublicSecondModalCommentAddOrEdit {...publicSecondModalCommentAddOrEditProps} />
                    <PublicSecondModalKeyEdit {...publicSecondModalKeyEditProps} />
                </TabPane>
            </Tabs>
        </div>
  );
}

PublicModal.propTypes = {
  publicModal: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ publicModal }) {
  return { publicModal };
}

export default connect(mapStateToProps)(PublicModal);
