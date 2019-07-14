import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon, Radio } from 'antd';
import styles from './DataMgr.less';

function DataMgrList({
    loading, list, total,
    handleSizeChangeTop,handleSizeChangeBottomLeft,handleSizeChangeBottomAxis,handleSizeChangeBottomAim,handleSizeChangeAll,chartsIntro,handleSizeChangeBottomPoint,
    bottomChoose,aim,share,inverted,point,topChoose,
    dinggoumendianList,yuyueshuList,yuyuemendianList
  }) {
    const orderTenant = [{
        title: '新增订购',
        dataIndex: 'orderNum',
        key: 'orderNum',
        width: 100,
    }];

    const orderNo = [{
        title: '新增预约',
        dataIndex: 'subNum',
        key: 'subNum',
        width: 100,
    }];

    const orderStores = [{
        title: '覆盖门店',
        dataIndex: 'coverNum',
        key: 'coverNum',
        width: 100,
    }]

    let a=[];
    for(let i=0;i<1;i++){
        a.push({
            1:i,
            2:i,
            3:i,
            4:i,
            5:i,
            6:i,
            7:i,
            8:i,
            9:i,
            10:i,
            11:i,
            12:i,
            13:i,
            14:i,
        });
    }
  return (
    <div className="table-bg">
        <div className={styles.chooseItem_up}>
            <Radio.Group size="default" value={topChoose} onChange={handleSizeChangeTop}>
                <Radio.Button value="1">昨&nbsp;日</Radio.Button>
                <Radio.Button value="7">近7天</Radio.Button>
                <Radio.Button value="30">近30天</Radio.Button>
            </Radio.Group>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={chartsIntro}><Icon type="area-chart" />使用说明</Button>
        </div>
        <div className={styles.table_up}>
            <div className={styles.table1}>
                <Table
                    columns={orderTenant}
                    dataSource={dinggoumendianList.sourceList}
                    loading={loading}
                    title={() => '订购门店'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
            <div className={styles.table2}>
                <Table
                    columns={orderNo}
                    dataSource={yuyueshuList.sourceList}
                    loading={loading}
                    title={() => '预约数'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
            <div className={styles.table3}>
                <Table
                    columns={orderStores}
                    dataSource={yuyuemendianList.sourceList}
                    loading={loading}
                    title={() => '预约门店'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
        </div>
        <div className={styles.chooseItem_middle}>
            <Radio.Group size="default" value={bottomChoose} onChange={handleSizeChangeBottomLeft}>
                <Radio.Button value="1">订购门店</Radio.Button>
                <Radio.Button value="2">预约数</Radio.Button>
                <Radio.Button value="3">预约门店</Radio.Button>
            </Radio.Group>
            </div>
        <div className={styles.chooseItem_bottom}>
            <Radio.Group size="default" value={point=='1'?'1':''} onChange={handleSizeChangeBottomPoint}>
                <Radio.Button value="1">启动/关闭节点点击</Radio.Button>
            </Radio.Group>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Radio.Group size="default" value={inverted=='1'?'1':''} onChange={handleSizeChangeBottomAxis}>
                <Radio.Button value="1">X轴Y轴对调</Radio.Button>
            </Radio.Group>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Radio.Group size="default" value={aim} onChange={handleSizeChangeBottomAim}>
                <Radio.Button value="1">一字</Radio.Button>
                <Radio.Button value="2">|字</Radio.Button>
                <Radio.Button value="3">十字</Radio.Button>
                <Radio.Button value="4">关闭准星</Radio.Button>
            </Radio.Group>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Radio.Group size="default" value={share} onChange={handleSizeChangeAll}>
                <Radio.Button value="1">悬停节点展示自身</Radio.Button>
                <Radio.Button value="2">悬停节点展示全部</Radio.Button>
            </Radio.Group>
        </div>
    </div>
  );
}

DataMgrList.propTypes = {
    loading : PropTypes.any,
    list: PropTypes.array,
    total : PropTypes.any,
    handleSizeChangeTop : PropTypes.func,
    handleSizeChangeBottomLeft : PropTypes.func,
    handleSizeChangeBottomAxis : PropTypes.func,
    handleSizeChangeBottomAim : PropTypes.func,
    handleSizeChangeAll : PropTypes.func,
    handleSizeChangeBottomPoint : PropTypes.func,
    chartsIntro : PropTypes.func,
    bottomChoose : PropTypes.any,
    aim : PropTypes.any,
    point : PropTypes.any,
};

export default DataMgrList;
