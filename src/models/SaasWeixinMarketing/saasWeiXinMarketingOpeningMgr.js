import { showMarketingOpeningMgrList,       /*开通管理列表展示*/
         checkIncludingModal,               /*查看套餐包含模板*/

         searchOrgMessage,                  /*打开新增套餐和模板模态框查询机构*/
         openOpenPackageModalPackage,       /*打开新增套餐模态框查询套餐*/
         addPackageModalCheckPackageType,   /*开通套餐选中模板后查看套餐模板*/
         addPackageModalSubmit,             /*开通套餐表单提交*/
         queryWeiXinAllModal,               /*请求所有微信活动，微信传单，微信游戏模板*/
         addTemplateModalSubmit,            /*开通模板表单提交*/

         GetTenantDetail,                   /*通过租户信息搜索租户*/
         GetOrgByTenantId,                  /*通过租户搜索机构*/
} from '../../services/SaasWeixinMarketing/SaasWeiXinMarketingOpeningMgr';
//import * as ser from '../../services/SaasWeixinMarketing/SaasWeixinMarketingModelSet';
import { parse } from 'qs';
import { message } from 'antd';

//后台配置 帖子专题
export default {

    namespace: 'weiXinMarketingOpeningMgr',

    state: {
        pageSize:10,
        pageIndex:0,

        searchVisible : true,           //搜索框是否显示
        searchData : {},                //搜索框查询内容

        loading : false,                //列表加载状态
        total : '',                     //列表项目总数
        list : [],                      //列表项目内容

        checkModalVisible : false,      //点击'包含模版'下内容是弹窗是否显示
        checkModalContent : [],         //点击'包含模版'获取到的值
        checkModalNoDefaultExpandedKeys : [],  //查看模板数量默认树状展示

        addPackageModalVisible : false,                 //开通套餐模态框是否展示
        addPackageModalSelectContent : [],              //开通套餐套餐下拉列表数据
        addPackageModalButtonLoading : false,           //开通套餐模态框按钮加载状态
        addPackageModalTransferAllcontent : [],         //开通套餐模态框穿梭框左边数据
        addPackageModalTransferTargetContent : [],      //开通套餐模态框穿梭框右边数据

        addTemplateModalVisible : false,                     //开通模板模态框是否展示
        addTemplateModalButtonLoading : false,               //开通模板模态框按钮加载状态
        addTemplateModalActivityTransferAllcontent : [],     //微信活动模板穿梭框左边数据
        addTemplateModalActivityTransferTargetContent : [],  //微信活动模板穿梭框右边数据
        addTemplateModalAdminiTransferAllcontent : [],     //微信活动模板穿梭框左边数据-----------------------------
        addTemplateModalAdminiTransferTargetContent : [],  //微信活动模板穿梭框右边数据-----------------------------
        addTemplateModalGameTransferAllcontent : [],         //微信游戏模板穿梭框左边数据
        addTemplateModalGameTransferTargetContent : [],      //微信游戏模板穿梭框右边数据
        addTemplateModalOfflineLeafletsTransferAllcontent : [],          //开通线下传单模态框机构选择穿梭框左边数据
        addTemplateModalOfflineLeafletsTransferTargetContent : [],       //开通线下传单模态框机构选择穿梭框右边数据

        gameModuleFilterKeyWord: '',

        selectData: [],
        tenantSearchType : '1',                         //机构搜索方式(0按机构和机构手机号/1按租户查询)
        tenantSelectVisible : false,                    //租户搜索下拉列表是否显示
        tenantSelectContent : [],                       //租户搜索下拉列表内容
        selectedLimitY:'',//已选限制
        selectedLimitN:'',//已选不限制
        numValue:1,
        selectedChart:'',
        text:"",
        chartLimit:"",
        isSelectAllLimitNum: false, //是否全选了限制人数
        isSelectAllLimit: false,//是否全选了不限制人数
        isSelectAllChartBox: false,//是否全选了开通社交图谱
        selectLimitNumBoxNum: null,//选择限制人数的数量
        selectChartBoxNum: null,//选择社交图谱的数量
        allPrivilegeNum: null,//特权的总数量
        stateVue:[],
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if(location.pathname === '/saas_weixin_market_opening_mgr') {
                    dispatch({
                        type:'showMarketingOpeningMgrList',
                        payload:{
                            pageSize:10,
                            pageIndex:0,
                        }
                    });
                }
            });
        },
    },

    effects: {
        /*开通管理列表展示*/
        *'showMarketingOpeningMgrList'({ payload }, { call, put , select }){
            yield put({ type : 'showLoading' });
            const { ret,err } = yield call(showMarketingOpeningMgrList,parse(payload));
            if (ret && ret.errorCode === 9000) {
                delete payload.pageIndex;
                delete payload.pageSize;
                yield put({
                    type: 'updateState',
                    payload:{
                        list : ret.results,
                        total : ret.data.resultCount,
                        pageSize : ret.data.pageSize || 10,                   //每页展示条目数
                        pageIndex : ret.data.pageIndex || 0,                 //页码
                        searchData : payload
                    }
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({ type : 'closeLoading' });
        },

        /*列表查看套餐包含模板*/
        *'checkIncludingModal'({ payload }, { call, put , select }){
            yield put({ type : 'showLoading' });
            const { ret,err } = yield call(checkIncludingModal,parse(payload));
            if (ret && ret.errorCode === 9000) {
                let expandedKeys = [];
                for(let i in (ret.results[0])){
                    expandedKeys.push(i);
                }
                yield put({
                    type: 'updateState',
                    payload:{
                        checkModalVisible : true,
                        checkModalContent : ret.results[0],
                        checkModalNoDefaultExpandedKeys : expandedKeys,
                    }
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({ type : 'closeLoading' });
        },

        /*搜索机构信息*/
        *'searchOrgMessage'({ payload }, { call, put , select }){
            yield put({ type : 'showLoading' });
            const { ret } = yield call(searchOrgMessage,parse(payload));   //请求机构列表
            if (ret && ret.errorCode === 9000) {
                let oragnArray = [];
                for(let i in (ret.results)){
                    if((ret.results)[i].tel==''||(ret.results)[i].tel==undefined||(ret.results)[i].tel==null){
                        oragnArray.push({
                            title : (ret.results)[i].organName+'(未填写手机号,'+(ret.results)[i].id+')',
                            key : (ret.results)[i].id,
                        });
                    }else{
                        oragnArray.push({
                            title : (ret.results)[i].organName+'('+(ret.results)[i].tel+','+(ret.results)[i].id+')',
                            key : (ret.results)[i].id,
                        });
                    }
                }
                if('template' == payload.type){
                    yield put({
                        type:'updateState',
                        payload:{
                            addTemplateModalOrgTransferAllcontent : oragnArray,
                            addTemplateModalTransferTargetContent : [],
                        }
                    });
                }else if('package' == payload.type){
                    yield put({
                        type:'updateState',
                        payload:{
                            addPackageModalTransferAllcontent : oragnArray,
                            addPackageModalTransferTargetContent : [],
                        }
                    });
                }
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({ type : 'closeLoading' });
        },

        /*打开新增套餐并获取套餐下拉列表*/
        *'openOpenPackageModalPackage'({ payload }, { call, put , select }){
            yield put({ type : 'showLoading' });
            const { ret } = yield call(openOpenPackageModalPackage,parse(payload));   //请求机构列表
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type:'updateState',
                    payload:{
                        addPackageModalSelectContent : ret.results,
                        addPackageModalVisible : true,
                        addPackageModalButtonLoading : false,
                    }
                });
            }else{
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({ type : 'closeLoading' });
        },

        /*开通套餐选中模板后查看套餐模板*/
        *'addPackageModalCheckPackageType'({ payload }, { call, put , select }){
            const { ret } = yield call(addPackageModalCheckPackageType,parse(payload));   //请求机构列表
            if (ret && ret.errorCode === 9000) {

                let expandedKeys = [];
                for(let i in (ret.results[0])){
                    expandedKeys.push(i);
                }
                yield put({
                    type: 'updateState',
                    payload:{
                        checkModalVisible : true,
                        checkModalContent : ret.results[0],
                        checkModalNoDefaultExpandedKeys : expandedKeys,
                    }
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
        },

        /*开通套餐表单提交*/
        *'addPackageModalSubmit'({ payload }, { call, put , select }){
            yield put({ type : 'showLoading' });
            const { ret } = yield call(addPackageModalSubmit,parse(payload));   //请求机构列表
            if (ret && ret.errorCode === 9000) {
                message.success(ret.errorMessage);
                yield put({
                    type:'updateState',
                    payload:{
                        addPackageModalVisible : false,
                        addPackageModalButtonLoading : false,
                        tenantSearchType : '1',
                        tenantSelectVisible : false,                         //租户搜索下拉列表是否显示
                        tenantSelectContent : [],                            //租户搜索下拉列表内容
                        addPackageModalTransferAllcontent : [],              //开通套餐模态框穿梭框左边数据
                        addPackageModalTransferTargetContent : [],           //开通套餐模态框穿梭框右边数据
                        addTemplateModalOrgTransferAllcontent : [],          //开通模板模态框机构选择穿梭框左边数据
                        addTemplateModalOrgTransferTargetContent : [],       //开通模板模态框机构选择穿梭框右边数据
                    }
                });
                yield put({
                    type: 'openingMgrAfterOperation',
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({ type : 'closeLoading' });
        },


        //打开新增模板模态框并且请求所有微信活动，微信传单，微信游戏模板
        *'openOpenTempalteModal'({ payload }, { call, put , select }){
            const { ret,err } = yield call(queryWeiXinAllModal);
            if (ret && ret.errorCode === 9000) {
                let activityResult = [];
                let flyerResult = [];
                let gameResult = [];
				let offlineLeafletsResult = [];
                for(let i in (ret.results)[0].weAct){
                    activityResult.push({
                        title : ((ret.results)[0].weAct)[i].title,
                        key : ((ret.results)[0].weAct)[i].id,
                        categoryId : ((ret.results)[0].weAct)[i].categoryId,
                    });
                }
                for(let i in (ret.results)[0].weAdm){
                    activityResult.push({
                        title : ((ret.results)[0].weAdm)[i].title,
                        key : ((ret.results)[0].weAdm)[i].id,
                        categoryId : ((ret.results)[0].weAdm)[i].categoryId,
                    });
                }
                for(let j in (ret.results)[0].weLeaflet){
                    flyerResult.push({
                        title : ((ret.results)[0].weLeaflet)[j].title,
                        key : ((ret.results)[0].weLeaflet)[j].id,
                        categoryId : ((ret.results)[0].weLeaflet)[j].categoryId,
                    });
                }

                let allPrivilegeNum = 0;

                (ret.results)[0].weGame && (ret.results)[0].weGame.map(function(item,index){
                    let obj = {
                        title: item.title,
                        key: item.id,
                        categoryId: item.categoryId
                    };

                    let privilege_str = item.privilege || '';
                    if(privilege_str && privilege_str.length > 0) {
                        obj.isLimit = true;
                    }
                    gameResult.push(obj);

                });

				for(let s in (ret.results)[0].weOfflineLeaflet){
                    offlineLeafletsResult.push({
                        title : ((ret.results)[0].weOfflineLeaflet)[s].title,
                        key : ((ret.results)[0].weOfflineLeaflet)[s].id,
                        categoryId : ((ret.results)[0].weOfflineLeaflet)[s].categoryId,
                    });
                }
                yield put({
                    type:'updateState',
                    payload:{
                        addTemplateModalVisible : true,                                 //开通模板模态框是否展示
                        addTemplateModalButtonLoading : false,                          //开通模板模态框按钮加载状态
                        addTemplateModalActivityTransferAllcontent : activityResult,    //微信活动模板穿梭框左边数据
                        addTemplateModalActivityTransferTargetContent : [],             //微信活动模板穿梭框右边数据
                        addTemplateModalAdminiTransferAllcontent : activityResult,    //微信活动模板穿梭框左边数据----
                        addTemplateModalAdminiTransferTargetContent : [],             //微信活动模板穿梭框右边数据----
                        addTemplateModalGameTransferAllcontent : gameResult,            //微信游戏模板穿梭框左边数据
                        stateVue : gameResult,
                        addTemplateModalGameTransferTargetContent : [],                 //微信游戏模板穿梭框右边数据
						addTemplateModalOfflineLeafletsTransferAllcontent : offlineLeafletsResult,            //微信游戏模板穿梭框左边数据
						addTemplateModalOfflineLeafletsTransferTargetContent : [],		//微信线下传单模板穿梭框右边数据
                        isSelectAllLimitNum: true,
                        selectLimitNumBoxNum: allPrivilegeNum,
                        selectChartBoxNum: 0,
                        allPrivilegeNum,
					}
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
        },

        /*开通模板表单提交*/
        *'addTemplateModalSubmit'({ payload }, { call, put , select }){
            yield put({ type : 'showLoading' });
            const { ret } = yield call(addTemplateModalSubmit,parse(payload));   //请求机构列表
            if (ret && ret.errorCode === 9000) {
                message.success(ret.errorMessage);
                yield put({
                    type:'updateState',
                    payload:{
                        addTemplateModalVisible : false,
                        addTemplateModalButtonLoading : false,
                        tenantSearchType : '1',
                        tenantSelectVisible : false,                         //租户搜索下拉列表是否显示
                        tenantSelectContent : [],                            //租户搜索下拉列表内容
                        addPackageModalTransferAllcontent : [],              //开通套餐模态框穿梭框左边数据
                        addPackageModalTransferTargetContent : [],           //开通套餐模态框穿梭框右边数据
                        addTemplateModalActivityTransferAllcontent : [],     //微信活动模板穿梭框左边数据
                        addTemplateModalActivityTransferTargetContent : [],  //微信活动模板穿梭框右边数据
                        addTemplateModalAdminiTransferAllcontent : [],     //微信活动模板穿梭框左边数据-----------
                        addTemplateModalAdminiTransferTargetContent : [],  //微信活动模板穿梭框右边数据-----------
                        addTemplateModalGameTransferAllcontent : [],         //微信游戏模板穿梭框左边数据
                        addTemplateModalGameTransferTargetContent : [],      //微信游戏模板穿梭框右边数据
						addTemplateModalOfflineLeafletsTransferAllcontent : [], //微信线下传单模板穿梭框右边数据
						addTemplateModalOfflineLeafletsTransferTargetContent : [], //微信线下传单模板穿梭框右边数据
                        addTemplateModalOrgTransferAllcontent : [],          //开通模板模态框机构选择穿梭框左边数据
                        addTemplateModalOrgTransferTargetContent : [],       //开通模板模态框机构选择穿梭框右边数据
                    }
                });
                yield put({
                    type: 'openingMgrAfterOperation',
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({ type : 'closeLoading' });
        },

        /*新增套餐或模板后的列表展示*/
        *'openingMgrAfterOperation'({ payload }, { call, put , select }){
            let weiXinMarketingPackage = yield select(state => state.weiXinMarketingPackage);
            let searchData = weiXinMarketingPackage.searchData || {};
            let pageIndex = weiXinMarketingPackage.pageIndex;
            let pageSize = weiXinMarketingPackage.pageSize;
            let params = { pageIndex,pageSize,...searchData };
            const { ret,err } = yield call(showMarketingOpeningMgrList,parse(params));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'updateState',
                    payload: {
                        list : ret.results,
                        total : ret.data.resultCount,
                        pageSize : ret.data.pageSize || 10,                   //每页展示条目数
                        pageIndex : ret.data.pageIndex || 0,                 //页码
                    },
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
        },

        /*通过租户信息搜索租户*/
        *'GetTenantDetail'({ payload },{ put , call , select }){
            let { ret } = yield call(GetTenantDetail,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        tenantSelectVisible : true,
                        tenantSelectContent : ret.results,
                    }
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
        },

        /*通过租户搜索机构*/
        *'GetOrgByTenantId'({ payload },{ put , call , select }){
            let { ret } = yield call(GetOrgByTenantId,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                let oragnArray = [];
                for(let i in (ret.results)){
                    if((ret.results)[i].tel==''||(ret.results)[i].tel==undefined||(ret.results)[i].tel==null){
                        oragnArray.push({
                            title : (ret.results)[i].orgName+'(未填写手机号,'+(ret.results)[i].orgId+')',
                            key : (ret.results)[i].orgId,
                        });
                    }else{
                        oragnArray.push({
                            title : (ret.results)[i].orgName+'('+(ret.results)[i].tel+','+(ret.results)[i].orgId+')',
                            key : (ret.results)[i].orgId,
                        });
                    }
                }
                yield put({
                    type:'updateState',
                    payload:{
                        addPackageModalTransferAllcontent : oragnArray,
                        addPackageModalTransferTargetContent : [],
                        addTemplateModalOrgTransferAllcontent : oragnArray,
                        addTemplateModalOrgTransferTargetContent : [],
                    }
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
        },
    },

    reducers: {
        //更新state
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
        showLoading(state, action) {
            return { ...state, ...action.payload,loading : true };
        },
        closeLoading(state, action) {
            return { ...state, ...action.payload,loading : false };
        },

         //更新微游戏模板选中数据
        handleOnGameModuleConfigChange(state, action) {
            let {addTemplateModalGameTransferAllcontent,addTemplateModalGameTransferTargetContent} = state;
            let {payload} = action;

            let {eventType, eventData} = payload;

            let new_gameModuleDataSource = [];

            //模板选中情况变更时
            if(eventType == 'moduleSelectChange') {
                eventData && eventData.map(function(eItem, eIndex) {

                    let hasFind = false;
                    addTemplateModalGameTransferTargetContent &&
                    addTemplateModalGameTransferTargetContent.map(function(titem, tindex) {

                        if(titem.key == eItem) {
                            hasFind = true;
                            new_gameModuleDataSource.push(titem);
                        }
                    });

                    if(!hasFind) {

                        //判断当前key是否是可配置内付费
                        let itemCanLimit = false;
                        addTemplateModalGameTransferAllcontent && addTemplateModalGameTransferAllcontent.length > 0 && addTemplateModalGameTransferAllcontent.map(function(sourceItem, sourceIndex) {
                            if(sourceItem.key == eItem) {
                                itemCanLimit = sourceItem.isLimit ? true : false;
                            }
                        });

                      if(itemCanLimit) {
                          new_gameModuleDataSource.push({
                            key: eItem,
                            hasLimitNum: false,
                            hasLimitNumValue: 1000,
                            hasLimitEcharts: false,
                        });
                      } else {
                          new_gameModuleDataSource.push({
                            key: eItem,
                        });
                      }

                    }
                });
            } else if(eventType == 'limitChange') {//更新选中数据的内付费配置
                let hasFind = false;
                addTemplateModalGameTransferTargetContent &&
                addTemplateModalGameTransferTargetContent.map(function(item, index) {
                    if(item.key == eventData.key) {
                        hasFind = true;
                        item = {
                            ...item,
                            ...eventData,
                        }
                    }

                    new_gameModuleDataSource.push(item);
                });

                if(!hasFind) {
                    new_gameModuleDataSource.push(eventData);
                }
            }

            return { ...state, addTemplateModalGameTransferTargetContent: new_gameModuleDataSource };
        },

        //微游戏模板配置 选中所有  限制人数
        handleSelectAllLimitNum(state, action) {
          let currentListKeys = action.payload.currentListKeys;
          let {addTemplateModalGameTransferAllcontent, addTemplateModalGameTransferTargetContent} = state;

          let new_gameModuleDataSource = [];
          currentListKeys && currentListKeys.map(function(keyItem, keyIndex) {

               //判断当前key是否是可配置内付费
                let itemCanLimit = false;
                addTemplateModalGameTransferAllcontent && addTemplateModalGameTransferAllcontent.length > 0 && addTemplateModalGameTransferAllcontent.map(function(sourceItem, sourceIndex) {
                    if(sourceItem.key == keyItem) {
                        itemCanLimit = sourceItem.isLimit ? true : false;
                    }
                });

              if(!itemCanLimit) {
                  return;
              }

              let hasFind = false;
              addTemplateModalGameTransferTargetContent &&
              addTemplateModalGameTransferTargetContent.map(function(titem, tindex) {
                  if(titem.key == keyItem) {
                      hasFind = true;
                      new_gameModuleDataSource.push({
                          ...titem,
                          hasLimitNum: true,
                          hasLimitNumValue: titem.hasLimitNumValue || 1000,
                      });
                  }
              });

              if(!hasFind) {
                  new_gameModuleDataSource.push({
                      key: keyItem,
                      hasLimitNum: true,
                      hasLimitNumValue: 1000,
                      categoryId: 3,
                  });
              }

          });

            return { ...state, addTemplateModalGameTransferTargetContent: new_gameModuleDataSource };
        },

        //微游戏模板配置 选中所有  不限制人数
        handleSelectAllNoLimitNum(state, action) {
          let currentListKeys = action.payload.currentListKeys;
          let {addTemplateModalGameTransferAllcontent, addTemplateModalGameTransferTargetContent} = state;

          let new_gameModuleDataSource = [];
          currentListKeys && currentListKeys.map(function(keyItem, keyIndex) {

              //判断当前key是否是可配置内付费
                let itemCanLimit = false;
                addTemplateModalGameTransferAllcontent && addTemplateModalGameTransferAllcontent.length > 0 && addTemplateModalGameTransferAllcontent.map(function(sourceItem, sourceIndex) {
                    if(sourceItem.key == keyItem) {
                        itemCanLimit = sourceItem.isLimit ? true : false;
                    }
                });

              if(!itemCanLimit) {
                  return;
              }

              let hasFind = false;
              addTemplateModalGameTransferTargetContent &&
              addTemplateModalGameTransferTargetContent.map(function(titem, tindex) {
                  if(titem.key == keyItem) {
                      hasFind = true;
                      new_gameModuleDataSource.push({
                          ...titem,
                          hasLimitNum: false,
                          hasLimitNumValue: titem.hasLimitNumValue || 1000,
                      });
                  }
              });

              if(!hasFind) {
                  new_gameModuleDataSource.push({
                      key: keyItem,
                      hasLimitNum: false,
                      hasLimitNumValue: 1000,
                      categoryId: 3,
                  });
              }

          });

            return { ...state, addTemplateModalGameTransferTargetContent: new_gameModuleDataSource };
        },

            //微游戏模板配置 选中所有  开通社交图谱
        handleSelectAllLimitEcharts(state, action) {
          let currentListKeys = action.payload.currentListKeys;
          let {addTemplateModalGameTransferAllcontent, addTemplateModalGameTransferTargetContent} = state;
          let new_gameModuleDataSource = [];
          currentListKeys && currentListKeys.map(function(keyItem, keyIndex) {

              //判断当前key是否是可配置内付费
                let itemCanLimit = false;
                addTemplateModalGameTransferAllcontent && addTemplateModalGameTransferAllcontent.length > 0 && addTemplateModalGameTransferAllcontent.map(function(sourceItem, sourceIndex) {
                    if(sourceItem.key == keyItem) {
                        itemCanLimit = sourceItem.isLimit ? true : false;
                    }
                });

              if(!itemCanLimit) {
                  return;
              }

              let hasFind = false;
              addTemplateModalGameTransferTargetContent &&
              addTemplateModalGameTransferTargetContent.map(function(titem, tindex) {
                  if(titem.key == keyItem) {
                      hasFind = true;
                      new_gameModuleDataSource.push({
                          ...titem,
                          hasLimitEcharts: true,
                      });
                  }
              });

              if(!hasFind) {
                  new_gameModuleDataSource.push({
                      key: keyItem,
                      hasLimitEcharts: true,
                  });
              }

          });

            return { ...state, addTemplateModalGameTransferTargetContent: new_gameModuleDataSource };
        },
    },
};
