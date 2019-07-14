import React, { PropTypes } from 'react';
import { Tabs, Icon } from 'antd';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';

import MarketingPackageList from '../../../components/SaasWeixinMarketing/saas-weixin-market-marketing-package/MarketingPackageList';
import MarketingPackageSearch from '../../../components/SaasWeixinMarketing/saas-weixin-market-marketing-package/MarketingPackageSearch';
import MarketingPackageCheckModalNoModal from '../../../components/SaasWeixinMarketing/saas-weixin-market-marketing-package/MarketingPackageCheckModalNoModal';
import MarketingPackageAddOrEditModal from '../../../components/SaasWeixinMarketing/saas-weixin-market-marketing-package/MarketingPackageAddOrEditModal';

import styles from './WeiXinMarketingPackage.less';

const TabPane = Tabs.TabPane;

function WeiXinMarketingPackage({ dispatch, weiXinMarketingPackage }) {

    let {
        attrDataLimit,
        searchVisible,                      //搜索框是否显示
        searchData,
        isSelectAllLimitNum,
        isSelectAllLimit,
        isSelectAllChartBox,
        selectLimitNumBoxNum,
        selectChartBoxNum,
        allPrivilegeNum,
        selectedRowKeys,

        pageSize,                           //每页展示条目数
        pageIndex,                          //页码
        loading,                            //列表是否加载
        total,                              //列表总数
        list,                               //列表内容

        checkModalVisible,                  //点击'包含模版'下内容是弹窗是否显示
        checkModalContent,                  //点击'包含模版'获取到的值
        checkModalNoDefaultExpandedKeys,    //查看模板数量默认树状展示

        addOrEditFormType,                  //新增编辑modal 'create'/'edit'
        addOrEditFormVisible,               //新增编辑modal是否显示
        addOrEditButtonLoading,             //新增编辑modal提交时按钮是否加载中
        addOrEditFormData,                  //编辑表单是带出的表单默认内容
        addOrEditFormActivityTransferAllContent,        //微信活动穿梭框左边传单内容
        addOrEditFormActivityTransferTargetContent,     //微信活动穿梭框右边传单内容
        addOrEditFormAdminiTransferAllContent,        //微信活动穿梭框左边传单内容-----------------------------------
        addOrEditFormAdminiTransferTargetContent,     //微信活动穿梭框右边传单内容----------------------------------
        addOrEditFormGameTransferAllContent,            //微信游戏穿梭框左边传单内容
        gameModuleFilterKeyWord,
        selectData,
        addOrEditFormGameTransferTargetContent,         //微信游戏穿梭框右边传单内容
        addOrEditFormOfflineLeafletsTransferAllContent,	//线下传单穿梭框左边传单内容
        addOrEditFormOfflineLeafletsTransferTargetContent, //线下传单穿梭框右边传单内容

        selectedLimitY,//已选限制
        selectedLimitN,//已选不限制
        numValue,
        selectedChart,
        text,
        chartLimit,
        stateVue
    } = weiXinMarketingPackage;

    /*分页 改变*/
    let tableOnChange = function (pagination, filters, sorter) {
        dispatch({
            type: 'weiXinMarketingPackage/showMarketingPackageList',
            payload: {
                pageIndex: pagination.current - 1,
                pageSize: pagination.pageSize,
                ...searchData,
            },
        });
    }

    /*点击筛选*/
    let tableOnFilter = function () {
        dispatch({
            type: 'weiXinMarketingPackage/updateState',
            payload: {
                searchVisible: !searchVisible,
            }
        });
    }

    /*点击搜索*/
    let searchSubmit = function (data) {
        dispatch({
            type: 'weiXinMarketingPackage/showMarketingPackageList',
            payload: {
                ...data,
                pageSize,
                pageIndex: 0,
            }
        });
    }

    //微信游戏row checkbox点击事件
    function limityIndexFun(index, key, e) {

        //要更改的操作
        let handle_bj = {
            type: key,
            key: addOrEditFormGameTransferAllContent[index].key,
            data: e,
            index
        };

        let selectLimitNumBoxNum = 0, selectChartBoxNum = 0, isSelectAllLimitNum, isSelectAllLimit, isSelectAllChartBox;

        let data_e = e;

        if (key === 'isLimit') {
            addOrEditFormGameTransferAllContent[index].isLimit = !addOrEditFormGameTransferAllContent[index].isLimit;

        }
        else if (key === 'limitNum') {

            let obj = addOrEditFormGameTransferAllContent[index];

            selectData && selectData.map((item, index) => {
                if(item.key == obj.key) {
                    item.limitNum = e;
                }
                if(item.id == obj.key) {
                    item.limitNum = e;
                }
            })
        }
        else if (key === 'chart') {
            addOrEditFormGameTransferAllContent[index].chart = !addOrEditFormGameTransferAllContent[index].chart;
            let obj = addOrEditFormGameTransferAllContent[index];
            let count = 0;
            selectData &&selectData.map((item, index) => {
                if(item.id == obj.key) {
                    item.chart = !e;
                }

                if(item.chart){
                    selectChartBoxNum++;
                }

            })
            dispatch({
                type: 'weiXinMarketingPackage/updateState',
                payload: {
                    chartLimit: (chartLimit + 1),
                    addOrEditFormGameTransferAllContent,
                    selectData,
                }
            });
        }
        for (const item of addOrEditFormGameTransferAllContent) {
            if (item.isLimit === false) selectLimitNumBoxNum += 1;
        }

        if (selectLimitNumBoxNum === allPrivilegeNum) {
            isSelectAllLimitNum = true;
            isSelectAllLimit = false;
        }
        else if (selectLimitNumBoxNum === 0) {
            isSelectAllLimitNum = false;
            isSelectAllLimit = true;
        }
        else {
            isSelectAllLimitNum = false;
            isSelectAllLimit = false;
        }

        if (selectChartBoxNum === allPrivilegeNum) {
            isSelectAllChartBox = true;
        }
        else {
            isSelectAllChartBox = false;
        }


        dispatch({
            type: 'weiXinMarketingPackage/updateState',
            payload: {
                addOrEditFormGameTransferAllContent,
                isSelectAllLimitNum,
                isSelectAllLimit,
                isSelectAllChartBox,
                selectLimitNumBoxNum,
                selectChartBoxNum,
                allPrivilegeNum,
                selectData
            }
        });

    }

    //微信游戏title checkbox点击事件
    function selectedLimitYFun(key, e) {
        //isLimit等false代表限制人数
        if (key === 'limitNum') {
            if (isSelectAllLimitNum === true) {

                //不限制人数应该全部勾选
                for (let item of addOrEditFormGameTransferAllContent) {
                    if (item.hasOwnProperty('chart')) item.isLimit = true;
                }
                isSelectAllLimitNum = false;
                isSelectAllLimit = true;
                selectLimitNumBoxNum = 0;
            }
            else {
                //限制人数应该勾选
                for (let item of addOrEditFormGameTransferAllContent) {
                    if (item.hasOwnProperty('chart')) item.isLimit = false;
                }
                isSelectAllLimitNum = true;
                isSelectAllLimit = false;
                selectLimitNumBoxNum = allPrivilegeNum;
            }
        }
        else if (key === 'isLimit') {
            if (isSelectAllLimit === true) {
                //限制人数应该勾选
                for (let item of addOrEditFormGameTransferAllContent) {
                    if (item.hasOwnProperty('chart')) item.isLimit = false;
                }
                isSelectAllLimitNum = true;
                isSelectAllLimit = false;
                selectLimitNumBoxNum = allPrivilegeNum;
            }
            else {
                //不限制人数应该勾选
                for (let item of addOrEditFormGameTransferAllContent) {
                    if (item.hasOwnProperty('chart')) item.isLimit = true;
                }
                isSelectAllLimitNum = false;
                isSelectAllLimit = true;
                selectLimitNumBoxNum = 0;
            }
        }
        else if (key === 'chart') {
            if (isSelectAllChartBox === false){
                for (let item of addOrEditFormGameTransferAllContent) {
                    if (item.hasOwnProperty('chart')) item.chart = true;
                }
                isSelectAllChartBox = true;
                selectChartBoxNum = allPrivilegeNum;
            }
            else{
                for (let item of addOrEditFormGameTransferAllContent) {
                    if (item.hasOwnProperty('chart')) item.chart = false;
                }
                isSelectAllChartBox = false;
                selectChartBoxNum = 0;
            }
        }

        dispatch({
            type: 'weiXinMarketingPackage/updateState',
            payload: {
                addOrEditFormGameTransferAllContent,
                isSelectAllLimitNum,
                isSelectAllLimit,
                isSelectAllChartBox,
                selectLimitNumBoxNum,
                selectChartBoxNum,
                allPrivilegeNum
            }
        });
    }



    function selectedLimitNFun(key, e) {
        if (key === 'isLimit') {
            for (const item of addOrEditFormGameTransferAllContent) {
                if (item.hasOwnProperty('isLimit')) {
                    //                    console.log('2', item);
                    item.isLimit = e[0] === '2' ? true : false;
                }
            }
        }
        dispatch({
            type: 'weiXinMarketingPackage/updateState',
            payload: {
                addOrEditFormGameTransferAllContent
            }
        });
    }

    function numValueFun() {
        dispatch({
            type: 'weiXinMarketingPackage/updateState',
            payload: {
                numValue: 4,
            }
        });
    }
    function selectedChartFun(key, e) {
        //        console.log(key, e.target.options[0].value);
        if (key === 'chart') {
            //            console.log('11111111', addOrEditFormGameTransferAllContent);
            for (const item of addOrEditFormGameTransferAllContent) {
                if (item.hasOwnProperty('chart')) {
                    //                    console.log('2', item);
                    item.chart = e[0] === '1' ? true : false;
                }
            }
        }
        dispatch({
            type: 'weiXinMarketingPackage/updateState',
            payload: {
                addOrEditFormGameTransferAllContent,
            }
        });
    }

    /*点击清除*/
    let searchReset = function () {
        dispatch({
            type: 'weiXinMarketingPackage/showMarketingPackageList',
            payload: {
                pageSize,
                pageIndex: 0,
            }
        });
    }

    /*设置上架*/
    let tableWeiXinPackageUp = function (id) {
        let status = 1;
        dispatch({
            type: 'weiXinMarketingPackage/packageChangeStatus',
            payload: {
                id,
                status,
            }
        });
    }

    /*设置下架*/
    let tableWeiXinPackageDown = function (id) {
        let status = 0;
        dispatch({
            type: 'weiXinMarketingPackage/packageChangeStatus',
            payload: {
                id,
                status,
            }
        });
    }

    //更新购买记录
    let tableWeiXinPackageUpdateBuyRecord = function (id) {
        dispatch({
            type: 'weiXinMarketingPackage/tableWeiXinPackageUpdateBuyRecord',
            payload: {
                id
            }
        });
    }

    /*点击新增时弹窗*/
    let tableOnCreate = function () {
        dispatch({
            type: 'weiXinMarketingPackage/openAddPackageModal',
        });
    }


    /*点击编辑时弹窗*/
    let tableOnEditItem = function (data) {
        dispatch({
            type: 'weiXinMarketingPackage/openEditPackageModal',
            payload: {
                ...data,
            }
        });

    }

    /*新增编辑提交*/
    let addOrEditModalSubmit = function (data, type) {
        dispatch({
            type: 'weiXinMarketingPackage/updateState',
            payload: {
                addOrEditButtonLoading: true,
            }
        });
        if ('add' == type) {
            dispatch({
                type: 'weiXinMarketingPackage/addPackageSubmit',
                payload: {
                    ...data
                }
            });
        } else if ('edit' == type) {
            dispatch({
                type: 'weiXinMarketingPackage/editPackageSubmit',
                payload: {
                    ...data
                }
            });
        }
    }

    /*新增编辑弹窗关闭*/
    let addOrEditModalCancel = function () {
        dispatch({
            type: 'weiXinMarketingPackage/updateState',
            payload: {
                addOrEditFormVisible: false,
                addOrEditButtonLoading: false,
                addOrEditFormData: {},
                addOrEditFormActivityTransferAllContent: [],
                addOrEditFormAdminiTransferAllContent: [],//----------------------------------------------
                addOrEditFormGameTransferAllContent: [],
                addOrEditFormOfflineLeafletsTransferAllContent: [],
            }
        });
    }

    /*新增编辑表单微信活动穿梭框状态改变*/
    let addOrEditFormActivityTransferhandleChange = function (targetKeys, direction, moveKeys) {
        dispatch({
            type: 'weiXinMarketingPackage/updateState',
            payload: {
                addOrEditFormActivityTransferTargetContent: targetKeys,
            }
        });
    }

    /*新增编辑表单活管理穿梭框状态改变-----------------------------------------------------------------*/
    let addOrEditFormAdminiTransferhandleChange = function (targetKeys, direction, moveKeys) {
        dispatch({
            type: 'weiXinMarketingPackage/updateState',
            payload: {
                addOrEditFormAdminiTransferTargetContent: targetKeys,
            }
        });
        console.info(targetKeys, direction, moveKeys, "targetKeys, direction, moveKeys")
    }

    /*新增编辑表单微信游戏穿梭框状态改变*/
    let addOrEditFormGameTransferhandleChange = function (targetKeys, direction, moveKeys) {
        dispatch({
            type: 'weiXinMarketingPackage/updateState',
            payload: {
                addOrEditFormGameTransferTargetContent: targetKeys,
            }
        });
    }

    /*新增编辑线下传单游戏穿梭框状态改变*/
    let addOrEditFormOfflineLeafletsTransferhandleChange = function (targetKeys, direction, moveKeys) {
        dispatch({
            type: 'weiXinMarketingPackage/updateState',
            payload: {
                addOrEditFormOfflineLeafletsTransferTargetContent: targetKeys,
            }
        });
    }

    /*点击包含模版字段下的内容时弹窗*/
    let tableOnCheckModal = function (id) {
        dispatch({
            type: 'weiXinMarketingPackage/checkIncludingModal',
            payload: {
                id,
            }
        });
    }

    //更新微游戏过滤关键字
    function onGameModuleKeyWordFilter(keyWord) {
        dispatch({
            type: 'weiXinMarketingPackage/updateState',
            payload: {
                gameModuleFilterKeyWord: keyWord,
            }
        });
    }

    //变更选中微游戏模板数据
    function handleOnGameModuleConfigChange(eventType, eventData) {
        dispatch({
            type: 'weiXinMarketingPackage/handleOnGameModuleConfigChange',
            payload: {
                eventType, eventData
            }
        });
    }

    /*选中所有的  限制人数*/
    function handleSelectAllLimitNum(currentListKeys) {
        dispatch({
            type: 'weiXinMarketingPackage/handleSelectAllLimitNum',
            payload: {
                currentListKeys
            }
        });
    }

        /*选中所有的  不限制人数*/
    function handleSelectAllNoLimitNum(currentListKeys) {
        dispatch({
            type: 'weiXinMarketingPackage/handleSelectAllNoLimitNum',
            payload: {
                currentListKeys
            }
        });
    }

        /*选中所有的  开通社交图谱*/
    function handleSelectAllLimitEcharts(currentListKeys) {
        dispatch({
            type: 'weiXinMarketingPackage/handleSelectAllLimitEcharts',
            payload: {
                currentListKeys
            }
        });
    }

    /*包含模板数弹窗关闭*/
    let checkModalNoModalCancel = function () {
        dispatch({
            type: 'weiXinMarketingPackage/updateState',
            payload: {
                checkModalVisible: false,
            }
        });
    }

    let marketingPackageSearchProps = {
        searchReset,
        searchSubmit,
    }

    /*营销套餐列表属性*/
    let marketingPackageListProps = {
        loading,
        total,
        list,
        tableOnChange,
        tableOnEditItem,

        tableOnCheckModal,
        tableOnCreate,
        tableOnFilter,
        tableWeiXinPackageUp,
        tableWeiXinPackageDown,
        tableWeiXinPackageUpdateBuyRecord,      //更新购买记录
    }

    /*查看模板数量弹窗属性*/
    let marketingPackageCheckModalNoModalProps = {
        checkModalNoDefaultExpandedKeys,
        checkModalContent,
        checkModalVisible,
        checkModalNoModalCancel,
    }

    /*新增编辑表单属性*/
    let marketingPackageAddOrEditModalProps = {
        dispatch,
        selectData,
        isSelectAllLimitNum,
        isSelectAllLimit,
        isSelectAllChartBox,
        selectLimitNumBoxNum,
        selectChartBoxNum,
        allPrivilegeNum,
        selectedRowKeys,
        addOrEditFormType,
        addOrEditFormVisible,
        addOrEditFormData,
        addOrEditButtonLoading,
        addOrEditFormActivityTransferAllContent,
        addOrEditFormActivityTransferTargetContent,
        addOrEditFormAdminiTransferAllContent,//-------------------------------------------------
        addOrEditFormAdminiTransferTargetContent,//--------------------------------------------------
        addOrEditFormGameTransferAllContent,
        addOrEditFormGameTransferTargetContent,
        gameModuleFilterKeyWord,
        onGameModuleKeyWordFilter,handleOnGameModuleConfigChange,

        handleSelectAllLimitNum,//选中所有  限制人数
        handleSelectAllNoLimitNum,//选中所有  不限制人数
        handleSelectAllLimitEcharts,//选中所有  开通社交图谱


        addOrEditFormOfflineLeafletsTransferAllContent,
        addOrEditFormOfflineLeafletsTransferTargetContent,
        addOrEditModalSubmit,
        addOrEditModalCancel,
        addOrEditFormActivityTransferhandleChange,
        addOrEditFormAdminiTransferhandleChange,//------------------------------------------------
        addOrEditFormGameTransferhandleChange,
        addOrEditFormOfflineLeafletsTransferhandleChange,
        selectedLimitYFun,//已选限制
        selectedLimitNFun,//已选不限制
        selectedLimitY,//已选限制
        selectedLimitN,//已选不限制
        numValueFun,
        numValue,
        selectedChartFun,
        selectedChart,
        limityIndexFun,
        text,
        chartLimit,
        stateVue,
        attrDataLimit
    }

    return (
        <div>
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
                {searchVisible ? [
                    <MarketingPackageSearch {...marketingPackageSearchProps} key="search_queue_weixinFlyer" />
                ] : null}
            </QueueAnim>
            <MarketingPackageList {...marketingPackageListProps} />
            <MarketingPackageCheckModalNoModal {...marketingPackageCheckModalNoModalProps} />
            {addOrEditFormVisible == true ? <MarketingPackageAddOrEditModal {...marketingPackageAddOrEditModalProps} /> : null}
        </div>
    );
}

function mapStateToProps({ weiXinMarketingPackage }) {
    return { weiXinMarketingPackage };
}

export default connect(mapStateToProps)(WeiXinMarketingPackage);
