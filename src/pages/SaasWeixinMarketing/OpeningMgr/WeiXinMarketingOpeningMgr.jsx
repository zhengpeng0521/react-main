import React, { PropTypes } from 'react';
import { Tabs, Icon } from 'antd';

import OpeningMgrSearch from '../../../components/SaasWeixinMarketing/saas-weixin-market-opening-mgr/OpeningMgrSearch';
import OpeningMgrList from '../../../components/SaasWeixinMarketing/saas-weixin-market-opening-mgr/OpeningMgrList';
import OpeningMgrCheckModalNoModal from '../../../components/SaasWeixinMarketing/saas-weixin-market-opening-mgr/OpeningMgrCheckModalNoModal';
import OpeningAddPackageModal from '../../../components/SaasWeixinMarketing/saas-weixin-market-opening-mgr/OpeningAddPackageModal';
import OpeningAddTemplateModal from '../../../components/SaasWeixinMarketing/saas-weixin-market-opening-mgr/OpeningAddTemplateModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';
import qs from 'qs';

import styles from './WeiXinMarketingOpeningMgr.less';

const TabPane = Tabs.TabPane;

/*开通(套餐/模板)管理*/
function WeiXinMarketingOpeningMgr({ dispatch, weiXinMarketingOpeningMgr }) {

    let {
        pageSize,
        pageIndex,
        isSelectAllLimitNum,
        isSelectAllLimit,
        isSelectAllChartBox,
        selectLimitNumBoxNum,
        selectChartBoxNum,
        allPrivilegeNum,
        searchVisible,              //搜索框是否显示
        searchData,                 //搜索框查询内容

        loading,                    //列表加载状态
        total,                      //列表项目总数
        list,                       //列表项目内容

        checkModalVisible,          //点击'包含模版'下内容是弹窗是否显示
        checkModalContent,                  //点击'包含模版'获取到的值
        checkModalNoDefaultExpandedKeys,        //查看模板数量默认树状展示

        addPackageModalVisible,                 //开通套餐模态框是否展示
        addPackageModalButtonLoading,           //开通套餐模态框按钮加载状态
        addPackageModalSelectContent,           //开通套餐套餐下拉列表数据
        addPackageModalTransferAllcontent,      //开通套餐模态框穿梭框左边数据
        addPackageModalTransferTargetContent,   //开通套餐模态框穿梭框右边数据

        addTemplateModalVisible,                    //开通模板模态框是否展示
        addTemplateModalButtonLoading,              //开通模板模态框按钮加载状态

        addTemplateModalActivityTransferAllcontent,     //微信活动模板穿梭框左边数据
        addTemplateModalActivityTransferTargetContent,  //微信活动模板穿梭框右边数据
        addTemplateModalAdminiTransferAllcontent,     //微信活动模板穿梭框左边数据---------------
        addTemplateModalAdminiTransferTargetContent,  //微信活动模板穿梭框右边数据---------------
        addTemplateModalGameTransferAllcontent,         //微信游戏模板穿梭框左边数据
        addTemplateModalGameTransferTargetContent,      //微信游戏模板穿梭框右边数据
        gameModuleFilterKeyWord,

		addTemplateModalOfflineLeafletsTransferAllcontent,         //线下传单模板穿梭框左边数据
        addTemplateModalOfflineLeafletsTransferTargetContent,      //线下传单模板穿梭框右边数据
        addTemplateModalOrgTransferAllcontent,          //开通模板模态框机构选择穿梭框左边数据
        addTemplateModalOrgTransferTargetContent,       //开通模板模态框机构选择穿梭框右边数据
        selectData,
        tenantSearchType,                               //机构搜索方式(0按机构和机构手机号/1按租户查询)
        tenantSelectVisible,                            //租户搜索下拉列表是否显示
        tenantSelectContent,                            //租户搜索下拉列表内容
        selectedLimitY,//已选限制
        selectedLimitN,//已选不限制
        numValue,
        selectedChart,
        text,
        chartLimit,
        stateVue,
    } = weiXinMarketingOpeningMgr;

    /*搜索框点击搜索*/
    let searchSubmit = function(data){
        dispatch({
            type:'weiXinMarketingOpeningMgr/showMarketingOpeningMgrList',
            payload:{
                ...data,
                pageSize,
                pageIndex : 0,
            }
        });
    }

    /*搜索框点击清除*/
    let searchReset = function(){
        dispatch({
            type:'weiXinMarketingOpeningMgr/showMarketingOpeningMgrList',
            payload:{
                pageSize,
                pageIndex : 0,
            }
        });
    }

    /*列表状态改变*/
    let tableOnChange = function(pagination, filters, sorter){
        dispatch({
            type: 'weiXinMarketingOpeningMgr/showMarketingOpeningMgrList',
            payload: {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
                ...searchData
            },
        });
    }

    function limityIndexFun(index, key, e) {
        let selectLimitNumBoxNum = 0, selectChartBoxNum = 0, isSelectAllLimitNum, isSelectAllLimit, isSelectAllChartBox;
        console.info('点击事件:', index, key, e);
        console.info('selectData', selectData);
        if (key === 'isLimit') {
            addTemplateModalGameTransferAllcontent[index].isLimit = !addTemplateModalGameTransferAllcontent[index].isLimit;
        }
        else if (key === 'limitNum') {
            addTemplateModalGameTransferAllcontent[index].limitNum = e;
        }
        else if (key === 'chart') {
            addTemplateModalGameTransferAllcontent[index].chart = !addTemplateModalGameTransferAllcontent[index].chart;
            console.info(index)
            dispatch({
                type: 'weiXinMarketingOpeningMgr/updateState',
                payload: {
                    chartLimit: (chartLimit + 1),
                    addTemplateModalGameTransferAllcontent,
                }
            });
        }
        for (const item of addTemplateModalGameTransferAllcontent) {
            if (item.isLimit === false) selectLimitNumBoxNum += 1;
            if (item.chart === true) selectChartBoxNum += 1;
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
            type: 'weiXinMarketingOpeningMgr/updateState',
            payload: {
                addTemplateModalGameTransferAllcontent,
                isSelectAllLimitNum,
                isSelectAllLimit,
                isSelectAllChartBox,
                selectLimitNumBoxNum,
                selectChartBoxNum,
                allPrivilegeNum
            }
        });

    }


    function selectedLimitYFun(key,e) {
                // let selectLimitNumBoxNum = 0, selectChartBoxNum = 0, isSelectAllLimitNum1, isSelectAllLimit1, isSelectAllChartBox1;
        if (key === 'limitNum') {
            if (isSelectAllLimitNum === true) {
                console.log('限制人数不选中');

                //不限制人数应该全部勾选
                for (let item of addTemplateModalGameTransferAllcontent) {
                    if (item.hasOwnProperty('chart')) item.isLimit = true;
                }
                isSelectAllLimitNum = false;
                isSelectAllLimit = true;
                selectLimitNumBoxNum = 0;
            }
            else {
                //限制人数应该勾选
                for (let item of addTemplateModalGameTransferAllcontent) {
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
                for (let item of addTemplateModalGameTransferAllcontent) {
                    if (item.hasOwnProperty('chart')) item.isLimit = false;
                }
                isSelectAllLimitNum = true;
                isSelectAllLimit = false;
                selectLimitNumBoxNum = allPrivilegeNum;
            }
            else {
                //不限制人数应该勾选
                for (let item of addTemplateModalGameTransferAllcontent) {
                    if (item.hasOwnProperty('chart')) item.isLimit = true;
                }
                isSelectAllLimitNum = false;
                isSelectAllLimit = true;
                selectLimitNumBoxNum = 0;
            }
        }
        else if (key === 'chart') {
            if (isSelectAllChartBox === false){
                for (let item of addTemplateModalGameTransferAllcontent) {
                    if (item.hasOwnProperty('chart')) item.chart = true;
                }
                isSelectAllChartBox = true;
                selectChartBoxNum = allPrivilegeNum;
            }
            else{
                for (let item of addTemplateModalGameTransferAllcontent) {
                    if (item.hasOwnProperty('chart')) item.chart = false;
                }
                isSelectAllChartBox = false;
                selectChartBoxNum = 0;
            }
        }

        dispatch({
            type: 'weiXinMarketingOpeningMgr/updateState',
            payload: {
                addTemplateModalGameTransferAllcontent,
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
            for (const item of addTemplateModalGameTransferAllcontent) {
                if (item.hasOwnProperty('isLimit')) {
                    //                    console.log('2', item);
                    item.isLimit = e[0] === '2' ? true : false;
                }
            }
        }
        dispatch({
            type: 'weiXinMarketingOpeningMgr/updateState',
            payload: {
                addTemplateModalGameTransferAllcontent
            }
        });
    }

    function numValueFun() {
        dispatch({
            type: 'weiXinMarketingOpeningMgr/updateState',
            payload: {
                numValue: 4,
            }
        });
    }
    function selectedChartFun(key, e) {
//        console.log(key, e.target.options[0].value);
        if (key === 'chart') {
//            console.log('11111111', addTemplateModalGameTransferAllcontent);
            for (const item of addTemplateModalGameTransferAllcontent) {
                if (item.hasOwnProperty('chart')) {
//                    console.log('2', item);
                    item.chart = e[0] === '1' ? true : false;
                }
            }
        }
        dispatch({
            type: 'weiXinMarketingOpeningMgr/updateState',
            payload: {
                addTemplateModalGameTransferAllcontent,
            }
        });
    }


    /*按查询结果导出*/
    let exportTableContent = function (){
        window.open(`${BASE_URL}/mealOpening/exportMealOpeningList?${qs.stringify(searchData)}`)
    }

    /*列表点击模版数量查看模板*/
    let tableOnCheckModal = function(id){
        dispatch({
            type:'weiXinMarketingOpeningMgr/checkIncludingModal',
            payload:{
                id,
            }
        });
    }


    /*关闭查看模板模态框*/
    let checkModalNoModalCancel = function(){
        dispatch({
            type:'weiXinMarketingOpeningMgr/updateState',
            payload:{
                checkModalVisible : false,
            }
        });
    }

    /*开通模板*/
        /*点击开通模板*/
        let tableOnCreateTemplate = function(){
            dispatch({
                type:'weiXinMarketingOpeningMgr/openOpenTempalteModal',
            });
        }

        /*查询机构信息*/
        let addTemplateModalSearchOrgName = function(value){
            let type = 'template';
            dispatch({
                type:'weiXinMarketingOpeningMgr/searchOrgMessage',
                payload:{
                    nameOrMobile : value,
                    type
                }
            });
        }

        /*关闭开通套餐模板modal*/
        let addTemplateModalCancel = function(){
            dispatch({
                type:'weiXinMarketingOpeningMgr/updateState',
                payload:{
                    addTemplateModalVisible : false,
                    addTemplateModalButtonLoading : false,
                    tenantSearchType : '1',
                    tenantSelectVisible : false,                         //租户搜索下拉列表是否显示
                    tenantSelectContent : [],                            //租户搜索下拉列表内容
                    addTemplateModalOrgTransferAllcontent : [],
                    addTemplateModalOrgTransferTargetContent : [],
                }
            });
        }

        /*开通模板选择机构穿梭框状态改变*/
        let addTemplateModalOrgTransferhandleChange = function(targetKeys, direction, moveKeys){
            dispatch({
                type:'weiXinMarketingOpeningMgr/updateState',
                payload:{
                    addTemplateModalOrgTransferTargetContent : targetKeys,
                }
            });
        }

        /*开通模板选择微信活动模板穿梭框状态改变*/
        let addTemplateModalActivityTransferhandleChange = function(targetKeys, direction, moveKeys){
            dispatch({
                type:'weiXinMarketingOpeningMgr/updateState',
                payload:{
                    addTemplateModalActivityTransferTargetContent : targetKeys,
                }
            });
        }


          /*开通模板选择微信活动模板穿梭框状态改变----------------------------------------------------------------*/
        let addTemplateModalAdminiTransferhandleChange = function(targetKeys, direction, moveKeys){
            dispatch({
                type:'weiXinMarketingOpeningMgr/updateState',
                payload:{
                    addTemplateModalAdminiTransferTargetContent : targetKeys,
                }
            });
        }

        /*开通模板选择微信游戏模板穿梭框状态改变*/
        let addTemplateModalGameTransferhandleChange = function(targetKeys, direction, moveKeys){
            dispatch({
                type:'weiXinMarketingOpeningMgr/updateState',
                payload:{
                    addTemplateModalGameTransferTargetContent : targetKeys,
                }
            });
        }
		     
		/*开通模板选择线下传单模板穿梭框状态改变*/
        let addTemplateModalOfflineLeafletsTransferhandleChange = function(targetKeys, direction, moveKeys){
            dispatch({
                type:'weiXinMarketingOpeningMgr/updateState',
                payload:{
                    addTemplateModalOfflineLeafletsTransferTargetContent : targetKeys,
                }
            });
        }

        /*开通模板表单提交*/
        let addTemplateModalSubmit = function(data){
            dispatch({
                type:'weiXinMarketingOpeningMgr/updateState',
                payload:{
                    addTemplateModalButtonLoading : true,
                }
            });
            dispatch({
                type:'weiXinMarketingOpeningMgr/addTemplateModalSubmit',
                payload:{
                    ...data,
                }
            });
        }


    /*开通套餐*/
        /*点击开通套餐获取下拉列表并且使模态框显示*/
        let tableOnCreatePackage = function(){
            dispatch({
                type:'weiXinMarketingOpeningMgr/openOpenPackageModalPackage',
                payload:{
                    status:1,
                    pageIndex:0,
                    pageSize:10000,
                }
            });
        }

        /*关闭开通套餐模板modal*/
        let addPackageModalCancel = function(){
            dispatch({
                type:'weiXinMarketingOpeningMgr/updateState',
                payload:{
                    addPackageModalVisible : false,
                    addPackageModalButtonLoading : false,
                    tenantSearchType : '1',
                    tenantSelectVisible : false,                         //租户搜索下拉列表是否显示
                    tenantSelectContent : [],                            //租户搜索下拉列表内容
                    addPackageModalTransferAllcontent : [],
                    addPackageModalTransferTargetContent : [],
                }
            });
        }

        //选择搜索方式onChange事件
        let ChooseQueryType = function(value){
            dispatch({
                type: 'weiXinMarketingOpeningMgr/updateState',
                payload: {
                    tenantSearchType : value,
                    tenantSelectVisible : false,
                    tenantSelectContent : [],     //租户下拉列表数据
                    addPackageModalTransferAllcontent : [],
                    addPackageModalTransferTargetContent : [],
                    addTemplateModalOrgTransferAllcontent : [],          //开通模板模态框机构选择穿梭框左边数据
                    addTemplateModalOrgTransferTargetContent : [],       //开通模板模态框机构选择穿梭框右边数据
                },
            });
        }

        /*搜索租户列表*/
        let SearchTenant = function(id,name,tel){
            dispatch({
                type: 'weiXinMarketingOpeningMgr/GetTenantDetail',
                payload: {
                    id,
                    name,
                    tel,
                    pageIndex : 0,
                    pageSize : 99999,
                },
            });
        }

        /*选择租户并查询租户下所有机构*/
        let ChooseTenant = function(id){
            dispatch({
                type: 'weiXinMarketingOpeningMgr/GetOrgByTenantId',
                payload: {
                    id
                }
            });
        }

        /*机构搜索点击搜索事件*/
        let addPackageModalSearchOrgName = function(value){
            let type = 'package';
            dispatch({
                type:'weiXinMarketingOpeningMgr/searchOrgMessage',
                payload:{
                    nameOrMobile : value,
                    type,
                }
            });
        }

        /*开通套餐穿梭框状态改变*/
        let addPackageModalTransferhandleChange = function(targetKeys, direction, moveKeys){
            dispatch({
                type:'weiXinMarketingOpeningMgr/updateState',
                payload:{
                    addPackageModalTransferTargetContent : targetKeys,
                }
            });
        }

        /*开通套餐查看类型*/
        let addPackageModalCheckPackageType = function(id){
            dispatch({
                type:'weiXinMarketingOpeningMgr/addPackageModalCheckPackageType',
                payload:{
                    id,
                }
            });
        }

        /*开通套餐表单提交*/
        let addPackageModalSubmit = function(data){
            dispatch({
                type:'weiXinMarketingOpeningMgr/updateState',
                payload:{
                    addPackageModalButtonLoading : true,
                }
            });
            dispatch({
                type:'weiXinMarketingOpeningMgr/addPackageModalSubmit',
                payload:{
                    ...data,
                }
            });
        }

    /*点击筛选*/
    let tableOnFilter = function(){
        dispatch({
            type:'weiXinMarketingOpeningMgr/updateState',
            payload:{
                searchVisible : !searchVisible,
            }
        });
    }

            //更新微游戏过滤关键字
    function onGameModuleKeyWordFilter(keyWord) {
        dispatch({
            type: 'weiXinMarketingOpeningMgr/updateState',
            payload: {
                gameModuleFilterKeyWord: keyWord,
            }
        });
    }

    //变更选中微游戏模板数据
    function handleOnGameModuleConfigChange(eventType, eventData) {
        dispatch({
            type: 'weiXinMarketingOpeningMgr/handleOnGameModuleConfigChange',
            payload: {
                eventType, eventData
            }
        });
    }

    /*选中所有的  限制人数*/
    function handleSelectAllLimitNum(currentListKeys) {
        dispatch({
            type: 'weiXinMarketingOpeningMgr/handleSelectAllLimitNum',
            payload: {
                currentListKeys
            }
        });
    }

        /*选中所有的  不限制人数*/
    function handleSelectAllNoLimitNum(currentListKeys) {
        dispatch({
            type: 'weiXinMarketingOpeningMgr/handleSelectAllNoLimitNum',
            payload: {
                currentListKeys
            }
        });
    }

        /*选中所有的  开通社交图谱*/
    function handleSelectAllLimitEcharts(currentListKeys) {
        dispatch({
            type: 'weiXinMarketingOpeningMgr/handleSelectAllLimitEcharts',
            payload: {
                currentListKeys
            }
        });
    }

    /*搜索栏属性*/
    let openingMgrSearchProps = {
        searchSubmit,
        searchReset,
    }

    /*列表属性*/
    let openingMgrListProps = {
        loading,
        total,
        list,
        tableOnChange,
        tableOnCheckModal,
        tableOnCreateTemplate,
        tableOnCreatePackage,
        tableOnFilter,
        exportTableContent,
    }

    /*查看模板弹窗属性*/
    let openingMgrCheckModalNoModalProps = {
        checkModalVisible,
        checkModalContent,
        checkModalNoDefaultExpandedKeys,
        checkModalNoModalCancel,
    }

    /*开通套餐模态框属性*/
    let openingAddPackageModalProps = {
        addPackageModalVisible,
        addPackageModalButtonLoading,
        addPackageModalSelectContent,
        addPackageModalTransferAllcontent,
        addPackageModalTransferTargetContent,
        tenantSearchType,                           //机构搜索方式(0按机构和机构手机号/1按租户查询)
        tenantSelectVisible,                        //租户搜索下拉列表是否显示
        tenantSelectContent,                        //租户搜索下拉列表内容

        addPackageModalCancel,
        addPackageModalTransferhandleChange,
        addPackageModalCheckPackageType,
        addPackageModalSubmit,
        addPackageModalSearchOrgName,
        ChooseQueryType,                            //选择搜索方式onChange事件
        SearchTenant,                               //搜索租户列表
        ChooseTenant,                               //选择租户并查询租户下所有机构
    }

    /*开通模板模态框属性*/
    let openingAddTemplateModalProps = {
        dispatch,
        selectData,
        isSelectAllLimitNum,
        isSelectAllLimit,
        isSelectAllChartBox,
        selectLimitNumBoxNum,
        selectChartBoxNum,
        allPrivilegeNum,
        addTemplateModalVisible,
        addTemplateModalButtonLoading,
        addTemplateModalActivityTransferAllcontent,
        addTemplateModalActivityTransferTargetContent,
        addTemplateModalAdminiTransferAllcontent,//--------------------------------------
        addTemplateModalAdminiTransferTargetContent,//-------------------------------
        addTemplateModalGameTransferAllcontent,
        addTemplateModalGameTransferTargetContent,
        gameModuleFilterKeyWord,
        onGameModuleKeyWordFilter,handleOnGameModuleConfigChange,

        handleSelectAllLimitNum,//选中所有  限制人数
        handleSelectAllNoLimitNum,//选中所有  不限制人数
        handleSelectAllLimitEcharts,//选中所有  开通社交图谱

		addTemplateModalOfflineLeafletsTransferAllcontent,
		addTemplateModalOfflineLeafletsTransferTargetContent,
		
        addTemplateModalOrgTransferAllcontent,
        addTemplateModalOrgTransferTargetContent,
        tenantSearchType,                           //机构搜索方式(0按机构和机构手机号/1按租户查询)
        tenantSelectVisible,                        //租户搜索下拉列表是否显示
        tenantSelectContent,                        //租户搜索下拉列表内容

        addTemplateModalCancel,
        addTemplateModalOrgTransferhandleChange,
        addTemplateModalActivityTransferhandleChange,
        addTemplateModalAdminiTransferhandleChange,//---------------------------------------
        addTemplateModalGameTransferhandleChange,
		addTemplateModalOfflineLeafletsTransferhandleChange,
        addTemplateModalSubmit,
        addTemplateModalSearchOrgName,
        ChooseQueryType,                            //选择搜索方式onChange事件
        SearchTenant,                               //搜索租户列表
        ChooseTenant,                               //选择租户并查询租户下所有机构

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
        selectData,
        stateVue,
    }

    return (
        <div>
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
                {searchVisible ? [
                   <OpeningMgrSearch {...openingMgrSearchProps} key="search_queue_openingMgrSearch"/>
                ]:null}
            </QueueAnim>
            <OpeningMgrList {...openingMgrListProps}/>
            { checkModalVisible == true? <OpeningMgrCheckModalNoModal {...openingMgrCheckModalNoModalProps} /> : null}
            { addPackageModalVisible == true ? <OpeningAddPackageModal {...openingAddPackageModalProps} /> : null}
            { addTemplateModalVisible == true ? <OpeningAddTemplateModal {...openingAddTemplateModalProps} /> : null}
        </div>
  );
}


function mapStateToProps({ weiXinMarketingOpeningMgr }) {
  return { weiXinMarketingOpeningMgr };
}

export default connect(mapStateToProps)(WeiXinMarketingOpeningMgr);
