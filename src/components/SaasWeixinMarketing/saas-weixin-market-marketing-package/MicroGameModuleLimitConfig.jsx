import React, { PropTypes } from 'react';
import styles from './MarketingPackage.less';
import { Form, Select, Input, Checkbox, Table, InputNumber } from 'antd';
const FormItem = Form.Item;
const Search = Input.Search;
const { Column, ColumnGroup } = Table;
const CheckboxGroup = Checkbox.Group;

const MicroGameModuleLimitConfig = ({
    gameModuleFilterKeyWord,//微游戏模板过滤关键字
    dataSource,//源数据，全部模板列表
    selectData,//选中的数据选项

    //执行函数
    onChangeSelect,//变更选中数据选项
    onKeyWordFilter,//更新过滤查询关键字

    handleSelectAllLimitNum,//选中所有  限制人数
    handleSelectAllNoLimitNum,//选中所有  不限制人数
    handleSelectAllLimitEcharts,//选中所有  开通社交图谱

}) => {


    let isSelectAllModule = selectData.length == dataSource.length;//是否选中所有模板
    let isSelectAllLimitNum = false;//是否选中所有 限制人数
    let isSelectAllNoLimitNum = false;//是否选中所有 不限制人数
    let isSelectAllCharts = false;//是否选中所有 开通社交图谱

    let module_current = selectData.length;//限制人数 当前选中数
    let module_total = dataSource.length //制人数 总数

    let limitNum_current = 0;//限制人数 当前选中数
    let limitNum_total = 0; //制人数 总数

    let noLimitNum_current = 0;//不限制人数 当前选中数
    let noLimitNum_total = 0; //不制人数 总数

    let echarts_current = 0;//开通社交图谱 当前选中数
    let echarts_total = 0; //开通社交图谱 总数

    let dataSource_filter = [];//经过过滤后的数据源列表

    //TODO 根据过滤关键字过滤后得到要展示的源数据列表
    if(gameModuleFilterKeyWord != undefined && gameModuleFilterKeyWord.length > 0) {
        dataSource && dataSource.map(function(dataItem, dataIndex) {
            if(dataItem.title.indexOf(gameModuleFilterKeyWord) > -1) {
                dataSource_filter.push(dataItem);
            }
        });
    } else {
        dataSource_filter = dataSource;
    }

    //更新显示的数据列表的内付费情况值
    dataSource_filter = dataSource_filter && dataSource_filter.map(function(filterDataItem, filterDataIndex) {
        selectData && selectData.length > 0 && selectData.map(function(selectItem, selectIndex) {
            if(filterDataItem.key == selectItem.key) {
                filterDataItem = {
                    ...filterDataItem,
                    ...selectItem,
                };
            }
        });

        return filterDataItem;
    });

    /*根据关键字过滤数据源*/
    function keyWordFilter(e) {
        //TODO 更新modle里的微游戏模板过滤关键字
        let value = e.target.value;
        onKeyWordFilter && onKeyWordFilter(value);
    }

    /*选中全部  限制人数*/
    function handleSelectAll(type) {

        let currentListKeys = [];
        //遍历当前展示项 得到所有可见显示项的key
        dataSource_filter && dataSource_filter.map(function(filterItem, filterIndex) {
            currentListKeys.push(filterItem.key);
        });

        if(type == 'limitNum') {
            handleSelectAllLimitNum && handleSelectAllLimitNum(currentListKeys);
        } else if(type == 'limitNoNum') {
            handleSelectAllNoLimitNum && handleSelectAllNoLimitNum(currentListKeys);
        } else if(type == 'limitEcharts') {
            handleSelectAllLimitEcharts && handleSelectAllLimitEcharts(currentListKeys);
        }
    }


    //更新数据选中情况
    dataSource && dataSource.length > 0 && dataSource.map(function(item, index) {
        if(item.isLimit) {
            limitNum_total++;
        }
    });

    noLimitNum_total = limitNum_total;
    echarts_total = limitNum_total;

    //查询选中人数情况
    selectData && selectData.length > 0 && selectData.map(function(selectItem, selectIndex) {

        //判断是否 是可以设置内付费
        let selectItemKey = selectItem.key;
        let itemCanLimit = false;

        dataSource && dataSource.map(function(sourceItem, sourceIndex) {
            if(sourceItem.key == selectItemKey) {
                itemCanLimit = sourceItem.isLimit ? true : false;
            }
        });

        selectItem.itemCanLimit = itemCanLimit;

        if(itemCanLimit) {
            //如果选择限制人数
            if(selectItem.hasLimitNum) {
                limitNum_current ++;
            } else {
                noLimitNum_current ++;
            }

            if(selectItem.hasLimitEcharts) {
                echarts_current ++;
            }
        }

    });

    isSelectAllLimitNum = limitNum_current >= limitNum_total;
    isSelectAllNoLimitNum = noLimitNum_current >= noLimitNum_total;
    isSelectAllCharts = echarts_current >= echarts_total;

    let selectedRowKeys = [];//列表选中的选项

    selectData && selectData.map(function(selectDataItem, selectDataIndex) {
        selectedRowKeys.push(selectDataItem.key);
    });

    let rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            window.selectedRows_length = selectedRows.length;
            onChangeSelect && onChangeSelect('moduleSelectChange', selectedRowKeys);
        },
        getCheckboxProps: record => ({
            name: record.name,
        }),
        selectedRowKeys: selectedRowKeys
    };

    let columns = [
        {
            title: '已选模版(' + (module_current || 0) + '/' + module_total + ')',
            dataIndex: 'title',
            key: 'title',
            width: 200,
        },
        {
            title: <div>
                <Checkbox checked={isSelectAllLimitNum} onChange={(e) => handleSelectAll('limitNum')}>
                    已选限制({limitNum_current}/{limitNum_total})
                </Checkbox>
            </div>,
            dataIndex: 'hasLimitNum',
            key: 'hasLimitNum',
            width: 300,
            render: (text, record, index) => {
                if (!record.isLimit) return;
                return (
                    <span>
                        <Checkbox
                            checked={record.hasLimitNum}
                            onChange={() => onChangeSelect('limitChange', {
                                key: record.key,
                                hasLimitNum: true,
                                hasLimitNumValue: record.hasLimitNumValue || 1000
                            })}
                        >限制报名人数</Checkbox>
                        {
                            record.hasLimitNum ?
                                <InputNumber
                                    style={{width:84}}
                                    min={1}
                                    max={100000}
                                    value={record.hasLimitNumValue}
                                    onChange={(e) => {
                                        onChangeSelect('limitChange', {
                                            key: record.key,
                                            hasLimitNumValue: e
                                        })
                                    }}
                                />
                                : null
                        }
                    </span>
                )
            }
        },
        {
            //不限制
            title: <div>
                <Checkbox
                    checked={isSelectAllNoLimitNum}
                    onChange={(e) => handleSelectAll('limitNoNum')}
                >已选不限制({noLimitNum_current}/{noLimitNum_total})</Checkbox>
            </div>,
            dataIndex: 'isLimit',
            key: 'isLimit',
            width: 200,
            render: (text, record, index) => {
                if (!record.isLimit) return;
                return <Checkbox
                           checked={record.hasLimitNum == undefined || record.hasLimitNum == false}
                           onChange={() => onChangeSelect('limitChange', {
                            key: record.key,
                            hasLimitNum: false,
                    })}>不限制</Checkbox>
            }

        },
        {
            title: <div>
                <Checkbox
                    checked={isSelectAllCharts}
                    onChange={(e) => handleSelectAll('limitEcharts')}
                >已选开通({echarts_current}/{echarts_total})</Checkbox>
            </div>,
            dataIndex: 'chart',
            key: 'chart',
            width: 200,
            render: (text, record, index) => {
                if (!record.isLimit) return;
                return <Checkbox
                           checked={record.hasLimitEcharts}
                           onChange={() => onChangeSelect('limitChange', {
                            key: record.key,
                            hasLimitEcharts: !record.hasLimitEcharts,
                    })}>社交图谱</Checkbox>

            }

        }
    ];

    return (
        <div className={styles.zj_modal_game_box}>
            <Search placeholder="请输入查询的模板" style={{ width: '100%' }} onChange={keyWordFilter} /><br />

            <Table
                rowClassName={() => 'editable-row'}
                className='zj_modal_game_tab'
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataSource_filter}
                size="small"
                scroll={{ y: 298 }}
                pagination={false} />
        </div>
    )
}


export default MicroGameModuleLimitConfig;
