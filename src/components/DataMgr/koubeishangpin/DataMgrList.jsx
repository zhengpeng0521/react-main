import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon, Radio } from 'antd';
import styles from './DataMgr.less';

function DataMgrList({
    loading, list, total,
    handleSizeChangeTop,handleSizeChangeBottomLeft,handleSizeChangeBottomAxis,handleSizeChangeBottomAim,handleSizeChangeAll,chartsIntro,handleSizeChangeBottomPoint,
    bottomChoose,aim,share,inverted,point,topChoose,  dinggoumendianList,shangpinshuList,xinzengshangpinfugaimendianList,shangjiashangpinList,xinzengshangpinzongmendianshuList,chengjiaodingdanList,dingdanchengjiaojineList,hexiaoshuliangList,hexiaojineList,
  }) {
    const orderStores = [{
        title: '新增订购',
        dataIndex: 'shopNum',
        key: 'shopNum',
        width: 100,
    }];

    const goods = [{
        title: '新增商品',
        dataIndex: 'productNum',
        key: 'productNum',
        width: 100,
    }, {
        title: '新增课程',
        dataIndex: 'courseNum',
        key: 'courseNum',
        width: 100,
    }, {
        title: '新增活动',
        dataIndex: 'activityNum',
        key: 'activityNum',
        width: 100,
    }];

    const goodsCover = [{
        title: '覆盖门店',
        dataIndex: 'orgGoodsNum',
        key: 'orgGoodsNum',
        width: 100,
    }];

    const upGoods = [{
        title: '上架商品数',
        dataIndex: 'orderGoodsNum',
        key: 'orderGoodsNum',
        width: 100,
    }];

    const stores = [{
        title: '总商品数',
        dataIndex: 'allGoodsNum',
        key: 'allGoodsNum',
        width: 100,
    }];

    const comOrder = [{
        title: '新增订单',
        dataIndex: 'dealNum',
        key: 'dealNum',
        width: 100,
    }, {
        title: '新增课程订单',
        dataIndex: 'courseOrderNum',
        key: 'courseOrderNum',
        width: 100,
    }, {
        title: '新增活动订单',
        dataIndex: 'actOrderNum',
        key: 'actOrderNum',
        width: 100,
    }];

    const comOrderMoney = [{
        title: '金额增量',
        dataIndex: 'purNum',
        key: 'purNum',
        width: 100,
    }];

    const heXiaoNo = [{
        title: '新增核销',
        dataIndex: 'settleNum',
        key: 'settleNum',
        width: 100,
    }];

    const heXiaoMoney = [{
        title: '金额增量',
        dataIndex: 'settlePayNum',
        key: 'settlePayNum',
        width: 100,
    }];

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
                    columns={orderStores}
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
                    columns={goods}
                    dataSource={shangpinshuList.sourceList}
                    loading={loading}
                    title={() => '商品数'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
            <div className={styles.table3}>
                <Table
                    columns={goodsCover}
                    dataSource={xinzengshangpinfugaimendianList.sourceList}
                    loading={loading}
                    title={() => '新增商品覆盖门店'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
            <div className={styles.table4}>
                <Table
                    columns={upGoods}
                    dataSource={shangjiashangpinList.sourceList}
                    loading={loading}
                    title={() => '上架商品'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
            <div className={styles.table5}>
                <Table
                    columns={stores}
                    dataSource={xinzengshangpinzongmendianshuList.sourceList}
                    loading={loading}
                    title={() => '新增商品总门店数'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
        </div>
        <div className={styles.table_bottom}>
            <div className={styles.table6}>
                <Table
                    columns={comOrder}
                    dataSource={chengjiaodingdanList.sourceList}
                    loading={loading}
                    title={() => '成交订单'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
            <div className={styles.table7}>
                <Table
                    columns={comOrderMoney}
                    dataSource={dingdanchengjiaojineList.sourceList}
                    loading={loading}
                    title={() => '订单成交金额'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
            <div className={styles.table8}>
                <Table
                    columns={heXiaoNo}
                    dataSource={hexiaoshuliangList.sourceList}
                    loading={loading}
                    title={() => '核销数量'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
            <div className={styles.table9}>
                <Table
                    columns={heXiaoMoney}
                    dataSource={hexiaojineList.sourceList}
                    loading={loading}
                    title={() => '核销金额'}
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
                <Radio.Button value="2">商品数</Radio.Button>
                <Radio.Button value="3">新增商品覆盖门店</Radio.Button>
                <Radio.Button value="4">上架商品</Radio.Button>
                <Radio.Button value="5">新增商品总门店数</Radio.Button>
                <Radio.Button value="6">成交订单</Radio.Button>
                <Radio.Button value="7">订单成交金额</Radio.Button>
                <Radio.Button value="8">核销数量</Radio.Button>
                <Radio.Button value="9">核销金额</Radio.Button>
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
    share : PropTypes.any,
    inverted : PropTypes.any,
    point : PropTypes.any,
};

export default DataMgrList;
