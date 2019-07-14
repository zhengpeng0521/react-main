import React from 'react';
import { Table, Icon, Form, Input, Select, DatePicker, Button, message, Pagination, Popconfirm } from 'antd';
import { NullData , ProgressBar } from '../NewComponent';
import styles from './ManagerListTable.less';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

function managerListTable({
	xScroll,
    yScroll,
	isInDetail,
	height,
	isWidth,
	loading,
	dataSource,
	columns,
	emptyText,
    rowKey,
	rowSelection,
	newColumns,
    progressContent,
    ProgressBarHeight,
	NullDataHeight,
}){

	/*确认需要展示的列表项*/
	let finalColumns = [];
	if( !!newColumns && newColumns.length > 0 ){
		finalColumns = newColumns;
	}else{
		finalColumns = columns;
	}

	let	tableHeight = document.body.clientHeight;
	let scrollHeight = '';
	/*获取高度值*/
	if( !!height ){
		scrollHeight = tableHeight - height;
	}else{
		scrollHeight = tableHeight - 241;
	}

	let ant_layout_content = document.getElementById('common_content_left');
	let contentWidth = !!ant_layout_content && ant_layout_content.clientWidth;

	if( !!isInDetail || !!isWidth ){
		if( xScroll < 900 ){
			xScroll = undefined
		}
	}else{
		if( contentWidth > xScroll ){
			xScroll = undefined
		}
	}
	var ant_table_scroll = document.getElementsByClassName('ant-table-scroll');
	if( !!ant_table_scroll[0] ){
		ant_table_scroll[0].className = '';
	}

	return(
        <div className='zj_new_component_by_yhwu_table'>
            <Table
                bordered
                columns = { finalColumns }
                pagination = { false }
                dataSource = { !!loading ? [] : dataSource }
                scroll = {{ y : yScroll || scrollHeight, x : !!xScroll && xScroll }}
                rowSelection = { rowSelection }
                locale = {{ emptyText : !!loading ? <ProgressBar content = { progressContent || '加载中'} height = { ProgressBarHeight || 400 }/> : <NullData content = { emptyText || '暂时没有数据'} height = { NullDataHeight || 400 }/> }}
                rowKey = { rowKey || 'id' }
            />
        </div>
	)
}

export default managerListTable;
