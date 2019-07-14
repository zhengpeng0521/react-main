import {
   //标签组
      getTagGroupsList,     //获取标签组列表
      labelGroupSorting,    //标签组排序
      labelGroupUpdate,     //修改标签组
      labelGroupCreate,     //新增标签组
      changTba,             //切换tab数据源
    //标签
       getTagList,          //获取标签列表
       labelSorting,        //标签排序
       labelUpdate,         //修改标签
       labelCreate,         //新增标签
       addOrEditlabel,      //添加或编辑变标签名的值
} from '../../services/TemplateTag/TagManagement';
import { parse } from 'qs';
import { message } from 'antd';
import qs from 'qs';


//模板标签
export default {

    namespace: 'tagManagement',

    state: {
        labelListContent: [],            //标签内容
        labelLoding: false,              //标签加载状态
        labelGroupLoading: false,        //标签组加载状态
        labelGroupListContent: [],       //标签组内容
        addLabelFormVisible: false,      //新增标签或标签组
        addLabelButtonLoading: false,    //新增标签或标签组提交时按钮是否加载状态
        labelListType:'1',               //tab切换 1.微活动
        labelGroupsIndex:0,              //选取标签组的索引
        lanelState:'',                   //编辑状态 新增：'add',编辑:'edit'
        labelType:'',                    //标签与标签组
        addOrEditLabelChirld:'',
        addOrEditlabel:'',              //添加或编辑变标签名的值
        addOrEditlabelId:'',            //添加或编辑变标签名的id
        labelGroupId:undefined,                   //标签id
        
	},
 
    subscriptions: {
        setup({ dispatch, history }) {

            history.listen(location => {
                if(location.pathname === '/tag_management') {
                   
                    dispatch({
                        type:'getTagGroupsList',
                        payload:{
                            product:"1"
                        }
                    });
                }
            });
           
        },
    },
    
    effects: {

        *'changTba'({ payload },{ put , call , select }){
            yield put({ type:'updateState' , payload : { labelGroupLoading : true }});
            let { ret } = yield call(getTagGroupsList,parse(payload));
            let tagManagement = yield select(state => state.tagManagement);
                if( ret && ret.errorCode === 9000 ){
                        yield put({
                            type : 'getTagGroupsList',
                            payload:  {
                                product :tagManagement.labelListType,
                            }
                        })

                 
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({ type:'updateState' , payload : { labelGroupLoading : false }});

    },



           /*获取标签组内容*/
           *'getTagGroupsList'({ payload },{ put , call , select }){
                yield put({ type:'updateState' , payload : { labelGroupLoading : true }});
                let { ret } = yield call(getTagGroupsList,parse(payload));
                let tagManagement = yield select(state => state.tagManagement);
                let numK = tagManagement.labelGroupsIndex;
                console.log("=======tagManagement1===",tagManagement.labelListType)
                if( ret && ret.errorCode === 9000 ){
                    let conte = ret.results;
                    yield put({
						type : 'updateState',
						payload:  {
							labelGroupListContent : conte,
						}
                    })
              
					if(conte.length>0){
						 yield put({
							type : 'getTagList',
							payload:  {
								groupId: conte[numK].id,
							}
						})
					}
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({ type:'updateState' , payload : { labelGroupLoading : false }});
            },
            /*获取标签内容*/
           *'getTagList'({ payload },{ put , call , select }){
                yield put({ type:'updateState' , payload : { labelLoding : true }});
                let { ret } = yield call(getTagList,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                     yield put({
						type : 'updateState',
						payload:  {
							labelListContent : ret.results,
						}
					})
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({ type:'updateState' , payload : { labelLoding : false }});
            },
            /*标签组内容排序*/
           *'labelGroupSorting'({ payload },{ put , call , select }){
                let tagManagement = yield select(state => state.tagManagement);
                yield put({ type:'updateState' , payload : { labelLoding : true }});
                let { ret } = yield call(labelGroupSorting,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success('排序成功');
                    yield put({
						type : 'getTagGroupsList',
						payload:  {
							product : tagManagement.labelListType,
						}
                    })
                   
                    console.log("=======tagManagement2===",tagManagement.labelListType)

                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({ type:'updateState' , payload : { labelLoding : false }});
            },
            /*标签内容排序*/
           *'labelSorting'({ payload },{ put , call , select }){
                let tagManagement = yield select(state => state.tagManagement);
                let numA = tagManagement.labelGroupListContent;
                let numB = tagManagement.labelGroupsIndex;
                yield put({ type:'updateState' , payload : { labelLoding : true }});
                let { ret } = yield call(labelSorting,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success('排序成功');
                    yield put({
						type : 'getTagList',
						payload:  {
							groupId : numA[numB].id,
						}
					})
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({ type:'updateState' , payload : { labelLoding : false }});
            },
            /*修改标签组内容*/
           *'labelGroupUpdate'({ payload },{ put , call , select }){
               let tagManagement = yield select(state => state.tagManagement);
                yield put({ type:'updateState' , payload : { labelLoding : true }});
                let { ret } = yield call(labelGroupUpdate,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                     yield put({
						type : 'getTagGroupsList',
						payload:  {
							product : tagManagement.labelListType,
						}
					})
                    yield put({
						type : 'updateState',
						payload:  {
							addLabelFormVisible : false,
						}
					})
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({ type:'updateState' , payload : { labelLoding : false }});
            },
             /*修改标签内容*/
           *'labelUpdate'({ payload },{ put , call , select }){
                let tagManagement = yield select(state => state.tagManagement);
                yield put({ type:'updateState' , payload : { labelLoding : true }});
                let { ret } = yield call(labelUpdate,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                     yield put({
						type : 'getTagGroupsList',
						payload:  {
							product : tagManagement.labelListType,
						}
					})
                     yield put({
						type : 'updateState',
						payload:  {
							addLabelFormVisible : false,
						}
					})
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({ type:'updateState' , payload : { labelLoding : false }});
            },
            /*添加标签组内容*/
           *'labelGroupCreate'({ payload },{ put , call , select }){
                let tagManagement = yield select(state => state.tagManagement);
                yield put({ type:'updateState' , payload : { labelLoding : true }});
                let { ret } = yield call(labelGroupCreate,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    yield put({
						type : 'getTagGroupsList',
						payload:  {
							product : tagManagement.labelListType,
						}
					})
                    yield put({
						type : 'updateState',
						payload:  {
							addLabelFormVisible : false,
						}
					})
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({ type:'updateState' , payload : { labelLoding : false }});
            },
              /*添加标签内容*/
           *'labelCreate'({ payload },{ put , call , select }){
                let tagManagement = yield select(state => state.tagManagement);
                yield put({ type:'updateState' , payload : { labelLoding : true }});
                let { ret } = yield call(labelCreate,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    yield put({
						type : 'getTagGroupsList',
						payload:  {
							product : tagManagement.labelListType,
						}
					})
                    yield put({
						type : 'updateState',
						payload:  {
							addLabelFormVisible : false,
						}
					})
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({ type:'updateState' , payload : { labelLoding : false }});
            },
        },

    reducers: {
        //更新state
        updateState(state, action) {
            return { ...state, ...action.payload };
        }
     
    },
};
