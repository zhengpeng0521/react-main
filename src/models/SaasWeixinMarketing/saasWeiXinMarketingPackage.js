import {
    showMarketingPackageList,      /*营销套餐列表展示*/
    checkIncludingModal,           /*查看套餐内包含模板*/
    packageChangeStatus,           /*上下架*/
    openAddPackageModal,           /*打开新增套餐modal获取穿梭框左边所有数据*/
    openEditPackageModal,          /*打开编辑套餐modal获取穿梭框左右两边所有数据*/
    weiXinPackageAfterOperation,   /*上下架和编辑后的列表展示*/
    addPackageSubmit,              /*新增提交*/
    editPackageSubmit,             /*编辑提交*/
    queryPackageMoule,              /*查询模板或实例*/
    tableWeiXinPackageUpdateBuyRecord,   /*更新购买记录*/
} from '../../services/SaasWeixinMarketing/SaasWeiXinMarketingPackage';
//import * as ser from '../../services/SaasWeixinMarketing/SaasWeixinMarketingModelSet';
import { parse } from 'qs';
import { message } from 'antd';

//微信营销 营销套餐
export default {

    namespace: 'weiXinMarketingPackage',

    state: {
        searchVisible: true,           //搜索框是否显示
        searchData: {},                //搜索内容

        pageSize: 10,                  //每页展示条目数
        pageIndex: 0,                  //页码
        loading: false,                //列表是否加载状态
        total: 0,                      //列表总数
        list: [],                      //列表内容

        checkModalVisible: false,      //点击'包含模版'下内容是弹窗是否显示
        checkModalContent: [],         //点击'包含模版'获取到的值
        checkModalNoDefaultExpandedKeys: [],  //查看模板数量默认树状展示

        addOrEditFormType: 'add',      //新增编辑modal 'create'/'edit'
        addOrEditFormVisible: false,   //新增编辑modal是否显示
        addOrEditButtonLoading: false, //新增编辑modal提交时按钮是否加载状态
        addOrEditFormData: {},         //编辑表单是带出的表单默认内容
        addOrEditFormActivityTransferAllContent: [],        //微信活动穿梭框左边传单内容
        addOrEditFormActivityTransferTargetContent: [],     //微信活动穿梭框右边传单内容
        addOrEditFormAdminiTransferAllContent: [],        //微信活动穿梭框左边传单内容------------------------------
        addOrEditFormAdminiTransferTargetContent: [],     //微信活动穿梭框右边传单内容-----------------------------
        addOrEditFormGameTransferAllContent: [],            //微信游戏穿梭框左边传单内容
        gameModuleFilterKeyWord: '',
        selectData: [],                                     //微信游戏已选
        isSelectAllLimitNum: false, //是否全选了限制人数
        isSelectAllLimit: false,//是否全选了不限制人数
        isSelectAllChartBox: false,//是否全选了开通社交图谱
        selectLimitNumBoxNum: null,//选择限制人数的数量
        selectChartBoxNum: null,//选择社交图谱的数量
        allPrivilegeNum: null,//特权的总数量

        selectedRowKeys: [],

        attrDataLimit: 0,

        addOrEditFormGameTransferTargetContent: [],         //微信游戏穿梭框右边传单内容
        addOrEditFormOfflineLeafletsTransferAllContent: [],            //线下传单穿梭框左边传单内容
        addOrEditFormOfflineLeafletsTransferTargetContent: [],         //线下传单穿梭框右边传单内容

        selectedLimitY: '',//已选限制
        selectedLimitN: '',//已选不限制
        numValue: 1,
        selectedChart: '',
        text: "",
        chartLimit: "",
        stateVue: [],
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/saas_weixin_market_marketing_package') {
                    dispatch({
                        type: 'showMarketingPackageList',
                        payload: {
                            pageSize: 10,
                            pageIndex: 0,
                        }
                    });
                }
            });
        },
    },

    effects: {

        /*营销套餐列表展示*/
        *'showMarketingPackageList'({ payload }, { call, put, select }) {
            yield put({ type: 'showLoading' });
            const { ret, err } = yield call(showMarketingPackageList, parse(payload));
            if (ret && ret.errorCode === 9000) {
                delete payload.pageIndex;
                delete payload.pageSize;
                yield put({
                    type: 'updateState',
                    payload: {
                        list: ret.results,
                        total: ret.data.resultCount,
                        pageSize: ret.data.pageSize || 10,                   //每页展示条目数
                        pageIndex: ret.data.pageIndex || 0,                 //页码
                        searchData: payload
                    }
                });
            } else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({ type: 'closeLoading' });
        },

        /*查看套餐包含模板*/
        *'checkIncludingModal'({ payload }, { call, put, select }) {

            const { ret, err } = yield call(checkIncludingModal, parse(payload));
            if (ret && ret.errorCode === 9000) {
                let expandedKeys = [];
                for (let i in (ret.results[0])) {
                    expandedKeys.push(i);
                }
                yield put({
                    type: 'updateState',
                    payload: {
                        checkModalVisible: true,
                        checkModalContent: ret.results[0],
                        checkModalNoDefaultExpandedKeys: expandedKeys,
                    }
                });
            } else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
        },

        /*上下架*/
        *'packageChangeStatus'({ payload }, { call, put, select }) {
            yield put({ type: 'showLoading' });
            const { ret, err } = yield call(packageChangeStatus, parse(payload));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'weiXinPackageAfterOperation',
                });
            } else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({ type: 'closeLoading' });
        },

        /*新增套餐时打开新增表单并且获取所有套餐*/
        *'openAddPackageModal'({ payload }, { call, put, select }) {
            const { ret, err } = yield call(openAddPackageModal, parse(payload));
            if (ret && ret.errorCode === 9000) {
                let activityResult = [];
                let flyerResult = [];
                let gameResult = [];
                let offlineLeafletsResult = [];
                for (let i in (ret.results)[0].weAct) {
                    activityResult.push({
                        title: ((ret.results)[0].weAct)[i].title,
                        key: ((ret.results)[0].weAct)[i].id,
                        categoryId: ((ret.results)[0].weAct)[i].categoryId,
                    });
                }

                for (let i in (ret.results)[0].weAdm) {
                    activityResult.push({
                        title: ((ret.results)[0].weAdm)[i].title,
                        key: ((ret.results)[0].weAdm)[i].id,
                        categoryId: ((ret.results)[0].weAdm)[i].categoryId,
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

                })

                for (let s in (ret.results)[0].weOfflineLeaflet) {
                    offlineLeafletsResult.push({
                        title: ((ret.results)[0].weOfflineLeaflet)[s].title,
                        key: ((ret.results)[0].weOfflineLeaflet)[s].id,
                        categoryId: ((ret.results)[0].weOfflineLeaflet)[s].categoryId,
                    });
                }

                yield put({
                    type: 'updateState',
                    payload: {

                        addOrEditFormType: 'add',
                        addOrEditFormVisible: true,
                        addOrEditButtonLoading: false,
                        addOrEditFormData: {},
                        addOrEditFormActivityTransferAllContent: activityResult,
                        addOrEditFormActivityTransferTargetContent: [],
                        addOrEditFormAdminiTransferAllContent: activityResult,//-----------------------
                        addOrEditFormAdminiTransferTargetContent: [],//--------------------------
                        addOrEditFormGameTransferAllContent: gameResult,
                        stateVue: gameResult,
                        addOrEditFormGameTransferTargetContent: [],
                        addOrEditFormOfflineLeafletsTransferAllContent: offlineLeafletsResult,
                        addOrEditFormOfflineLeafletsTransferTargetContent: [],
                        isSelectAllLimitNum: true,
                        selectLimitNumBoxNum: allPrivilegeNum,
                        selectChartBoxNum: 0,
                        allPrivilegeNum,
                    }
                });
            } else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
        },

        /*编辑套餐时打开编辑表单并且获取所有套餐*/
        *'openEditPackageModal'({ payload }, { call, put, select }) {

            const { ret, err } = yield call(openEditPackageModal);

            let keys = [], dataSource = [];

            //初始化选中的模板
            let modelArray_str = (payload && payload.modelArray) || '[]';
            let modelArray_arr = JSON.parse(modelArray_str);

            if (ret && ret.errorCode === 9000) {
                let activityResult = [];        //编辑时存取微信活动穿梭框左边Array
                let adminiResult = [];        //编辑时存取微信活动穿梭框左边Array---------------------------------
                let flyerResult = [];           //编辑时存取微信活动穿梭框左边Array
                let gameResult = [];            //编辑时存取微信活动穿梭框左边Array
                let offlineLeafletsResult = []; //编辑时存取线下传单穿梭框左边Array
                let allRightArray;              //编辑时存取当前列表项的所有Array
                let activityRightArray = [];    //编辑时存取微信活动穿梭框右边Array
                let adminiRightArray = [];    //编辑时存取微信活动穿梭框右边Array---------------------------
                let gameRightArray = [];        //编辑时存取微信游戏穿梭框右边Array
                let offlineRightLeafletsResult = []; //编辑时存取线下传单穿梭框左边Array
                for (let i in (ret.results)[0].weAct) {
                    activityResult.push({
                        title: ((ret.results)[0].weAct)[i].title,
                        key: ((ret.results)[0].weAct)[i].id,
                        categoryId: ((ret.results)[0].weAct)[i].categoryId,
                    });
                }

                for (let i in (ret.results)[0].weAdm) {
                    activityResult.push({
                        title: ((ret.results)[0].weAdm)[i].title,
                        key: ((ret.results)[0].weAdm)[i].id,
                        categoryId: ((ret.results)[0].weAdm)[i].categoryId,
                    });
                }
                let allPrivilegeNum = 0, recordCount = 0;

                //初始化微游戏的模板配置列表
                let game_module_list = (ret.results)[0].weGame;
                let game_module_select_data = [];

                game_module_list = game_module_list && game_module_list.length > 0 && game_module_list.map(function(item, index) {
                    let obj = {
                        title: item.title,
                        key: item.id,
                        categoryId: item.categoryId
                    };

                    let privilege_str = item.privilege || '';
                    if(privilege_str && privilege_str.length > 0) {
                        obj.isLimit = true;
                    }

                    return obj;
                });

                modelArray_arr && modelArray_arr.length > 0 && modelArray_arr.map(function(modelItem, modeIndex) {
                    if(modelItem.categoryId == 3) {
                        let game_module_select_data_item = {
                            key: modelItem.id,
                            id: modelItem.id,
                        };
                        let privilege_arr = modelItem.privilege || '';

                        if(privilege_arr && privilege_arr.length > 0) {

                            privilege_arr && privilege_arr.map(function(pitem, pindex) {

                                if(pitem.name == 'numLimit') {
                                    if(pitem.data == '-1') {
                                        game_module_select_data_item.hasLimitNum = false;
                                    } else {
                                        game_module_select_data_item.hasLimitNum = true;

                                        game_module_select_data_item.hasLimitNumValue = pitem.data;
                                    }
                                } else if(pitem.name= 'chart') {

                                    if(pitem.data == '1') {
                                        game_module_select_data_item.hasLimitEcharts = true
                                    } else {
                                        game_module_select_data_item.hasLimitEcharts = false;
                                    }
                                }

                            });

                        }
                        game_module_select_data.push(game_module_select_data_item);
                    }
                });

                for (let s in (ret.results)[0].weOfflineLeaflet) {
                    offlineLeafletsResult.push({
                        title: ((ret.results)[0].weOfflineLeaflet)[s].title,
                        key: ((ret.results)[0].weOfflineLeaflet)[s].id,
                        categoryId: ((ret.results)[0].weOfflineLeaflet)[s].categoryId,
                    });
                }

                if ((payload.modelArray).length > 0) {
                    allRightArray = JSON.parse(payload.modelArray);
                    for (let m in allRightArray) {
                        if ('1' == allRightArray[m].categoryId) {
                            activityRightArray.push(allRightArray[m].id);
                        } else if ('3' == allRightArray[m].categoryId) {
                            //之前保存的游戏Key--gameRightArray,对应数据allRightArray
                            gameRightArray.push(allRightArray[m].id);
//                            console.info(gameRightArray,"gameRightArray")
                        } else if ('4' == allRightArray[m].categoryId) {
                            offlineRightLeafletsResult.push(allRightArray[m].id);
                        }
                    }
                    yield put({
                        type: 'updateState',
                        payload: {
                            addOrEditFormActivityTransferTargetContent: activityRightArray,
                            addOrEditFormAdminiTransferTargetContent: activityRightArray,//------------------
//                            addOrEditFormGameTransferTargetContent: gameRightArray,
                            addOrEditFormOfflineLeafletsTransferTargetContent: offlineRightLeafletsResult,
                        }
                    });
                } else {
                    yield put({
                        type: 'updateState',
                        payload: {
                            addOrEditFormActivityTransferTargetContent: [],
                            addOrEditFormAdminiTransferTargetContent: [],//----------------------------
//                            addOrEditFormGameTransferTargetContent: [],
                            addOrEditFormOfflineLeafletsTransferTargetContent: [],
                        }
                    });
                }

                yield put({
                    type: 'updateState',
                    payload: {
                        selectData: dataSource,
                        selectedRowKeys: keys,
                        attrDataLimit: allPrivilegeNum,
                        addOrEditFormType: 'edit',
                        addOrEditFormVisible: true,
                        addOrEditButtonLoading: false,
                        addOrEditFormData: payload,
                        addOrEditFormActivityTransferAllContent: activityResult,
                        addOrEditFormAdminiTransferAllContent: activityResult,//-------------------------
                        addOrEditFormGameTransferAllContent: game_module_list,
                        addOrEditFormGameTransferTargetContent: game_module_select_data,

                        addOrEditFormOfflineLeafletsTransferAllContent: offlineLeafletsResult,
                        selectLimitNumBoxNum: allPrivilegeNum,
                        selectChartBoxNum: recordCount,
                        allPrivilegeNum,
                    }
                });
            } else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
        },

        /*新增提交*/
        *'addPackageSubmit'({ payload }, { call, put, select }) {
            yield put({ type: 'showLoading' });
            const { ret, err } = yield call(addPackageSubmit, parse(payload));

            if (ret && ret.errorCode === 9000) {
                message.success(ret.errorMessage);
                yield put({
                    type: 'updateState',
                    payload: {
                        addOrEditFormVisible: false,
                        addOrEditButtonLoading: false,
                    }
                });
                yield put({
                    type: 'weiXinPackageAfterOperation',
                });
            } else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({ type: 'closeLoading' });
        },

        /*编辑提交*/
        *'editPackageSubmit'({ payload }, { call, put, select }) {
            yield put({ type: 'showLoading' });
            const { ret, err } = yield call(editPackageSubmit, parse(payload));
            if (ret && ret.errorCode === 9000) {
                message.success(ret.errorMessage);
                yield put({
                    type: 'updateState',
                    payload: {
                        addOrEditFormVisible: false,
                        addOrEditButtonLoading: false,
                    }
                });
                yield put({
                    type: 'weiXinPackageAfterOperation',
                });
            } else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({ type: 'closeLoading' });
        },



        /*更新购买记录*/
        *'tableWeiXinPackageUpdateBuyRecord'({ payload }, { call, put, select }) {
            yield put({ type: 'showLoading' });
            const { ret, err } = yield call(tableWeiXinPackageUpdateBuyRecord, parse(payload));
            if (ret && ret.errorCode === 9000) {
                message.success(ret.errorMessage);
                yield put({
                    type: 'weiXinPackageAfterOperation',
                });
            } else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({ type: 'closeLoading' });
        },

        /*上下架和新增编辑后的列表展示*/
        *'weiXinPackageAfterOperation'({ payload }, { call, put, select }) {
            let weiXinMarketingPackage = yield select(state => state.weiXinMarketingPackage);
            let searchData = weiXinMarketingPackage.searchData || {};
            let pageIndex = weiXinMarketingPackage.pageIndex;
            let pageSize = weiXinMarketingPackage.pageSize;
            let params = { pageIndex, pageSize, ...searchData };
            const { ret, err } = yield call(weiXinPackageAfterOperation, parse(params));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'updateState',
                    payload: {
                        list: ret.results,
                        total: ret.data.resultCount,
                        pageSize: ret.data.pageSize || 10,                   //每页展示条目数
                        pageIndex: ret.data.pageIndex || 0,                 //页码
                    },
                });
            } else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
        },

    },

    reducers: {
        //更新state
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
        showLoading(state, action) {
            return { ...state, ...action.payload, loading: true };
        },
        closeLoading(state, action) {
            return { ...state, ...action.payload, loading: false };
        },
        handleChangeLimitData(state, action) {

            let {stateVue} = state;
            let payload = action.payload;

            let stateVueCopy = JSON.parse(JSON.stringify(stateVue));

            stateVueCopy.map(function(statItem, stateindex) {
                if(statItem.key == payload.key) {

                    let acyion_type = (payload && payload.type) || '';
                    let acyion_data= (payload && payload.data) || '';

                    if(acyion_type == 'isLimit') {
                    } else if(acyion_type == 'limitNum') {
                        statItem.chart = acyion_data;
                    } else if(acyion_type == 'chart') {
                        statItem.chart = acyion_data;
                    }
                }
            });

            return { ...state, stateVue: stateVueCopy };
        },

        //更新微游戏模板选中数据
        handleOnGameModuleConfigChange(state, action) {
            let {addOrEditFormGameTransferAllContent,addOrEditFormGameTransferTargetContent} = state;
            let {payload} = action;

            let {eventType, eventData} = payload;

            let new_gameModuleDataSource = [];

            //模板选中情况变更时
            if(eventType == 'moduleSelectChange') {
                eventData && eventData.map(function(eItem, eIndex) {

                    let hasFind = false;
                    addOrEditFormGameTransferTargetContent &&
                    addOrEditFormGameTransferTargetContent.map(function(titem, tindex) {

                        if(titem.key == eItem) {
                            hasFind = true;
                            new_gameModuleDataSource.push(titem);
                        }
                    });

                    if(!hasFind) {

                        //判断当前key是否是可配置内付费
                        let itemCanLimit = false;
                        addOrEditFormGameTransferAllContent && addOrEditFormGameTransferAllContent.length > 0 && addOrEditFormGameTransferAllContent.map(function(sourceItem, sourceIndex) {
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
                addOrEditFormGameTransferTargetContent &&
                addOrEditFormGameTransferTargetContent.map(function(item, index) {
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

            return { ...state, addOrEditFormGameTransferTargetContent: new_gameModuleDataSource };
        },

        //微游戏模板配置 选中所有  限制人数
        handleSelectAllLimitNum(state, action) {
          let currentListKeys = action.payload.currentListKeys;
          let {addOrEditFormGameTransferAllContent, addOrEditFormGameTransferTargetContent} = state;

          let new_gameModuleDataSource = [];
          currentListKeys && currentListKeys.map(function(keyItem, keyIndex) {

              //判断当前key是否是可配置内付费
                let itemCanLimit = false;
                addOrEditFormGameTransferAllContent && addOrEditFormGameTransferAllContent.length > 0 && addOrEditFormGameTransferAllContent.map(function(sourceItem, sourceIndex) {
                    if(sourceItem.key == keyItem) {
                        itemCanLimit = sourceItem.isLimit ? true : false;
                    }
                });

              if(!itemCanLimit) {
                  return;
              }

              let hasFind = false;
              addOrEditFormGameTransferTargetContent &&
              addOrEditFormGameTransferTargetContent.map(function(titem, tindex) {
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

            return { ...state, addOrEditFormGameTransferTargetContent: new_gameModuleDataSource };
        },

        //微游戏模板配置 选中所有  不限制人数
        handleSelectAllNoLimitNum(state, action) {
          let currentListKeys = action.payload.currentListKeys;
          let {addOrEditFormGameTransferAllContent, addOrEditFormGameTransferTargetContent} = state;

          let new_gameModuleDataSource = [];
          currentListKeys && currentListKeys.map(function(keyItem, keyIndex) {

              //判断当前key是否是可配置内付费
                let itemCanLimit = false;
                addOrEditFormGameTransferAllContent && addOrEditFormGameTransferAllContent.length > 0 && addOrEditFormGameTransferAllContent.map(function(sourceItem, sourceIndex) {
                    if(sourceItem.key == keyItem) {
                        itemCanLimit = sourceItem.isLimit ? true : false;
                    }
                });

              if(!itemCanLimit) {
                  return;
              }

              let hasFind = false;
              addOrEditFormGameTransferTargetContent &&
              addOrEditFormGameTransferTargetContent.map(function(titem, tindex) {
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

            return { ...state, addOrEditFormGameTransferTargetContent: new_gameModuleDataSource };
        },

            //微游戏模板配置 选中所有  开通社交图谱
        handleSelectAllLimitEcharts(state, action) {
          let currentListKeys = action.payload.currentListKeys;
          let {addOrEditFormGameTransferAllContent, addOrEditFormGameTransferTargetContent} = state;
          let new_gameModuleDataSource = [];
          currentListKeys && currentListKeys.map(function(keyItem, keyIndex) {

              //判断当前key是否是可配置内付费
                let itemCanLimit = false;
                addOrEditFormGameTransferAllContent && addOrEditFormGameTransferAllContent.length > 0 && addOrEditFormGameTransferAllContent.map(function(sourceItem, sourceIndex) {
                    if(sourceItem.key == keyItem) {
                        itemCanLimit = sourceItem.isLimit ? true : false;
                    }
                });

              if(!itemCanLimit) {
                  return;
              }

              let hasFind = false;
              addOrEditFormGameTransferTargetContent &&
              addOrEditFormGameTransferTargetContent.map(function(titem, tindex) {
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

            return { ...state, addOrEditFormGameTransferTargetContent: new_gameModuleDataSource };
        },
    },
};
