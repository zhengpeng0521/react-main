import React, { PropTypes } from 'react';
import { connect } from 'dva';
import ModuleBasePropsFormComponent from '../../../../components/SaasWeixinMarketing/saas-weixin-market-model-set/module-form/ModuleBasePropsFormComponent';

function ModuleBasePropsForm({dispatch, moduleBasePropsFormModel,}) {

    let {
        visible, loading, formData, typeComList, categoryComList,
        labelAll,
    } = moduleBasePropsFormModel;

    function onClose() {
        dispatch({
            type: 'moduleBasePropsFormModel/updateState',
            payload: {
               labelAll:'',
            }
        });
        dispatch({
            type: 'moduleBasePropsFormModel/handleClose',
        });
    }

    function onSubmit(values, afterSubmit) {
        dispatch({
            type: 'moduleBasePropsFormModel/updateState',
            payload: {
               labelAll:'',
            }
        });
        dispatch({
            type: 'moduleBasePropsFormModel/handleSubmit',
            payload: {
                values,afterSubmit,
            }
        });
    }

    let componentProps = {
        visible, loading, formData, typeComList, categoryComList,
        onSubmit, onClose, labelAll,
    };

    return (
        <ModuleBasePropsFormComponent {...componentProps} />
    );
}

ModuleBasePropsForm.propTypes = {
  dispatch: PropTypes.func,
  moduleBasePropsFormModel: PropTypes.object,
};

function mapStateToProps({moduleBasePropsFormModel}) {
  return {moduleBasePropsFormModel};
}

export default connect(mapStateToProps)(ModuleBasePropsForm);
