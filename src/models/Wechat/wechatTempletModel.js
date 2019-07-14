import { parse } from 'qs';
import { message } from 'antd';
import {
    viewpagerQuery ,   //列表
    viewpagerCreate,   //新增
    viewpagerDetail,   //详情
    draftList,			//草稿箱列表
    tplList,			//模板列表
    draftToTpl,			//草稿变为模版接口
    updateVersion,		//将该模版设为默认的模版
    delTpl,   			//删除某个模版
} from '../../services/Wechat/WechatTemplet.js'
export default {

    namespace: 'wechatTempletModel',

    state: {
        dataSource      : [],
        pageSize        : 20,
        pageIndex       : 0,
        total           : '0',
        tableLoading    : false,
        addModelVisible : false,
        fromData        : {},
        addType         : 'add',
        infoModelVisible: false,
        infoData        : {},
        draftListData   : [],
    	tplListData     : [],
		currentKye      :'draftList',
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/sys_wechat_templet') {
                    dispatch({
                       type : 'viewpagerQuery',
                       payload : {
                            pageIndex : 0,
                            pageSize : 20
                        }
                   });
                }
            });
        },
    },

    effects: {
        //列表
        *'viewpagerQuery'({ payload },{ put , call , select }){
            yield put({ type:'tableShowLoading' });
            const { ret } = yield call(viewpagerQuery,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        dataSource:ret.results,
                        total:ret.data.resultCount,
                        pageIndex : ret.data.pageIndex || 0,      //列表当前页码
                        pageSize : ret.data.pageSize || 20,       //列表每页显示数量
                    }
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({ type:'tableCloseLoading' });
        },
        //新增
        *'viewpagerCreate'({ payload },{ put , call , select }){
            let state = yield select(state => state.wechatTempletModel);
            const { ret } = yield call(viewpagerCreate,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type : 'updateState',
                    payload : {
                        addModelVisible : false,
                        fromData : {}
                    }
                })
                yield put({
                    type : "viewpagerQuery",
                    payload : {

                    }
                })
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
        },
        //详情
        *'viewpagerDetail'({ payload },{ put , call , select }){
            const { ret } = yield call(viewpagerDetail,parse(payload));
            if(ret && ret.errorCode === 9000){
				if(payload.tabKye =='draftList' || payload.tabKye =='' ){
					yield put({
						type : "draftList",
						payload : {
							demoAppId:ret.data.demoAppId
						}
					})
				}else{
					yield put({
						type : "tplList",
						payload : {
							demoAppId:ret.data.demoAppId
						}
					})
				}

                yield put({
                    type : 'updateState',
                    payload : {
                        infoData : {
                            demoAppId : ret.data.demoAppId,
                            demoUrl : ret.data.demoUrl,
                            seqNo : ret.data.seqNo,
                            name : ret.data.name,
                            cover : ret.data.cover,
                            id: ret.data.id,
                            infoModelVisible:true,
                        }
                    }
                })

            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
        },
        //草稿箱列表
        *'draftList'({ payload },{ put , call , select }){
            let state = yield select(state => state.wechatTempletModel);
            const { ret } = yield call(draftList,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type : 'updateState',
                    payload : {
                        draftListData : ret.results,
                    }
                })
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
        },
         //详情模版列表
        *'tplList'({ payload },{ put , call , select }){
            let state = yield select(state => state.wechatTempletModel);
            const { ret } = yield call(tplList,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type : 'updateState',
                    payload : {
                        tplListData : ret.results,
                    }
                })
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
        },

        //草稿变为模版接口
        *'draftToTpl'({ payload },{ put , call , select }){
            let state = yield select(state => state.wechatTempletModel);
            const { ret } = yield call(draftToTpl,parse(payload));
            if(ret && ret.errorCode === 9000){
            	 message.success('设置成功');
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
        },
        //草稿变为模版接口
        *'updateVersion'({ payload },{ put , call , select }){
            let state = yield select(state => state.wechatTempletModel);
            const { ret } = yield call(updateVersion,parse(payload));
            if(ret && ret.errorCode === 9000){
            	 message.success('设置成功');
				 yield put({
                    type : "tplList",
                    payload : {
						demoAppId:payload.demoAppId
                    }
                })
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
        },

         //删除某个模版
        *'delTpl'({ payload },{ put , call , select }){
            let state = yield select(state => state.wechatTempletModel);
            const { ret } = yield call(delTpl,parse(payload));
            if(ret && ret.errorCode === 9000){
            	 message.success('删除成功');
				 yield put({
                    type : "tplList",
                    payload : {
						demoAppId:payload.demoAppId
                    }
                })
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
        },



    },


    reducers: {
        updateState(state, action) {
            return { ...state , ...action.payload };
        },
        showTableLoading(state,action){
            return { ...state , tableLoading : true };
        },
        closeTableLoading(state,action){
            return { ...state , tableLoading : false };
        },
    },
};
