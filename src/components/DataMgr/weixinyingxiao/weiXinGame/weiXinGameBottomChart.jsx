import React, { PropTypes } from 'react';
import { Table,Popconfirm,Button,Icon,Radio,Form,Select,DatePicker,Spin } from 'antd';
import { XAxis,YAxis,CartesianGrid,Tooltip,Legend,LineChart,ReferenceLine,ResponsiveContainer,Brush,Line } from 'recharts';
import styles from './weiXinGame.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

function WeiXinGameBottomChart({
    WeiXinGameBottomBarSpin,
    WeiXinGameBottomLeftRadioChoose,
    WeiXinGameBottomRightRadioChoose,
    WeiXinGameChangeBottomLeftRadioValue,
    WeiXinGameChangeBottomRightRadioValue,
    WeiXinGameBottomBarTitle,
    WeiXinGameDefinedTime,
    WeiXinGameBottomBarContent,
}) {
    let data1 = [
          {name: '2012-12-01', 课时数: 4000, 消费数: 2400, amt: 2400},
          {name: '2012-12-02', 课时数: 3000, 消费数: 1398, amt: 2210},
          {name: '2012-12-03', 课时数: 2000, 消费数: 9800, amt: 2290},
          {name: '2012-12-04'},
          {name: '2012-12-05', 课时数: 1890, 消费数: 4800, amt: 2181},
          {name: '2012-12-06', 课时数: 2390, 消费数: 3800, amt: 2500},
          {name: '2012-12-07', 课时数: 4000, 消费数: 2400, amt: 2400},
          {name: '2012-12-08', 课时数: 3000, 消费数: 1398, amt: 2210},
          {name: '2012-12-09', 课时数: 2000, 消费数: 9800, amt: 2290},
          {name: '2012-12-10', 课时数: 2780, 消费数: 3908, amt: 2000},
          {name: '2012-12-11', 课时数: 4000, 消费数: 2400, amt: 2400},
          {name: '2012-12-12', 课时数: 3000, 消费数: 1398, amt: 2210},
          {name: '2012-12-13', 课时数: 2000, 消费数: 9800, amt: 2290},
    ];

    return (
        <div className={styles.BottomContent}>
            <div className={styles.Name}>
                <div style={{height:'35px',width:'15px',backgroundColor:'#009cd8',float:'left'}}></div>
                <div style={{height:'35px',lineHeight:'35px',float:'left',fontSize:'16px',marginLeft:'4px'}}>数据趋势</div>
            </div>
            <div style={{height:'28px',margin:'60px 0 20px 20px'}}>
                <Radio.Group size="default" value={WeiXinGameBottomLeftRadioChoose} onChange={WeiXinGameChangeBottomLeftRadioValue}>
                    <Radio.Button value="views">浏览数</Radio.Button>
                    <Radio.Button value="shares">分享数</Radio.Button>
                    <Radio.Button value="validUsers">有效用户</Radio.Button>
                    <Radio.Button value="createNum">创建次数</Radio.Button>
                </Radio.Group>
                <Radio.Group size="default" value={WeiXinGameBottomRightRadioChoose} onChange={WeiXinGameChangeBottomRightRadioValue} style={{marginLeft:'53px'}}>
                    <Radio.Button value="7">近&nbsp;7&nbsp;日</Radio.Button>
                    <Radio.Button value="30">近30日</Radio.Button>
                </Radio.Group>
            </div>
            <Spin tip="Loading..." spinning={WeiXinActivityBottomBarSpin}>
                <div style={{textAlign:'center',fontSize:'20px'}}>{WeiXinActivityBottomBarTitle}&nbsp;({''==WeiXinGameBottomRightRadioChoose?`${WeiXinGameDefinedTime.startTime}~${WeiXinGameDefinedTime.endTime}`:`近${WeiXinGameBottomRightRadioChoose}天`})</div>
                <div style={{marginTop:'20px'}} >
                    <ResponsiveContainer width="100%" height={320} >
                        <LineChart data={WeiXinGameBottomBarContent}
                            margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                            <XAxis dataKey="name" tickLine={false}/>
                            <YAxis yAxisId="left" orientation="left" stroke="#4e9ff8" strokeWidth={2} label='Y1' tickLine={false}/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Brush dataKey='name' height={50} stroke="#4989da"/>
                            <Tooltip wrapperStyle={{borderRadius:'5px',border:'1px dotted #4e9ff8'}} labelStyle={{fontSize:'14px',color:'#666666',fontWeight:'700',marginBottom:'5px'}} itemStyle={{fontSize:'14px',fontWeight:'700'}}/>
                            <Legend verticalAlign="top" height={36}/>
                            <Line type="monotone" yAxisId="left" dataKey="课时数" stroke="#4e9ff8" connectNulls={false} strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Spin>
        </div>
    );
}


export default WeiXinGameBottomChart;
