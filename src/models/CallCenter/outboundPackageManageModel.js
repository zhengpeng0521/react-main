import {cusPackageList ,cusManageTenantOrg ,cusPackageOpenPro ,cusPackageEdit,
        cusPackageQuery ,cusPackageAdd ,cusPackageEditor ,seatUserBindQuery,
        cusPackageOpenAdd,cusPackageOpenList,cusPackageOpenEdit,cusPackageOpenEditor,
        cusPackageOpenAudit,cusPackageOpenSeatQuery,
       } from '../../services/CallCenter/OutboundPackageManage';
import { parse } from 'qs';
import { message } from 'antd';


export default {
  namespace: 'outboundPackageManage',

  state: {
    tabKey          : '1',           //tab切换标签
    loading         : false,         //列表加载状态

    list            : [],            //列表数据
    total           : 0,             //列表总条数
    pageIndex       : 0,             //列表当前页码
    pageSize        : 10,            //列表每页显示数量
    selectedRowKeys : [],            //列表选中项
    selectedRows    : [],            //列表选中项数据

    searchData      : {},            //查询数据
    searchVisible   : true,          //模糊查询是否显示

    SalesProductSetupDetail              : {},                              //销售产品设置编辑详情数据

    //新增产品属性
    OutboundPackageNewModalVisible       : false,                           //模态框显示状态
    OutboundPackageNewModalButtonLoading : false,                           //提交禁止状态
    OutboundPackageType : 0,

    //开通套餐
    OutboundOpenPackageModelVisible      : false,
    outboundModalButtonLoading           : false,

    OutboundOpenPackageModalAllcontent   : [],                              //搜索出来的总机构
    OutboundOpenPackageModalTransferTargetContent : [],                     //选中的机构
    OutboundOpenPackageModalOrgId        : undefined,                       //选中的机构id
    OutboundOpenPackageGradientAllData   : [],                              //坐席梯度总数据
    OutboundOpenPackageSelectTableIdArr  : [],                              //坐席下拉框数组
    totalPrice                           : 0,                               //总价格
    realPrice                            : 0,                               //实收

    //坐席选择内部弹窗
    OutboundSelectTableInnerModalVisible : false,
    OutboundSelectTableEmployeeArr       : [],                               //坐席人员选择
    OutboundSelectedRowKeys              : [],                               //选中的坐席人员
    OutboundSelectTable_num_index        : undefined,                        //选择人员的下标



    OutboundOpenPackageGradientTimeData  : [],                               //时长总数据


    //审核
    OutboundOpenPackageCheckModelVisible : false,

    //详情
    OutboundOpenPackageModelDetail       : {},                                //套餐详情数据

    OutboundOpenPackageModelType         : undefined,                          //check:审核  ， view:查看

    OutboundCheckInnerModalVisible       : false,
    OutboundCheckInnerEmployeeArr        : [],   //坐席人员数据

    //编辑时机构orgId 用来判断编辑时是否重新选择机构
    wetherEditOrgId                      : undefined,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/outbound_package_manage') {
            dispatch({
                type : 'updateState',
                payload : {
                    tabKey : '1'
                }
            })
            dispatch({
                type: 'cusPackageList',
                payload: {
                    pageSize : 10,
                    pageIndex : 0,
                }

            });
        }
      });
    },
  },
  effects: {
    *'cusPackageList'({ payload } , { put , call , select }){
        yield put({type : 'showLoading'});
        let searchData = {};
        if(payload && payload.searchData){
            searchData = payload.searchData;
            delete payload.searchData;
        }
        let params = { ...payload , ...searchData }

        let { ret } = yield call(cusPackageList,parse(params));
        if( ret && ret.errorCode == '9000' ){
            if (ret.results.length == 0 && payload.pageIndex > 0){
                params.pageIndex -= 1;
                let { ret } = yield call(cusPackageList,parse(params));
                if( ret && ret.errorCode == '9000' ){
                    yield put({
                        type : 'updateState',
                        payload : {
                            list: ret.results,
                            total: ret.data.resultCount,
                            pageIndex : ret.data.pageIndex,
                            pageSize : ret.data.pageSize,
                            searchData,
                        }
                    })
                }else{
                    ret && ret.errorMessage && message.error(ret.errorMessage) || message.error('查询失败')
                }
            }else{
                yield put({
                    type : 'updateState',
                    payload : {
                        list: ret.results,
                        total: ret.data.resultCount,
                        pageIndex : ret.data.pageIndex,
                        pageSize : ret.data.pageSize,
                        searchData,
                    }
                })
            }

        }else{
            ret && ret.errorMessage && message.error(ret.errorMessage) || message.error('查询失败')
        }
        yield put({type : 'closeLoading'})
    },
    *'cusPackageOpenList'({ payload } , { put , call , select }){
        yield put({type : 'showLoading'});
        let searchData = {};
        if(payload && payload.searchData){
            searchData = payload.searchData;
            delete payload.searchData;
        }
        let params = { ...payload , ...searchData }
        let { ret } = yield call(cusPackageOpenList,parse(params));
        if( ret && ret.errorCode == '9000' ){
            if (ret.results.length == 0 && payload.pageIndex > 0){
                params.pageIndex -= 1;
                let { ret } = yield call(cusPackageOpenList,parse(params));
                if( ret && ret.errorCode == '9000' ){
                    yield put({
                        type : 'updateState',
                        payload : {
                            list: ret.results,
                            total: ret.data.resultCount,
                            pageIndex : ret.data.pageIndex,
                            pageSize : ret.data.pageSize,
                            searchData,
                        }
                    })
                }else{
                    ret && ret.errorMessage && message.error(ret.errorMessage) || message.error('查询失败')
                }
            }else{
                yield put({
                    type : 'updateState',
                    payload : {
                        list: ret.results,
                        total: ret.data.resultCount,
                        pageIndex : ret.data.pageIndex,
                        pageSize : ret.data.pageSize,
                        searchData,
                    }
                })
            }

        }else{
            ret && ret.errorMessage && message.error(ret.errorMessage) || message.error('查询失败')
        }
        yield put({type : 'closeLoading'})
    },
    /*销售产品设置操作（上架、下架、删除）*/
    *'cusPackageEdit'({ payload },{ call , put , select }){
        const { ret } = yield call(cusPackageEdit,parse(payload));
        let outboundPackageManage = yield select(state => state.outboundPackageManage);
        if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'cusPackageList',
                payload: {
                    pageSize : outboundPackageManage.pageSize,
                    pageIndex : outboundPackageManage.pageIndex,
                }

            });
        }

    },
    /*新增保存*/
    *'cusPackageAdd'({ payload },{ call, put , select }){
        const { ret } = yield call(cusPackageAdd,parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success('新增产品成功');
            yield put({
                type: 'cusPackageList',
                payload: {
                    pageSize : 10,
                    pageIndex : 0,
                }
            });
            yield put({
                type:'updateState',
                payload:{
                    OutboundPackageNewModalVisible : false,
                    OutboundPackageType : '0',
                    SalesProductSetupDetail : {},
                }
            });
        }
    },
    /*编辑保存*/
    *'cusPackageEditor'({ payload },{ call, put , select }){
        const { ret } = yield call(cusPackageEditor,parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success('产品编辑成功');
            yield put({
                type: 'cusPackageList',
                payload: {
                    pageSize : 10,
                    pageIndex : 0,
                }
            });
            yield put({
                type:'updateState',
                payload:{
                    OutboundPackageNewModalVisible : false,
                    OutboundPackageType : '0',
                    SalesProductSetupDetail : {},
                }
            });
        }
    },
    /*销售产品设置编辑详情查询*/
    *'cusPackageQuery'({ payload },{ call, put , select }){
        const { ret } = yield call(cusPackageQuery,parse(payload));
        if (ret && ret.errorCode === 9000) {
            yield put({
                type:'updateState',
                payload:{
                    OutboundPackageNewModalVisible : true,
                    SalesProductSetupDetail : ret,
                    OutboundPackageType : ret.proType
                }
            });
        }
    },
    /*搜索机构信息*/
    *'cusManageTenantOrg'({ payload }, { call, put , select }){
        yield put({ type : 'showLoading' });
        const { ret } = yield call(cusManageTenantOrg,parse(payload));   //请求机构列表
        if (ret && ret.errorCode === 9000) {
            let oragnArray = [];
            for(let i in (ret.results)){
                oragnArray.push({
                    title : (ret.results)[i].orgName+'('+(ret.results)[i].orgId+')',
                    key : (ret.results)[i].orgId,
                });
            }

            yield put({
                type:'updateState',
                payload:{
                    OutboundOpenPackageModalAllcontent            : oragnArray,
                    //OutboundOpenPackageModalTransferTargetContent : [],
                }
            });

        }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
        yield put({ type : 'closeLoading' });
    },
    // 开通套餐获取坐席套餐下拉框
    *'cusPackageOpenPro'({payload}, {put, call, select}){
        let param = {
            proType : payload.proType
        }
        let { ret } = yield call(cusPackageOpenPro,parse(param));
        if(ret && ret.errorCode == '9000'){
            for(let i in ret.results){
                ret.results[i].display = true;
            }
            if(payload.proType=='0'){   //坐席
                yield put({
                    type : 'updateState',
                    payload : {
                        OutboundOpenPackageSelectTableIdArr : ret.results,
                    }
                })
            }

            if( payload.type && payload.type== 'newAdd' ){  //如果是新增的时候
                yield put({
                    type : 'updateState',
                    payload : {
                        OutboundOpenPackageGradientAllData   : [{
                                                                    item_index  : '0',             //下标
                                                                    packId      : undefined,       //坐席下拉表默认选中第一个
                                                                    salePrice   : '',              //售卖价格
                                                                    saleUnit    : '',              //售卖单位
                                                                    pesonNum    : '',              //人数
                                                                    seatIds     : undefined,       //已选人数Id
                                                                    cycleNum    : '',              //周期数量
                                                                    totalPrice  : '',              //合计价格
                                                                    actualPrice : '',              //实收价格
                                                                    type        : '1',             //用于区分坐席还是时长包
                                                                }],
                        OutboundOpenPackageGradientTimeData : [{
                                                                    item_index  : '0',
                                                                    duration    : '',              //蜂豆数
                                                                    costPrice   : '',              //成本价
                                                                    salePrice   : '',              //售卖价格
                                                                    actualPrice : '',              //实收价格
                                                                }],
                    }
                })

            }

        }else{
            message.error(ret && ret.errorMessage ? ret.errorMessage : '获取坐席套餐信息失败');

        }
    },
    //选择坐席人员
    *'seatUserBindQuery'({ payload }, { call, put , select }){
        const { ret } = yield call(seatUserBindQuery,parse(payload));
        if (ret && ret.errorCode === 9000) {
            yield put({
                type:'updateState',
                payload:{
                    OutboundSelectTableInnerModalVisible : true,
                    OutboundSelectTableEmployeeArr : ret.results,
                }
            });
        }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },
    //开通套餐保存
    *'cusPackageOpenAdd'({ payload }, { call, put , select }){
        const { ret } = yield call(cusPackageOpenAdd,parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success('套餐新增成功');
            yield put({
                type:'updateState',
                payload:{
                    OutboundOpenPackageModelVisible     : false,
                    outboundModalButtonLoading          : true,
                    OutboundOpenPackageGradientAllData  : [],
                    OutboundOpenPackageGradientTimeData : [],
                    OutboundOpenPackageModalAllcontent  : [],
                    OutboundOpenPackageModalOrgId       : undefined,
                    OutboundSelectedRowKeys             : [],
                    OutboundSelectTable_num_index       : undefined,
                    totalPrice                          : 0,
                    realPrice                           : 0,
                    OutboundOpenPackageModalTransferTargetContent : [],
                    outboundModalButtonLoading : false,
                }
            });
            yield put({
                type: 'cusPackageOpenList',
                payload: {
                    pageSize : 10,
                    pageIndex : 0,
                }
            });
        }else {
            yield put({
                type:'updateState',
                payload:{
                    outboundModalButtonLoading          : false,
                }
            });
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },
    //套餐详情
    *'cusPackageOpenEdit'({ payload }, { call, put , select }){
        yield put({type : 'showLoading'});
        let param = {
            id : payload.id
        }
        const { ret } = yield call(cusPackageOpenEdit,parse(param));
        let outboundPackageManage = yield select(state => state.outboundPackageManage);
        let OutboundOpenPackageSelectTableIdArr = outboundPackageManage.OutboundOpenPackageSelectTableIdArr;
        if (ret && ret.errorCode === 9000) {
            let OutboundOpenPackageGradientAllData = [];
            let OutboundOpenPackageGradientTimeData = [];
            let OutboundOpenPackageSelectedTableArr = []; //初始化已选中的坐席套餐

            if(ret.openPackageVoList && (ret.openPackageVoList).length>0){
                let openPackageVoList = ret.openPackageVoList;
                for(var i in openPackageVoList){
                    let OutboundOpenPackageGradientObj = {};
                    if(openPackageVoList[i].type=='0'){    //坐席

                        OutboundOpenPackageGradientObj.item_index  = i;
                        OutboundOpenPackageGradientObj.packId      = openPackageVoList[i].packId;
                        OutboundOpenPackageGradientObj.salePrice   = openPackageVoList[i].salePrice;
                        OutboundOpenPackageGradientObj.saleUnit    = openPackageVoList[i].saleUnit;
                        OutboundOpenPackageGradientObj.pesonNum    = openPackageVoList[i].pesonNum;
                        OutboundOpenPackageGradientObj.seatIds     = openPackageVoList[i].seatIds;
                        OutboundOpenPackageGradientObj.cycleNum    = openPackageVoList[i].cycleNum;
                        OutboundOpenPackageGradientObj.totalPrice  = openPackageVoList[i].totalPrice;
                        OutboundOpenPackageGradientObj.actualPrice = openPackageVoList[i].realPrice;
                        OutboundOpenPackageGradientObj.packageName = openPackageVoList[i].packageName;
                        OutboundOpenPackageGradientObj.goodsId     = openPackageVoList[i].goodsId;
                        OutboundOpenPackageGradientObj.type        = '1';

                        OutboundOpenPackageGradientAllData.push(OutboundOpenPackageGradientObj);

                        OutboundOpenPackageSelectedTableArr.push(openPackageVoList[i].packId);
                    }

                }

                //已经选中的坐席套餐置为不可选
                for(var i in OutboundOpenPackageSelectTableIdArr){
                    if(OutboundOpenPackageSelectedTableArr.indexOf(OutboundOpenPackageSelectTableIdArr[i].id) > -1){
                        OutboundOpenPackageSelectTableIdArr[i].display = false;
                    }
                }

            }
            //蜂豆数
            let OutboundOpenPackageTimeObj     = {};
            OutboundOpenPackageTimeObj.item_index = '0',
            OutboundOpenPackageTimeObj.duration = ret.duration,
            OutboundOpenPackageTimeObj.costPrice = ret.costPrice,
            OutboundOpenPackageTimeObj.salePrice = ret.salePrice,
            OutboundOpenPackageTimeObj.actualPrice = ret.actualPrice,
            OutboundOpenPackageGradientTimeData.push(OutboundOpenPackageTimeObj);

            if(payload.type == 'check' || payload.type =='view'){ //审核及查看的时候不调取查询机构接口

            }else{
                yield put({
                    type: 'cusManageTenantOrg',
                    payload: {
                        orgName :ret.orgName,
                        flag : '1',
                    }
                });
            }


            if(payload.type == 'check' || payload.type =='view'){
                yield put({
                    type:'updateState',
                    payload:{
                        OutboundOpenPackageCheckModelVisible : true,
                        OutboundOpenPackageGradientAllData,
                        OutboundOpenPackageGradientTimeData,
                        OutboundOpenPackageModelDetail       : ret,
                        OutboundOpenPackageModalOrgId : ret.orgId,
                    }
                });
            }else if(payload.type == 'edit'){
                let orgIdArr= [];
                orgIdArr.push(ret.orgId);
                yield put({
                    type:'updateState',
                    payload:{
                        OutboundOpenPackageModelVisible : true,
                        OutboundOpenPackageGradientAllData,
                        OutboundOpenPackageGradientTimeData,
                        OutboundOpenPackageSelectTableIdArr             : OutboundOpenPackageSelectTableIdArr,
                        OutboundOpenPackageModelDetail                  : ret,
                        OutboundOpenPackageModalOrgId                   : ret.orgId,
                        OutboundOpenPackageModalTransferTargetContent   : orgIdArr,
                        wetherEditOrgId : ret.orgId,
                    }
                });
            }
        }
        yield put({type : 'closeLoading'});
    },
    //编辑详情保存
    *'cusPackageOpenEditor'({ payload }, { call, put , select }){
        const { ret } = yield call(cusPackageOpenEditor,parse(payload));
        let outboundPackageManage = yield select(state => state.outboundPackageManage);
        if (ret && ret.errorCode === 9000) {
            message.success('套餐编辑成功');
            yield put({
                type:'updateState',
                payload:{
                    OutboundOpenPackageModelVisible     : false,
                    outboundModalButtonLoading          : false,
                    OutboundOpenPackageGradientAllData  : [],
                    OutboundOpenPackageGradientTimeData : [],
                    OutboundOpenPackageModalAllcontent  : [],
                    OutboundOpenPackageModalOrgId       : undefined,
                    OutboundSelectedRowKeys             : [],
                    OutboundSelectTable_num_index       : undefined,
                    totalPrice                          : 0,
                    realPrice                           : 0,
                    OutboundOpenPackageModelDetail      : {},
                    OutboundOpenPackageModalTransferTargetContent : [],
                }
            });
            yield put({
                type: 'cusPackageOpenList',
                payload: {
                    pageSize : outboundPackageManage.pageSize,
                    pageIndex : outboundPackageManage.pageIndex,
                }
            });
        }else {
            yield put({
                type:'updateState',
                payload:{
                    outboundModalButtonLoading          : false,
                }
            });
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },
    //套餐审核
     *'cusPackageOpenAudit'({ payload }, { call, put , select }){
        const { ret } = yield call(cusPackageOpenAudit,parse(payload));
        let outboundPackageManage = yield select(state => state.outboundPackageManage);
        if (ret && ret.errorCode === 9000) {
            yield put({
                type:'updateState',
                payload:{
                    OutboundOpenPackageCheckModelVisible     : false,
                    OutboundOpenPackageModelType             : undefined,
                    OutboundOpenPackageModelDetail           : {},
                }
            });
            yield put({
                type: 'cusPackageOpenList',
                payload: {
                    pageSize : outboundPackageManage.pageSize,
                    pageIndex : outboundPackageManage.pageIndex,
                }
            });
        }else{
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
     },
    //审核查看坐席人员
    *'cusPackageOpenSeatQuery'({ payload }, { call, put , select }){
        const { ret } = yield call(cusPackageOpenSeatQuery,parse(payload));
        let outboundPackageManage = yield select(state => state.outboundPackageManage);
        if (ret && ret.errorCode === 9000) {
            yield put({
                type:'updateState',
                payload:{
                    OutboundCheckInnerModalVisible       : true,
                    OutboundCheckInnerEmployeeArr        : ret.results,
                }
            });

        }else{
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
     },
  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    closeLoading(state) {
      return { ...state, loading: false };
    },
    updateState(state, action) {
        return { ...state, ...action.payload };
    },
    outboundOpenPackageTableChange( state, action ) {

        let OutboundOpenPackageGradientAllData = state.OutboundOpenPackageGradientAllData;
        let OutboundSelectedRowKeys = state.OutboundSelectedRowKeys;
        let payload = action.payload;

        if(payload.type == 'add'){
            OutboundOpenPackageGradientAllData.push({
                item_index  : (parseInt(payload.item_index) + 1) + '',         //下标
                packId      : undefined,       //坐席下拉表默认选中第一个
                salePrice   : '',              //售卖价格
                saleUnit    : '',              //售卖单位
                pesonNum    : '',              //人数
                seatIds     : undefined,              //已选人数Id
                cycleNum    : '',              //周期数量
                totalPrice  : '',              //合计价格
                actualPrice : '',              //实收价格
                type        : '1',             //用于区分坐席还是时长包
            })
        }else{
            for(let i in OutboundOpenPackageGradientAllData){
                if(OutboundOpenPackageGradientAllData[i].item_index == payload.item_index){
                    switch(payload.type){
                        case 'delete'    :
                            OutboundOpenPackageGradientAllData.splice(i,1) ;
                            break ;
                        case 'pesonNum' :
                            OutboundOpenPackageGradientAllData[i].pesonNum   = payload.pesonNum;
                            OutboundOpenPackageGradientAllData[i].seatIds  = (payload.seatIds).join(',');
                            OutboundOpenPackageGradientAllData[i].totalPrice = Number(OutboundOpenPackageGradientAllData[i].salePrice)*Number(OutboundOpenPackageGradientAllData[i].pesonNum)*Number(OutboundOpenPackageGradientAllData[i].cycleNum)
                            break ;
                        case 'cycleNum' :
                            OutboundOpenPackageGradientAllData[i].cycleNum = payload.cycleNum;
                            OutboundOpenPackageGradientAllData[i].totalPrice = Number(OutboundOpenPackageGradientAllData[i].salePrice)*Number(OutboundOpenPackageGradientAllData[i].pesonNum)*Number(OutboundOpenPackageGradientAllData[i].cycleNum)
                            break ;
                        case 'actualPrice' :
                            OutboundOpenPackageGradientAllData[i].actualPrice = payload.actualPrice;
                            break ;
                        case 'selectSeatIds' :
                            if(OutboundOpenPackageGradientAllData[i].seatIds){
                                OutboundSelectedRowKeys = (OutboundOpenPackageGradientAllData[i].seatIds).split(',');
                            }

                            break ;
                    }
                    break;
                }

            }
        }

        return { ...state, OutboundOpenPackageGradientAllData ,OutboundSelectedRowKeys};
    },
    //使坐席下拉列表项可选或置灰
    outboundPackageTableIdOperationArr( state, action ) {
        let OutboundOpenPackageSelectTableIdArr = state.OutboundOpenPackageSelectTableIdArr;
        let tableId = action.payload.tableId;
        let display = action.payload.display;
        for(let i in OutboundOpenPackageSelectTableIdArr){
            if(tableId == OutboundOpenPackageSelectTableIdArr[i].id){
                OutboundOpenPackageSelectTableIdArr[i].display = display;
                break;
            }

        }
        return { ...state, OutboundOpenPackageSelectTableIdArr };
    },
    //将坐席下拉框选中项的tableId替换
    outboundPackageTableId(state, action){
        let OutboundOpenPackageGradientAllData  = state.OutboundOpenPackageGradientAllData;
        let OutboundOpenPackageSelectTableIdArr = state.OutboundOpenPackageSelectTableIdArr;

        let tableId     = action.payload.tableId;
        let item_index  = action.payload.item_index;
        let sale_price  = undefined;
        let sale_unit   = undefined;
        //将售卖价格替换为选中的坐席套餐
        for(let i in OutboundOpenPackageSelectTableIdArr){
            if(tableId == OutboundOpenPackageSelectTableIdArr[i].id){
                sale_price = OutboundOpenPackageSelectTableIdArr[i].salePrice;
                sale_unit  = OutboundOpenPackageSelectTableIdArr[i].saleUnit;
                break;
            }
        }
        for(let i in OutboundOpenPackageGradientAllData){
            if(item_index == OutboundOpenPackageGradientAllData[i].item_index){
                OutboundOpenPackageGradientAllData[i].packId    = tableId;
                OutboundOpenPackageGradientAllData[i].salePrice = sale_price;
                OutboundOpenPackageGradientAllData[i].saleUnit  = sale_unit;
                OutboundOpenPackageGradientAllData[i].totalPrice = Number(OutboundOpenPackageGradientAllData[i].salePrice)*Number(OutboundOpenPackageGradientAllData[i].pesonNum)*Number(OutboundOpenPackageGradientAllData[i].cycleNum)
                break;
            }
        }
        return { ...state , OutboundOpenPackageGradientAllData };
    },

    //时长包数据变化
    outboundOpenPackageTableTimeChange( state, action ) {
        let OutboundOpenPackageGradientTimeData = state.OutboundOpenPackageGradientTimeData;

        let payload = action.payload;

        for(let i in OutboundOpenPackageGradientTimeData){
            switch(payload.type){
                case 'duration' :
                    OutboundOpenPackageGradientTimeData[i].duration = payload.value;
                    break ;
                case 'costPrice' :
                    OutboundOpenPackageGradientTimeData[i].costPrice = payload.value;
                    break ;
                case 'salePrice' :
                    OutboundOpenPackageGradientTimeData[i].salePrice = payload.value;
                    break ;
                case 'actualPrice' :
                    OutboundOpenPackageGradientTimeData[i].actualPrice = payload.value;
                    break ;

            }
            break;

        }

        return { ...state, OutboundOpenPackageGradientTimeData };
    },

  },

};
