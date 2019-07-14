import {
    getTagsGroupsList,  //获取列表
    getGameTagList,     //获取游戏列表
    setLabeling,        //打标签
    getTagGroups,       //标签
} from '../../services/TemplateTag/Labeling';
import { parse } from 'qs';
import { message } from 'antd';

//实例管理
export default {

    namespace: 'labeling',

    state: {
        sourceType: '1',        //当前展示对象类型  微活动: 1, 微传单: 2, 微游戏: 3,
        filter: {},             //微活动过滤条件
        totalCount: 0,          //数据总条数
        dataList: [],           //微活动的数据
        listLoading: false,     //微活动是否加载中
        listSelectIds: [],      //微活动-已选中
        pageIndex: 0,
        pageSize: 10,

        searchContent : {},     //搜索条件

        adCollectVisible: false,//模板打标签窗口是否显示
        adLabeling:[],          //标签内容
        labeledModal:[],       //获取当前模板数据
	},

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/labeling') {
                      dispatch({
                        type: 'getTagsGroupsList'
                      });

                      dispatch({
                        type: 'getTagGroups'
                      });
                }
            });
        },
    },

    effects: {
    /*获取列表*/
      *'getTagsGroupsList'({ payload },{ put , call , select }){
          yield put({
            type: 'updateState',
            payload: {
              listLoading: true,
            }
          });
          let searchContent = {}
          if(payload && payload.searchContent){
              searchContent = payload.searchContent;
              delete payload.searchContent;
          };
          let labeling = yield select(state => state.labeling);
          let sourceType = labeling.sourceType;
          let params = { ...payload , ...searchContent , sourceType, product : sourceType };
          let resp = null;
          if(sourceType == '2'){
            resp = yield call(getGameTagList,parse(params));
          }else{
            resp = yield call(getTagsGroupsList,parse(params));
          }
          let {ret} = resp || {};
          if( ret && ret.errorCode === 9000 ){
              yield put({
                  type:'updateState',
                  payload:{
                    sourceType,
                    pageIndex : ret.data.pageIndex,
                    pageSize : ret.data.pageSize,
                    dataList: ret.results || [],
                    listSelectIds: [],
                    totalCount: (ret.data && ret.data.resultCount) || 0,
                    searchContent,
                  }
                });
            }else if( ret && ret.errorMessage ){
              message.error(ret.errorMessage);
            }else{
              message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({
              type: 'updateState',
              payload: {
                listLoading: false,
              }
            });
        },
     /*获取标签列表*/
        *'getTagGroups'({ payload },{ put , call , select }){
          let sourceType = payload && payload.sourceType;
          if(sourceType == undefined || sourceType == ''){
            let labeling = yield select(state => state.labeling);
            if(sourceType == undefined || sourceType == '') {
              sourceType = labeling.sourceType || '1';
            }
          }
          let params = {
            product: sourceType,
          };
          let { ret } = yield call(getTagGroups,parse(params));
          if( ret && ret.errorCode === 9000 ){
              yield put({
                  type:'updateState',
                  payload:{
                      adLabeling: ret.results || [],
                  }
              });
          }else if( ret && ret.errorMessage ){
              message.error(ret.errorMessage);
          }else{
              message.error('您的网络状况不佳，请检查您的网络');
          }
      },
    /*打标签*/
    *'setLabeling'({ payload },{ put , call , select }){
         yield put({
              type: 'updateState',
              payload: {
                  listLoading: true,
              }
          });
          let { ret } = yield call(setLabeling,parse(payload));
          if( ret && ret.errorCode === 9000 ){
              yield put({
                  type:'updateState',
                  payload:{
                      adCollectVisible: false,
                  }
              });
              yield put({
                  type:'getTagsGroupsList',
                  payload:{
                      product: payload.product,
                  }
              });
          }else if( ret && ret.errorMessage ){
              message.error(ret.errorMessage);
          }else{
              message.error('您的网络状况不佳，请检查您的网络');
          }
          yield put({
              type: 'updateState',
              payload: {
                  listLoading: false,
              }
          });
      },

    },

    reducers: {
        //更新state
        updateState(state, action) {
            return { ...state, ...action.payload };
        },

    },
};
