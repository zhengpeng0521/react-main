import { create, remove, update, query, queryForSearchChannelList,batchDelete,addImgTextTopic,updateImgTextTopic,defaultList} from '../../services/TopicMgr/topicMgr';
import { parse } from 'qs';
import { message } from 'antd';
import qs from 'qs';

//主题管理
export default {

    namespace: 'pinghecairen',

    state: {
        divProps : {},            //固定div属性
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/saitou') {

                }
            });
        },
    },

    effects: {


    },

    reducers: {
        //更新查询框的频道列表
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
