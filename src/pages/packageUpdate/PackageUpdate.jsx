import React, { PropTypes } from "react";
import { Table, Modal, message } from "antd";
import PackageUpdateList from "../../components/packageUpdate/PackageUpdateList";
import PackageUpdateSearch from "../../components/packageUpdate/PackageUpdateSearch";

import qs from "qs";

import QueueAnim from "rc-queue-anim";

import { connect } from "dva";

function packageUpdate({ dispatch, packageUpdate }) {
  //只传数据
  let {
    loading,
    list,
    total,
    pageIndex,
    pageSize,
    searchData,
    searchVisible,
    checkModalVisible, //点击'包含模版'下内容是弹窗是否显示
    checkModalContent, //点击'包含模版'获取到的值
    checkModalNoDefaultExpandedKeys, //查看模板数量默认树状展示

    OrganMessageDetailVisible,
    OrganMessageDetailDateSource,
    type,
    selectedRowKeys,
    selectedRows
  } = packageUpdate;

  let tableOnChange = function(pagination, filters, sorter) {
    dispatch({
      type: "packageUpdate/queryForOrganMessage",
      payload: {
        pageIndex: pagination.current - 1,
        pageSize: pagination.pageSize,
        ...searchData
      }
    });
  };

  //搜索数据清空
  let searchReset = function() {
    dispatch({
      type: "packageUpdate/queryForOrganMessage",
      payload: {
        pageIndex: 0,
        pageSize
      }
    });
  };

  //点击搜索
  let searchSubmit = function(value) {
    dispatch({
      type: "packageUpdate/queryForOrganMessage",
      payload: {
        pageIndex: 0,
        pageSize,
        ...value
      }
    });
  };

  //点击筛选
  let tableOnFilter = function() {
    dispatch({
      type: "packageUpdate/updateState",
      payload: {
        searchVisible: !searchVisible
      }
    });
  };

  //按查询结果导出
  let tableOnExport = function() {
    //        let exStartTime = window.exStartTime;
    //        let exEndTime = window.exEndTime;
    window.open(
      `${BASE_URL}/organInfo/exportOrganList?${qs.stringify(searchData)}`
    );
  };

  let organMessageSearchProps = {
    searchReset,
    searchSubmit
  };

  /*查看套餐包含模块*/
  //    let tableOnCheckModal = function(id){
  //        dispatch({
  //            type:'organMessage/AfterOperationQuery',
  //            payload:{
  //                id,
  //            }
  //        });
  //    }
  /*关闭查看模板模态框*/
  let checkModalNoModalCancel = function() {
    dispatch({
      type: "packageUpdate/updateState",
      payload: {
        checkModalVisible: false
      }
    });
  };
  /*设置冻结*/
  let tableOrganPackageFreeze = function(data) {
    dispatch({
      type: "packageUpdate/OrganMangeFreeze",
      payload: {
        code: 3,
        orgId: data.id,
        tenantId: data.tenantId
      }
    });
  };

  /*设置解冻*/
  let tableOrganPackageNoFreeze = function(data) {
    dispatch({
      type: "packageUpdate/OrganMangeFreeze",
      payload: {
        code: 1,
        orgId: data.id,
        tenantId: data.tenantId
      }
    });
  };

  function showDetilFun(tenantId, id, type) {
    dispatch({
      type: "packageUpdate/updateState",
      payload: {
        OrganMessageDetailVisible: !OrganMessageDetailVisible,
        type: type
      }
    });
    dispatch({
      type: "packageUpdate/getAllSaasPayment",
      payload: {
        tenantId,
        id,
        type: type
      }
    });
  }
  function TableCancel() {
    dispatch({
      type: "packageUpdate/updateState",
      payload: {
        OrganMessageDetailVisible: !OrganMessageDetailVisible
      }
    });
  }

  /*复选框处理事件*/
  function rowSelectChangeAction(selectedRowKeys, selectedRows) {
    dispatch({
      type: "packageUpdate/updateState",
      payload: {
        selectedRowKeys,
        selectedRows
      }
    });
  }

  /*升级套餐*/
  function packageUpdateFunc() {
    let InfoArr = [];
    if (selectedRows && selectedRows.length > 0) {
      for (let item of selectedRows) {
        let obj = {};
        obj = {
          orgId: item.id,
          tenantId: item.tenantId
        };
        InfoArr.push(obj);
      }
      dispatch({
        type: "packageUpdate/updateToSs",
        payload: {
          orgList: JSON.stringify(InfoArr)
        }
      });
    } else {
      message.error("至少选中一项套餐升级");
    }
  }

  let organMessageListProps = {
    pageIndex,
    pageSize,
    loading,
    list,
    total,
    tableOnChange,
    tableOnFilter,
    tableOnExport, //按查询结果导出
    //        tableOnCheckModal,  //查看套餐包含模块
    tableOrganPackageFreeze, //冻结机构
    tableOrganPackageNoFreeze, //解冻机构
    showDetilFun,
    rowSelectChangeAction,
    selectedRowKeys,
    packageUpdateFunc
  };

  return (
    <div>
      <QueueAnim
        type={["top", "top"]}
        ease={["easeOutQuart", "easeInOutQuart"]}
        className="common-search-queue">
        {searchVisible
          ? [
              <PackageUpdateSearch
                {...organMessageSearchProps}
                key="search_queue"
              />
            ]
          : null}
      </QueueAnim>
      <PackageUpdateList {...organMessageListProps} />
    </div>
  );
}

function mapStateToProps({ packageUpdate }) {
  return { packageUpdate };
}

export default connect(mapStateToProps)(packageUpdate);
