import {message} from 'antd';
import { parse } from 'qs';
import {moduleFormDetail,moduleFormSubmit, moduleOfflineLeafletsFormSubmit, moduleOfflineLeafletsFormDetail,getTagGroups} from '../../../services/SaasWeixinMarketing/moduleFormService';
/*
 * 自定义模板的基本属性表单
 */
export default {

  namespace: 'moduleBasePropsFormModel',

  state: {
      visible: false,//控制是否显隐
      loading: false,//控制是否加载中
      formData: {},//表单初始数据
      labelAll: [],//所有标签
      typeComList: [{label: '高级模板', value: ''}, {label: '自定义微活动', value: 'activity'}, {label: '自定义微传单', value: 'leaflet'}, {label: '自定义线下传单', vlaue : 'offlineLeaflets'}],//模板类型下拉框数据
      categoryComList: [{label: '节日', value: '101'}, {label: '亲情', value: '102'}, {label: '活动', value: '103'}],

      afterFormSubmit: undefined,//表单提交后事件
},

  effects: {
    *handleShow({ payload }, { call, put }) {
		
        let formDataId = payload && payload.formDataId;
        let afterFormSubmit = payload && payload.afterFormSubmit;
        let type =  payload && payload.type;
        let formData = {};
        if(formDataId != undefined && formDataId != '') {
            //查询模板详情
            yield put({
                type: 'updateState',
                payload: {
                    loading: true,
                }
            });
            let params = {id: formDataId};
            let module = undefined;

			if(payload.type&&payload.type === "offlineLeaflets") {
				module = yield call( moduleOfflineLeafletsFormDetail, parse(params));
			} else {
				module = yield call( moduleFormDetail, parse(params));
			}
            if( module && module.ret && module.ret.errorCode == 9000 ){
                formData = {...module.ret};
                formData.type = formData.type || '';
                let icon = formData.icon;
                if(icon && icon.length > 0) {
                    let iconList = [{
                        uid: -1,
                        name: '-1.png',
                        status: 'done',
                        url: icon,
                    }];
                    formData.iconList = iconList;
                }
            } else {
                message.error((module && module.ret && module.ret.errorMessage) || '模板不存在或者已经被删除');
                return false;
            }
        } else {
            formData.type = payload&&payload.type || '';
        }
        let productId = formData.categoryId || type;

        if(productId==2){
            productId=1;
        }
        if(productId == 1){
            yield put({
                type: 'getTagGroups',
                payload: {
                   product:productId,
                }
            });
        }
        yield put({
            type: 'updateState',
            payload: {
                visible: true,
                loading: false,
                formData,
                afterFormSubmit,
            }
        });
    },
    /*获取标签*/
        *'getTagGroups'({ payload },{ put , call , select }){
          let { ret } = yield call(getTagGroups,parse(payload));
          if( ret && ret.errorCode === 9000 ){
              yield put({
                  type:'updateState',
                  payload:{
                      labelAll: ret.results || [],
                  }
              });
          }else if( ret && ret.errorMessage ){
              message.error(ret.errorMessage);
          }else{
              message.error('您的网络状况不佳，请检查您的网络');
          }
      },
        /*保存基本属性*/
        *handleSubmit({ payload }, { call, put, select }) {
            let values = (payload && payload.values) || {};
            let afterSubmit = payload && payload.afterSubmit;

            yield put({
                type : 'updateState',
                payload : {
                    loading: true,
                }
           });
			
			let module = undefined;
			if(values&&values.type === "offlineLeaflets") {
				module = yield call( moduleOfflineLeafletsFormSubmit, parse(values));
			} else {
				module = yield call( moduleFormSubmit, parse(values));
			}
						
            if( module.ret && module.ret.errorCode == 9000 ){
                message.success('模板保存成功');
                afterSubmit && afterSubmit();
                let moduleBasePropsFormModel = yield select(state => state.moduleBasePropsFormModel);
                moduleBasePropsFormModel.afterFormSubmit && moduleBasePropsFormModel.afterFormSubmit();
            } else {
                message.error((module.ret && module.ret.errorMessage) || '模板保存失败');
                yield put({
                    type : 'updateState',
                    payload : {
                        loading: false,
                    }
               });
            }
        },
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },

    handleClose(state, action) {
      return { ...state, visible: false, loading: false, formData: {},};
    },
  },

};
