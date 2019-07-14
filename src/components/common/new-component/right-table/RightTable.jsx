/* 用于某些页面右侧的table
 * author 赵健
 * className string 自定义最外层div的className
 * style object 自定义最外层div的style
 * search object 搜索条件(fields,onSearch)
 * table object table属性(columns,loading,dataSource,rowSelection,height,rowKey,size)
 */
import React from 'react';
import Media from 'react-media';
import { Table , Icon , Form , Input , Select , DatePicker , Button , message , Pagination , Popconfirm , Radio , Modal } from 'antd';
import { ProgressBar , NullData } from '../NewComponent';
import TreeSelectCourseware from '../tree-select-courseware/TreeSelectCourseware';
import TreeSelectStructure from '../tree-select-structure/TreeSelectStructure';
import TreeSelectOrgDept from '../tree-select-org-dept/TreeSelectOrgDept';
import rightTable from './RightTable.less';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
function RightTable({
    className,
    style,
    minWidth,
    search,
    rightOperation,
    selectBar,
    table,
    pagination,
    form : {
        getFieldDecorator,
        getFieldValue,
        getFieldsValue,
        setFieldsValue,
        validateFields,
        resetFields,
        validateFieldsAndScroll,
    }
}) {

    if(!!search && (!search.onSearch || !search.fields)){ return Modal.error({title: '搜索栏缺少入参'}) };
    if(!!rightOperation && !rightOperation.btns){ return Modal.error({title: '缺少rightOperation btns'}) }
    if(!table){ return Modal.error({title: '缺少table'}) };
    if(!pagination){ return Modal.error({title: '缺少pagination'}) };
    if(!!table && !!table.rowSelection && !selectBar){ return Modal.error({title: '缺少selectBar'}) };
    if(!!table && !table.rowSelection && !!selectBar){ return Modal.error({title: '缺少rowSelection,selectBar无法生效'}) };
    if(!!selectBar && !selectBar.btns){ return Modal.error({title: '缺少selectBar btns'}) };
    if(!!selectBar && !selectBar.num){ selectBar.num = 0 };

    /*类名格式化*/
    let formatClassName = !!className ? ' ' + className : '';

	/*获取高度值*/
    let	tableHeight = document.body.clientHeight;
	let scrollHeight = '';
	if(!isNaN(table.height + '')){
		scrollHeight = tableHeight - parseFloat(table.height);
	}else{
		scrollHeight = tableHeight - 243;
	}

    /*格式化搜索栏*/
    let search_item = [];
    !!search && !!search.fields && search.fields.length > 0 && search.fields.map((item, index) => {
        let type = item.type;
		let key = item.key;
		let placeholder = item.placeholder || undefined;
		let startPlaceholder = item.startPlaceholder || undefined;
		let endPlaceholder = item.endPlaceholder || undefined;
		let options = item.options || [];
		let opt_key = item.opt_key || 'key';
		let opt_label = item.opt_label || 'label';
        let initialValue = item.initialValue || undefined;
		let disabled = item.disabled || false;
        if(type == 'input'){
			search_item.push(
				<div key = { 'form_item_' + key }>
					{ getFieldDecorator( key, {
                        initialValue : initialValue
					})(
						<Input placeholder = { placeholder } size = 'default' style = {{ width : '140px' }} />
					)}
				</div>
			)
		}else if(type == 'select'){
			search_item.push(
				<div key = { 'form_item_' + key }>
					{ getFieldDecorator( key, {
                        initialValue : initialValue
					})(
						<Select
							allowClear = { true }
							showSearch = { true }
							optionFilterProp = 'children'
							placeholder = { placeholder }
							style = {{ width : '140px' }}
							size = 'default'
						>
							{ !!options && options.map( function( item, index ){
								return (
									<Option key = { 'select_opt_' + index } value = { item[ opt_key ] + '' } >{ item[ opt_label ] + '' }</Option>
								)
							})}
						</Select>
					)}
				</div>
			)
		}else if(type == 'rangePicker'){
			search_item.push(
				<div key = { 'form_item' + key }>
					{ getFieldDecorator( key, {
                        initialValue : initialValue
					})(
						<RangePicker
							size = 'default'
							style = {{ width : '140px' }}
							showTime
							format = "YYYY-MM-DD HH:mm"
							placeholder = {[ startPlaceholder, endPlaceholder ]}
						/>
					)}
				</div>
			)
		}else if(type == 'courseware'){
            search_item.push(
                <div key = { 'form_item' + key }>
                    { getFieldDecorator(key, {
                        initialValue : initialValue
                    })(
                        <TreeSelectCourseware />
                    )}
                </div>
			)
        }else if(type == 'structure'){
            search_item.push(
                <div key = { 'form_item' + key }>
                    { getFieldDecorator(key, {
                        initialValue : initialValue
                    })(
                        <TreeSelectStructure/>
                    )}
                </div>
			)
        }else if(type == 'dept_org'){
            search_item.push(
                <div key = { 'form_item' + key }>
                    { getFieldDecorator(key, {
                        initialValue : initialValue
                    })(
                        <TreeSelectOrgDept/>
                    )}
                </div>
			)
        }
    })

    /*格式化操作按钮*/
    function RadioOnChange(value,onChange){
        resetFields();
        !!onChange ? onChange(value) : Modal.error({title: '缺少tab的onChange事件'});
    }

    let OperationButton = [];
    !!rightOperation && !!rightOperation.btns && rightOperation.btns.length > 0 && rightOperation.btns.map((item, index) => {
        if(item.type == 'tab'){
            if(!!item.options && item.options.length > 0){
                let tabContent = [];
                item.options.map((tab_item,tab_index) => {
                    tabContent.push(<RadioButton key = { item.key + '_' + tab_item.value } value = { tab_item.value }>{ tab_item.label }</RadioButton>);
                })
                OperationButton.push(<RadioGroup key = { item.key + '_' + 'radiogroup' } onChange = {(e) => RadioOnChange(e.target.value,item.handle)} className = 'right_table_tab_common' defaultValue = { item.initialValue || item.options[0].value }>{ tabContent }</RadioGroup>)
            }else{
                return Modal.error({title: '缺少tab选项'})
            }
        }else{
            OperationButton.push(
                <Button type = 'primary' key = { 'operation_btn' + index } className = { rightTable.operation_btn } onClick = { item.handle }>{ item.label }</Button>
            )
        }
    })

    /*格式化批量操作栏*/
    let batchOperationItem = [];
    !!selectBar && !!selectBar.btns && selectBar.btns.length > 0 && selectBar.btns.map((item, index) => {
        if(item.confirm){
			batchOperationItem.push(
				<div key={ 'batch_btn' + index } className = { rightTable.handle_btn_item }>
					<Popconfirm placement = "top" title = { '确定要' + item.label + '吗?' } okText = "确定" cancelText = "取消" onConfirm = { item.handle } >
						<a>{ item.label }</a>
					</Popconfirm>
				</div>
			)
		}else{
			batchOperationItem.push(
				<div key={ 'batch_btn' + index } className = { rightTable.handle_btn_item } onClick = { item.handle }>
					<a>{ item.label }</a>
				</div>
			)
		}
    })

    return(
        <div className = { rightTable.right_table + formatClassName } style = {{ ...style , minWidth : minWidth || 1200 }}>
            { !!selectBar ?
                <div className = { !!selectBar && selectBar.num > 0 ? rightTable.batch_operation_show : rightTable.batch_operation_hide } >
                    <div className = { rightTable.handle_btn_item }>{ ((!!selectBar && selectBar.label) || '已选') + `(${ (!!selectBar && selectBar.num) || 0 })` }</div>
                    { batchOperationItem }
                </div> : null
            }
            { !!search || !!rightOperation ?
                <div className = { rightTable.search_and_operation }>
                    { !!search ?
                        <div className = { rightTable.search_content }>
                            <div className = { rightTable.search_area } >
                                { search_item }
                            </div>
                            { search_item && search_item.length > 0 ?
                                <div className = { rightTable.search_btn_group }>
                                    <Button size = 'default' type = 'primary' className = { rightTable.search_btn_group_search } onClick = {() => search.onSearch(getFieldsValue())} >
                                        <div className = { rightTable.search_icon }></div>
                                    </Button>
                                    <Button size = 'default' className = { rightTable.search_btn_group_clear } onClick = {(e) => { e.preventDefault();resetFields();search.onSearch && search.onSearch(); } } >
                                        <div className = { rightTable.reset_icon }></div>
                                    </Button>
                                </div> : null
                            }
                        </div> : null }
                    { !!rightOperation ?
                        <div className = { rightTable.operation_content }>
                            { OperationButton }
                        </div> : null
                    }
                </div>
                : null
            }

            <div className = { rightTable.table_content }>
                <div className = 'zj_right_table_common'>
                    <Table
                        columns = { table.columns || [] }
                        dataSource = { !!table.loading ? [] : (table.dataSource || []) }
                        pagination = { false }
                        rowSelection = { table.rowSelection || undefined }
                        rowKey = { table.rowKey || "id" }
                        size = { table.size || 'middle' }
                        locale = {{
                            emptyText : !!table.loading ?
                                <ProgressBar content = '加载中' height = { 400 }/> :
                                <NullData content = '暂时没有数据' height = { 400 }/>
                        }}
                        scroll={{ x : false , y : scrollHeight }}/>
                </div>
                <div className = 'zj_right_pagination_common'>
                    <Pagination
                        showSizeChanger
                        showQuickJumper
                        current = { !isNaN(pagination.pageIndex + '') ? (parseInt(pagination.pageIndex) + 1) : 1 }
                        pageSize = { !isNaN(pagination.pageSize + '') ? parseInt(pagination.pageSize) : 10 }
                        total = { !isNaN(pagination.total + '') ? parseInt(pagination.total) : 0 }
                        onShowSizeChange = { pagination.onChange }
                        onChange = { pagination.onChange }
                        showTotal = {() => '共' + (!isNaN(pagination.total + '') ? parseInt(pagination.total) : 0) + '条'}
                    />
                </div>
            </div>
        </div>
    );
}

export default Form.create()(RightTable);
