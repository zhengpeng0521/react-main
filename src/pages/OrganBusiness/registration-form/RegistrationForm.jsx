import React, { PropTypes } from 'react';
import qs from 'qs';
import { connect } from 'dva';
import QueueAnim from 'rc-queue-anim';
import RegistrationFormSearch from '../../../components/OrganBusiness/registration-form/RegistrationFormSearch';
import RegistrationFormList from '../../../components/OrganBusiness/registration-form/RegistrationFormList';
import RegistrationFormAddChannelModal from '../../../components/OrganBusiness/registration-form/RegistrationFormAddChannelModal';
import RegistrationConfigurationModal from '../../../components/OrganBusiness/registration-form/RegistrationConfigurationModal';

function RegistrationForm({ dispatch, registrationForm }) {

    let{
       /*表单*/
       registrationPageIndex,        //列表页码
       registrationPageSize,         //列表一页条数
       registrationLoading,          //列表加载状态
       registrationTotal,            //列表内容总条数
       registrationTableContent,     //列表内容

        /*搜索*/
        searchVisible,          //搜索栏是否显示
        searchContent,          //搜索栏搜索内容

        /*新增渠道*/
        addChannelsModalVisible,           //新增渠道modal是否显示
        addChannelsModalButtonLoading,     //新增渠道modal按钮是否在加

        /*编辑添加配置表单*/
        addConfigurationModalVisible,               //编辑添加配置表单modal是否显示
        addConfigurationModalButtonLoading,         //编辑添加配置表单modal按钮是否在加载状态
        editConfigurationContent,                   //编辑表单内容
        formSet,                                     //初始表单
        channelsId,                                 //渠道id
        bannerListArry,                             //banner列表
        bannerName,
        isRegister,
        h5BgImg,
        extraFormSet,                               //额外表单
        formStyleCfg,
        otherFormCfg,
    }= registrationForm;


   /*分页 改变*/
    let registrationTableOnChange = function(pagination, filters, sorter){
        dispatch({
            type: 'registrationForm/queryChannel',
            payload: {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
                searchContent,
            },
        });
    };

    //表格点击筛选
    let registrationTableOnFilter = function() {
        dispatch({
            type: 'registrationForm/updateState',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //查询框点击查询
    let searchSubmit = function(data) {
        dispatch({
            type: 'registrationForm/queryChannel',
            payload: {
                pageIndex : 0,
                pageSize:registrationPageSize,
                searchContent : data
            },
        });
    };

  /*新增渠道*/
     /*点击新增渠道*/
        let AddregistrationMessageChange = function(){
            dispatch({
                type:'registrationForm/updateState',
                payload:{
                    addChannelsModalVisible : true,
                }
            });
        }

        /*关闭新增编辑模态框*/
        let AddregistrationModalCancel = function(){
            dispatch({
                type:'registrationForm/updateState',
                payload:{
                    addChannelsModalVisible : false,
                }
            });
        }

        /*新增编辑提交*/
        let AddregistrationModalSubmit = function(data){
            dispatch({
                type:'registrationForm/newChannels',
                payload:{
                    ...data
                }
            })
        }
 /*删除渠道*/
        let DeleregistrationMessageChange = function(data){
            dispatch({
                type:'registrationForm/deleteChannels',
                payload:{
                    channelId:data,
                    status:0,
                }
            })
        }
/*点击添加或编辑*/
        let AddConfigurationModalChange  = function(data ,type){
            if(type == '0'){
                 dispatch({
                    type:'registrationForm/updateState',
                    payload:{
                        addConfigurationModalVisible : true,
                        editConfigurationContent:undefined,
                        bannerListArry : undefined,
                        bannerName: undefined,
                        channelsId:data.id,
                    }
                });
            }else{
                dispatch({
                    type:'registrationForm/getRegisterChannel',
                    payload:{
                        channelId : data.id,
                    }
                });
                dispatch({
                    type:'registrationForm/queryBannerChannel',
                    payload:{
                        channelId : data.id,
                    }
                });
            }
        }
        let AddConfigurationModalSubmit  = function(data){
                 dispatch({
                    type:'registrationForm/configurationChannels',
                    payload:{
                        channelMsg:JSON.stringify(data.baseForm),
                        bannerMsg:JSON.stringify(data.bannerMsg),
                        formName:data.formName,
                        h5BgImg : data.h5BgImg,
                        otherFormCfg: JSON.stringify(data.otherFormCfg),
                        formStyleCfg: JSON.stringify(data.formStyleCfg),
                        isRegister: data.isRegister,
                    }
                });
        }

        let AddConfigurationModalCancel = function(){
             dispatch({
                type:'registrationForm/updateState',
                payload:{
                    addConfigurationModalVisible : false,
                    editConfigurationContent : undefined,
                    bannerListArry : undefined,
                    bannerName: undefined,
                    extraFormSet: [],
                    formStyleCfg: {}
                }
            });
        }
 /*导出列表*/
    let registrationTableOnExport = function(){
       window.open(`${BASE_URL}/registerChannel/exportChannelList?${qs.stringify(searchContent)}`)
    }

    /*添加额外表单*/
    let addExtra = () => {
        let newForm = [...extraFormSet]
        newForm.push({
            "label": `其他${newForm.length+1}`,
            "name": `newItem${newForm.length+1}`,
            "type": "input",
            "hint": "请输入其他",
            "data": "",
            "hide": 1,
            "require": 0,
            "base": 0
        })

        dispatch({
            type: 'registrationForm/updateState',
            payload: {
                extraFormSet: newForm
            }
        })
    }

    /**删除额外表单 */
    let deleteExtra = (newExtraForm, resetFields) => {
        dispatch({
            type: 'registrationForm/updateState',
            payload: {
                extraFormSet: newExtraForm
            }
        })
        resetFields()
    }

    /**type改变 */
    let changeExtra = (index, e) => {
        let newForm = [...extraFormSet]
        newForm[index].type = e.target.value
        if(e.target.value == 'select'){
            newForm[index].data = '选项1'
        }

        dispatch({
            type: 'registrationForm/updateState',
            payload: {
                extraFormSet: newForm
            }
        })
    }

    /**选项改变 */
    let changeItem = (index, e) => {
        let newForm = [...extraFormSet]
        newForm[index].data = e.target.value
        dispatch({
            type: 'registrationForm/updateState',
            payload: {
                extraFormSet: newForm
            }
        })
    }

    /**标题改变 */
    let changeLabel = (index, e) => {
        let newForm = [...extraFormSet]
        newForm[index].label = e.target.value
        if(newForm[index].type == 'select'){
            newForm[index].hint = `请选择${e.target.value}`
        }else{
            newForm[index].hint = `请输入${e.target.value}`
        }

        dispatch({
            type: 'registrationForm/updateState',
            payload: {
                extraFormSet: newForm
            }
        })
    }

    /**选项改变 */
    let changeRequire = (index, e) => {
        let newForm = [...extraFormSet]
        newForm[index].require = e.target.checked
        dispatch({
            type: 'registrationForm/updateState',
            payload: {
                extraFormSet: newForm
            }
        })
    }

 /*search bar属性*/
    let registrationMessageSearchProps = {
        searchSubmit,           //搜索栏点击搜索或者清除条件
    }

    /*table属性*/
    let registrationMessageListProps = {
        registrationPageIndex,        //租户列表页码
        registrationPageSize,         //租户列表一页条数
        registrationLoading,          //租户列表加载状态
        registrationTotal,            //列表内容总条数
        registrationTableContent,     //列表内容

        registrationTableOnFilter,    //点击筛选
        registrationTableOnChange,    //table分页等条件改变事件
        AddregistrationMessageChange,    //点击新增渠道
        DeleregistrationMessageChange, //删除渠道
        AddConfigurationModalChange,   //点击添加编辑表单
        registrationTableOnExport,    //导出列表

    }
    /*新增渠道*/
    let registrationAddMessageProps = {
         addChannelsModalVisible,               //新增渠道modal是否显示
         addChannelsModalButtonLoading,         //新增渠道modal按钮是否在加载状态

         AddregistrationModalSubmit,                //新增渠道提交
         AddregistrationModalCancel,                //新增渠道modal关闭

    }
    /*添加编辑配置表单*/
    let registrationAddConfigurationMessageProps = {
        addConfigurationModalVisible,               //编辑添加配置表单modal是否显示
        addConfigurationModalButtonLoading,         //编辑添加配置表单modal按钮是否在加载状态

        AddConfigurationModalSubmit,            //编辑添加配置表单渠道提交
        AddConfigurationModalCancel,            //编辑添加配置表单渠道modal关闭
        formSet,                                //初始表单
        editConfigurationContent,               //编辑表单内容
        channelsId,                             //渠道ID
        bannerListArry,                         //banner列表
        bannerName,
        isRegister,
        h5BgImg,
        extraFormSet,                               //额外表单
        addExtra,                                   //添加额外表单
        deleteExtra,                                //删除额外表单
        changeExtra,                                //type改变
        changeItem,                                 //选项改变
        changeLabel,                                //标题改变
        changeRequire,
        formStyleCfg,otherFormCfg
    }

    return (
        <div>
           <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
				{searchVisible ? [
                   <RegistrationFormSearch {...registrationMessageSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>
             <RegistrationFormList {...registrationMessageListProps} />
             {addChannelsModalVisible? <RegistrationFormAddChannelModal {...registrationAddMessageProps}/> : null}
             {addConfigurationModalVisible? <RegistrationConfigurationModal {...registrationAddConfigurationMessageProps}/> : null}

        </div>
  );
}

RegistrationForm.propTypes = {
  organRegister: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ registrationForm }) {
  return { registrationForm };
}

export default connect(mapStateToProps)(RegistrationForm);
