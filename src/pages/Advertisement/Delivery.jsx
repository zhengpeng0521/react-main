import React from 'react';
import DeliveryListComponent from '../../components/Advertisement/Delivery-management/DeliveryListComponent';
import { connect } from 'dva';

function Delivery({ dispatch, deliveryModel }) {

    let {
        sourceType, filter, totalCount, dataList, listLoading, listSelectIds, pageIndex, pageSize,
        adComList, adModuleIds, adCollectVisible, adCollectAdId, adCollectAdText, adCollectAdUrl,
    } = deliveryModel;

    function changeSourceType(sourceType) {
        dispatch({
            type: 'deliveryModel/changeSourceType',
            payload: {
                sourceType,
            }
        });

        dispatch({
            type: 'deliveryModel/queryList',
            payload: {
                sourceType,
                filter: {}, pageIndex: 0, pageSize: 10,
            }
        });
    }

    function onFilterQuery(filter) {
        dispatch({
            type: 'deliveryModel/queryList',
            payload: {
                filter,
            }
        });
    }

    function onPageQuery(pageIndex, pageSize) {
        dispatch({
            type: 'deliveryModel/queryList',
            payload: {
                pageIndex, pageSize,
            }
        });
    }

    function changeSelectIds(listSelectIds) {
        dispatch({
            type: 'deliveryModel/updateState',
            payload: {
                listSelectIds
            }
        });
    }

    function handleOpenAdCollect(moduleId, adId) {
        dispatch({
            type: 'deliveryModel/handleOpenAdCollect',
            payload: {
                moduleId, adId
            }
        });
    }

    //取消投放广告
    function handleCancleAdCollect(moduleId) {
        dispatch({
            type: 'deliveryModel/handleCancleAdCollect',
            payload: {
                moduleId,
            }
        });
    }

    function handleChangeAdCollect(value) {
        dispatch({
            type: 'deliveryModel/handleChangeAdCollect',
            payload: {
                adCollectAdId: value
            }
        });
    }

    function handleAdCollectCancle() {
        dispatch({
            type: 'deliveryModel/handleAdCollectCancle',
        });
    }

    function handleCreateAdCollect() {
        dispatch({
            type: 'deliveryModel/handleCreateAdCollect',
        });
    }

    let componentProps = {
        sourceType, filter, totalCount, dataList, listLoading, listSelectIds, pageIndex, pageSize, adComList, adModuleIds, adCollectVisible, adCollectAdId,
        changeSourceType, onFilterQuery, onPageQuery, changeSelectIds, handleOpenAdCollect, handleChangeAdCollect, handleAdCollectCancle, adCollectAdText, adCollectAdUrl,
        handleCancleAdCollect, handleCreateAdCollect,
    };
    return (
            <DeliveryListComponent {...componentProps}/>
  );
}

function mapStateToProps({ deliveryModel }) {
  return { deliveryModel };
}

export default connect(mapStateToProps)(Delivery);
