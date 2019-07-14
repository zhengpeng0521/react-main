import React, { PropTypes } from 'react';
import {DatePicker,  Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer, Tree, Spin, Checkbox, Radio, Table, Divider, InputNumber } from 'antd';
import style from './OpeningMgr.less';
import styles from '../saas-weixin-market-marketing-package/MarketingPackage.less'
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const { Column, ColumnGroup } = Table;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

import MicroGameModuleLimitConfig from '../saas-weixin-market-marketing-package/MicroGameModuleLimitConfig';

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

const OpeningAddTemplateModal = ({
    dispatch,
    selectData,
    isSelectAllLimitNum,
    isSelectAllLimit,
    isSelectAllChartBox,
    selectLimitNumBoxNum,
    selectChartBoxNum,
    allPrivilegeNum,
    selectedLimitY,//已选限制
    selectedLimitN,//已选不限制
    selectedLimitYFun,
    selectedLimitNFun,
    numValue,
    numValueFun,
    selectedChartFun,
    selectedChart,
    limityIndexFun,
    text,
    chartLimit,
    addTemplateModalVisible,
    addTemplateModalButtonLoading,

    addTemplateModalActivityTransferAllcontent,
    addTemplateModalActivityTransferTargetContent,
    addTemplateModalGameTransferAllcontent,
    addTemplateModalGameTransferTargetContent,
    addTemplateModalOrgTransferAllcontent,
    addTemplateModalOrgTransferTargetContent,
	addTemplateModalOfflineLeafletsTransferAllcontent,
	addTemplateModalOfflineLeafletsTransferTargetContent,

    gameModuleFilterKeyWord,
    handleOnGameModuleConfigChange,//微游戏模板配置 变更配置
    onGameModuleKeyWordFilter,//微游戏模板过滤关键字变更
    handleSelectAllLimitNum,//选中所有  限制人数
    handleSelectAllNoLimitNum,//选中所有  不限制人数
    handleSelectAllLimitEcharts,//选中所有  开通社交图谱
	
    tenantSearchType,                           //机构搜索方式(0按机构和机构手机号/1按租户查询)
    tenantSelectVisible,                        //租户搜索下拉列表是否显示
    tenantSelectContent,                        //租户搜索下拉列表内容

    addTemplateModalCancel,
    addTemplateModalOrgTransferhandleChange,
    addTemplateModalActivityTransferhandleChange,
    addTemplateModalGameTransferhandleChange,
	addTemplateModalOfflineLeafletsTransferhandleChange,
	
    addTemplateModalSubmit,
    addTemplateModalSearchOrgName,
    ChooseQueryType,                            //选择搜索方式onChange事件
    SearchTenant,                               //搜索租户列表
    ChooseTenant,                               //选择租户并查询租户下所有机构
    stateVue,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {
	
    /*租户下拉列表数据*/
    let tenant = [];
    if(tenantSelectContent && tenantSelectContent.length > 0){
        tenant = tenantSelectContent.map((item) => {
            return(
                <Option value={item.id+''} key={item.id+''}>
                    {item.name}
                </Option>
            );
        });
    }

    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors) => {
            if (!!errors) {
                return;
            }
            let data = { ...getFieldsValue()};
            if(addTemplateModalOrgTransferTargetContent&&addTemplateModalOrgTransferTargetContent.length == 0){
                message.error('请选择机构');
                return;
            }
            if(selectData.length == 0 &&  addTemplateModalActivityTransferTargetContent.length == 0 && addTemplateModalGameTransferTargetContent.length == 0 && addTemplateModalOfflineLeafletsTransferTargetContent.length == 0){
                message.error('请至少选择一个模板');
                return;
            }
            const rangeValue = getFieldValue('time');
            if(rangeValue != undefined && rangeValue != null && rangeValue != ''){
                data.expireTime = rangeValue.format('YYYY-MM-DD HH:mm:ss');
            }

            let allModal = [];
            if(addTemplateModalActivityTransferTargetContent.length>0){
                for(let i in addTemplateModalActivityTransferTargetContent){
                    allModal.push({
                        id : addTemplateModalActivityTransferTargetContent[i],
                        categoryId : 1,
                    });
                }
            }
//            if(addTemplateModalGameTransferTargetContent.length>0){
//                for(let k in addTemplateModalGameTransferTargetContent){
//                    allModal.push({
//                        id : addTemplateModalGameTransferTargetContent[k],
//                        categoryId : 3,
//                    });
//                }
//            }
            if(addTemplateModalOfflineLeafletsTransferTargetContent.length>0){
                for(let s in addTemplateModalOfflineLeafletsTransferTargetContent){
                    allModal.push({
                        id : addTemplateModalOfflineLeafletsTransferTargetContent[s],
                        categoryId : 4,
                    });
                }
            }
            data.mealId = '0',
            data.organIdArray = JSON.stringify(addTemplateModalOrgTransferTargetContent);

            delete data.activityModal;
            delete data.gameModal;
			delete data.offlineLeafletsModal;
            delete data.orgName;
            delete data.org;
            delete data.time;

            //游戏模板数据
            let obj = [];
            for (const item of addTemplateModalGameTransferTargetContent) {

                let game_module_config_item = {
                    id: item.id || item.key,
                    categoryId: 3,
                };

                //判断当前key是否是可配置内付费
                let itemCanLimit = false;
                addTemplateModalGameTransferAllcontent && addTemplateModalGameTransferAllcontent.length > 0 && addTemplateModalGameTransferAllcontent.map(function(sourceItem, sourceIndex) {
                    if(sourceItem.key == item.key) {
                        itemCanLimit = sourceItem.isLimit ? true : false;
                    }
                });

                if(itemCanLimit) {
                    let game_module_config_item_privilege = [];
                    if(item.hasLimitNum) {
                        game_module_config_item_privilege.push({
                            name: 'numLimit',
                            label: '人数限制',
                            data: item.hasLimitNumValue,
                        });
                    } else {
                        game_module_config_item_privilege.push({
                            name: 'numLimit',
                            label: '人数限制',
                            data: -1,
                        });
                    }

                    if(item.hasLimitEcharts) {
                        game_module_config_item_privilege.push({
                            name: 'chart',
                            label: '社交图谱',
                            data: 1,
                        });
                    } else {
                        game_module_config_item_privilege.push({
                            name: 'chart',
                            label: '社交图谱',
                            data: 0,
                        });
                    }

                    if(game_module_config_item_privilege.length > 0) {
                        game_module_config_item.privilege = game_module_config_item_privilege;
                    }
                }

                obj.push(game_module_config_item);
            }

            allModal = allModal.concat(obj);

            data.modelArray = JSON.stringify(allModal);

            addTemplateModalSubmit(data);
            resetFields();
        });
    }

    let a = addTemplateModalGameTransferAllcontent.length;

        //选中之后获取对应信息selectedRows
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            window.selectedRows_length = selectedRows.length;
            let selectData = selectedRows;
            dispatch({
                type: 'weiXinMarketingOpeningMgr/updateState',
                payload: {
                    selectData
                }
            });
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };
    let b = window.selectedRows_length;
    const plainOptions = [{ label: '已选开通', value: '1' }];
    const plainOptionsN = [{ label: '已选不限制', value: '2' }];
    const plainOptionsY = [{ label: '已选限制', value: '3' }];

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        addTemplateModalCancel();
    }

    //时间选择器时间范围限制
    function disabledDate(current) {
        return current && current.valueOf() < Date.now();
    }

    //模态框的属性
    let modalOpts = {
    title: '开通模板',
    maskClosable : false,
    visible : addTemplateModalVisible,
    closable : true,
    width : 950,
    onOk: handleComplete,
    onCancel : handleCancel,
    footer : [
        <Button key="cancel" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
        <Button key="submit" type="primary" size="large"
                onClick={handleComplete}
                disabled={addTemplateModalButtonLoading}
                loading={addTemplateModalButtonLoading}>保存</Button>
    ],
  };

    /*微游戏模板配置的属性*/
    let gameModuleLimitProps = {
        gameModuleFilterKeyWord,
        dataSource: addTemplateModalGameTransferAllcontent,
        selectData: addTemplateModalGameTransferTargetContent,
        onChangeSelect: handleOnGameModuleConfigChange,
        onKeyWordFilter: onGameModuleKeyWordFilter,

        handleSelectAllLimitNum,//选中所有  限制人数
        handleSelectAllNoLimitNum,//选中所有  不限制人数
        handleSelectAllLimitEcharts,//选中所有  开通社交图谱
    };

    return (
        <div className='zj_modal_header'>
            <Modal {...modalOpts}>
                <Form>
                    <FormItem
                        label="搜索方式"
                        {...formItemLayout}
                        >
                            {getFieldDecorator('searchType', {
                                initialValue : '1',
                                rules: [
                                    { required: true, message: '请填写搜索方式' },
                                ],
                            })(
                                <Select placeholder="请选择搜索方式" style={{ width : 200 }} onChange={ChooseQueryType}>
                                    <Option value='0'>按机构名称或者机构手机号查询</Option>
                                    <Option value='1'>按租户查询</Option>
                                </Select>
                            )}
                    </FormItem>
                </Form>
                { tenantSearchType == '0' ?
                    <Form>
                        <div style={{position:'relative'}}>
                            <FormItem
                                label="搜索机构"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('orgName', {
                                })(
                                     <Input placeholder='请输入机构名称或手机号' style={{ width : 200 }}/>
                                )}
                            </FormItem>
                            <span><a className={style.check} style={{position:'absolute',left:'380px',top:'7px'}} onClick={() => addTemplateModalSearchOrgName(getFieldValue('orgName'))}>搜索</a></span>
                        </div>
                    </Form>
                    :
                  tenantSearchType == '1' ?
                    <Form inline style={{ marginBottom:'22.5px' }}>
                        <div style={{position:'relative'}}>
                            <FormItem
                                label="搜索条件"
                                labelCol = {{ span: 10}}
                                wrapperCol = {{span: 12}}
                                style={{marginLeft:'41px'}}
                            >
                                {getFieldDecorator('id')(
                                    <Input placeholder="租户ID" style={{ width : 150 }} />
                                )}
                            </FormItem>
                            <FormItem
                                labelCol = {{ span: 9}}
                                wrapperCol = {{span: 12}}
                                style={{marginLeft:'30px'}}
                            >
                                {getFieldDecorator('name')(
                                    <Input placeholder="租户名称" style={{ width : 150 }} />
                                )}
                            </FormItem>
                            <FormItem
                                labelCol = {{ span: 9}}
                                wrapperCol = {{span: 12}}
                                style={{marginLeft:'4px'}}
                            >
                                {getFieldDecorator('tel')(
                                    <Input placeholder="租户手机号" style={{ width : 150 }} />
                                )}
                            </FormItem>
                            <span><a className={style.check} style={{position:'absolute',top:'7px'}} onClick={() => SearchTenant(getFieldValue('id'),getFieldValue('name'),getFieldValue('tel'))}>搜索</a></span>
                        </div>
                    </Form>
                    :
                    null
                }
                <Form>
                    { tenantSelectVisible == true ?
                        <FormItem
                            label="选择租户"
                            {...formItemLayout}
                            >
                                {getFieldDecorator('tenantSelect')(
                                    <Select placeholder="请选择租户" style={{ width : 200 }} onChange={ChooseTenant}>
                                        { tenant || [] }
                                    </Select>
                                )}
                        </FormItem>
                        :
                        null
                    }
                    <FormItem
                        label="选择机构"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('org', {
                        })(
                            <Transfer
                                dataSource={addTemplateModalOrgTransferAllcontent}
                                targetKeys={addTemplateModalOrgTransferTargetContent}
                                operations={['加入', '退出']}
                                onChange={addTemplateModalOrgTransferhandleChange}
                                listStyle={{ width: 246 , height: 200 }}
                                titles={['全部机构','已选机构']}
                                render={item => item.title}
                              />
                        )}
                    </FormItem>
                    <FormItem
                        label="微信活动模板"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('activityModal', {
                        })(
                            <Transfer
                                dataSource={addTemplateModalActivityTransferAllcontent}
                                targetKeys={addTemplateModalActivityTransferTargetContent}
                                showSearch
                                operations={['加入', '退出']}
                                onChange={addTemplateModalActivityTransferhandleChange}
                                listStyle={{ width: 246 , height: 200 }}
                                titles={['全部模板','已选模板']}
                                render={item => item.title}
                              />
                        )}
                    </FormItem>
                    <FormItem
                        label="微信游戏1模板"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('gameModal', {
                        })(

                            <MicroGameModuleLimitConfig {...gameModuleLimitProps}/>
                        )}
                    </FormItem>
                    <FormItem
                        label="线下传单模板"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('offlineLeafletsModal', {
                        })(
                            <Transfer
                                dataSource={addTemplateModalOfflineLeafletsTransferAllcontent}
                                targetKeys={addTemplateModalOfflineLeafletsTransferTargetContent}
                                showSearch
                                operations={['加入', '退出']}
                                onChange={addTemplateModalOfflineLeafletsTransferhandleChange}
                                listStyle={{ width: 246 , height: 200 }}
                                titles={['全部模板','已选模板']}
                                render={item => item.title}
                              />
                        )}
                    </FormItem>
                    <FormItem
                        label="展示人数限制"
                        {...formItemLayout}
                    >
                    {getFieldDecorator('viewLimit', {
                        rules: [],
                    })(
                        <Input type="text" placeholder='请填写可展示人数，不填写将不做限制' />
                    )}
                    </FormItem>
                    <FormItem
                        label="到期时间"
                        {...formItemLayout}
                    >
                    {getFieldDecorator('time', {
                        rules: [
                            { type:'object', required: true, message: '请选择到期时间' },
                        ],
                    })(
                        <DatePicker
                            disabledDate = {disabledDate}
                        />
                    )}
                    </FormItem>
                    <FormItem
                        label="备注"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('remark', {
                        })(
                            <Input type="textarea" rows={4} placeholder='请填写备注'/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(OpeningAddTemplateModal);
