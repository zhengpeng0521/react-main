import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon, Radio } from 'antd';
import styles from './DataMgr.less';

function DataMgrList({
    loading, list, total,
    handleSizeChangeTop,handleSizeChangeBottomLeft,handleSizeChangeBottomAxis,handleSizeChangeBottomAim,handleSizeChangeAll,chartsIntro,handleSizeChangeBottomPoint,
    bottomChoose,aim,share,inverted,point,topChoose,
    yonghuzhuceList,yonghudengluList,qidongcishuList,jinbizengjiaList,jinbixiaohaoList,tieziList,
  }) {
    const userRegister = [{
        title: '总增量',
        dataIndex: 'userIn',
        key: 'userIn',
        width: 100,
    }, {
        title: 'APP增量',
        dataIndex: '2',
        key: '2',
        width: 100,
    }, {
        title: 'H5增量',
        dataIndex: '3',
        key: '3',
        width: 100,
    }];

    const userLogin = [{
        title: '总登陆',
        dataIndex: '4',
        key: '4',
        width: 100,
    }, {
        title: '手机登录',
        dataIndex: '5',
        key: '5',
        width: 100,
    }, {
        title: '微信登录',
        dataIndex: '6',
        key: '6',
        width: 100,
    }, {
        title: 'QQ登录',
        dataIndex: '7',
        key: '7',
        width: 100,
    }, {
        title: '微博登录',
        dataIndex: '8',
        key: '8',
        width: 100,
    }];

    const openNo = [{
        title: '启动数',
        dataIndex: '9',
        key: '9',
        width: 100,
    }, {
        title: '启动设备',
        dataIndex: '10',
        key: '10',
        width: 100,
    }];

    const goldIncrease = [{
        title: '金币增加',
        dataIndex: 'goldAd',
        key: 'goldAd',
        width: 100,
    }];

    const goldExpend = [{
        title: '金币消耗',
        dataIndex: 'goldRe',
        key: 'goldRe',
        width: 100,
    }, {
        title: '金币兑换',
        dataIndex: 'goldEx',
        key: 'goldEx',
        width: 100,
    }];

    const topic = [{
        title: '新增帖子',
        dataIndex: 'topic',
        key: 'topic',
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
                <Radio.Button value="7">近7日</Radio.Button>
                <Radio.Button value="30">近30日</Radio.Button>
            </Radio.Group>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={chartsIntro}><Icon type="area-chart" />使用说明</Button>
        </div>
        <div className={styles.table_up}>
            <div className={styles.table1}>
                <Table
                    columns={userRegister}
                    dataSource={yonghuzhuceList.sourceList}
                    loading={loading}
                    title={() => '用户注册'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
            <div className={styles.table2}>
                <Table
                    columns={userLogin}
                    dataSource={yonghudengluList.sourceList}
                    loading={loading}
                    title={() => '用户登录'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
        </div>
        <br/><br/><br/>
        <div className={styles.table_bottom}>
            <div className={styles.table3}>
                <Table
                    columns={openNo}
                    dataSource={qidongcishuList.sourceList}
                    loading={loading}
                    title={() => '启动'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
            <div className={styles.table4}>
                <Table
                    columns={goldIncrease}
                    dataSource={jinbizengjiaList.sourceList}
                    loading={loading}
                    title={() => '金币增加'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
            <div className={styles.table5}>
                <Table
                    columns={goldExpend}
                    dataSource={jinbixiaohaoList.sourceList}
                    loading={loading}
                    title={() => '金币消耗'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
            <div className={styles.table6}>
                <Table
                    columns={topic}
                    dataSource={tieziList.sourceList}
                    loading={loading}
                    title={() => '帖子'}
                    pagination={false}
                    bordered
                    rowKey="id"
                    size='middle'
                />
            </div>
        </div>
        <div className={styles.chooseItem_middle}>
            <Radio.Group size="default" value={bottomChoose} onChange={handleSizeChangeBottomLeft}>
                <Radio.Button value="1">用户注册</Radio.Button>
                <Radio.Button value="2">用户登录</Radio.Button>
                <Radio.Button value="3">启动次数</Radio.Button>
                <Radio.Button value="4">金币增加</Radio.Button>
                <Radio.Button value="5">金币消耗</Radio.Button>
                <Radio.Button value="6">帖&nbsp;&nbsp;&nbsp;&nbsp;子</Radio.Button>
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
