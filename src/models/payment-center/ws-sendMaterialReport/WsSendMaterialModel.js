import { parse } from 'qs';
import { message } from 'antd';
import {
    queryWSMaterialApplyList ,
    editWSMaterialApply,
    materialExpressMessage,
} from '../../../services/payment-center/ws-sendMaterialReport/WsSendMaterialService'
export default {

    namespace: 'WsSendMaterialModel',

    state: {
        tableLoading : false,
        dataSource : [],        //表格数据
        isShowSearch : true,    //是否显示搜索框
        total : '',             //表格数据总量
        pageSize : 10,
        pageIndex : 0,
        searchContent : {},     //搜索对象
        subject : '',           //备注
        sendTime : '',          //邮寄时间
        expressNum : '',       //快递单号
        mchName : '',          //机构名称
        id: '',                //编号
        subjectVisible : false,   //备注框显示
        sendTimeVisible : false,   //邮寄时间框显示
        expressNumVisible : false,   //快递单号框显示
        selectedRowKeys : [],      //选中项的key值
        selectedRows : [],         //选中项的内容
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/ws_sendMaterialReport') {
                    dispatch({
                        type : 'queryWSMaterialApplyList',
                        payload : {
                            pageIndex : 0,
                            pageSize : 10
                        }
                    });
                }
            });
        },
    },

    effects: {
        *queryWSMaterialApplyList({ payload }, { call, put, select }) {
            yield put ({ type : 'showTableLoading' });
            let searchContent = {};
            if(payload && payload.searchContent){
                searchContent = payload.searchContent;
                delete payload.searchContent
            }
            let params = { ...payload , ...searchContent };
            let { ret } = yield call(queryWSMaterialApplyList, parse(params));
            if (ret && ret.errorCode == 9000) {
                yield put({
                    type: 'updateState',
                    payload : {
                        dataSource : ret.results,
                        total : ret.count,
                        pageIndex : payload.pageIndex,
                        pageSize : payload.pageSize,
                        searchContent
                    }
                });
            } else {
                ret && message.error(ret.errorMessage || '查询出错啦');
            }
            yield put ({ type : 'closeTableLoading' });
      },

        /*备注,邮寄时间,快递单号保存*/
         *editWSMaterialApply({ payload }, { call, put, select }) {
            yield put ({ type : 'showTableLoading' });
            let current_model = yield select(state => state.WsSendMaterialModel);
            let id = (payload && payload.id != undefined) ? payload.id :current_model.id;
            let subject = (payload && payload.subject != undefined) ? payload.subject :current_model.subject;
            let sendTime = (payload && payload.sendTime != undefined) ? payload.sendTime :current_model.sendTime;
            let expressNum = (payload && payload.expressNum != undefined) ? payload.expressNum :current_model.expressNum;
            let param = {
                    id : id,
                    subject : subject,
                    sendTime : sendTime,
                    expressNum : expressNum,
            }
            let { ret } = yield call(editWSMaterialApply, parse(param));
            if (ret && ret.errorCode == 9000) {
            	let list = current_model.dataSource;
                list && list.map(function(item,index){
                    if(item.id == id){
                        item.subject = subject;
                        item.sendTime = sendTime;
                        item.expressNum = expressNum;
                    }
                })
                yield put({
                      type : 'queryWSMaterialApplyList',
                      payload : {
                          dataSource : list ,
                      }
                })
                message.success("成功");
            } else {
                ret && message.error(ret.errorMessage || '失败');
            }
            yield put ({ type : 'closeTableLoading' });
        },

        /*短信发送*/
        *materialExpressMessage({ payload }, { call, put, select }) {
            yield put ({ type : 'showTableLoading' });
            let current_model = yield select(state => state.WsSendMaterialModel);
            let id = (payload && payload.id != undefined) ? payload.id :current_model.id;
            let subject = (payload && payload.subject != undefined) ? payload.subject :current_model.subject;
            let sendTime = (payload && payload.sendTime != undefined) ? payload.sendTime :current_model.sendTime;
            let expressNum = (payload && payload.expressNum != undefined) ? payload.expressNum :current_model.expressNum;
            let { ret } = yield call(materialExpressMessage, parse(payload));
            if (ret && ret.errorCode == 9000) {
                let list = current_model.dataSource;
                list && list.map(function(item,index){
                    if(item.id == id){
                        item.subject = subject;
                        item.sendTime = sendTime;
                        item.expressNum = expressNum;
                    }
                })
                yield put({
                      type : 'queryWSMaterialApplyList',
                      payload : {
                          dataSource : list ,
                      }
                })
                message.success('发送成功');
            } else {
                ret && message.error(ret.errorMessage || '短信发送失败');
            }
            yield put ({ type : 'closeTableLoading' });
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
