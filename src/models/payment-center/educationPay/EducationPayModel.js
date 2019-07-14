import { parse } from 'qs';
import { message } from 'antd';
import { schoolQueryList, addSchool } from '../../../services/payment-center/educationPay/EducationPayService'
export default {

    namespace: 'EducationPayModel',

    state: {
        tableLoading : false,
        dataSource : [],        //表格数据
        isShowSearch : true,    //是否显示搜索框
        total : '',             //表格数据总量
        pageSize : 10,
        pageIndex : 0,
        searchContent : {},     //搜索对象
		addNewSchoolVisible : false,     //添加学校的弹窗显示
		provinceCode : '',
		provinceName : '',
		cityCode : '',
		cityName : '',
		districtCode : '',
		districtName : '',
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/education_pay') {
                    dispatch({
                       type : 'schoolQueryList',
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
		/*查询学校列表*/
        *'schoolQueryList'({ payload }, { call, put, select }) {
            yield put ({ type : 'showTableLoading' });
            let searchContent = {};
            if(payload && payload.searchContent){
                searchContent = payload.searchContent;
                delete payload.searchContent
            }
            let params = { ...payload , ...searchContent };
            let { ret } = yield call(schoolQueryList, parse(params));
            if (ret && ret.errorCode == 9000) {
                yield put({
                    type: 'updateState',
                    payload : {
                        dataSource : ret.results,
                        total : ret.totalNum,
                        pageIndex : payload.pageIndex,
                        pageSize : payload.pageSize,
                        searchContent
                    }
                });
            } else {
                ret && message.error(ret.errorMessage || '查询出错啦');
            }
            yield put ({ type : 'closeTableLoading' });
        },
		/*新增学校*/
		*'addSchool'({ payload },{ put , call , select }){
            yield put({ type:'showTableLoading'});
            let currentModel = yield select(state => state.EducationPayModel);
			let orgImgUrlArr = [];
			let orgImgUrl = '';
			orgImgUrlArr = payload.orgImgUrl;
              if(orgImgUrlArr && orgImgUrlArr.length>0){
	             orgImgUrl = orgImgUrlArr[0].url;
	        }
			let params = {
				provinceCode : currentModel.provinceCode,
				provinceName : currentModel.provinceName,
				cityCode : currentModel.cityCode,
				cityName : currentModel.cityName,
				districtCode : currentModel.districtCode,
				districtName : currentModel.districtName,
				name : payload.name,
				type : payload.type,
				userName : payload.userName,
				tel : payload.tel,
				aliNum : payload.aliNum,
				orgImgUrl : orgImgUrl,
			}
            let { ret } = yield call(addSchool,parse(params));
            if( ret && ret.errorCode === 9000 ){
                message.success('新增成功');
                yield put({
                    type:'updateState',
                    payload:{
                        addNewSchoolVisible : false,
                    }
                });
                yield put({
                    type:'schoolQueryList',
                    payload:{
                        pageIndex : 0,
                        pageSize : 10
                    }
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({ type:'closeTableLoading' });
        },
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
