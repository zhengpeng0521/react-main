import React, { PropTypes } from 'react';
import styles from './MarketingPackage.less';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer, Tree, Spin, Checkbox, Radio, Table, Divider, InputNumber } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const { Column, ColumnGroup } = Table;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 18,
    },
};

const WeiGameFormItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 18,
    },
};

import MicroGameModuleLimitConfig from './MicroGameModuleLimitConfig';

const MarketingPackageAddOrEditModal = ({

    attrDataLimit,
    dispatch,
    selectData,
    isSelectAllLimitNum,
    isSelectAllLimit,
    isSelectAllChartBox,
    selectLimitNumBoxNum,
    selectChartBoxNum,
    allPrivilegeNum,
    selectedRowKeys,

    addOrEditFormType,
    addOrEditFormVisible,
    addOrEditFormData,
    addOrEditButtonLoading,

    addOrEditFormActivityTransferAllContent,
    addOrEditFormActivityTransferTargetContent,

    addOrEditFormGameTransferAllContent,//微游戏模板配置 源数据
    addOrEditFormGameTransferTargetContent,//微游戏模板配置 选中数据
    handleOnGameModuleConfigChange,//微游戏模板配置 变更配置onGameModuleKeyWordFilter,
    onGameModuleKeyWordFilter,//微游戏模板过滤关键字变更
    gameModuleFilterKeyWord,

    handleSelectAllLimitNum,//选中所有  限制人数
    handleSelectAllNoLimitNum,//选中所有  不限制人数
    handleSelectAllLimitEcharts,//选中所有  开通社交图谱

    addOrEditFormOfflineLeafletsTransferAllContent,
    addOrEditFormOfflineLeafletsTransferTargetContent,

    addOrEditModalSubmit,
    addOrEditModalCancel,

    addOrEditFormActivityTransferhandleChange,
    addOrEditFormGameTransferhandleChange,
    addOrEditFormOfflineLeafletsTransferhandleChange,
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

    function handleComplete(e) {
        validateFieldsAndScroll((errors) => {
            if (!!errors) {
                return;
            }
            let data = { ...getFieldsValue() };
            if (selectData.length == 0 && addOrEditFormActivityTransferTargetContent.length == 0 && addOrEditFormGameTransferTargetContent.length == 0 && addOrEditFormOfflineLeafletsTransferTargetContent.length == 0) {
                message.error('请至少选择一个模板');
                return;
            }
            if ('edit' == addOrEditFormType) {
                data.id = addOrEditFormData.id;
            }
            let allModal = [];
            if (addOrEditFormActivityTransferTargetContent.length > 0) {
                for (let i in addOrEditFormActivityTransferTargetContent) {
                    allModal.push({
                        id: addOrEditFormActivityTransferTargetContent[i],
                        categoryId: 1,
                    });
                }
            }

            if (addOrEditFormOfflineLeafletsTransferTargetContent.length > 0) {
                for (let s in addOrEditFormOfflineLeafletsTransferTargetContent) {
                    allModal.push({
                        id: addOrEditFormOfflineLeafletsTransferTargetContent[s],
                        categoryId: 4,
                    });
                }
            }
            delete data.activityModal;
            delete data.flyerModal;
            delete data.gameModal;
            delete data.offlineLeafletsModal;

            //游戏模板数据
            let obj = [];
            for (const item of addOrEditFormGameTransferTargetContent) {

                let game_module_config_item = {
                    id: item.id || item.key,
                    categoryId: 3,
                };

                //判断当前key是否是可配置内付费
                let itemCanLimit = false;
                addOrEditFormGameTransferAllContent && addOrEditFormGameTransferAllContent.length > 0 && addOrEditFormGameTransferAllContent.map(function(sourceItem, sourceIndex) {
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
            addOrEditModalSubmit(data, addOrEditFormType);
            resetFields();

        });
    }

    let gameTitleArr = [];
    let gameTitle = "";
    for (var i in addOrEditFormGameTransferAllContent) {
        gameTitle = addOrEditFormGameTransferAllContent[i].chart;
        if (gameTitle !== undefined) {
            gameTitleArr.push(gameTitle);
        }

    }
    let chartLength = gameTitleArr.length;
    let chartLimitLength = chartLimit
    let a = addOrEditFormGameTransferAllContent.length;
    let gameTitleArr_length = gameTitleArr.length
    const radioStyle = {

    };
    //选中之后获取对应信息selectedRows
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            window.selectedRows_length = selectedRows.length;
//            window.selectedRowKeys_data = selectedRowKeys;
//            window.selectedRows_data = selectedRows;
            let selectData = selectedRows;
//            console.info('window.selectedRows_data', window.selectedRowKeys_data.length);
            dispatch({
                type: 'weiXinMarketingPackage/updateState',
                payload: {
                    selectData,
                    addOrEditFormGameTransferTargetContent :selectedRowKeys,
                    selectedRowKeys :selectedRowKeys,
                }
            });
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
        selectedRowKeys: selectedRowKeys
        //window.selectedRowKeys_data
    };
    let b = window.modulNum ;
    const plainOptions = [{ label: '已选开通', value: '1' }];
    const plainOptionsN = [{ label: '已选不限制', value: '2' }];
    const plainOptionsY = [{ label: '已选限制', value: '3' }];

    //判断输入的价格
    function checkPrice(rule, value, callback) {
        if (!/^[0-9].*$/.test(value)) {
            callback(new Error('套餐价格不合法，必须是自然数或正小数'));
        } else {
            callback();
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        addOrEditModalCancel();
    }

    function onSearchFun(e) {
        dispatch({
            type: 'weiXinMarketingPackage/updateState',
            payload: {

                selectedRowKeys: [],
                 attrDataLimit : 0,
//                 selectData: [],                                     //微信游戏已选
                isSelectAllLimitNum, //是否全选了限制人数
                isSelectAllLimit,//是否全选了不限制人数
               isSelectAllChartBox,//是否全选了开通社交图谱
               selectLimitNumBoxNum,//选择限制人数的数量
               selectChartBoxNum,//选择社交图谱的数量
               allPrivilegeNum,//特权的总数量
            }
        });

        let value = e.target.value;
        let gameTitleArr = [];
        let obj = {};
        let newArr = [];
        newArr.push(stateVue.concat(addOrEditFormGameTransferAllContent));
        if(value==""){
            dispatch({
                type: 'weiXinMarketingPackage/updateState',
                payload: {
                    selectedRowKeys,
                     attrDataLimit,
                }
            });
        }
        for (const item of stateVue) {
            let  gameTitle = item.title;
             if(value!="" && gameTitle.indexOf(value)!=-1){
                 if(item.chart==undefined){
                     obj = {
                        title : gameTitle,
                        key : item.key,
                        categoryId : item.categoryId,
                     };
                 }else{
                     obj = {
                        title : gameTitle,
                        key : item.key,
                        categoryId : item.categoryId,
                        limitNum : item.limitNum,
                        chart : item.chart,
                        isLimit : item.isLimit,
                        limitNum : item.limitNum,
                     };
                 }

                gameTitleArr.push(obj);
             }
        }
        if(value==""){
            dispatch({
                type: 'weiXinMarketingPackage/updateState',
                payload: {
                    addOrEditFormGameTransferAllContent:stateVue,
                }
            });
        } else {
            dispatch({
                type: 'weiXinMarketingPackage/updateState',
                payload: {
                    addOrEditFormGameTransferAllContent:gameTitleArr,
                }
            });
        }

    }

    //模态框的属性
    let modalOpts = {
        title: 'add' == addOrEditFormType ? '新增套餐' : '编辑套餐',
        maskClosable: false,
        visible: addOrEditFormVisible,
        closable: true,
        width: 950,
        onOk: handleComplete,
        onCancel: handleCancel,
        footer: [
            <Button key="cancel" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
            <Button key="submit" type="primary" size="large"
                onClick={handleComplete}
                disabled={addOrEditButtonLoading}
                loading={addOrEditButtonLoading}>保存</Button>
        ],
    };

    /*微游戏模板配置的属性*/
    let gameModuleLimitProps = {
        gameModuleFilterKeyWord,
        dataSource: addOrEditFormGameTransferAllContent,
        selectData: addOrEditFormGameTransferTargetContent,
        onChangeSelect: handleOnGameModuleConfigChange,
        onKeyWordFilter: onGameModuleKeyWordFilter,

        handleSelectAllLimitNum,//选中所有  限制人数
        handleSelectAllNoLimitNum,//选中所有  不限制人数
        handleSelectAllLimitEcharts,//选中所有  开通社交图谱
    };

    return (
        <div className='zj_modal_header'>
            <Modal {...modalOpts}>
                <Form horizontal>
                    <FormItem
                        label="套餐名称"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('title', {
                            initialValue: addOrEditFormType == 'edit' ? addOrEditFormData.title + '' : '',
                            rules: [
                                { required: true, message: '请填写套餐名称' },
                            ],
                        })(
                            <Input type="text" placeholder='请填写套餐名称' />
                        )}
                    </FormItem>
                    <FormItem
                        label="微信活动模板"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('activityModal', {
                        })(
                            <Transfer
                                dataSource={addOrEditFormActivityTransferAllContent}
                                targetKeys={addOrEditFormActivityTransferTargetContent}
                                showSearch
                                operations={['加入', '退出']}
                                onChange={addOrEditFormActivityTransferhandleChange}
                                listStyle={{ width: 246, height: 200 }}
                                titles={['全部模板', '已选模板']}
                                render={item => item.title}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        label="微信游戏模板"
                        {...WeiGameFormItemLayout}
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
                                dataSource={addOrEditFormOfflineLeafletsTransferAllContent}
                                targetKeys={addOrEditFormOfflineLeafletsTransferTargetContent}
                                showSearch
                                operations={['加入', '退出']}
                                onChange={addOrEditFormOfflineLeafletsTransferhandleChange}
                                listStyle={{ width: 246, height: 200 }}
                                titles={['全部模板', '已选模板']}
                                render={item => item.title}
                            />
                        )}
                    </FormItem>
                </Form>
                <FormItem
                    label="限制展示人数"
                    {...formItemLayout}
                >
                    {getFieldDecorator('viewLimit', {
                        initialValue: addOrEditFormType == 'edit' ? !!addOrEditFormData.viewLimit && addOrEditFormData.viewLimit>0 ? addOrEditFormData.viewLimit + '' : '' : '',
                        rules: [],
                    })(
                        <Input type="text" placeholder='请填写可展示人数，不填写将不做限制' />
                    )}
                </FormItem>
                <Form inline style={{ marginBottom: '23.5px' }}>
                    <FormItem
                        label="套餐价格"
                        labelCol={{ span: 9 }}
                        wrapperCol={{ span: 12 }}
                        style={{ marginLeft: '67px' }}
                    >
                        {getFieldDecorator('price', {
                            initialValue: addOrEditFormType == 'edit' ? addOrEditFormData.price + '' : '',
                            rules: [
                                { required: true, message: '请填写套餐价格' }, { validator: checkPrice },
                            ],
                        })(
                            <Input type="text" placeholder='请填写套餐价格' style={{ width: 150 }} />
                        )}
                    </FormItem>
                    <FormItem style={{ marginLeft: '20px' }}>
                        {getFieldDecorator('unit', {
                            initialValue: addOrEditFormType == 'edit' ? addOrEditFormData.unit + '' : undefined,
                            rules: [
                                { required: true, message: '请选择时间参数' },
                            ],
                        })(
                            <Select placeholder="时间" style={{ width: 80 }}>
                                <Option value="1" >/天</Option>
                                <Option value="2" >/月</Option>
                                <Option value="3" >/年</Option>
                            </Select>
                        )}
                    </FormItem>
                </Form>
                <Form horizontal>
                    <FormItem
                        label="备注"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('remark', {
                            initialValue: addOrEditFormType == 'edit' ? addOrEditFormData.remark : '',
                        })(
                            <Input type="textarea" rows={4} placeholder='请填写备注' />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(MarketingPackageAddOrEditModal);
