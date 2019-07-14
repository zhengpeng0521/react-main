/*
 * 微活动模板-管理
 */
export default {

  namespace: 'activityModuleMgrModel',

  state: {
      listData: [],         //列表数据
      selectedKeys: [],     //列表勾选的键
      total: 0,             //列表总条数
      pageIndex: 0,         //当前分页页码
      pageSize: 10,         //当前每页条数
      queryLoading: false,  //列表查询状态
      queryFilter: {},      //列表吧模糊查询参数
      searchVisible: false, //是否显示检索
  },

  subscriptions: {
    setup({ dispatch, history }) {
        history.listen(( { pathname, query }) => {
          if(pathname === '/saas_weixin_market_model_set') {
            dispatch({
                type: 'queryList'
            });
          }
        });
    },
  },

  effects: {
    *queryList({ payload }, { call, put, select }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {

      updateState(state, action) {
        return { ...state, ...action.payload };
      },

      switchSearch(state, action) {
        return { ...state, searchVisible: !state.searchVisible};
      },
  },

}
