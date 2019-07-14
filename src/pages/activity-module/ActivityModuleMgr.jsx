import React, {PropTypes} from 'react';
import { connect } from 'dva';
import ActivityModuleMgrComponent from '../../components/activity-module/activity-module-mgr/ActivityModuleMgrComponent';

function ActivityModuleMgr({dispatch, activityModuleMgrModel}) {

    let {
        listData, selectedKeys, total, pageIndex, pageSize, queryLoading,
        queryFilter, searchVisible,
    } = activityModuleMgrModel;

    function handleQuery(query) {
        dispatch({
            type: 'activityModuleMgrModel/handleQuery',
            payload: {
                query
            }
        });
    }

    function switchSearch() {
        dispatch({
            type: 'activityModuleMgrModel/switchSearch'
        });
    }

    let componProps = {
        listData, total, pageIndex, pageSize, queryLoading,
        queryFilter, searchVisible,

        handleQuery, switchSearch,
    };

    return (
        <ActivityModuleMgrComponent {...componProps} />
    );
}

ActivityModuleMgr.propTypes = {
    dispatch: PropTypes.func,
};

function mapStateToProps({activityModuleMgrModel}) {
  return {activityModuleMgrModel};
}

export default connect(mapStateToProps)(ActivityModuleMgr);
