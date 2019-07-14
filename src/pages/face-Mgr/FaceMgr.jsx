import React from 'react'
import QueueAnim from 'rc-queue-anim';
import { message } from 'antd';
import { connect } from 'dva';
import qs from 'qs';
import FaceMgrTable from '../../components/faceMgr/FaceMgrTable';
import FaceMgrSearch from '../../components/faceMgr/FaceMgrSearch';
import OpenFaceModal from '../../components/faceMgr/OpenFaceModal';
import DeviceList from '../../components/faceMgr/DeviceList'
import AddDevice from '../../components/faceMgr/AddDevice'

function FaceMgr({ dispatch, faceMgrModel }){

  let {
    /*搜索栏*/
    searchVisible,                  //搜索栏显隐
    searchContent,                  //搜索内容
    /*列表*/
    pageIndex,        //套餐页码
    pageSize,         //套餐每页条数
    tableData,        //套餐管理列表数据
    total,            //套餐管理列表条数
    loading,          //套餐管理列表加载状态
    selectRow,
    /*开通套餐*/
    saasPackageOpeningModalVisible,                 //modal是否显示
    saasPackageOpeningModalButtonLoading,           //modal按钮是否在加载状态
    saasPackageOpeningModalSelectContent,           //套餐列表数据
    saasPackageOpeningModalSearchType,              //机构搜索方式(0按机构和机构手机号/1按租户查询)
    saasPackageOpeningModalTenantSelectVisible,     //租户下拉列表是否显示(搜素租户之后才显示)
    saasPackageOpeningModalTenantSelectContent,     //租户下拉列表数据
    saasPackageOpeningModalOrgArray,                //接口获取的机构原始数据
    saasPackageOpeningModalTransferAllcontent,      //机构穿梭框左边数据
    saasPackageOpeningModalTransferTargetContent,   //机构穿梭框右边数据

    /*设备列表*/
    deviceVisible,    // 设备列表visible
    deviceLoading,
    deviceList,     //设备列表
    addDeviceVisible,  // 添加设备
    addLoading,
  } = faceMgrModel

  function dp(path,obj){ dispatch({ type : path , payload : obj }) }

  //搜索栏点击查询或清除条件
  function SearchSubmit(data){
    dp('faceMgrModel/getFaceList',{
        pageIndex : 0,
        pageSize,
        searchContent : data
    })
  }

  /*点击筛选*/
  function ShowPackageOpeningSearchBar() {
    dispatch({
        type: 'faceMgrModel/updateState',
        payload: {
          searchVisible : !searchVisible,
        },
    });
  }

  /*套餐管理列表状态改变(分页等)*/
  function tableOnChange(pagination){
    dispatch({
      type: 'faceMgrModel/updateState',
      payload: {
        pageIndex : pagination.current-1,
        pageSize : pagination.pageSize,
      },
    });
    dispatch({
        type: 'faceMgrModel/getFaceList',
        payload: {
            pageIndex : pagination.current-1,
            pageSize : pagination.pageSize,
            searchContent
        },
    });
  }

  /*按查询结果导出*/
  function ExportTableContent(){
    window.open(`${BASE_URL}/faceRecognitionMeal/exportFaceMealList?${qs.stringify(searchContent)}`)
  }

  /*点击套餐开通*/
  function OpeningPackage(){
    dispatch({
      type: 'faceMgrModel/updateState',
        payload: {
          saasPackageOpeningModalVisible: true
        },
    })
  }

  /*根据系统类型查询当前套餐*/
  let MealListResTypeOnChange = function(e){
    dispatch({
        type: 'faceMgrModel/GetPackageSelectList',
        payload:{
            pageSize : 99999,
            pageIndex : 0,
            status : 1,
            resType : e.target.value       //默认查询系统类型为机构的
        }
    });
    dispatch({
        type : 'faceMgrModel/updateState',
        payload : {
            saasPackageOpeningModalTenantSelectVisible : false,
            saasPackageOpeningModalTransferAllcontent : []
        }
    })
  }

  /*选择搜索方式onChange事件*/
  let SaasPackageOpeningModalChooseQueryType = function(value){
    dispatch({
        type: 'faceMgrModel/updateState',
        payload: {
            saasPackageOpeningModalSearchType : value,
            saasPackageOpeningModalTenantSelectVisible : false,
            saasPackageOpeningModalTenantSelectContent : [],     //租户下拉列表数据
            saasPackageOpeningModalTransferAllcontent : [],      //机构穿梭框左边数据
            saasPackageOpeningModalTransferTargetContent : [],   //机构穿梭框右边数据
        },
    });
  }

  /*搜索通过机构名称或手机号搜索机构*/
  let SaasPackageOpeningModalSearchOrgNameOrTel = function(data,resType){
    dispatch({
        type: 'faceMgrModel/GetOrgDetail',
        payload: {
            nameOrMobile : data,
            orgKind : resType
        },
    });
  }

  /*搜索租户列表*/
  let SaasPackageOpeningModalSearchTenant = function(id,name,tel){
    dispatch({
        type: 'faceMgrModel/GetTenantDetail',
        payload: {
            id,
            name,
            tel,
            pageIndex : 0,
            pageSize : 99999,
        },
    });
  }

  /*通过租户搜索机构*/
  let SaasPackageOpeningModalSearchOrgByTenant = function(id,resType){
    dispatch({
        type: 'faceMgrModel/GetOrgByTenantId',
        payload: {
            id,
            orgKind : resType
        }
    });
  }

  /*穿梭款onChange事件*/
  let SaasPackageOpeningModalTransferhandleChange = function(targetKeys, direction, moveKeys){
    dispatch({
        type:'faceMgrModel/updateState',
        payload:{
            saasPackageOpeningModalTransferTargetContent : targetKeys,
        }
    });
  }

  /*表单提交*/
  let SaasPackageOpeningModalSubmit = function(data){
    dispatch({
        type:'faceMgrModel/OpeningPackage',
        payload:{
            ...data
        }
    });
  }

  /*表单关闭*/
  let SaasPackageOpeningModalCancel = function(){
    dispatch({
        type: 'faceMgrModel/updateState',
        payload: {
            saasPackageOpeningModalVisible : false,
            saasPackageOpeningModalTenantSelectVisible : false,
            saasPackageOpeningModalSearchType : '1',
            saasPackageOpeningModalTenantSelectContent : [],
            saasPackageOpeningModalTransferAllcontent : [],
            saasPackageOpeningModalTransferTargetContent : [],
        },
    });
  }

  /*打开modal*/
  let CheckIncludeModular = function(passId){
    dispatch({
        type:'faceMgrModel/ModalGetPackageList',
        payload:{
            pageIndex : 0,
            pageSize : 9999,
            passId,
        }
    });
  }

  /*=======================================设备列表================================================= */
  /** 打开设备列表 */
  function openDevice(row){
    dispatch({
      type:'faceMgrModel/updateState',
      payload:{
        deviceVisible: true,
        selectRow: row
      }
    })
    dispatch({
      type:'faceMgrModel/getDeviceList',
      payload:{
        tenantId: row.tenantId,
        orgId: row.orgId
      }
    })
  }

  /** 设备列表确定 */
  function deviceOk(){
    dispatch({
      type:'faceMgrModel/updateState',
      payload:{
        deviceVisible: false
      }
    })
  }

  /** 设备列表取消 */
  function deviceCancel(){
    dispatch({
      type:'faceMgrModel/updateState',
      payload:{
        deviceVisible: false,
        selectRow: {}
      }
    })
  }

  /** 添加设备 */
  function addDevice(){
    dispatch({
      type:'faceMgrModel/updateState',
      payload:{
        addDeviceVisible: true
      }
    })
  }

  /** 取消添加 */
  function addCancel(){
    dispatch({
      type:'faceMgrModel/updateState',
      payload:{
        addDeviceVisible: false
      }
    })
  }

  /** 保存设备 */
  function addOK(values){
    dispatch({
      type:'faceMgrModel/saveDevice',
      payload:{
        ...values,
        mealId: selectRow.id,
        tenantId: selectRow.tenantId,
        orgId: selectRow.orgId
      }
    })
  }

  //搜索栏属性
  let FaceMgrSearchProps = {
    SearchSubmit,                   //搜索栏点击查询或清除条件
  }

  //列表属性
  let FaceMgrTableProps = {
    pageIndex,        //套餐页码
    pageSize,         //套餐每页条数
    tableData,        //套餐管理列表数据
    total,            //套餐管理列表条数
    loading,          //套餐管理列表加载状态

    OpeningPackage,                     //开通套餐
    ShowPackageOpeningSearchBar,        //点击筛选
    tableOnChange,                      //套餐管理列表状态改变(分页等)
    ExportTableContent,                 //按查询结果导出
    openDevice,                         //打开设备列表
  }

  let OpenFaceModalProps = {
    saasPackageOpeningModalVisible,                 //modal是否显示
    saasPackageOpeningModalButtonLoading,           //modal按钮是否在加载状态
    saasPackageOpeningModalSelectContent,           //套餐列表数据
    saasPackageOpeningModalSearchType,              //机构搜索方式(0按机构和机构手机号/1按租户查询)
    saasPackageOpeningModalTenantSelectVisible,     //租户下拉列表是否显示(搜素租户之后才显示)
    saasPackageOpeningModalTenantSelectContent,     //租户下拉列表数据
    saasPackageOpeningModalOrgArray,                //接口获取的机构原始数据
    saasPackageOpeningModalTransferAllcontent,      //机构穿梭框左边数据
    saasPackageOpeningModalTransferTargetContent,   //机构穿梭框右边数据

    MealListResTypeOnChange,                        //根据系统类型查询当前套餐
    SaasPackageOpeningModalCancel,                  //模态框关闭
    SaasPackageOpeningModalChooseQueryType,         //选择搜索方式onChange事件
    SaasPackageOpeningModalTransferhandleChange,    //穿梭款onChange事件
    CheckIncludeModular,                            //查看套餐中的模块
    SaasPackageOpeningModalSubmit,                  //表单提交
    SaasPackageOpeningModalSearchOrgNameOrTel,      //机构名称或手机号搜索
    SaasPackageOpeningModalSearchTenant,            //搜索租户列表
    SaasPackageOpeningModalSearchOrgByTenant,       //通过租户搜索机构
  }

  let deviceProps = {
    deviceVisible,
    deviceLoading,
    deviceList,     //设备列表

    deviceOk,
    deviceCancel,
    addDevice,      //添加设备
  }

  let addProps = {
    addDeviceVisible,
    addLoading,

    addOK,      // 保存设备
    addCancel,  // 取消添加
  }

  return (
    <div>
      <QueueAnim
        type={['top', 'top']}
        ease={['easeOutQuart', 'easeInOutQuart']}
        className="common-search-queue" >
        { searchVisible ? <FaceMgrSearch key = 'FaceMgrSearch' {...FaceMgrSearchProps}/> : null }
      </QueueAnim>
      <FaceMgrTable {...FaceMgrTableProps}/>
      {saasPackageOpeningModalVisible && <OpenFaceModal {...OpenFaceModalProps} />}
      {deviceVisible && <DeviceList {...deviceProps} />}
      {addDeviceVisible && <AddDevice {...addProps} />}
    </div>
  )
}

const mapStateToProps = ({ faceMgrModel }) => ({ faceMgrModel })

export default connect(mapStateToProps)(FaceMgr)
