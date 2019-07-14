import {newChannels,configurationChannels, deleteChannels,queryChannel,queryBannerChannel,getRegisterChannel } from '../../services/OrganBusiness/registrationForm';
import { parse } from 'qs';
import { message } from 'antd';
import qs from 'qs';

//注册表单
export default {

  namespace: 'registrationForm',

  state: {
    /*table*/
    registrationPageIndex : 0,        //租户列表页码
    registrationPageSize : 10,         //租户列表一页条数
    registrationLoading : false,          //租户列表加载状态
    registrationTotal : undefined,            //列表内容总条数
    registrationTableContent:[],     //列表内容

    /*search bar*/
    searchVisible:true,          //搜索栏是否显示
    searchContent:{},          //搜索栏搜索内容

    /*新增渠道*/
    addChannelsModalVisible : false,           //新增渠道modal是否显示
    addChannelsModalButtonLoading : false,     //新增渠道modal按钮是否在加载状态

    /*编辑添加配置表单*/
    addConfigurationModalVisible : false,               //编辑添加配置表单modal是否显示
    addConfigurationModalButtonLoading : false,         //编辑添加配置表单modal按钮是否在加载状态
    editConfigurationContent: undefined,                   //编辑表单内容
    channelsId:'',                                      //渠道id
    bannerListArry : undefined,                                //banner列表
    bannerName: undefined,
    isRegister: 'true',                     //是否注册,true注册, false报名
    h5BgImg:'',
    formSet :[{
        "label": "机构名称",
        "name": "orgName",
        "type": "input",
        "hint": "请输入机构名称",
        "data": "",
        "hide": 1,
        "require": 1,
        "base": 1
    },{
        "label": "联系人",
        "name": "userName",
        "type": "input",
        "hint": "请输入您的姓名",
        "data": "",
        "hide": 1,
        "require": 1,
        "base": 1
    },
    {
        "label": "手机号码",
        "name": "tel",
        "type": "input",
        "hint": "请输入您的手机号",
        "data": "",
        "hide": 1,
        "require": 1,
        "base": 1
    },
    {
        "label": "机构类型",
        "name": "orgType",
        "type": "select",
        "hint": "请选择",
        "data": [
            {
                "value": "早教中心",
                "key": 0
            },
            {
                "value": "少儿外语",
                "key": 1
            },
            {
                "value": "学科辅导",
                "key": 2
            },
            {
                "value": "启蒙类",
                "key": 3
            },
            {
                "value": "舞蹈类",
                "key": 4
            },
            {
                "value": "音乐类",
                "key": 5
            },
            {
                "value": "美术类",
                "key": 6
            },
            {
                "value": "艺术综合类",
                "key": 7
            },
            {
                "value": "机器人乐高",
                "key": 8
            },
            {
                "value": "运动类",
                "key": 9
            },
            {
                "value": "幼儿园",
                "key": 10
            },
            {
                "value": "托管班",
                "key": 11
            },
            {
                "value": "职业教育",
                "key": 12
            },
            {
                "value": "其他",
                "key": 13
            }
        ],
        "hide": 1,
        "require": 1,
        "base": 0
    },
    {
        "label": "所在城市",
        "name": "city",
        "type": "select",
        "hint": "请选择",
        "data": "",
        "hide": 1,
        "require": 0,
        "base": 0
    },
    {
        "label": "邮箱",
        "name": "address",
        "type": "input",
        "hint": "请输入电子邮箱",
        "data": "",
        "hide": 1,
        "require": 0,
        "base": 0
    },
    {
        "label": "机构需求",
        "name": "orgNeed",
        "type": "input",
        "hint": "例如：学员管理",
        "data": "",
        "hide": 1,
        "require": 0,
        "base": 0
    }],
    extraFormSet: [],
    formStyleCfg: {},
    otherFormCfg: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/registration_form') {
            /*搜索租户列表数据*/
            dispatch({
                type:'queryChannel',
                payload:{
                    pageIndex : 0,
                    pageSize : 20,
                    channelName:"",
                }
            });
        }
      });
    },
  },

  effects: {
/*获取注册渠道信息*/
    *'queryChannel'({ payload },{ put , call , select }){
        let searchContent = {};
        let startTime = '',endTime = '';
        if(payload && payload.searchContent){
            searchContent = payload.searchContent;
             if(searchContent.gameTime && searchContent.gameTime.length > 0) {
                startTime = searchContent.gameTime[0].format('YYYY-MM-DD HH:mm:ss');
                endTime = searchContent.gameTime[1].format('YYYY-MM-DD HH:mm:ss');
             }
            searchContent.startTime = startTime;
            searchContent.endTime = endTime;
            delete payload.searchContent;
            delete searchContent.gameTime;
        }
        let params = { ...payload , ...searchContent };
        console.log(params)
        let { ret } = yield call(queryChannel,parse(params));
        if( ret && ret.errorCode === 9000 ){
            yield put({
                type:'updateState',
                payload:{
                    registrationTableContent:ret.results,
                    registrationTotal:ret.data.resultCount,
                    registrationPageIndex : ret.data.pageIndex || 0,
                    registrationPageSize : ret.data.pageSize || 20,
                    searchContent
                }
            });
        }else if( ret && ret.errorMessage ){
            message.error(ret.errorMessage);
        }else{
            message.error('您的网络状况不佳，请检查您的网络');
        }
    },
 /*新增渠道*/
    *'newChannels'({ payload },{ put , call , select }){
        yield put({ type:'updateState' , payload : { addChannelsModalButtonLoading : true }});
        let registrationForm = yield select(state => state.registrationForm);
        let pageIndex = registrationForm.registrationPageIndex;
        let pageSize = registrationForm.registrationPageSize;
        let searchContent = registrationForm.searchContent;
        let params = { pageIndex , pageSize , ...searchContent };
        let { ret } = yield call(newChannels,parse(payload));
        if( ret && ret.errorCode === 9000 ){
            message.success('新增成功');
            yield put({
                type:'updateState',
                payload:{
                    addChannelsModalVisible : false,
                }
            });
            yield put({
                 type:'queryChannel',
                    payload:{
                        ...params
                    }
            })
        }else if( ret && ret.errorMessage ){
            message.error(ret.errorMessage);
        }else{
            message.error('您的网络状况不佳，请检查您的网络');
        }
        yield put({ type:'updateState' , payload : { addChannelsModalButtonLoading : false }});
        },

/*删除渠道*/
        *'deleteChannels'({ payload },{ put , call , select }){
        yield put({ type:'updateState' , payload : { addChannelsModalButtonLoading : true }});
        let { ret } = yield call(deleteChannels,parse(payload));
        if( ret && ret.errorCode === 9000 ){
            message.success('删除成功');
            yield put({
                type:'updateState',
                payload:{
                    addChannelsModalVisible : false,
                }
            });
            yield put({
                 type:'queryChannel',
            })
        }else if( ret && ret.errorMessage ){
            message.error(ret.errorMessage);
        }else{
            message.error('您的网络状况不佳，请检查您的网络');
        }
        yield put({ type:'updateState' , payload : { addChannelsModalButtonLoading : false }});
        },
/*配置渠道注册表单*/
         *'configurationChannels'({ payload },{ put , call , select }){
        yield put({ type:'updateState' , payload : { addConfigurationModalButtonLoading : true }});
        let registrationForm = yield select(state => state.registrationForm);
        let pageIndex = registrationForm.registrationPageIndex;
        let pageSize = registrationForm.registrationPageSize;
        let searchContent = registrationForm.searchContent;
        let params = { pageIndex , pageSize , ...searchContent };
        let { ret } = yield call(configurationChannels,parse(payload));
        if( ret && ret.errorCode === 9000 ){
            message.success('保存成功');
            yield put({
                 type:'updateState',
                 payload:{
                    addConfigurationModalVisible : false,
                    extraFormSet: [],
                    formStyleCfg: {}
                }
            })
            yield put({
                 type:'queryChannel',
                    payload:{
                        ...params
                    }
            })
        }else if( ret && ret.errorMessage ){
            message.error(ret.errorMessage);
        }else{
            message.error('您的网络状况不佳，请检查您的网络');
        }
        yield put({ type:'updateState' , payload : { addConfigurationModalButtonLoading : false }});
        },

/*获取注册表单详情*/
        *'getRegisterChannel'({ payload },{ put , call , select }){
        yield put({ type:'updateState' , payload : { addConfigurationModalButtonLoading : true }});
        let { ret } = yield call(getRegisterChannel,parse(payload));
        if( ret && ret.errorCode === 9000 ){
            let content = ret.results.baseForm;
            let formStyleCfg = !!ret.results.formStyleCfg ? JSON.parse(ret.results.formStyleCfg) : {};
            let otherFormCfg = !!ret.results.otherFormCfg ? JSON.parse(ret.results.otherFormCfg) : [];
            yield put({
                 type:'updateState',
                 payload:{
                     addConfigurationModalVisible : true,
                     editConfigurationContent : JSON.parse(content),
                     formStyleCfg: formStyleCfg,
                     extraFormSet: otherFormCfg,
                     channelsId : ret.results.id,
                     bannerName : ret.results.formName,
                     isRegister: ret.results.isRegister,
                     h5BgImg : ret.results.h5BgImg || '',
                 }
            })
        }else if( ret && ret.errorMessage ){
            message.error(ret.errorMessage);
        }else{
            message.error('您的网络状况不佳，请检查您的网络');
        }
        yield put({ type:'updateState' , payload : { addConfigurationModalButtonLoading : false }});
        },

/*查询banner列表*/
       *'queryBannerChannel'({ payload },{ put , call , select }){
        yield put({ type:'updateState' , payload : { addConfigurationModalButtonLoading : true }});
        let { ret } = yield call(queryBannerChannel,parse(payload));
        if( ret && ret.errorCode === 9000 ){
            yield put({
                 type:'updateState',
                 payload:{
                     bannerListArry : ret.results,
                 }
            })
        }else if( ret && ret.errorMessage ){
            message.error(ret.errorMessage);
        }else{
            message.error('您的网络状况不佳，请检查您的网络');
        }
        yield put({ type:'updateState' , payload : { addConfigurationModalButtonLoading : false }});
        },
  },

  reducers: {
   //更新查询框的频道列表
    updateState(state, action) {
        return { ...state, ...action.payload };
        },
  }
};
