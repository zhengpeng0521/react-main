import React, { PropTypes } from 'react';
import WeiXinActivityTopChart from '../../../components/DataMgr/weixinyingxiao/weiXinActivity/WeiXinActivityTopChart';
import WeiXinActivitySearchContent from '../../../components/DataMgr/weixinyingxiao/weiXinActivity/WeiXinActivitySearch'
import WeiXinActivityBottomChart from '../../../components/DataMgr/weixinyingxiao/weiXinActivity/WeiXinActivityBottomChart';

import WeiXinFlyerTopChart from '../../../components/DataMgr/weixinyingxiao/weiXinFlyer/weiXinFlyerTopChart';
import WeiXinFlyerSearchContent from '../../../components/DataMgr/weixinyingxiao/weiXinFlyer/weiXinFlyerSearch';
import WeiXinFlyerBottomChart from '../../../components/DataMgr/weixinyingxiao/weiXinFlyer/weiXinFlyerBottomChart';

import WeiXinGameTopChart from '../../../components/DataMgr/weixinyingxiao/weiXinGame/weiXinGameTopChart';
import WeiXinGameSearchContent from '../../../components/DataMgr/weixinyingxiao/weiXinGame/weiXinGameSearch';
import WeiXinGameBottomChart from '../../../components/DataMgr/weixinyingxiao/weiXinGame/weiXinGameBottomChart';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';

import { Tabs, Icon, message } from 'antd';
const TabPane = Tabs.TabPane;

import styles from './DataMgr.less';

function DataMgr({ dispatch, weiXinYingXiao }) {

    let {
        /*微信活动*/
        WeiXinActivityTopRadioChoose,         //微信活动上方数据总揽的默认进入页面为浏览数
        WeiXinActivityTopBarSpin,             //微信活动上方图表是否处于加载中
        WeiXinActivityTopBarContent,          //微信活动上方图表所有数据

        WeiXinActivityBottomBarSpin,          //微信活动下方图表是否处于加载中
        WeiXinActivityBottomBarTitle,         //微信活动下方图表名称

        WeiXinActivityDefinedTime,            //微信活动下方自定义时间
        WeiXinActivityBottomLeftRadioChoose,  //微信活动下左的默认进入页面为浏览数
        WeiXinActivityBottomRightRadioChoose, //微信活动下右默认进入页面为近7日
        WeiXinActivitySelectValue,            //微信活动下拉列表数据
        WeiXinActivityGameId,                 //微信活动下拉列表中每个游戏的ID
        WeiXinActivityBottomBarContent,       //微信活动下方图表数据

        /*微信传单*/
        WeiXinFlyerTopRadioChoose,         //微信活动上方数据总揽的默认进入页面为浏览数
        WeiXinFlyerTopBarSpin,             //微信活动上方图表是否处于加载中
        WeiXinFlyerTopBarContent,          //微信活动上方图表所有数据

        WeiXinFlyerBottomBarSpin,          //微信活动下方图表是否处于加载中
        WeiXinFlyerBottomBarTitle,         //微信活动下方图表名称

        WeiXinFlyerDefinedTime,            //微信活动下方自定义时间
        WeiXinFlyerBottomLeftRadioChoose,  //微信活动下左的默认进入页面为浏览数
        WeiXinFlyerBottomRightRadioChoose, //微信活动下右默认进入页面为近7日
        WeiXinFlyerSelectValue,            //微信活动下拉列表数据
        WeiXinFlyerGameId,                 //微信活动下拉列表中每个游戏的ID
        WeiXinFlyerBottomBarContent,       //微信活动下方图表数据

        /*微信游戏*/
        WeiXinGameTopRadioChoose,         //微信活动上方数据总揽的默认进入页面为浏览数
        WeiXinGameTopBarSpin,             //微信活动上方图表是否处于加载中
        WeiXinGameTopBarContent,          //微信活动上方图表所有数据

        WeiXinGameBottomBarSpin,          //微信活动下方图表是否处于加载中
        WeiXinGameBottomBarTitle,         //微信活动下方图表名称

        WeiXinGameDefinedTime,            //微信活动下方自定义时间
        WeiXinGameBottomLeftRadioChoose,  //微信活动下左的默认进入页面为浏览数
        WeiXinGameBottomRightRadioChoose, //微信活动下右默认进入页面为近7日
        WeiXinGameSelectValue,            //微信活动下拉列表数据
        WeiXinGameGameId,                 //微信活动下拉列表中每个游戏的ID
        WeiXinGameBottomBarContent,       //微信活动下方图表数据

        status,                               //下方数据趋势暂时未做好，用来隐藏下部分组件
    } = weiXinYingXiao;

    /*微信活动*/
        /*微信活动上方类型Radio选择*/
        let WeiXinActivityChangeTopRadioValue = function(data){
            dispatch({
                type:'weiXinYingXiao/showWeiXinActivityTopAllData',
                payload:{
                    categoryId : '1',
                    statisType : data.target.value,
                }
            });
        }

        /*微信活动游戏类型(下拉列表)选择*/
        function WeiXinActivityGameChangeSelect(modelId){
            let title = '';
            for(let i = 0 ; i < WeiXinActivitySelectValue.length ; i++){
                if(modelId == WeiXinActivitySelectValue[i].id){
                    title = WeiXinActivitySelectValue[i].title;
                    break;
                }
            }
            if(WeiXinActivityDefinedTime.startTime == ''||WeiXinActivityDefinedTime.startTime == undefined||WeiXinActivityDefinedTime.startTime == null){
                dispatch({
                    type:'weiXinYingXiao/showWeiXinActivityBottomAllData',
                    payload:{
                        modelId,                                                 //游戏ID
                        statisType : WeiXinActivityBottomLeftRadioChoose,        //游戏展示数据类型(浏览数等)
                        WeiXinActivityBottomBarTitle : title,                    //游戏标题
                        selectDay : WeiXinActivityBottomRightRadioChoose,        //未指定自定义时间时选择默认时间(7天/30天)
                    }
                });
            }else{
                dispatch({
                    type:'weiXinYingXiao/showWeiXinActivityBottomAllData',
                    payload:{
                        modelId,                                                 //游戏ID
                        statisType : WeiXinActivityBottomLeftRadioChoose,        //游戏展示数据类型(浏览数等)
                        WeiXinActivityBottomBarTitle : title,                    //游戏标题
                        ...WeiXinActivityDefinedTime,                            //自定义时间
                    }
                });
            }
        }

        /*微信活动自定义时间选择*/
        let WeiXinActicityTimeOnSelectSubmit = function(time){
            let title = '';
            for(let i = 0 ; i < WeiXinActivitySelectValue.length ; i++){
                if(WeiXinActivityGameId == WeiXinActivitySelectValue[i].id){
                    title = WeiXinActivitySelectValue[i].title;
                    break;
                }
            }
            if('' != time.startTime){                                      //因为自定义时间startTime和endTime同时存在同时消失，所以只判断一个就可以
                dispatch({
                    type:'weiXinYingXiao/showWeiXinActivityBottomAllData',
                    payload:{
                        modelId : WeiXinActivityGameId,                    //游戏ID
                        statisType : WeiXinActivityBottomLeftRadioChoose,  //游戏展示数据类型(浏览数等)
                        WeiXinActivityBottomBarTitle : title,              //游戏标题
                        ...time,                                           //自定义时间
                    }
                });
            }else if('' == WeiXinActivityBottomRightRadioChoose){          //如果是时间搜索框清空操作，并且下方未指定7天/30天的时，默认是清空时指定7天，否则不做处理
                dispatch({
                    type:'weiXinYingXiao/showWeiXinActivityBottomAllData',
                    payload:{
                        modelId : WeiXinActivityGameId,                    //游戏ID
                        statisType : WeiXinActivityBottomLeftRadioChoose,  //游戏展示数据类型(浏览数等)
                        WeiXinActivityBottomBarTitle : title,              //游戏标题
                        selectDay : '7',                                   //如果简易搜索时间未指定，则默认7天，否则按指定来
                    }
                });
            }
        }

        /*微信活动左下方类型Radio选择*/
        let WeiXinActivityChangeBottomLeftRadioValue = function(data){
            let title = '';
            for(let i = 0 ; i < WeiXinActivitySelectValue.length ; i++){
                if(WeiXinActivityGameId==WeiXinActivitySelectValue[i].id){
                    title = WeiXinActivitySelectValue[i].title;
                    break;
                }
            }
            if(WeiXinActivityDefinedTime.startTime == ''||WeiXinActivityDefinedTime.startTime == undefined||WeiXinActivityDefinedTime.startTime == null){
                dispatch({
                    type:'weiXinYingXiao/showWeiXinActivityBottomAllData',
                    payload:{
                        modelId : WeiXinActivityGameId,                    //游戏ID
                        statisType : data.target.value,                    //游戏展示数据类型(浏览数等)
                        WeiXinActivityBottomBarTitle : title,              //游戏标题
                        selectDay : WeiXinActivityBottomRightRadioChoose,  //未指定自定义时间时选择默认时间(7天/30天)
                    }
                });
            }else{
                dispatch({
                    type:'weiXinYingXiao/showWeiXinActivityBottomAllData',
                    payload:{
                        modelId : WeiXinActivityGameId,              //游戏ID
                        statisType : data.target.value,              //游戏展示数据类型(浏览数等)
                        WeiXinActivityBottomBarTitle : title,        //游戏标题
                        ...WeiXinActivityDefinedTime,                //自定义时间
                    }
                });
            }
        }

        /*微信活动右下方时间区间Radio选择*/
        let WeiXinActivityChangeBottomRightRadioValue = function(data){
            let title = '';
            for(let i = 0 ; i < WeiXinActivitySelectValue.length ; i++){
                if(WeiXinActivityGameId == WeiXinActivitySelectValue[i].id){
                    title = WeiXinActivitySelectValue[i].title;
                    break;
                }
            }
            dispatch({
                type:'weiXinYingXiao/showWeiXinActivityBottomAllData',
                payload:{
                    modelId : WeiXinActivityGameId,                    //游戏ID
                    statisType : WeiXinActivityBottomLeftRadioChoose,  //游戏展示数据类型(浏览数等)
                    WeiXinActivityBottomBarTitle : title,              //游戏标题
                    selectDay : data.target.value,                     //选择时间
                }
            });
        }

    /*微信传单*/
        /*微信传单上方类型Radio选择*/
        let WeiXinFlyerChangeTopRadioValue = function(data){
            dispatch({
                type:'weiXinYingXiao/showWeiXinFlyerTopAllData',
                payload:{
                    categoryId : '2',
                    statisType : data.target.value,
                }
            });
        }

        /*微信传单游戏类型(下拉列表)选择*/
        function WeiXinFlyerGameChangeSelect(modelId){
            let title = '';
            for(let i = 0 ; i < WeiXinFlyerSelectValue.length ; i++){
                if(modelId == WeiXinFlyerSelectValue[i].id){
                    title = WeiXinFlyerSelectValue[i].title;
                    break;
                }
            }
            if(WeiXinFlyerDefinedTime.startTime == ''||WeiXinFlyerDefinedTime.startTime == undefined||WeiXinFlyerDefinedTime.startTime == null){
                dispatch({
                    type:'weiXinYingXiao/showWeiXinFlyerBottomAllData',
                    payload:{
                        modelId,                                                 //游戏ID
                        statisType : WeiXinFlyerBottomLeftRadioChoose,        //游戏展示数据类型(浏览数等)
                        WeiXinFlyerBottomBarTitle : title,                    //游戏标题
                        selectDay : WeiXinFlyerBottomRightRadioChoose,        //未指定自定义时间时选择默认时间(7天/30天)
                    }
                });
            }else{
                dispatch({
                    type:'weiXinYingXiao/showWeiXinFlyerBottomAllData',
                    payload:{
                        modelId,                                                 //游戏ID
                        statisType : WeiXinFlyerBottomLeftRadioChoose,        //游戏展示数据类型(浏览数等)
                        WeiXinFlyerBottomBarTitle : title,                    //游戏标题
                        ...WeiXinFlyerDefinedTime,                            //自定义时间
                    }
                });
            }
        }

        /*微信传单自定义时间选择*/
        let WeiXinFlyerTimeOnSelectSubmit = function(time){
            let title = '';
            for(let i = 0 ; i < WeiXinFlyerSelectValue.length ; i++){
                if(WeiXinFlyerGameId == WeiXinFlyerSelectValue[i].id){
                    title = WeiXinFlyerSelectValue[i].title;
                    break;
                }
            }
            if('' != time.startTime){                                      //因为自定义时间startTime和endTime同时存在同时消失，所以只判断一个就可以
                dispatch({
                    type:'weiXinYingXiao/showWeiXinFlyerBottomAllData',
                    payload:{
                        modelId : WeiXinFlyerGameId,                    //游戏ID
                        statisType : WeiXinFlyerBottomLeftRadioChoose,  //游戏展示数据类型(浏览数等)
                        WeiXinFlyerBottomBarTitle : title,              //游戏标题
                        ...time,                                           //自定义时间
                    }
                });
            }else if('' == WeiXinFlyerBottomRightRadioChoose){          //如果是时间搜索框清空操作，并且下方未指定7天/30天的时，默认是清空时指定7天，否则不做处理
                dispatch({
                    type:'weiXinYingXiao/showWeiXinFlyerBottomAllData',
                    payload:{
                        modelId : WeiXinFlyerGameId,                    //游戏ID
                        statisType : WeiXinFlyerBottomLeftRadioChoose,  //游戏展示数据类型(浏览数等)
                        WeiXinFlyerBottomBarTitle : title,              //游戏标题
                        selectDay : '7',                                   //如果简易搜索时间未指定，则默认7天，否则按指定来
                    }
                });
            }
        }

        /*微信传单左下方类型Radio选择*/
        let WeiXinFlyerChangeBottomLeftRadioValue = function(data){
            let title = '';
            for(let i = 0 ; i < WeiXinFlyerSelectValue.length ; i++){
                if(WeiXinFlyerGameId==WeiXinFlyerSelectValue[i].id){
                    title = WeiXinFlyerSelectValue[i].title;
                    break;
                }
            }
            if(WeiXinFlyerDefinedTime.startTime == ''||WeiXinFlyerDefinedTime.startTime == undefined||WeiXinFlyerDefinedTime.startTime == null){
                dispatch({
                    type:'weiXinYingXiao/showWeiXinFlyerBottomAllData',
                    payload:{
                        modelId : WeiXinFlyerGameId,                    //游戏ID
                        statisType : data.target.value,                    //游戏展示数据类型(浏览数等)
                        WeiXinFlyerBottomBarTitle : title,              //游戏标题
                        selectDay : WeiXinFlyerBottomRightRadioChoose,  //未指定自定义时间时选择默认时间(7天/30天)
                    }
                });
            }else{
                dispatch({
                    type:'weiXinYingXiao/showWeiXinFlyerBottomAllData',
                    payload:{
                        modelId : WeiXinFlyerGameId,              //游戏ID
                        statisType : data.target.value,              //游戏展示数据类型(浏览数等)
                        WeiXinFlyerBottomBarTitle : title,        //游戏标题
                        ...WeiXinFlyerDefinedTime,                //自定义时间
                    }
                });
            }
        }

        /*微信传单右下方时间区间Radio选择*/
        let WeiXinFlyerChangeBottomRightRadioValue = function(data){
            let title = '';
            for(let i = 0 ; i < WeiXinFlyerSelectValue.length ; i++){
                if(WeiXinFlyerGameId == WeiXinFlyerSelectValue[i].id){
                    title = WeiXinFlyerSelectValue[i].title;
                    break;
                }
            }
            dispatch({
                type:'weiXinYingXiao/showWeiXinFlyerBottomAllData',
                payload:{
                    modelId : WeiXinFlyerGameId,                    //游戏ID
                    statisType : WeiXinFlyerBottomLeftRadioChoose,  //游戏展示数据类型(浏览数等)
                    WeiXinFlyerBottomBarTitle : title,              //游戏标题
                    selectDay : data.target.value,                     //选择时间
                }
            });
        }


     /*微信游戏*/
        /*微信游戏上方类型Radio选择*/
        let WeiXinGameChangeTopRadioValue = function(data){
            dispatch({
                type:'weiXinYingXiao/showWeiXinGameTopAllData',
                payload:{
                    categoryId : '3',
                    statisType : data.target.value,
                }
            });
        }

        /*微信游戏游戏类型(下拉列表)选择*/
        function WeiXinGameGameChangeSelect(modelId){
            let title = '';
            for(let i = 0 ; i < WeiXinGameSelectValue.length ; i++){
                if(modelId == WeiXinGameSelectValue[i].id){
                    title = WeiXinGameSelectValue[i].title;
                    break;
                }
            }
            if(WeiXinGameDefinedTime.startTime == ''||WeiXinGameDefinedTime.startTime == undefined||WeiXinGameDefinedTime.startTime == null){
                dispatch({
                    type:'weiXinYingXiao/showWeiXinGameBottomAllData',
                    payload:{
                        modelId,                                                 //游戏ID
                        statisType : WeiXinGameBottomLeftRadioChoose,        //游戏展示数据类型(浏览数等)
                        WeiXinGameBottomBarTitle : title,                    //游戏标题
                        selectDay : WeiXinGameBottomRightRadioChoose,        //未指定自定义时间时选择默认时间(7天/30天)
                    }
                });
            }else{
                dispatch({
                    type:'weiXinYingXiao/showWeiXinGameBottomAllData',
                    payload:{
                        modelId,                                                 //游戏ID
                        statisType : WeiXinGameBottomLeftRadioChoose,        //游戏展示数据类型(浏览数等)
                        WeiXinGameBottomBarTitle : title,                    //游戏标题
                        ...WeiXinGameDefinedTime,                            //自定义时间
                    }
                });
            }
        }

        /*微信游戏自定义时间选择*/
        let WeiXinGameTimeOnSelectSubmit = function(time){
            let title = '';
            for(let i = 0 ; i < WeiXinGameSelectValue.length ; i++){
                if(WeiXinGameGameId == WeiXinGameSelectValue[i].id){
                    title = WeiXinGameSelectValue[i].title;
                    break;
                }
            }
            if('' != time.startTime){                                      //因为自定义时间startTime和endTime同时存在同时消失，所以只判断一个就可以
                dispatch({
                    type:'weiXinYingXiao/showWeiXinGameBottomAllData',
                    payload:{
                        modelId : WeiXinGameGameId,                    //游戏ID
                        statisType : WeiXinGameBottomLeftRadioChoose,  //游戏展示数据类型(浏览数等)
                        WeiXinGameBottomBarTitle : title,              //游戏标题
                        ...time,                                           //自定义时间
                    }
                });
            }else if('' == WeiXinGameBottomRightRadioChoose){          //如果是时间搜索框清空操作，并且下方未指定7天/30天的时，默认是清空时指定7天，否则不做处理
                dispatch({
                    type:'weiXinYingXiao/showWeiXinGameBottomAllData',
                    payload:{
                        modelId : WeiXinGameGameId,                    //游戏ID
                        statisType : WeiXinGameBottomLeftRadioChoose,  //游戏展示数据类型(浏览数等)
                        WeiXinGameBottomBarTitle : title,              //游戏标题
                        selectDay : '7',                                   //如果简易搜索时间未指定，则默认7天，否则按指定来
                    }
                });
            }
        }

        /*微信游戏左下方类型Radio选择*/
        let WeiXinGameChangeBottomLeftRadioValue = function(data){
            let title = '';
            for(let i = 0 ; i < WeiXinGameSelectValue.length ; i++){
                if(WeiXinGameGameId==WeiXinGameSelectValue[i].id){
                    title = WeiXinGameSelectValue[i].title;
                    break;
                }
            }
            if(WeiXinGameDefinedTime.startTime == ''||WeiXinGameDefinedTime.startTime == undefined||WeiXinGameDefinedTime.startTime == null){
                dispatch({
                    type:'weiXinYingXiao/showWeiXinFlyerBottomAllData',
                    payload:{
                        modelId : WeiXinGameGameId,                    //游戏ID
                        statisType : data.target.value,                    //游戏展示数据类型(浏览数等)
                        WeiXinGameBottomBarTitle : title,              //游戏标题
                        selectDay : WeiXinGameBottomRightRadioChoose,  //未指定自定义时间时选择默认时间(7天/30天)
                    }
                });
            }else{
                dispatch({
                    type:'weiXinYingXiao/showWeiXinGameBottomAllData',
                    payload:{
                        modelId : WeiXinGameGameId,              //游戏ID
                        statisType : data.target.value,              //游戏展示数据类型(浏览数等)
                        WeiXinGameBottomBarTitle : title,        //游戏标题
                        ...WeiXinGameDefinedTime,                //自定义时间
                    }
                });
            }
        }

        /*微信游戏右下方时间区间Radio选择*/
        let WeiXinGameChangeBottomRightRadioValue = function(data){
            let title = '';
            for(let i = 0 ; i < WeiXinGameSelectValue.length ; i++){
                if(WeiXinGameGameId == WeiXinGameSelectValue[i].id){
                    title = WeiXinGameSelectValue[i].title;
                    break;
                }
            }
            dispatch({
                type:'weiXinYingXiao/showWeiXinGameBottomAllData',
                payload:{
                    modelId : WeiXinGameGameId,                    //游戏ID
                    statisType : WeiXinGameBottomLeftRadioChoose,  //游戏展示数据类型(浏览数等)
                    WeiXinGameBottomBarTitle : title,              //游戏标题
                    selectDay : data.target.value,                     //选择时间
                }
            });
        }

    /*微信活动*/
        let weiXinActivityTopChartProps = {
            WeiXinActivityTopRadioChoose,
            WeiXinActivityChangeTopRadioValue,
            WeiXinActivityTopBarSpin,
            WeiXinActivityTopBarContent,
        }

        let weiXinActivitySearchContentProps = {
            WeiXinActivitySelectValue,
            WeiXinActicityTimeOnSelectSubmit,
            WeiXinActivityGameChangeSelect,
        }

        let weiXinActivityBottomChartProps = {
            WeiXinActivityBottomBarSpin,
            WeiXinActivityBottomLeftRadioChoose,
            WeiXinActivityBottomRightRadioChoose,
            WeiXinActivityChangeBottomLeftRadioValue,
            WeiXinActivityChangeBottomRightRadioValue,
            WeiXinActivityBottomBarTitle,
            WeiXinActivityDefinedTime,
            WeiXinActivityBottomBarContent,
        }

    /*微信传单*/
        let weiXinFlyerTopChartProps = {
            WeiXinFlyerTopRadioChoose,
            WeiXinFlyerChangeTopRadioValue,
            WeiXinFlyerTopBarSpin,
            WeiXinFlyerTopBarContent,
        }

        let weiXinFlyerSearchContentProps = {
            WeiXinFlyerSelectValue,
            WeiXinFlyerTimeOnSelectSubmit,
            WeiXinFlyerGameChangeSelect,
        }

        let weiXinFlyerBottomChartProps = {
            WeiXinFlyerBottomBarSpin,
            WeiXinFlyerBottomLeftRadioChoose,
            WeiXinFlyerBottomRightRadioChoose,
            WeiXinFlyerChangeBottomLeftRadioValue,
            WeiXinFlyerChangeBottomRightRadioValue,
            WeiXinFlyerBottomBarTitle,
            WeiXinFlyerDefinedTime,
            WeiXinFlyerBottomBarContent,
        }

    /*微信游戏*/
        let weiXinGameTopChartProps = {
            WeiXinGameTopRadioChoose,
            WeiXinGameChangeTopRadioValue,
            WeiXinGameTopBarSpin,
            WeiXinGameTopBarContent,
        }

        let weiXinGameSearchContentProps = {
            WeiXinGameSelectValue,
            WeiXinGameTimeOnSelectSubmit,
            WeiXinGameGameChangeSelect,
        }

        let weiXinGameBottomChartProps = {
            WeiXinGameBottomBarSpin,
            WeiXinGameBottomLeftRadioChoose,
            WeiXinGameBottomRightRadioChoose,
            WeiXinGameChangeBottomLeftRadioValue,
            WeiXinGameChangeBottomRightRadioValue,
            WeiXinGameBottomBarTitle,
            WeiXinGameDefinedTime,
            WeiXinGameBottomBarContent,
        }

    let changeTabs = function(activeKey){
        if('1'==activeKey){
            dispatch({
                type: 'weiXinYingXiao/showWeiXinActivityTopAllData',
                payload:{
                    categoryId : 1 ,    //类型ID（1 活动，2 传单，3 游戏）
                    statisType : 'views' ,  //统计类型（views 浏览数，shares 分享数，validUsers 有效用户数，createNum 创建次数）
                },
            });
        }else if('2'==activeKey){
            dispatch({
                type: 'weiXinYingXiao/showWeiXinFlyerTopAllData',
                payload:{
                    categoryId : 2 ,    //类型ID（1 活动，2 传单，3 游戏）
                    statisType : 'views' ,  //统计类型（views 浏览数，shares 分享数，validUsers 有效用户数，createNum 创建次数）
                },
            });
        }else if('3'==activeKey){
            dispatch({
                type: 'weiXinYingXiao/showWeiXinGameTopAllData',
                payload:{
                    categoryId : 3 ,    //类型ID（1 活动，2 传单，3 游戏）
                    statisType : 'views' ,  //统计类型（views 浏览数，shares 分享数，validUsers 有效用户数，createNum 创建次数）
                },
            });
        }
    }

    return (
        <div>
            <Tabs defaultActiveKey="1" onChange={changeTabs}>
                <TabPane tab={<span>微信活动</span>} key="1">
                    <WeiXinActivityTopChart {...weiXinActivityTopChartProps} />
                    { status == true ?  <WeiXinActivitySearchContent {...weiXinActivitySearchContentProps} /> : null}
                    { status == true ?  <WeiXinActivityBottomChart {...weiXinActivityBottomChartProps} /> : null}
                </TabPane>
                <TabPane tab={<span>微信传单</span>} key="2">
                    <WeiXinFlyerTopChart {...weiXinFlyerTopChartProps} />
                    { status == true ?  <WeiXinFlyerSearchContent {...weiXinFlyerSearchContentProps} /> : null}
                    { status == true ?  <WeiXinFlyerBottomChart {...weiXinFlyerBottomChartProps} /> : null}
                </TabPane>
                <TabPane tab={<span>微信游戏</span>} key="3">
                    <WeiXinGameTopChart {...weiXinGameTopChartProps} />
                    { status == true ?  <WeiXinGameSearchContent {...weiXinGameSearchContentProps} /> : null}
                    { status == true ?  <WeiXinGameBottomChart {...weiXinGameBottomChartProps} /> : null}
                </TabPane>
            </Tabs>
        </div>
  );
}


function mapStateToProps({ weiXinYingXiao }) {
  return { weiXinYingXiao };
}

export default connect(mapStateToProps)(DataMgr);
