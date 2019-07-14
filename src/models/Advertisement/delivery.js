import { parse } from 'qs';
import { message } from 'antd';
import {adCollectList, adComList, handleCreateAdCollect, handleCancleAdCollect,} from '../../services/Advertisement/delivery.js';

//广告投放model
export default {

  namespace: 'deliveryModel',

  state: {
      sourceType: '1',   //当前展示对象类型  微活动: 1, 微传单: 2, 微游戏: 3,

      filter: {},//微活动过滤条件
      totalCount: 0,//数据总条数
      dataList: [],//微活动的数据
      listLoading: false,//微活动是否加载中
      listSelectIds: [],//微活动-已选中
      pageIndex: 0,
      pageSize: 10,

      adComList: [],//广告列表-下拉框数据

      adModuleIds: [],//要投放广告的模板编号
      adCollectVisible: false,//广告投放窗口是否显示
      adCollectAdId: '',//要投放的广告
      adCollectAdText: '',
      adCollectAdUrl: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/delivery_management') {
          dispatch({
            type: 'queryList'
          });

        dispatch({
            type: 'queryAdList'
        });
        }
      });
    },
  },

  effects: {

      /*广告投放列表*/
      *'queryList'({ payload },{ put , call , select }){

          let sourceType = payload && payload.sourceType;
          let filter = payload && payload.filter;
          let pageIndex = payload && payload.pageIndex;
          let pageSize = payload && payload.pageSize;

          if(sourceType == undefined || sourceType == '' || filter == undefined || pageIndex == undefined || pageSize == undefined) {
            let deliveryModel = yield select(state => state.deliveryModel);

            if(sourceType == undefined || sourceType == '') {
              sourceType = deliveryModel.sourceType || '1';
            }

            if(filter == undefined) {
              filter = deliveryModel.filter || {};
            }

            if(pageIndex == undefined) {
              pageIndex = deliveryModel.pageIndex || 0;
            }

            if(pageSize == undefined) {
              pageSize = deliveryModel.pageSize || 10;
            }
          }

          let params = {
            type: sourceType,
            ...filter,
            pageIndex,
            pageSize,
          };
          yield put({
            type: 'updateState',
            payload: {
              listLoading: true,
            }
          });
          let { ret } = yield call(adCollectList,parse(params));
          if( ret && ret.errorCode === 9000 ){
            yield put({
              type:'updateState',
              payload:{
                sourceType,filter,pageIndex,pageSize,
                dataList: ret.results || [],
                listSelectIds: [],
                totalCount: (ret.data && ret.data.resultCount) || 0,
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

      *'queryAdList'({ payload },{ put , call , select }){

          let { ret } = yield call(adComList);
          if( ret && ret.errorCode === 9000 ){
              yield put({
                  type:'updateState',
                  payload:{
                      adComList: ret.list || [],
                  }
              });
          }else if( ret && ret.errorMessage ){
              message.error(ret.errorMessage);
          }else{
              message.error('您的网络状况不佳，请检查您的网络');
          }
      },

      /*投放广告*/
      *'handleCreateAdCollect'({ payload },{ put , call , select }){
          let deliveryModel = yield select(state => state.deliveryModel);
          let {sourceType, adCollectAdId, adModuleIds,} = deliveryModel;

          let params = {
              type: sourceType == '2' ? '1' : sourceType,
              modelIds: adModuleIds.join(','),
              adId: adCollectAdId,
          };

          yield put({
              type: 'updateState',
              payload: {
                  listLoading: true,
              }
          });

          let { ret } = yield call(handleCreateAdCollect, parse(params));
          if( ret && ret.errorCode === 9000 ){
              message.success('广告投放成功');
              yield put({
                  type: 'handleAdCollectCancle',
              });
              yield put({
                  type: 'queryList',
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

      /*取消投放广告*/
      *'handleCancleAdCollect'({ payload },{ put , call , select }){

          let moduleId = payload && payload.moduleId;
          let deliveryModel = yield select(state => state.deliveryModel);

          let {sourceType, listSelectIds,} = deliveryModel;

          let modelIds = [];

            if(moduleId == undefined || moduleId == '') {
                modelIds = listSelectIds || [];
            } else {
                modelIds.push(moduleId);
            }
          let params = {
              type: sourceType == '2' ? '1' : sourceType,
              modelIds: modelIds.join(','),
          };

          yield put({
              type: 'updateState',
              payload: {
                  listLoading: true,
              }
          });

          let { ret } = yield call(handleCancleAdCollect, parse(params));
          if( ret && ret.errorCode === 9000 ){
              message.success('取消投放成功');
              yield put({
                  type: 'queryList',
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
    //更新查询框的频道列表
    updateState(state, action) {
        return { ...state, ...action.payload };
    },

      changeSourceType(state, action) {
          return { ...state, ...action.payload, filter: {}, totalCount: 0, dataList: [], listSelectIds: [], pageIndex: 0, pageSize: 10, };
      },

      handleOpenAdCollect(state, action) {
          let {listSelectIds,adComList,} = state;
          let payload = action.payload || {};
          let moduleId = payload.moduleId;
          let adId = payload.adId;

          let adModuleIds = [];
          let adCollectAdText = '';
          let adCollectAdUrl = '';


          if(moduleId != undefined && moduleId != '') {
              adModuleIds.push(moduleId);

              adComList && adComList.map(function(item, index) {
                  if(item.id == adId) {
                      adCollectAdText = item.characters;
                      adCollectAdUrl = item.url;
                  }
              });
          } else {
              adModuleIds = listSelectIds;
          }
          return { ...state, adCollectAdId: adId, adCollectVisible: true, adModuleIds, adCollectAdText, adCollectAdUrl };
      },

      handleAdCollectCancle(state, action) {
          return { ...state, adCollectVisible: false, adModuleIds: [], adCollectAdId: ''  };
      },

      handleChangeAdCollect(state, action) {

          let {adComList} = state;
          let {adCollectAdId} = action.payload;

          let adCollectAdText = '';
          let adCollectAdUrl = '';

          adComList && adComList.map(function(item, index) {
              if(item.id == adCollectAdId) {
                  adCollectAdText = item.characters;
                  adCollectAdUrl = item.url;
              }
          });

          return { ...state, adCollectAdId, adCollectAdText, adCollectAdUrl,  };
      },
  },
};
