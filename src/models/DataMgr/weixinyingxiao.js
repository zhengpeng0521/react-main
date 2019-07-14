import { showWeiXinActivityTopAllData,            /*微信活动上方总览数据(进入页面时加载)*/
         showWeiXinActivityBottomSelectValue,     /*微信活动活动类型下拉列表数据(进入页面时加载)*/
         showWeiXinActivityBottomAllData,         /*微信活动根据下拉列表请求数据加载图表数据(进入页面时加载)*/

         showWeiXinFlyerTopAllData,            /*微信传单上方总览数据(进入页面时加载)*/
         showWeiXinFlyerBottomSelectValue,     /*微信传单活动类型下拉列表数据(进入页面时加载)*/
         showWeiXinFlyerBottomAllData,         /*微信传单根据下拉列表请求数据加载图表数据(进入页面时加载)*/

         showWeiXinGameTopAllData,            /*微信传单上方总览数据(进入页面时加载)*/
         showWeiXinGameBottomSelectValue,     /*微信传单活动类型下拉列表数据(进入页面时加载)*/
         showWeiXinGameBottomAllData,         /*微信传单根据下拉列表请求数据加载图表数据(进入页面时加载)*/
       } from '../../services/DataMgr/weixinyingxiao';
import { parse } from 'qs';
import { message } from 'antd';

//数据统计 预约试听
export default {

    namespace: 'weiXinYingXiao',

    state: {
        /*微信活动*/
        WeiXinActivityTopRadioChoose:'views',       //微信活动上方数据总揽的默认进入页面为浏览数
        WeiXinActivityTopBarSpin:false,             //微信活动上方图表是否处于加载中
        WeiXinActivityTopBarContent:[],             //微信活动上方图表所有数据

        WeiXinActivityBottomBarSpin:false,          //微信活动下方图表是否处于加载中
        WeiXinActivityBottomBarTitle:'',            //微信活动下方图表名称

        WeiXinActivityDefinedTime:{},               //微信活动下方自定义时间
        WeiXinActivityBottomLeftRadioChoose:'views',//微信活动下左的默认进入页面为浏览数
        WeiXinActivityBottomRightRadioChoose:'7',   //微信活动下右默认进入页面为近7日
        WeiXinActivitySelectValue:[],               //微信活动下拉列表数据
        WeiXinActivityGameId:'',                    //微信活动下拉列表中每个游戏的ID
        WeiXinActivityBottomBarContent:[],          //微信活动下方图表数据

        /*微信传单*/
        WeiXinFlyerTopRadioChoose:'views',          //微信活动上方数据总揽的默认进入页面为浏览数
        WeiXinFlyerTopBarSpin:false,                //微信活动上方图表是否处于加载中
        WeiXinFlyerTopBarContent:[],                //微信活动上方图表所有数据

        WeiXinFlyerBottomBarSpin:false,             //微信活动下方图表是否处于加载中
        WeiXinFlyerBottomBarTitle:'',               //微信活动下方图表名称

        WeiXinFlyerDefinedTime:{},                  //微信活动下方自定义时间
        WeiXinFlyerBottomLeftRadioChoose:'views',   //微信活动下左的默认进入页面为浏览数
        WeiXinFlyerBottomRightRadioChoose:'7',      //微信活动下右默认进入页面为近7日
        WeiXinFlyerSelectValue:[],                  //微信活动下拉列表数据
        WeiXinFlyerGameId:'',                       //微信活动下拉列表中每个游戏的ID
        WeiXinFlyerBottomBarContent:[],             //微信活动下方图表数据

        /*微信游戏*/
        WeiXinGameTopRadioChoose:'views',           //微信活动上方数据总揽的默认进入页面为浏览数
        WeiXinGameTopBarSpin:false,                 //微信活动上方图表是否处于加载中
        WeiXinGameTopBarContent:[],                 //微信活动上方图表所有数据

        WeiXinGameBottomBarSpin:false,              //微信活动下方图表是否处于加载中
        WeiXinGameBottomBarTitle:'',                //微信活动下方图表名称

        WeiXinGameDefinedTime:{},                   //微信活动下方自定义时间
        WeiXinGameBottomLeftRadioChoose:'views',    //微信活动下左的默认进入页面为浏览数
        WeiXinGameBottomRightRadioChoose:'7',       //微信活动下右默认进入页面为近7日
        WeiXinGameSelectValue:[],                    //微信活动下拉列表数据
        WeiXinGameGameId:'',                        //微信活动下拉列表中每个游戏的ID
        WeiXinGameBottomBarContent:[],              //微信活动下方图表数据

        status : false,                             //下方数据趋势暂时未做好，用来隐藏下部分组件
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/weixinyingxiao') {
                    dispatch({
                        type:'showWeiXinActivityTopAllData',
                        payload:{
                            categoryId : 1 ,    //类型ID（1 活动，2传单）
                            statisType : 'views' ,  //统计类型（views 浏览数，shares 分享数，validUsers 有效用户数，createNum 创建次数）
                        }
                    });
                }
            });
        },
    },

    effects: {

        /*微信活动*/
            /*微信活动上方总览数据(进入页面时加载)*/
            *'showWeiXinActivityTopAllData'({ payload }, { call, put, select }){
                yield put({ type:'weiXinActivityTopShowLoading' });
                let { ret,err } = yield call(showWeiXinActivityTopAllData,parse(payload));
                if (ret && ret.errorCode === 9000) {
                    let results = ret.results;
                    let formatResults = [];
                    for(let i in results){
                        if('views' == payload.statisType){
                            formatResults.push({
                                modelName : results[i].modelName,
                                浏览数 : results[i].modelNum,
                            })
                        }else if('shares' == payload.statisType){
                            formatResults.push({
                               modelName : results[i].modelName,
                               分享数: results[i].modelNum,
                            })
                        }else if('validUsers' == payload.statisType){
                            formatResults.push({
                               modelName : results[i].modelName,
                               有效用户数 : results[i].modelNum,
                            })
                        }else if('createNum' == payload.statisType){
                            formatResults.push({
                               modelName : results[i].modelName,
                               创建次数 : results[i].modelNum,
                            })
                        }
                    }
                    yield put({
                        type: 'updateState',
                        payload: {
                            WeiXinActivityTopBarContent: formatResults,     //取到页面上方总览表格数据
                            WeiXinActivityTopRadioChoose : payload.statisType,
                        },
                    });
                } else {
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
                yield put({ type:'weiXinActivityTopCloseLoading' });
            },

            /*微信活动活动类型下拉列表数据(进入页面时加载)*/
            *'showWeiXinActivityBottomSelectValue'({ payload }, { call, put, select }){
                let { ret,err } = yield call(showWeiXinActivityBottomSelectValue,parse(payload));
                if (ret && ret.errorCode === 9000) {
                    yield put({
                        type: 'updateState',
                        payload: {
                            WeiXinActivitySelectValue : ret.results,     //取到活动类型下拉列表
                            WeiXinActivityGameId : ret.results[0].id,    //取到活动类型下拉列表第一个的ID
                        },
                    });

                    /*根据接收到的下拉列表的第一个值作为默认值再进行表格内容的检索*/
                    yield put({
                        type: 'showWeiXinActivityBottomAllData',
                        payload: {
                            WeiXinActivityBottomBarTitle:ret.results[0].title,   //取到活动类型title参数
                            modelId : ret.results[0].id,                         //取到活动类型id参数
                            selectDay : '7',                                     //传默认时间范围
                            statisType : 'views',                                //下方数据表格类型(浏览数...)
                        },
                    });
                } else {
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
            },

            /*微信活动根据下拉列表请求数据加载图表数据(进入页面时加载和条件改变时加载)*/
            *'showWeiXinActivityBottomAllData'({ payload }, { call, put, select }){
                yield put({ type:'weiXinActivityBottomShowLoading' });
                let { ret,err } = yield call(showWeiXinActivityBottomAllData,parse(payload));
                if(payload.selectDay == undefined || payload.selectDay == null || payload.selectDay == ''){
                    if (ret && ret.errorCode === 9000) {
                        let params = {};
                        params.startTime = payload.startTime;
                        params.endTime = payload.endTime;
                        yield put({
                            type: 'updateState',
                            payload: {
                                WeiXinActivityBottomBarTitle : payload.WeiXinActivityBottomBarTitle,
                                WeiXinActivityBottomBarContent : ret.results.data,
                                WeiXinActivityGameId : payload.modelId,
                                WeiXinActivityDefinedTime : params,
                                WeiXinActivityBottomRightRadioChoose : '',
                                WeiXinActivityBottomLeftRadioChoose : payload.statisType,
                            },
                        });
                    } else {
                        ret && ret.errorMessage && message.error(ret.errorMessage);
                    }
                }else{
                    if (ret && ret.errorCode === 9000) {
                        yield put({
                            type: 'updateState',
                            payload: {
                                WeiXinActivityBottomBarTitle : payload.WeiXinActivityBottomBarTitle,
                                WeiXinActivityBottomBarContent : ret.results.data,
                                WeiXinActivityGameId : payload.modelId,
                                WeiXinActivityDefinedTime : {},
                                WeiXinActivityBottomRightRadioChoose : payload.selectDay,
                                WeiXinActivityBottomLeftRadioChoose : payload.statisType,
                            },
                        });
                    } else {
                        ret && ret.errorMessage && message.error(ret.errorMessage);
                    }
                }
                yield put({ type:'weiXinActivityBottomCloseLoading' });
            },

        /*微信传单*/
            /*微信传单上方总览数据(进入页面时加载)*/
            *'showWeiXinFlyerTopAllData'({ payload }, { call, put, select }){
                yield put({ type:'weiXinFlyerTopShowLoading' });
                let { ret,err } = yield call(showWeiXinFlyerTopAllData,parse(payload));
                if (ret && ret.errorCode === 9000) {
                    let results = ret.results;
                    let formatResults = [];
                    for(let i in results){
                        if('views' == payload.statisType){
                            formatResults.push({
                                modelName : results[i].modelName,
                                '浏览数' : results[i].modelNum,
                            })
                        }else if('shares' == payload.statisType){
                            formatResults.push({
                               modelName : results[i].modelName,
                               '分享数': results[i].modelNum,
                            })
                        }else if('validUsers' == payload.statisType){
                            formatResults.push({
                               modelName : results[i].modelName,
                               '有效用户数' : results[i].modelNum,
                            })
                        }else if('createNum' == payload.statisType){
                            formatResults.push({
                               modelName : results[i].modelName,
                               '创建次数' : results[i].modelNum,
                            })
                        }
                    }
                    yield put({
                        type: 'updateState',
                        payload: {
                            WeiXinFlyerTopBarContent: formatResults,     //取到页面上方总览表格数据
                            WeiXinFlyerTopRadioChoose : payload.statisType,
                        },
                    });
                } else {
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
                yield put({ type:'weiXinFlyerTopCloseLoading' });
            },

            /*微信传单类型下拉列表数据(进入页面时加载)*/
            *'showWeiXinFlyerBottomSelectValue'({ payload }, { call, put, select }){
                let { ret,err } = yield call(showWeiXinFlyerBottomSelectValue,parse(payload));
                if (ret && ret.errorCode === 9000) {
                    yield put({
                        type: 'updateState',
                        payload: {
                            WeiXinFlyerSelectValue : ret.results,     //取到活动类型下拉列表
                            WeiXinFlyerGameId : ret.results[0].id,    //取到活动类型下拉列表第一个的ID
                        },
                    });

                    /*根据接收到的下拉列表的第一个值作为默认值再进行表格内容的检索*/
                    yield put({
                        type: 'showWeiXinFlyerBottomAllData',
                        payload: {
                            WeiXinFlyerBottomBarTitle:ret.results[0].title,   //取到活动类型title参数
                            modelId : ret.results[0].id,                         //取到活动类型id参数
                            selectDay : '7',                                     //传默认时间范围
                            statisType : 'views',                                //下方数据表格类型(浏览数...)
                        },
                    });
                } else {
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
            },

            /*微信传单根据下拉列表请求数据加载图表数据(进入页面时加载和条件改变时加载)*/
            *'showWeiXinFlyerBottomAllData'({ payload }, { call, put, select }){
                yield put({ type:'weiXinFlyerTopShowLoading' });
                let { ret,err } = yield call(showWeiXinFlyerBottomAllData,parse(payload));
                if(payload.selectDay == undefined || payload.selectDay == null || payload.selectDay == ''){
                    if (ret && ret.errorCode === 9000) {
                        let params = {};
                        params.startTime = payload.startTime;
                        params.endTime = payload.endTime;
                        yield put({
                            type: 'updateState',
                            payload: {
                                WeiXinFlyerBottomBarTitle : payload.WeiXinFlyerBottomBarTitle,
                                WeiXinFlyerBottomBarContent : ret.results.data,
                                WeiXinFlyerGameId : payload.modelId,
                                WeiXinFlyerDefinedTime : params,
                                WeiXinFlyerBottomRightRadioChoose : '',
                                WeiXinFlyerBottomLeftRadioChoose : payload.statisType,
                            },
                        });
                    } else {
                        ret && ret.errorMessage && message.error(ret.errorMessage);
                    }
                }else{
                    if (ret && ret.errorCode === 9000) {
                        yield put({
                            type: 'updateState',
                            payload: {
                                WeiXinFlyerBottomBarTitle : payload.WeiXinFlyerBottomBarTitle,
                                WeiXinFlyerBottomBarContent : ret.results.data,
                                WeiXinFlyerGameId : payload.modelId,
                                WeiXinFlyerDefinedTime : {},
                                WeiXinFlyerBottomRightRadioChoose : payload.selectDay,
                                WeiXinFlyerBottomLeftRadioChoose : payload.statisType,
                            },
                        });
                    } else {
                        ret && ret.errorMessage && message.error(ret.errorMessage);
                    }
                }
                yield put({ type:'weiXinFlyerTopCloseLoading' });
            },

        /*微信游戏*/
            /*微信游戏上方总览数据(进入页面时加载)*/
            *'showWeiXinGameTopAllData'({ payload }, { call, put, select }){
                yield put({ type:'weiXinGameTopShowLoading' });
                let { ret,err } = yield call(showWeiXinGameTopAllData,parse(payload));
                if (ret && ret.errorCode === 9000) {
                    let results = ret.results;
                    let formatResults = [];
                    for(let i in results){
                        if('views' == payload.statisType){
                            formatResults.push({
                                modelName : results[i].modelName,
                                '浏览数' : results[i].modelNum,
                            })
                        }else if('shares' == payload.statisType){
                            formatResults.push({
                               modelName : results[i].modelName,
                               '分享数': results[i].modelNum,
                            })
                        }else if('validUsers' == payload.statisType){
                            formatResults.push({
                               modelName : results[i].modelName,
                               '有效用户数' : results[i].modelNum,
                            })
                        }else if('createNum' == payload.statisType){
                            formatResults.push({
                               modelName : results[i].modelName,
                               '创建次数' : results[i].modelNum,
                            })
                        }
                    }
                    yield put({
                        type: 'updateState',
                        payload: {
                            WeiXinGameTopBarContent: formatResults,     //取到页面上方总览表格数据
                            WeiXinGameTopRadioChoose : payload.statisType,
                        },
                    });
                } else {
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
                yield put({ type:'weiXinGameTopCloseLoading' });
            },

            /*微信游戏活动类型下拉列表数据(进入页面时加载)*/
            *'showWeiXinGameBottomSelectValue'({ payload }, { call, put, select }){
                let { ret,err } = yield call(showWeiXinGameBottomSelectValue,parse(payload));
                if (ret && ret.errorCode === 9000) {
                    yield put({
                        type: 'updateState',
                        payload: {
                            WeiXinGameSelectValue : ret.results,     //取到活动类型下拉列表
                            WeiXinGameGameId : ret.results[0].id,    //取到活动类型下拉列表第一个的ID
                        },
                    });

                    /*根据接收到的下拉列表的第一个值作为默认值再进行表格内容的检索*/
                    yield put({
                        type: 'showWeiXinGameBottomAllData',
                        payload: {
                            WeiXinGameBottomBarTitle:ret.results[0].title,   //取到活动类型title参数
                            modelId : ret.results[0].id,                         //取到活动类型id参数
                            selectDay : '7',                                     //传默认时间范围
                            statisType : 'views',                                //下方数据表格类型(浏览数...)
                        },
                    });
                } else {
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
            },

            /*微信游戏根据下拉列表请求数据加载图表数据(进入页面时加载和条件改变时加载)*/
            *'showWeiXinGameBottomAllData'({ payload }, { call, put, select }){
                yield put({ type:'weiXinGameBottomShowLoading' });
                let { ret,err } = yield call(showWeiXinGameBottomAllData,parse(payload));
                if(payload.selectDay == undefined || payload.selectDay == null || payload.selectDay == ''){
                    if (ret && ret.errorCode === 9000) {
                        let params = {};
                        params.startTime = payload.startTime;
                        params.endTime = payload.endTime;
                        yield put({
                            type: 'updateState',
                            payload: {
                                WeiXinGameBottomBarTitle : payload.WeiXinGameBottomBarTitle,
                                WeiXinGameBottomBarContent : ret.results.data,
                                WeiXinGameGameId : payload.modelId,
                                WeiXinGameDefinedTime : params,
                                WeiXinGameBottomRightRadioChoose : '',
                                WeiXinGameBottomLeftRadioChoose : payload.statisType,
                            },
                        });
                    } else {
                        ret && ret.errorMessage && message.error(ret.errorMessage);
                    }
                }else{
                    if (ret && ret.errorCode === 9000) {
                        yield put({
                            type: 'updateState',
                            payload: {
                                WeiXinGameBottomBarTitle : payload.WeiXinGameBottomBarTitle,
                                WeiXinGameBottomBarContent : ret.results.data,
                                WeiXinGameGameId : payload.modelId,
                                WeiXinGameDefinedTime : {},
                                WeiXinGameBottomRightRadioChoose : payload.selectDay,
                                WeiXinGameBottomLeftRadioChoose : payload.statisType,
                            },
                        });
                    } else {
                        ret && ret.errorMessage && message.error(ret.errorMessage);
                    }
                }
                yield put({ type:'weiXinGameBottomCloseLoading' });
            },
    },

    reducers: {
        //更新状态
        updateState(state, action) {
            return { ...state, ...action.payload };
        },


        //微信活动上方总览图表加载中
        weiXinActivityTopShowLoading(state, action) {
          return { ...state, ...action.payload, WeiXinActivityTopBarSpin: true };
        },
        //微信传单上方总览图表加载中
        weiXinFlyerTopShowLoading(state, action) {
          return { ...state, ...action.payload, WeiXinFlyerTopBarSpin: true };
        },
        //微信游戏上方总览图表加载中
        weiXinGameTopShowLoading(state, action) {
          return { ...state, ...action.payload, WeiXinGameTopBarSpin: true };
        },


        //微信活动上方总览图表取消加载
        weiXinActivityTopCloseLoading(state, action) {
          return { ...state, ...action.payload, WeiXinActivityTopBarSpin: false };
        },
        //微信传单上方总览图表取消加载
        weiXinFlyerTopCloseLoading(state, action) {
          return { ...state, ...action.payload, WeiXinFlyerTopBarSpin: false };
        },
        //微信游戏上方总览图表取消加载
        weiXinGameTopCloseLoading(state, action) {
          return { ...state, ...action.payload, WeiXinGameTopBarSpin: false };
        },


        //微信活动下方图表加载中
        weiXinActivityBottomShowLoading(state, action) {
          return { ...state, ...action.payload, WeiXinActivityBottomBarSpin: true };
        },
        //微信传单下方图表加载中
        weiXinFlyerBottomShowLoading(state, action) {
          return { ...state, ...action.payload, WeiXinFlyerBottomBarSpin: true };
        },
        //微信游戏下方图表加载中
        weiXinGameBottomShowLoading(state, action) {
          return { ...state, ...action.payload, WeiXinGameBottomBarSpin: true };
        },


        //微信活动下方图表取消加载
        weiXinActivityBottomCloseLoading(state, action) {
          return { ...state, ...action.payload, WeiXinActivityBottomBarSpin: false };
        },
        //微信传单下方图表取消加载
        weiXinFlyerBottomCloseLoading(state, action) {
          return { ...state, ...action.payload, WeiXinFlyerBottomBarSpin: false };
        },
        //微信游戏下方图表取消加载
        weiXinGameBottomCloseLoading(state, action) {
          return { ...state, ...action.payload, WeiXinGameBottomBarSpin: false };
        },
    },

};
