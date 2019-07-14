
import { parse } from 'qs';
import { message } from 'antd';
import { toReviewList , toReviewFun , } from '../../../services/payment-center/to-review/toReviewService'
export default {

    namespace: 'toReviewModel',

    state: {
        tableLoading : false,
        dataSource : [],        //表格数据
        isShowSearch : true,    //是否显示搜索框
        total : '',             //表格数据总量
        pageSize : 10,
        pageIndex : 0,
        searchContent : {},     //搜索对象
        operationStatus : undefined,
        modalVisible : false,
        buttonLoading : false,
        operationMchId : '',
        operationRecordId : '',
        operationSta : '',
        isShowLoseModal : false,    //失败弹框是否显示
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/to_review') {
                    dispatch({
                        type : 'getToReviewList',
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
        *getToReviewList({ payload }, { call, put, select }) {
            yield put ({ type : 'showTableLoading' });
            let searchContent = {};
            if(payload && payload.searchContent){
                searchContent = payload.searchContent;
                delete payload.searchContent
            }
            let params = { ...payload , ...searchContent };
            let { ret } = yield call(toReviewList, parse(params));
            if (ret && ret.errorCode == 9000) {

                yield put({
                    type: 'updateState',
                    payload : {
                        dataSource : ret.results,
                        total : ret.data.resultCount,
                        pageIndex : ret.data.pageIndex,
                        pageSize : ret.data.pageSize,
                        searchContent
                    }
                });
            } else {
                ret && message.error(ret.errorMessage || '查询出错啦');
            }
            yield put ({ type : 'closeTableLoading' });
      },

      *toReviewSubmit({ payload } , { call, put, select }){
            let toReviewModel = yield select(state => state.toReviewModel);
            let { ret } = yield call(toReviewFun, parse(payload));

            if(ret && ret.errorCode == 9000 ){
                ret && message.success('操作成功')
                yield put({
                    type:'getToReviewList',
                    payload:{
                        pageSize : toReviewModel.pageSize,
                        pageIndex : toReviewModel.pageIndex,
                        searchContent : toReviewModel.searchContent,
                        buttonLoading : true,
                    }
                })

                yield put({
                    type : 'updateState',
                        payload : {
                        modalVisible : false,
                        isShowLoseModal : false,
                    }
                })
          }else{
              ret && message.error(ret.errorMessage || '查询出错啦');
          }
          yield put({
                  type : 'updateState',
                  payload : {
                      buttonLoading : false,
                  }
                })
      }


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
