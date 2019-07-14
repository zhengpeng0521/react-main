import {cusSeatList, cusManageTenantOrg ,seatUserSearch ,seatUserAdd ,seatUserBindQuery ,seatUserBind} from '../../services/CallCenter/AtTheManage';
import { parse } from 'qs';
import { message } from 'antd';


export default {
  namespace: 'atTheManage',

  state: {
    loading : false,       //列表加载状态

    list : [],             //列表数据
    total : 0,             //列表总条数
    pageIndex : 0,         //列表当前页码
    pageSize : 10,         //列表每页显示数量
    selectedRowKeys : [],  //列表选中项
    selectedRows : [],     //列表选中项数据
    searchData : {},
    searchVisible : true,  //模糊查询是否显示

    //新增
    atTheManageNewModalVisible : false,          //模态框显示状态

    atTheManageNewLoading : false,               //提交禁止状态
    atTheManageNewDisabled : false,

    atTheManageModelAllcontent : [],             //机构全部数据
    atTheManageModelTransferTargetContent : [],  //机构右边数据
    atTheManageModelOrgId : undefined,           //选中的机构ID

    atTheManageModelAccountAllcontent : [],             //账号全部数据
    atTheManageModelAccountTransferTargetContent : [],  //账号右边数据
    atTheManageModelOrgUserId  : undefined,             //选中账号id
    //改绑
    atTheManageToBindModalVisible : false,
    tenantUserName : undefined,  //原员工
    accCallOut : undefined,      //外呼账号
    employeeArr : [],            //新员工
    seatUserBindId : undefined,  //改绑主键id

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/at_the_manage') {
            dispatch({
                type: 'cusSeatList',
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
    *'cusSeatList'({ payload } , { put , call , select }){
            yield put({type : 'showLoading'});
            let searchData = {};
            if(payload && payload.searchData){
                searchData = payload.searchData;
                delete payload.searchData;
            }
            let params = { ...payload , ...searchData }

            let { ret } = yield call(cusSeatList,parse(params));
            if( ret && ret.errorCode == '9000' ){

                if (ret.results.length == 0 && payload.pageIndex > 0){
                    params.pageIndex -= 1;
                    let { ret } = yield call(cusSeatList,parse(params));
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
                    atTheManageModelAllcontent : oragnArray,
                    atTheManageModelTransferTargetContent : [],
                }
            });

        }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
        yield put({ type : 'closeLoading' });
    },
    //搜索账号
     *'seatUserSearch'({ payload }, { call, put , select }){
        yield put({ type : 'showLoading' });
        const { ret } = yield call(seatUserSearch,parse(payload));   //请求机构列表
        if (ret && ret.errorCode === 9000) {
            let oragnArray = [];
            for(let i in (ret.results)){
                if((ret.results)[i].isAdd=='0'){  //未添加
                   oragnArray.push({
                        title : (ret.results)[i].name+'('+(ret.results)[i].id+')',
                        key : (ret.results)[i].id,
                    });
                }else{
                    oragnArray.push({
                        title : (ret.results)[i].name+'('+(ret.results)[i].id+')',
                        key : (ret.results)[i].id,
                        disabled : true,
                    });
                }
            }
            yield put({
                type:'updateState',
                payload:{
                    atTheManageModelAccountAllcontent : oragnArray,     //账号全部数据
                    atTheManageModelAccountTransferTargetContent : [],  //账号右边数据
                }
            });

        }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
        yield put({ type : 'closeLoading' });
    },
    //新增保存
    *'seatUserAdd'({ payload }, { call, put , select }){
        const { ret } = yield call(seatUserAdd,parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success('坐席新增成功');
            yield put({
                type: 'cusSeatList',
                payload: {
                    pageSize : 10,
                    pageIndex : 0,
                }

            });
            yield put({
                type:'updateState',
                payload:{
                    atTheManageNewModalVisible : false,
                    atTheManageNewLoading : false,
                    atTheManageNewDisabled : false,
                    atTheManageModelAllcontent : [],
                    atTheManageModelTransferTargetContent : [],
                    atTheManageModelAccountAllcontent : [],
                    atTheManageModelAccountTransferTargetContent : [],
                    atTheManageModelOrgId : undefined,
                    atTheManageModelOrgUserId : undefined,

                }
            });
        }else {
            yield put({
                type:'updateState',
                payload:{
                    atTheManageNewLoading : false,
                    atTheManageNewDisabled : false,
                }
            });
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },
    //改绑新员工列表
    *'seatUserBindQuery'({ payload }, { call, put , select }){
        const { ret } = yield call(seatUserBindQuery,parse(payload));
        if (ret && ret.errorCode === 9000) {

            yield put({
                type:'updateState',
                payload:{
                    atTheManageToBindModalVisible : true,
                    employeeArr : ret.results,
                }
            });
        }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },
    //改绑保存
    *'seatUserBind'({ payload }, { call, put , select }){
        const { ret } = yield call(seatUserBind,parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success('改绑成功');
            let userManage = yield select(state => state.userManage);
            yield put({
                type: 'cusSeatList',
                payload: {
                    pageSize : userManage.pageSize,
                    pageIndex : userManage.pageIndex,
                }

            });
            yield put({
                type:'updateState',
                payload:{
                    atTheManageToBindModalVisible : false,
                    employeeArr : [],
                    tenantUserName : undefined,
                    accCallOut : undefined,
                    seatUserBindId : undefined,
                }
            });
        }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    }

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
