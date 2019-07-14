import { showKouBeiGameList,queryForKouBeiGameList,kouBeiGameChangeStatus,kouBeiGameUpdate,kouBeiGameAfterOperation } from '../../services/KouBeiGameMgr/KouBeiGameMgr';
import { parse } from 'qs';
import { message } from 'antd';

//后台配置 帖子专题
export default {

    namespace: 'kouBeiGameMgr',

    state: {
        kouBeiGameLoading:false,        //口碑游戏列表加载状态

        kouBeiGameList:[],           //口碑游戏列表数据

        kouBeiGameTotal:'',          //口碑游戏列表总条数

        kouBeiGamePageIndex:0,      //口碑游戏列表当前页码
        kouBeiGamePageSize:10,       //口碑游戏列表每页显示数量

        kouBeiGameFormLoading:false,    //口碑游戏是否加载中

        kouBeiGameFormData:{},       //口碑游戏表单数据

        kouBeiGameFormVisible:false,    //口碑游戏表单窗口是否显示

        kouBeiGameFormType:'create',       //口碑游戏表单类型 'create' / 'update'

        kouBeiGameSearchData:{},     //口碑游戏模糊查询数据

        kouBeiGameSearchVisible:true,  //口碑游戏模糊查询是否显示
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if(location.pathname === '/koubei_game') {
                    dispatch({
                        type: 'showKouBeiGameList'
                    });
                }
            });
        },
    },

    effects: {
        //口碑游戏默认加载
        *'showKouBeiGameList'({ payload }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload:{
                    kouBeiGameLoading:true,
                }
            });
            let pmType = 2;
            let pageIndex = 0;
            let pageSize = 10;
            let params = { pmType,pageSize,pageIndex };
            const { ret,err } = yield call(showKouBeiGameList,parse(params));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'updateState',
                    payload: {
                        kouBeiGameList : ret.results,
                        kouBeiGameTotal : ret.data.resultCount,
                    },
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({
                type: 'updateState',
                payload:{
                    kouBeiGameLoading:false,
                }
            });
        },

        //口碑游戏条件和分页查询
        *'queryForKouBeiGameList'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    kouBeiGameLoading:true,
                }
            });
            let pmType = 2;
            let params = { ...payload, pmType };
            const { ret,err } = yield call(queryForKouBeiGameList,parse(params));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'updateState',
                    payload: {
                        kouBeiGameList : ret.results,
                        kouBeiGameTotal : ret.data.resultCount,
                    },
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({
                type: 'updateState',
                payload:{
                    kouBeiGameLoading:false,
                }
            });
        },

        //口碑游戏设置上下架
        *'kouBeiGameChangeStatus'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    kouBeiGameLoading:true,
                }
            });
            const { ret,err } = yield call(kouBeiGameChangeStatus,parse(payload));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'kouBeiGameAfterOperation',
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({
                type: 'updateState',
                payload:{
                    kouBeiGameLoading:false,
                }
            });
        },

        //口碑游戏编辑
        *'kouBeiGameUpdate'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    kouBeiGameLoading:true,
                }
            });
            const { ret,err } = yield call(kouBeiGameUpdate,parse(payload));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'kouBeiGameAfterOperation',
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({
                type: 'updateState',
                payload:{
                    kouBeiGameLoading:false,
                    kouBeiGameFormLoading:false,
                    kouBeiGameFormVisible:false,
                }
            });
        },

        //微信游戏上下架和编辑后页面数据加载
        *'kouBeiGameAfterOperation'({ payload }, { call, put , select}){
            let kouBeiGameMgr = yield select(state => state.kouBeiGameMgr);
            let pmType = 2;
            let searchData = kouBeiGameMgr.kouBeiGameSearchData;
            let pageIndex = kouBeiGameMgr.kouBeiGamePageIndex;
            let pageSize = kouBeiGameMgr.kouBeiGamePageSize;
            let params = { pmType,pageIndex,pageSize,...searchData };
            const { ret,err } = yield call(kouBeiGameAfterOperation,parse(params));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'updateState',
                    payload: {
                        kouBeiGameList : ret.results,
                        kouBeiGameTotal : ret.data.resultCount,
                    },
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
        }
    },

  reducers: {
    //表格加载中
    showLoading(state, action) {
      return { ...state,...action.payload,loading: true };
    },
    closeLoading(state, action) {
      return { ...state,...action.payload,loading: false };
    },
    updateState(state, action) {
        return { ...state, ...action.payload };
    },
  },
};
