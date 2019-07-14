import {
    MechanismList,
    MechanismAdd,
    MechanismUpdateState,
    MechanismEdit,
    MechanismUpdate,
} from '../../services/Wechat/WechatMechanism';
import { parse } from 'qs';
import { message } from 'antd';
import qs from 'qs';


export default {

  namespace: 'wechatMechanismModel',

  state: {
       /*table*/
        mechPageIndex : 0,        //页码
        mechPageSize : 10,        //一页条数
        mechLoading : false,      //列表加载状态
        mechTotal : undefined,    //列表内容总条数
        mechTableContent : [],    //列表内容

        /*search bar*/
        searchVisible : true,       //搜索栏是否显示
        searchContent : {},         //搜索栏搜索内容
        /*新增*/
        addOrEditMechVisible : false,            //新增编辑modal是否显示
        addOrEditSupModalButtonLoading : false,         //新增编辑modal按钮是否在加载状态
        checkOrEditMsg : {}                    //新增编辑信息
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/sys_wechat_mechanism') {
            dispatch({
                 type:'MechanismList',
                 payload:{
                     pageIndex : 0,
                     pageSize : 10,
                    }
            })
        }
      });
    },
  },

  effects: {
      /*列表*/
       *'MechanismList'({ payload },{ put , call , select }){
            yield put({ type:'showLoading' });
            const { ret,err } = yield call(MechanismList,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        mechTableContent:ret.results,
                        mechTotal:ret.data.resultCount,
                        mechPageIndex : ret.data.pageIndex || 0,
                        mechPageSize : ret.data.pageSize || 10,
                        searchContent : payload
                    }
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({ type:'closeLoading' });
        },

        /*新增*/
        *'MechanismAdd'({ payload },{ put , call , select }){
            yield put({ type:'showLoading' });
            let wechatMechanismModel = yield select(state => state.wechatMechanismModel);
            let pageIndex = wechatMechanismModel.mechPageIndex;
            let pageSize = wechatMechanismModel.mechPageSize;
            let searchContent = wechatMechanismModel.searchContent;
            let params = { pageIndex , pageSize , ...searchContent };
            payload.province = payload.addrColumn[0];
            payload.city = payload.addrColumn[1];
            payload.area = payload.addrColumn[2];
            let { ret } = yield call(MechanismAdd,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                message.success('新增成功');
                yield put({
                    type:'updateState',
                    payload:{
                        addOrEditMechVisible : false,
                        checkOrEditMsg : {}
                    }
                });
                yield put({
                    type:'MechanismList',
                    payload:{
                        ...params
                    }
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({ type:'closeLoading' });
        },

        /*查询单个信息*/
        *'MechanismEdit'({payload},{put , call , select}){
            yield put({ type:'showLoading' });
            const { ret,err} = yield call(MechanismEdit,parse(payload));
            if(ret && ret.errorCode === 9000){
            	if(ret.data.province && ret.data.city && ret.data.area){
            		let obj =[ret.data.province,ret.data.city,ret.data.area];
            		ret.data.addrColumn = JSON.stringify(obj);
            	}
                yield put({
                    type:'updateState',
                    payload:{
                        checkOrEditMsg : ret.data,
                        addOrEditMechVisible:true,
                    }
                })
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('失败')
            }
			yield put({type:'closeLoading'});
        },
        /*编辑*/
        *'MechanismUpdate'({payload},{put , call , select}){
            yield put({ type:'showLoading' });
            payload.province = payload.addrColumn[0];
            payload.city = payload.addrColumn[1];
            payload.area = payload.addrColumn[2];
            const { ret,err} = yield call(MechanismUpdate,parse(payload));
            if(ret && ret.errorCode === 9000){
            	message.success('编辑成功');
                yield put({
                    type:'updateState',
                    payload:{
                        addOrEditMechVisible : false,
                        checkOrEditMsg : {}
                    }
                });
            	yield put({
                    type:'MechanismList',
                });
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('失败')
            }
			yield put({type:'closeLoading'});
        },

        /*修改状态*/
        *'MechanismUpdateState'({ payload } , { put , call , select }){
                yield put({type:'showLoading'});
                let { ret } = yield call(MechanismUpdateState,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({
                        type:'MechanismList',
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeLoading'});
            },

  },

  reducers: {
       //加载状态
        showLoading(state, action) {
            return { ...state, ...action.payload, mechLoading:true };
        },
        //取消加载
        closeLoading(state, action) {
            return { ...state, ...action.payload, mechLoading:false };
        },
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
  },
};
