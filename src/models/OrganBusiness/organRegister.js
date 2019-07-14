import { query,
         queryForSearchOrganRegister,
         queryForSearchSchoolType,
         makeDeal,
         CreateSaas,
         organRegisterAfterOperation,
         getHtmlDetail,
         editHrefModalSubmit,
       } from '../../services/OrganBusiness/organRegister';
import { parse } from 'qs';
import { message } from 'antd';
import qs from 'qs';

//用户管理
export default {

  namespace: 'organRegister',

  state: {
    loading : false,                //列表加载状态
    list : [],                      //列表数据
    selectedRowKeys : [],           //列表选中项
    selectedRows : [],              //列表选中项数据
    total : 0,                      //列表总条数
    pageIndex : 0,                  //列表当前页码
    pageSize : 10,                  //列表每页显示数量
    schoolType: [],                 //学校类型
    formLoading : false,            //表单按钮是否加载中
    formData : {},                  //表单数据
    formVisible : false,            //表单窗口是否显示
    formType : 'create',            //表单类型 'create' / 'update'
    searchData : {},                //模糊查询数据
    searchVisible : true,           //模糊查询是否显示
    htmlDetailId : '',              //富文本编辑内容id
    previewModalVisible : false,    //h5模态框展示
    previewUrl : '',                //h5展示内容
    editHrefVisible : false,        //h5外链编辑模态框是否展示
    editHrefButtonLoading : false,  //h5外链提交时按钮可用与否和加载状态
    htmlText : '',                  //h5外链文案
    htmlhref : '',                  //h5外链地址
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/organ_register') {
            dispatch({
                type: 'queryForSearchOrganRegister',
                payload:{
                    pageIndex : 0,
                    pageSize : 10,
                }
            });
            dispatch({
                type: 'queryForSearchSchoolType'
            });
        }
      });
    },
  },

  effects: {

    /*展示机构注册列表*/
    *'queryForSearchOrganRegister'({ payload }, { call, put }) {
        yield put({ type: 'showLoading' });
        const { ret } = yield call(queryForSearchOrganRegister,parse(payload));
        if (ret && ret.errorCode === 9000) {
            delete payload.pageIndex;
            delete payload.pageSize;
            yield put({
                type: 'UpdateSearchUserList',
                payload:{
                    list:ret.results,
                    total: ret.data.resultCount,
                    pageIndex : ret.data.pageIndex || 0,                //列表当前页码
                    pageSize : ret.data.pageSize || 10,                  //列表每页显示数量
                    searchData : payload
                }
            });
        }else if( ret && ret.errorMessage ){
            message.error(ret.errorMessage);
        }else{
            message.error('您的网络状况不佳，请检查您的网络');
        }
        yield put({ type: 'closeLoading' });
    },

    /*学校类型下拉列表*/
    *'queryForSearchSchoolType'({ payload }, { call, put }){
        /*yield put({ type: 'showLoading' });
        const { ret } = yield call(queryForSearchSchoolType);
        if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'updateState',
                payload:{
                    schoolType:ret.results,
                    loading:false,
                    formLoading : false,
                }
            });
        }else if( ret && ret.errorMessage ){
            message.error(ret.errorMessage);
        }else{
            message.error('您的网络状况不佳，请检查您的网络');
        }
        yield put({ type: 'closeLoading' });*/
    },

    //修改为已处理
    *'makeDeal'({ payload }, { call, put, select }){
        yield put({ type: 'showLoading' });
        const { ret,error } = yield call(makeDeal,parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'organRegisterAfterOperation',
            });
        }else if( ret && ret.errorMessage ){
            message.error(ret.errorMessage);
        }else{
            message.error('您的网络状况不佳，请检查您的网络');
        }
        yield put({ type: 'closeLoading' });
    },

    //生成Saas账号
    *'CreateSaas'({ payload }, { call, put, select }){
        yield put({ type: 'showLoading' });
        let pricePolicyId = 3;   //套餐号默认是3
        let params = {pricePolicyId,...payload}
        const { ret,error } = yield call(CreateSaas,parse(params));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'organRegisterAfterOperation',
            });
        }else if( ret && ret.errorMessage ){
            message.error(ret.errorMessage);
        }else{
            message.error('您的网络状况不佳，请检查您的网络');
        }
        yield put({ type: 'closeLoading' });
    },

    /*获取富文本id与内容*/
    *'getHtmlDetail'({ payload }, { call, put, select }){
        yield put({ type: 'showLoading' });
        const { ret } = yield call(getHtmlDetail);
        if (ret && ret.errorCode === 9000) {
            yield put({
                type:'updateState',
                payload:{
                    htmlDetailId : (ret.results)[0].id,
                    previewUrl : `${BASE_URL}/freeApply/getHtmlDetail?id=${(ret.results)[0].id}`,
                }
            })
        }else if( ret && ret.errorMessage ){
            message.error(ret.errorMessage);
        }else{
            message.error('您的网络状况不佳，请检查您的网络');
        }
        yield put({ type: 'closeLoading' });
    },

    /*打开编辑h5外链模态框获取地址*/
    *'getHtmlHref'({ payload }, { call, put, select }){
        yield put({ type: 'showLoading' });
        const { ret } = yield call(getHtmlDetail);
        if (ret && ret.errorCode === 9000) {
            yield put({
                type:'updateState',
                payload:{
                    htmlDetailId : (ret.results)[0].id,
                    htmlText : (ret.results)[0].link_text,
                    htmlhref : (ret.results)[0].link,
                    editHrefVisible : true,
                }
            })
        }else if( ret && ret.errorMessage ){
            message.error(ret.errorMessage);
        }else{
            message.error('您的网络状况不佳，请检查您的网络');
        }
        yield put({ type: 'closeLoading' });
    },

    /*编辑H5外链提交*/
    *'editHrefModalSubmit'({ payload }, { call, put, select }){
        yield put({ type: 'showLoading' });
        const { ret } = yield call(editHrefModalSubmit,parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success('成功');
            yield put({
                type:'updateState',
                payload:{
                    editHrefVisible : false ,
                    editHrefButtonLoading : false,
                }
            });
            yield put({
                type:'organRegisterAfterOperation',
            })
        }else if( ret && ret.errorMessage ){
            message.error(ret.errorMessage);
        }else{
            message.error('您的网络状况不佳，请检查您的网络');
        }
        yield put({ type: 'closeLoading' });
    },

    /*处理与生成Saas账号后的操作*/
    *'organRegisterAfterOperation'({ payload }, { call, put, select }){
        yield put({ type: 'showLoading' });
        let organRegister = yield select(state => state.organRegister);
        let searchData = organRegister.searchData || {};
        let pageIndex = organRegister.pageIndex;
        let pageSize = organRegister.pageSize;
        let params = { pageIndex,pageSize,...searchData };
        const { ret,err } = yield call(organRegisterAfterOperation,parse(params));
        if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'updateState',
                payload: {
                    list : ret.results,
                    total : ret.data.resultCount,
                    pageIndex : ret.data.pageIndex || 0,                //列表当前页码
                    pageSize : ret.data.pageSize || 10,                  //列表每页显示数量
                },
            });
        }else if( ret && ret.errorMessage ){
            message.error(ret.errorMessage);
        }else{
            message.error('您的网络状况不佳，请检查您的网络');
        }
        yield put({ type: 'closeLoading' });
    },

},
  reducers: {
    //表格加载中
    showLoading(state,action) {
      return { ...state, ...action.payload , loading: true };
    },

    closeLoading(state,action) {
      return { ...state, ...action.payload , loading: false };
    },

    createSuccess(state, action) {
      // const newUser = action.payload;
      return { ...state, ...action.payload,};
    },

    updateSuccess(state, action) {
      const updateUser = action.payload;
      const newList = state.list.map(user => {
        if (user.id === updateUser.id) {
          return { ...user, ...updateUser };
        }
        return user;
      });
      return { ...state, list: newList, loading: false };
    },

    //查询成功
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    updateQueryKey(state, action) {
      return { ...state, ...action.payload };
    },

    //变更查询框是否展示
    changesearchVisible(state, action) {
        return { ...state, searchVisible : !state.searchVisible };
    },

    //更新查询框的频道列表
    UpdateSearchUserList(state, action) {
        return { ...state, ...action.payload };
    },

    //更新查询框的频道列表
    updateState(state, action) {
        return { ...state, ...action.payload };
    },
    //点击新增，编辑弹框，点击外围，取消，X，取消弹框
    addModal(state, action){ return { ...state, ...action.payload}; },
  },

};
