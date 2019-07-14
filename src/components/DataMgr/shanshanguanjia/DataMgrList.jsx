import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon, Radio } from 'antd';
import styles from './DataMgr.less';

function DataMgrList({
    loading, list, total,
    handleSizeChangeTop,handleSizeChangeBottomLeft,handleSizeChangeBottomAxis,handleSizeChangeBottomAim,handleSizeChangeAll,chartsIntro,handleSizeChangeBottomPoint,
    bottomChoose,aim,share,inverted,point,topChoose,
    shanghuList,mendianList,shanghuzhanghaoList,shanghudengluList,
  }) {
    const tenant = [{
        title: '新增商户',
        dataIndex: 'tenantNum',
        key: 'tenantNum',
        width: 100,
    }];

    const stores = [{
        title: '新增门店',
        dataIndex: 'storeNum',
        key: 'storeNum',
        width: 100,
    }];

    const tenantId = [{
        title: '商户帐号',
        dataIndex: 'acctNum',
        key: 'acctNum',
        width: 100,
    }];

    const login = [{
        title: '登录次数',
        dataIndex: '4',
        key: '4',
        width: 100,
    }, {
        title: 'web登陆数',
        dataIndex: '5',
        key: '5',
        width: 100,
    }, {
        title: 'APP登录数',
        dataIndex: '6',
        key: '6',
        width: 100,
    }, {
        title: '口碑免登数',
        dataIndex: '7',
        key: '7',
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
                    columns={tenant}
                    dataSource={shanghuList.sourceList}
                    loading={loading}
                    title={() => '商户'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
            <div className={styles.table2}>
                <Table
                    columns={stores}
                    dataSource={mendianList.sourceList}
                    loading={loading}
                    title={() => '门店'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'

                />
            </div>
            <div className={styles.table3}>
                <Table
                    columns={tenantId}
                    dataSource={shanghuzhanghaoList.sourceList}
                    loading={loading}
                    title={() => '商户帐号'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
        </div>
        <div className={styles.table_bottom}>
            <div className={styles.table4}>
                <Table
                    columns={login}
                    dataSource={shanghudengluList.sourceList}
                    loading={loading}
                    title={() => '商户登录'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
        </div>
        <div className={styles.chooseItem_middle}>
            <Radio.Group size="default" value={bottomChoose} onChange={handleSizeChangeBottomLeft}>
                <Radio.Button value="1">商户</Radio.Button>
                <Radio.Button value="2">门店</Radio.Button>
                <Radio.Button value="3">商户帐号</Radio.Button>
                <Radio.Button value="4">商户登录</Radio.Button>
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
    shanghuList : PropTypes.any,
    mendianList : PropTypes.any,
    shanghuzhanghaoList : PropTypes.any,
    shanghudengluList : PropTypes.any,
};

export default DataMgrList;
