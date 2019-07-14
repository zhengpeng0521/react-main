import {
  /*套餐开通管理*/
  GetPackingOpening,      /*获取套餐开通列表数据*/
  SetPackageOpeningType,  /*套餐列表改变状态*/
  GetPackageSelectList,   /*打开表单获取套餐列表作为下拉列表数据*/
  GetOrgDetail,           /*通过机构名称或者手机号获取机构信息*/
  GetTenantDetail,        /*通过租户信息搜索租户*/
  GetOrgByTenantId,       /*通过租户搜索机构*/
} from '../../services/SaasPackageManage/SaasPackageManage';
import {
  getFaceList,
  getDeviceList,
  saveDevice,
  openFace,
} from '../../services/faceMgr/faceMgrService'
import { parse } from 'qs';
import { message } from 'antd';

export default {
  namespace: 'faceMgrModel',

  state: {
    searchVisible: true,
    searchContent:{},

    /*列表*/
    pageIndex: 0,        //套餐页码
    pageSize: 10,         //套餐每页条数
    tableData: [],        //套餐管理列表数据
    total: 0,            //套餐管理列表条数
    loading: false,          //套餐管理列表加载状态
    selectRow: {},          //选中行

    /*套餐开通表单*/
    saasPackageOpeningModalVisible : false,              //modal是否显示
    saasPackageOpeningModalButtonLoading : false,        //modal按钮是否在加载状态
    saasPackageOpeningModalSearchType : '1',             //机构搜索方式(0按机构和机构手机号/1按租户查询)
    saasPackageOpeningModalTenantSelectVisible : false,  //租户下拉列表是否显示(搜素租户之后才显示)
    saasPackageOpeningModalTenantSelectContent : [],     //租户下拉列表数据
    saasPackageOpeningModalSelectContent : [],           //套餐列表数据
    saasPackageOpeningModalOrgArray : [],                //接口获取的机构原始数据
    saasPackageOpeningModalTransferAllcontent : [],      //机构穿梭框左边数据
    saasPackageOpeningModalTransferTargetContent : [],   //机构穿梭框右边数据

    /*设备列表*/
    deviceVisible: false,     // 设备列表visible
    deviceLoading: false,
    deviceList: [],           // 设备列表
    addDeviceVisible: false,  // 添加设备
    addLoading: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
        history.listen(location => {
            if(location.pathname === '/face_mgr') {
              dispatch({
                type: 'getFaceList',
                payload: {
                  pageIndex: 0,
                  pageSize: 10,
                }
              })
            }
        });
    },
  },

  effects: {
    /** 获取套餐列表 */
    *getFaceList({ payload },{ put , call , select }){
      yield put({type:'showTableLoading'});
      const {pageIndex, pageSize, searchContent} = payload
      let params = {
        pageIndex,
        pageSize,
        ...searchContent
      }
      let { ret } = yield call(getFaceList, params);
      if( ret && ret.errorCode === 0 ){
          yield put({
              type:'updateState',
              payload:{
                tableData : ret.results,
                total : ret.data.resultCount,
                pageIndex : ret.data.pageIndex || 0,                    //套餐页码
                pageSize : ret.data.pageSize || 10,                      //套餐每页条数
                searchContent
              }
          });
      }else if( ret && ret.errorMessage ){
          message.error(ret.errorMessage);
      }else{
          message.error('您的网络状况不佳，请检查您的网络');
      }
      yield put({type:'closeTableLoading'});
    },

    /** 获取设备列表 */
    *getDeviceList({ payload },{ put , call , select }){
      yield put({type: 'showDeviceLoading'})
      const { ret } = yield call(getDeviceList, parse(payload))
      if( ret && ret.errorCode === 0 ){
        yield put({
            type:'updateState',
            payload:{
              deviceList : ret.results
            }
        });
      }else if( ret && ret.errorMessage ){
          message.error(ret.errorMessage);
      }else{
          message.error('您的网络状况不佳，请检查您的网络');
      }
      yield put({type: 'closeDeviceLoading'})
    },

    /** 添加设备 */
    *saveDevice({ payload },{ put , call , select }){
      yield put({type: 'showAddLoading'})
      const state = yield select(state => state.faceMgrModel)
      const { ret } = yield call(saveDevice, parse(payload))
      if( ret && ret.errorCode === 0 ){
        message.success('添加成功')
        yield put({
            type:'updateState',
            payload:{
              addDeviceVisible : false
            }
        })
        yield put({
          type: 'getDeviceList',
          payload: {
            tenantId: payload.tenantId,
            orgId: payload.orgId
          }
        })
        yield put({
          type: 'getFaceList',
          payload: {
            pageIndex: state.pageIndex,
            pageSize: state.pageSize,
            searchContent: state.searchContent
          }
        })
      }else if( ret && ret.errorMessage ){
          message.error(ret.errorMessage);
      }else{
          message.error('您的网络状况不佳，请检查您的网络');
      }
      yield put({type: 'closeAddLoading'})
    },

    /*通过租户信息搜索租户*/
    *'GetTenantDetail'({ payload },{ put , call , select }){
      let { ret } = yield call(GetTenantDetail,parse(payload));
      if( ret && ret.errorCode === 9000 ){
          yield put({
              type:'updateState',
              payload:{
                  saasPackageOpeningModalTenantSelectVisible : true,
                  saasPackageOpeningModalTenantSelectContent : ret.results,
              }
          });
      }else if( ret && ret.errorMessage ){
          message.error(ret.errorMessage);
      }else{
          message.error('您的网络状况不佳，请检查您的网络');
      }
    },

    /*通过租户搜索机构*/
    *'GetOrgByTenantId'({ payload },{ put , call , select }){
      let { ret } = yield call(GetOrgByTenantId,parse(payload));
      if( ret && ret.errorCode === 9000 ){
          let oragnArray = [];
          for(let i in (ret.results)){
              if((ret.results)[i].tel==''||(ret.results)[i].tel==undefined||(ret.results)[i].tel==null){
                  oragnArray.push({
                      title : (ret.results)[i].orgName+'(未填写手机号,'+(ret.results)[i].orgId+')',
                      key : (ret.results)[i].orgId,
                  });
              }else{
                  oragnArray.push({
                      title : (ret.results)[i].orgName+'('+(ret.results)[i].tel+','+(ret.results)[i].orgId+')',
                      key : (ret.results)[i].orgId,
                  });
              }
          }
          yield put({
              type:'updateState',
              payload:{
                  saasPackageOpeningModalOrgArray : ret.results,
                  saasPackageOpeningModalTransferAllcontent : oragnArray,
                  saasPackageOpeningModalTransferTargetContent : [],
              }
          });
      }else if( ret && ret.errorMessage ){
          message.error(ret.errorMessage);
      }else{
          message.error('您的网络状况不佳，请检查您的网络');
      }
    },

    /*通过机构名称或者手机号获取机构信息*/
    *'GetOrgDetail'({ payload },{ put , call , select }){
      let { ret } = yield call(GetOrgDetail,parse(payload));
      if(ret && ret.errorCode == '9000' ){
          let oragnArray = [];
          for(let i in (ret.results)){
              if((ret.results)[i].tel==''||(ret.results)[i].tel==undefined||(ret.results)[i].tel==null){
                  oragnArray.push({
                      title : (ret.results)[i].organName+'(未填写手机号,'+(ret.results)[i].id+')',
                      key : (ret.results)[i].id,
                  });
              }else{
                  oragnArray.push({
                      title : (ret.results)[i].organName+'('+(ret.results)[i].tel+','+(ret.results)[i].id+')',
                      key : (ret.results)[i].id,
                  });
              }
          }
          yield put({
              type:'updateState',
              payload:{
                  saasPackageOpeningModalOrgArray : ret.results,
                  saasPackageOpeningModalTransferAllcontent : oragnArray,
                  saasPackageOpeningModalTransferTargetContent : [],
              }
          });
      }else if( ret && ret.errorMessage ){
          message.error(ret.errorMessage);
      }else{
          message.error('您的网络状况不佳，请检查您的网络');
      }
    },

    /*开通套餐*/
    *OpeningPackage({ payload },{ put , call , select }){
      yield put({type:'updateState',payload:{saasPackageOpeningModalButtonLoading:true}});
      let state = yield select(state => state.faceMgrModel)
      let { ret } = yield call(openFace, parse(payload));
      if( ret && ret.errorCode === 0 ){
          message.success(ret.errorMessage);
          yield put({
              type:'updateState',
              payload:{
                  saasPackageOpeningModalVisible : false,
                  saasPackageOpeningModalTenantSelectVisible : false,
                  saasPackageOpeningModalSearchType : '1',
                  saasPackageOpeningModalTenantSelectContent : [],
                  saasPackageOpeningModalTransferAllcontent : [],      //机构穿梭框左边数据
                  saasPackageOpeningModalTransferTargetContent : [],   //机构穿梭框右边数据
              }
          });
          yield put({type:'getFaceList', payload: {
            pageIndex : state.pageIndex,
            pageSize : state.pageSize,
            searchContent: state.searchContent
          }});
      }else if( ret && ret.errorMessage ){
          message.error(ret.errorMessage);
      }else{
          message.error('您的网络状况不佳，请检查您的网络');
      }
      yield put({type:'updateState',payload:{saasPackageOpeningModalButtonLoading:false, saasPackageOpeningModalSearchType:'1'}});
    },
  },

  reducers: {
    //更新state
    updateState(state , action) {
      return { ...state, ...action.payload };
    },

    /*套餐管理列表加载中*/
    showTableLoading(state , action){
      return { ...state, ...action.payload, saasPackageManageLoading : true };
    },
    /*套餐管理列表取消加载中*/
    closeTableLoading(state , action){
      return { ...state, ...action.payload, saasPackageManageLoading : false };
    },

    /*设备列表加载*/
    showDeviceLoading(state , action){
      return { ...state, ...action.payload, deviceLoading : true };
    },
    closeDeviceLoading(state , action){
      return { ...state, ...action.payload, deviceLoading : false };
    },

    /*添加设备加载*/
    showAddLoading(state , action){
      return { ...state, ...action.payload, addLoading : true };
    },
    closeAddLoading(state , action){
      return { ...state, ...action.payload, addLoading : false };
    },
  }
}
