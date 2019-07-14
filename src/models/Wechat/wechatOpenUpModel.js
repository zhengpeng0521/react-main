import {
    OpenUpList,
    OpenUpAdd,
    OpenUpUpdateState,
    OpenUpEdit,
} from '../../services/Wechat/WechatOpenUp';
import { parse } from 'qs';
import { message } from 'antd';
import qs from 'qs';


export default {

  namespace: 'wechatOpenUpModel',

  state: {
       /*table*/
        OpenUpPageIndex : 0,        //页码
        OpenUpPageSize : 10,        //一页条数
        OpenUpLoading : false,      //列表加载状态
        OpenUpTotal : undefined,    //列表内容总条数
        OpenUpTableContent : [],    //列表内容

        /*search bar*/
        searchVisible : true,       //搜索栏是否显示
        searchContent : {},         //搜索栏搜索内容
        /*新增*/
        addOrEditTeanantVisible : false,            //新增编辑modal是否显示
        addOrEditSupModalButtonLoading : false,         //新增编辑modal按钮是否在加载状态
        myData : {}                    //新增编辑信息
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/sys_wechat_openUp') {
            dispatch({
                 type:'OpenUpList',
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
      /*租户列表*/
       *'OpenUpList'({ payload },{ put , call , select }){
            yield put({ type:'showLoading' });
            const { ret,err } = yield call(OpenUpList,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        OpenUpTableContent:ret.results,
                        OpenUpTotal:ret.data.resultCount,
                        OpenUpPageIndex : ret.data.pageIndex || 0,
                        OpenUpPageSize : ret.data.pageSize || 10,
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
        *'OpenUpAdd'({ payload },{ put , call , select }){
            yield put({ type:'showLoading' , payload : { addOrEditOrgModalButtonLoading : true }});
            let wechatOpenUpModel = yield select(state => state.wechatOpenUpModel);
            let pageIndex = wechatOpenUpModel.OpenUpPageIndex;
            let pageSize = wechatOpenUpModel.OpenUpPageSize;
            let searchContent = wechatOpenUpModel.searchContent;
            let params = { pageIndex , pageSize , ...searchContent };
            let { ret } = yield call(OpenUpAdd,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                message.success('新增成功');
                yield put({
                    type:'updateState',
                    payload:{
                        addOrEditTeanantVisible : false,
                        myData : {}
                    }
                });
                yield put({
                    type:'OpenUpList',
                    payload:{
                        ...params
                    }
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({ type:'closeLoading' , payload : { addOrEditSupModalButtonLoading : false }});
        },

        /*编辑*/
        *'OpenUpEdit'({payload},{put , call , select}){
            yield put({ type:'showLoading' , payload : { addOrEditOrgModalButtonLoading : true }});
            const { ret,err} = yield call(OpenUpEdit,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type:'updateState',
                    payload:{
                        myData : ret.data,
                        addOrEditTeanantVisible:true,
                    }
                })
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('失败')
            }
			yield put({type:'closeLoading'});
        },
        /*修改状态*/
        *'OpenUpUpdateState'({ payload } , { put , call , select }){
            yield put({type:'showLoading'});
            let { ret } = yield call(OpenUpUpdateState,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                message.success(ret.errorMessage);
                yield put({
                    type:'OpenUpList',
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({type:'closeLoading'});
        },
		/*

		* */
  },

  reducers: {
       //加载状态
        showLoading(state, action) {
            return { ...state, ...action.payload, OpenUpLoading:true };
        },
        //取消加载
        closeLoading(state, action) {
            return { ...state, ...action.payload, OpenUpLoading:false };
        },
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
  },
};
