import {cusManageList, searchOrgMessage ,cusManageAudit ,cusManageQuery ,getOrgAddrById ,cusManageAdd ,cusManageEdit} from '../../services/CallCenter/CustomerManage';
import { parse } from 'qs';
import { message } from 'antd';


export default {
  namespace: 'userManage',

  state: {
    loading : false,                            //列表加载状态

    list : [],                                  //列表数据
    total : 0,                                  //列表总条数
    pageIndex : 0,                              //列表当前页码
    pageSize : 10,                              //列表每页显示数量
    selectedRowKeys : [],                       //列表选中项
    selectedRows : [],                          //列表选中项数据
    searchData : {},
    searchVisible : true,                       //模糊查询是否显示

    //新增或者编辑模态框
    userManageNewModalVisible : false,          //模态框显示状态
    userManageModalButtonLoading : false,       //提交禁止状态
    userManageModalLoading  : false,            //页面加载状态
    userManageModelAllcontent :[],              //模态框穿梭框左边数据
    userManageModelTransferTargetContent :[],   //模态框穿梭框右边数据

    userManageModelDetail : {},                 //详情数据
    orgAddress : undefined,                     //机构地址
    orgId      : undefined,                     //机构id

    //审核模态框
    userManageCheckModalVisible : false,
    tenantIid : undefined,                      //审核时的主键id


    //查看客户资料
    userManageDetailModalVisible : false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/customer_manage') {
            dispatch({
                type: 'cusManageList',
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
    *'cusManageList'({ payload } , { put , call , select }){
        yield put({type : 'showLoading'});
        let searchData = {};
        if(payload && payload.searchData){
            searchData = payload.searchData;
            delete payload.searchData;
        }
        let params = { ...payload , ...searchData }
        let { ret } = yield call(cusManageList,parse(params));
        if( ret && ret.errorCode == '9000' ){
            if (ret.results.length == 0 && payload.pageIndex > 0){
                params.pageIndex -= 1;
                let { ret } = yield call(cusManageList,parse(params));
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
    //审核
    *'cusManageAudit'({ payload }, { call, put, select}){
        let { ret } = yield call(cusManageAudit,parse(payload));
        if(ret && ret.errorCode === 9000){
            message.success('审核成功');
            let userManage = yield select(state => state.userManage);
            let searchData = userManage.searchData || {};
            let pageIndex = userManage.pageIndex;
            let pageSize = userManage.pageSize;
            yield put({
                type : 'updateState',
                payload : {
                    userManageCheckModalVisible : false,
                }
            })
            yield put({
                type : 'cusManageList',
                payload : {
                    pageIndex,
                    pageSize,
                    searchData,
                }
            })
        }else{
            ret && ret.errorMessage && message.error(ret.errorMessage) || message.error('失败')
        }
    },

    //详情
    *'cusManageQuery'({ payload }, { call, put, select}){
        yield put({type : 'showLoading'});
        let { ret } = yield call(cusManageQuery,parse(payload));
        if(ret && ret.errorCode === 9000){
            yield put({
                type : 'searchOrgMessage',
                payload : {
                    orgName : ret.orgName,
                }
            })
            let orgid= [];
            orgid.push(ret.orgId)

            yield put({
                type : 'updateState',
                payload : {
                    userManageModelDetail : ret,
                    orgAddress : ret.orgAddress,
                    orgId : ret.orgId,
                    userManageModelTransferTargetContent : orgid,
                    userManageNewModalVisible : true,
                }
            })

        }else{
            yield put({
                type : 'updateState',
                payload : {
                    userManageModalLoading : false,
                }
            })
            ret && ret.errorMessage && message.error(ret.errorMessage) || message.error('失败')
        }
        yield put({type : 'closeLoading'});
    },
    //详情 2 客户资料查看
    *'cusManageQuery2'({ payload }, { call, put, select}){
        yield put({type : 'showLoading'});
        let { ret } = yield call(cusManageQuery,parse(payload));
        if(ret && ret.errorCode === 9000){
            yield put({
                type : 'updateState',
                payload : {
                    userManageDetailModalVisible : true,
                    userManageModelDetail : ret,
                }
            })

        }else{
            ret && ret.errorMessage && message.error(ret.errorMessage) || message.error('失败')
        }
        yield put({type : 'closeLoading'});
    },


     /*搜索机构信息*/
    *'searchOrgMessage'({ payload }, { call, put , select }){
        yield put({ type : 'showLoading' });
        const { ret } = yield call(searchOrgMessage,parse(payload));   //请求机构列表
        if (ret && ret.errorCode === 9000) {
            let oragnArray = [];
            for(let i in (ret.results)){
                if((ret.results)[i].status=='2'){
                   oragnArray.push({
                        title : (ret.results)[i].orgName+'('+(ret.results)[i].orgId+')'+' '+'已审核',
                        key : (ret.results)[i].orgId,
                        disabled : true,
                    });
                }else if((ret.results)[i].status=='1' ){
                    oragnArray.push({
                        title : (ret.results)[i].orgName+'('+(ret.results)[i].orgId+')'+' '+'未审核',
                        key : (ret.results)[i].orgId,
                        disabled : true,
                    });
                }else{
                    oragnArray.push({
                        title : (ret.results)[i].orgName+'('+(ret.results)[i].orgId+')',
                        key : (ret.results)[i].orgId,
                    });
                }

            }
            yield put({
                    type:'updateState',
                    payload:{
                        userManageModelAllcontent : oragnArray,
                        loading : false,
                        userManageModalLoading : false,
                    }
                });

        }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
        yield put({ type : 'closeLoading' });
    },

    /*根据机构id获取机构地址*/
    *'getOrgAddrById'({ payload }, { call, put , select }){
        const { ret } = yield call(getOrgAddrById,parse(payload));   //请求机构列表
        if (ret && ret.errorCode === 9000) {
            yield put({
                type:'updateState',
                payload:{
                    orgAddress : ret.orgAddress,
                }
            });

        }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },

    //新增保存
    *'cusManageAdd'({ payload }, { call, put , select }){
        const { ret } = yield call(cusManageAdd,parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success('客户新增成功');
            yield put({
                type:'updateState',
                payload:{
                    userManageNewModalVisible : false,
                    userManageModelAllcontent : [],
                    userManageModelTransferTargetContent : [],
                    userManageModelDetail : {},
                    tenantIid : undefined,
                    orgId : undefined,
                    orgAddress : undefined,
                    userManageModalButtonLoading : false,
                }
            });
            yield put({
                type : 'cusManageList',
                payload : {
                    pageIndex : 0,
                    pageSize : 20,
                }
            })

        }else {
            yield put({
                type:'updateState',
                payload:{
                    userManageModalButtonLoading : false,
                }
            });
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },
    //编辑保存
    *'cusManageEdit'({ payload }, { call, put , select }){
        const { ret } = yield call(cusManageEdit,parse(payload));
        if (ret && ret.errorCode === 9000) {
            yield put({
                type:'updateState',
                payload:{
                    userManageNewModalVisible : false,
                    userManageModelAllcontent : [],
                    userManageModelTransferTargetContent : [],
                    userManageModelDetail : {},
                    tenantIid : undefined,
                    orgId : undefined,
                    orgAddress : undefined,
                    userManageModalButtonLoading : false,
                }
            });
            yield put({
                type : 'cusManageList',
                payload : {
                    pageIndex : 0,
                    pageSize : 20,
                }
            })

        }else {
            yield put({
                type:'updateState',
                payload:{
                    userManageModalButtonLoading : false,
                }
            });
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


  },

};
