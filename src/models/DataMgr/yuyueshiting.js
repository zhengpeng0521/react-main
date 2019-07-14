import { SearchModalOne } from '../../services/DataMgr/yuyueshiting';
import { parse } from 'qs';
import { message } from 'antd';

//数据统计 预约试听
export default {

  namespace: 'yuyueshiting',

  state: {
    loading : false,        //列表加载状态
    list : [],           //列表数据
    selectedRowKeys : [],  //列表选中项
    selectedRows : [],     //列表选中项数据
    total : 0,          //列表总条数
    pageIndex : 0,      //列表当前页码
    pageSize : 10,       //列表每页显示数量
    sortColName : '',       //列表排序字段
    sortColType : '',       //列表排序类型
    formLoading : false,    //表单按钮是否加载中
    formData : {},       //表单数据
    formVisible : false,    //表单窗口是否显示
    AlertVisible : true,  //提示框是否显示
    formType : 'create',       //表单类型 'create' / 'update'
    searchData : {},     //模糊查询数据
    searchVisible : true,  //模糊查询是否显示
    searchChannelList : [], //可选择的频道列表
    topChoose : '',  //上方选择内容
    bottomChoose : '1',  //下方选择内容
    inverted : '',  //X,Y轴是否对调
    share : '1',     //鼠标悬停显示是否全部 '1'显示自身的value/'2'显示全部的value
    aim : '4' ,   //准星调整 '1'一字准星 '2'|字准星 '3'十字准星 '4'关闭(默认)
    point : '',   //节点是否可点击 '1'可点击
    zidingyiTime:false,   //是否开启自定义时间查询
    zidingyiTimeContent:'',   //自定义时间内容
    dinggoumendianList:[],
    yuyueshuList:[],
    yuyuemendianList:[],
    XTime:[],
    colorType : ['#8d4653','#91e8e1', '#8085e8',  '#7cb5ec','#f7a35c',' #90ed7d','#434348','#8085e9', '#e4d354','#f15c80',],//随机赋值colorArray1与colorArray2,达到随机颜色的效果
    colorArray1 : ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],  //折线颜色1
    colorArray2 : ['#91e8e1', '#8085e8','#434348', '#f15c80',' #90ed7d', '#f7a35c', ,'#8085e9','#7cb5ec' ,'#e4d354', '#8d4653'],  //折线颜色2
  },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/yuyueshiting') {

                }
            });
        },
    },

  effects: {

    //'昨日''近7天''近30天'或者自定义时间
    *'SearchModalOne'({ payload }, { call, put, select }){
        //console.log(payload);
        yield put({ type: 'showLoading' });
        const { ret,err } = yield call(SearchModalOne,parse(payload));
        if (ret && ret.errorCode === 9000) {
           yield put({
                type: 'updateState',
                payload: {
                        dinggoumendianList:ret.data.addShop,
                        yuyueshuList:ret.data.addOrder,
                        yuyuemendianList:ret.data.addCover,
                        XTime : ret.data.time,
                },
            });
            yield put({ type: 'closeLoading' });
        }else{
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },
  },

  reducers: {
    //表格加载中
    showLoading(state,action) {
      return { ...state, ...action.payload, loading: true };
    },

    closeLoading(state,action){
      return { ...state, ...action.payload, loading: false };
    },

    createSuccess(state, action) {
      // const newUser = action.payload;
      return { ...state, ...action.payload, loading: false };
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
        return { ...state, ...action.payload };
    },

    //更新查询框的频道列表
    updateSearchChannelList(state, action) {
        return { ...state, ...action.payload };
    },

    //更新查询框的频道列表
    updateState(state, action) {
        return { ...state, ...action.payload };
    },
    //点击新增弹出
    addModal(state, action){
        return { ...state, ...action.payload};
    },
  },

};
