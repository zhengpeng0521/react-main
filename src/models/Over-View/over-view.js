import { parse } from 'qs';
import { message } from 'antd';

//机器人业务
export default {

    namespace: 'overview',

    state: {

    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {

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
