import React from 'react';
import { Form , Input , Modal , Button , message , Select , Cascader , Spin , Popover , Icon , InputNumber , Checkbox } from 'antd';
import { NullData } from '../../common/new-component/NewComponent';
import styles from './PackageModal.less';
import thead from './thead';
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
   labelCol : { span: 4 },
   wrapperCol: { span: 19 },
};

/*套餐modal*/
const PackageModal = ({
    baseInformationData,                    //基本信息数据(套餐分配提交时需要基本信息中该校区的tenantId和orgId)
    currentUserMsg,                         //选中项当前租户的信息
    packageModalVisible,                    //是否显示
    packageModalType,                       //表单类型(查看check/编辑edit)
    packageModalLoading,                    //表单加载
    packageModalButtonLoading,              //表单按钮加载

    PackageModalSubmit,                     //分配套餐提交
    PackageModalClose,                      //modal关闭
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        setFieldsValue,
        validateFieldsAndScroll,
    },
  }) => {

    //定义套餐分配量规范参数规范
    let rule = 'openNum';
    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors,values) => {
            if (!!errors) {
                return;
            }

            //处理该校区tenantId和orgId
            values.tenantId = currentUserMsg.tenantId;
            values.orgId = currentUserMsg.orgId;

            //处理开通数据[{ pkgStoreId : xxx , openNum : xxx },...]
            let openArr = [];
            for(let i = 0 ,len = baseInformationData.length ; i < len ; i++){
                let openNum = values[rule + baseInformationData[i].mealId];
                if((openNum + '').indexOf('.') > -1){
                    return message.warn('分配数不能为小数');
                }
                if(openNum != '' && openNum != null && openNum != undefined && openNum != '0' && !/^[\s]*$/.test(values)){
                    openArr.push({
                        mealId : baseInformationData[i].mealId,
                        mealNum : values[rule + baseInformationData[i].mealId]
                    });
                }
                delete values[rule + baseInformationData[i].mealId];
            }
            if(openArr.length == 0){ return message.warn('请分配套餐'); }
            values.mealInfo = JSON.stringify(openArr);

            //处理必选项checkbox
            delete values.dispatch_ensure;
            PackageModalSubmit(values);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        PackageModalClose();
    }

    //模态框的属性
    let modalOpts = {
    title : packageModalType == 'checkLeft' ? '剩余套餐' : packageModalType == 'edit' ? '分配套餐' : packageModalType == 'checkRec' ? '分配记录' : '标题',
    maskClosable : false,
    visible : packageModalVisible,
    closable : true,
    width : 550,
    onOk: handleComplete,
    onCancel : handleCancel,
    footer : packageModalType == 'checkLeft' || packageModalType == 'checkRec' ? [<Button key = "cancel" type = "primary" onClick = { handleCancel }>我知道了</Button>] :
             packageModalType == 'edit' ? [
                <Button key = "cancel" type = "ghost" onClick = { handleCancel }>取消</Button>,
                <Button key = "submit" type = "primary"
                        onClick = { handleComplete }
                        disabled = { packageModalButtonLoading }
                        loading = { packageModalButtonLoading }
                        style = {{ marginLeft : 10 }}>确定分配</Button>
             ] : [],
    className : 'head_org_detail_package_modal'
  };

    //分配数量onChange事件
    function dispatchNumOperation(type,id,value){
        let obj = {};
        obj[id] = 0;
        if(isNaN(value + '')){
            setFieldsValue(obj);
        }else{
            switch(type){
                case 'plus' : obj[id] = parseFloat(value) + 1 ; break ;
                case 'minus' : obj[id] = parseFloat(value) - 1 ; break ;
            }
            setFieldsValue(obj);
        }
    }

    //列表头部渲染
    let th = [];
    if(thead && thead[packageModalType] && thead[packageModalType].length > 0){
        th = thead[packageModalType].map((item,index) => (
            <div className = { styles.thead_item } key = { item.key } style = {{ width : item.width }}>
                <Popover placement = 'top' content = { item.value }>
                    { item.key == 'open' ? <a>{ item.value }</a> : item.value }
                </Popover>
            </div>
        ))
    }

    //渲染列表信息
    let tr = [];
    if(baseInformationData && baseInformationData.length > 0){
        baseInformationData && baseInformationData.map((data_item,data_index) => {
            let tr_inner = [];
            thead && thead[packageModalType] && thead[packageModalType].map((thead_item,thead_index) => {
                tr_inner.push(
                    <div className={styles.trow_item} key = { packageModalType + '_' + data_index + '_' + thead_index } style = {{ width : thead_item.width }}></div>
                )
            })
            thead && thead[packageModalType] && thead[packageModalType].map((thead_item,thead_index) => {
                if(thead_item.key == 'pkgUnit'){
                    tr_inner.splice(thead_index,1,
                        <div className={styles.trow_item} key = { packageModalType + '_' + data_index + '_' + thead_index } style = {{ width : thead_item.width }}>
                            <Popover placement="top" content = { data_item[thead_item.key] } trigger="hover">
                                <div className={styles.trow_item_inner}>1{ data_item[thead_item.key] == '1' ? '季' : data_item[thead_item.key] == '2' ? '月' : data_item[thead_item.key] == '3' ? '年' : '' }</div>
                            </Popover>
                        </div>)
                }else if(thead_item.key == 'dispatch_num'){
                    tr_inner.splice(thead_index,1,
                        <div className={styles.trow_item} key = { packageModalType + '_' + data_index + '_' + thead_index } style = {{ width : thead_item.width }}>
                            {getFieldDecorator(rule + data_item.mealId,{
                                initialValue : 0
                            })(
                                <InputNumber min = { -parseFloat(!isNaN(data_item.leftNum + '') ? data_item.leftNum : 0) } max = { 1000000 } size = 'default' className = { styles.dispatch_num_input + ' head_org_dispatch_package_num' }/>
                            )}
                            <span>/{ data_item.pkgUnit == '1' ? '季' : data_item.pkgUnit == '2' ? '月' : data_item.pkgUnit == '3' ? '年' : '' }</span>
                        </div>)
                }else{
                    tr_inner.splice(thead_index,1,
                        <div className={styles.trow_item} key = { packageModalType + '_' + data_index + '_' + thead_index } style = {{ width : thead_item.width }}>
                            <Popover placement="top" content = { data_item[thead_item.key] } trigger="hover">
                                <div className={styles.trow_item_inner}>{ data_item[thead_item.key] }</div>
                            </Popover>
                        </div>)
                }
            })
            tr.push(
                <div className={styles.trow} key = { data_index }>
                    { tr_inner || [] }
                </div>
            );
        })
    }else{
        tr = <NullData height = '200px' content = '暂时没有套餐信息'/>
    }

    return (
        <Modal {...modalOpts}>
            <Spin spinning = { packageModalLoading }>
                <div className = { styles.thead }>{ th || [] }</div>
                <div className = { styles.package_table }>
                    { tr || [] }
                </div>
                { packageModalType == 'edit' ?
                    <FormItem label = '操作人' style = {{ marginBottom : 20 }} {...formItemLayout}>
                        {getFieldDecorator('operator',{
                            rules : [
                                { required : true , message : '请写上你的名字' , whitespace : true }
                            ]
                        })(
                            <Input placeholder = '请写上你的名字'/>
                        )}
                    </FormItem> : null
                }
            </Spin>
        </Modal>
    );
};

export default Form.create()(PackageModal);
