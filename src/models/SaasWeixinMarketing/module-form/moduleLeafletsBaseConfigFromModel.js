import {message} from 'antd';
import { parse } from 'qs';
import {moduleFormDetail, moduleFormSubmit, uploadImageMethods, moduleOfflineLeafletsFormDetail, saveOfflineLeafletsConfig} from '../../../services/SaasWeixinMarketing/moduleFormService';
/*
 * 自定义模板的页面配置数据表单
 */

const elementLocation = [{title : '上对齐', 	value : 'chuizhidingduiqi', selectStatus : false},
						 {title : '垂直居中',  value : 'chuizhijuzhong', 	selectStatus : false},
						 {title : '下对齐',	value : 'chuizhididuiqi', 	selectStatus : false},
						 {title : '左对齐', 	value : 'zuoduiqi1', 		selectStatus : false},
						 {title : '水平居中',  value : 'shuipingjuzhong', 	selectStatus : false},
						 {title : '右对齐', 	value : 'youduiqi1', 		selectStatus : false}];
export default {

	  namespace: 'moduleLeafletsConfigFormModel',

	  state: {
		  
		  attrId				: undefined,			//实例ID
		  
		  attrVisible			: false,				//是否显隐
		  
		  arrtLoading			: false,				//是否加载中
		  		  
		  attrDraggableAxis 	: 'both',				//是否拖拽		  
		  
		  attrSelectElement 	: undefined,			//选中元素
		  
		  attrSelectActivityKey : '1', 					//选中的tabs

		  attrDefaultConfig 	: `{"mainConfig":{"attrDirection":"vertical","attrFrontAndBehind":"front","attrShowBleedingLine":true,"attrShowGridLine":true},"frontPageConfig":{"pageConfig":{"backgroundImage":"","backgroundColor":"#FFF","backgroundSize":"100% 100%","backgroundRepeat":"no-repeat","backgroundPosition":"center","borderColor":"#5d9cec"},"itemConfig":[]},"behindPageConfig":{"pageConfig":{"backgroundImage":"","backgroundColor":"#FFF","backgroundSize":"100% 100%","backgroundRepeat":"no-repeat","backgroundPosition":"center","borderColor":"#5d9cec"},"itemConfig":[]}}`,
		  
		  attrAligntext 		: [{title : '上对齐', 	value : 'chuizhidingduiqi', selectStatus : false},
								   {title : '垂直居中',  value : 'chuizhijuzhong', 	selectStatus : false},
								   {title : '下对齐',	value : 'chuizhididuiqi', 	selectStatus : false},
								   {title : '左对齐', 	value : 'zuoduiqi1', 		selectStatus : false},
								   {title : '水平居中',  value : 'shuipingjuzhong', 	selectStatus : false},
								   {title : '右对齐', 	value : 'youduiqi1', 		selectStatus : false},
								   {title : '加粗', value : 'jiacu', selectStatus : false},
								   {title : '倾斜', value : 'qingxie', selectStatus : false},
								   {title : '下划线', value : 'xiahuaxian', selectStatus : false}],
		  
		  attrElementLocation 	: elementLocation,
		  
		  attrEditElementText 	: false,
		  
		  attrAllConfig : {							//所有配置数据
			  mainConfig : {
				  attrDirection : 'vertical',		//默认竖向 horizontal || vertical
				  attrFrontAndBehind : 'front',		//正反面
				  attrShowBleedingLine : true,		//显隐出血线
				  attrShowGridLine : true,			//显隐网格线
			  },
			  frontPageConfig : {
				  pageConfig : {					//正面所有数据
					  backgroundImage : '',
					  backgroundColor : '#FFF',
					  backgroundSize : '100% 100%',
					  backgroundRepeat: 'no-repeat',
					  backgroundPosition: 'center',
					  borderColor : '#5d9cec',
				  },
				  itemConfig : [],
			  },
			  behindPageConfig : {	
				  pageConfig : {					//反面所有数据
					  backgroundImage : '',
					  backgroundColor : '#FFF',
					  backgroundSize : '100% 100%',
					  backgroundRepeat: 'no-repeat',
					  backgroundPosition: 'center',  
					  borderColor : '#5d9cec',
				  },
				  itemConfig : [],
			  }
		  },
	  },

	  effects: {

		*handleShow({ payload }, { call, put, select }) {
			
			let model = yield select(state => state.moduleLeafletsConfigFormModel);
			
			let formDataId = payload && payload.formDataId;
			
			let moduleConfigData = {};

			if(formDataId != undefined && formDataId != '') {

				yield put({
					type: 'updateState',
					payload: {
						arrtLoading: true,
						attrId : formDataId,
					}
				});
				
				let params = {id: formDataId};

				let {ret} = yield call( moduleOfflineLeafletsFormDetail, parse(params));

				if( ret && ret.errorCode == 9000 ){
										
					let detailData = ret.detailData || '';

					if(detailData != undefined && detailData != '') {
						moduleConfigData = JSON.parse(detailData);
					} else {
						moduleConfigData = JSON.parse(model.attrDefaultConfig);
					}
					moduleConfigData.mainConfig.attrDirection = ret.page_type;
					
				} else {
					message.error((ret && ret.errorMessage) || '模板不存在或者已经被删除');
					return false;
				}
			} else {
				message.error('实例id不能为空');
				return false;
			}
			
			yield put({
				type: 'updateState',
				payload: {
					attrVisible: true,
					arrtLoading: false,
					attrAllConfig : moduleConfigData,
				}
			});
		},
			
		//图片上传
		*uploadImage({payload}, { call, put, select }) {
					
			let model = yield select(state => state.moduleLeafletsConfigFormModel);

			let behindOrFront = model.attrAllConfig.mainConfig.attrFrontAndBehind;
						
			let ret = yield call(uploadImageMethods, payload.value.file);
				
			//获取所有元素
			let itemArr = behindOrFront == 'front' ? model.attrAllConfig.frontPageConfig.itemConfig : model.attrAllConfig.behindPageConfig.itemConfig;
				
			let timeStamp = String(new Date().getTime());
								
			if(ret.errorCode == 9000) {
				
				let element = {
					...payload.value.newElement,
					backgroundImage	: ret.data.url,
					w : ret.data.width + 'px',
					h : ret.data.height + 'px',
				}
								
				if(itemArr.length > 0) {
					itemArr.map((item, index) => {
						if(index == itemArr.length - 1) {
							itemArr.push({index : index+1, item : element, key : timeStamp });
						}
					})
				} else {
					itemArr.push({index : 0, item : element, key : timeStamp});
				}
					
				if(behindOrFront === 'front') {
					model.attrAllConfig.frontPageConfig.itemConfig = itemArr;
				} else {
					model.attrAllConfig.behindPageConfig.itemConfig = itemArr;
				}
				
				yield put({
					type: 'updateState',
					payload: {
						attrAllConfig: model.attrAllConfig,
					}
				});
								
			} else {
				message.info(ret && ret.errorMessage || '上传图片失败');
			}
		},

		//所有数据上传和修改
		*subitEditData({payload}, { call, put, select }) {
			
			let model = yield select(state => state.moduleLeafletsConfigFormModel);
			
			let params = {
				id 		: model.attrId || undefined,
				detailData : JSON.stringify(payload&&payload.attrAllConfig),
			}
								
			let {ret} = yield call( saveOfflineLeafletsConfig, parse(params));
			
			if(ret && ret.errorCode == 9000) {

				yield put({
					type: 'updateState',
					payload: {
						attrVisible: payload&&payload.attrVisible,
						attrSelectElement : payload&&payload.attrSelectElement || undefined,
					}
				});
				message.success('保存成功');
			} else {
				message.error((ret && ret.errorMessage) || '保存失败');
			}
		}
	},

  	reducers: {
	  updateState(state, action) {
      		return { ...state, ...action.payload };
    	},
  	},
};
