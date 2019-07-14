import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon, Radio,Spin } from 'antd';
import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,LineChart,ReferenceLine,ResponsiveContainer,Brush } from 'recharts';
import styles from './weiXinGame.less';

function WeiXinGameTopChart({
    WeiXinGameTopRadioChoose,
    WeiXinGameChangeTopRadioValue,
    WeiXinGameTopBarSpin,
    WeiXinGameTopBarContent,
}) {
    return (
        <div className={styles.TopContent}>
            <div className={styles.Name}>
                <div style={{height:'35px',width:'15px',backgroundColor:'#009cd8',float:'left'}}></div>
                <div style={{height:'35px',lineHeight:'30px',float:'left',fontSize:'16px',marginLeft:'4px'}}>数据总览</div>
            </div>
            <div style={{height:'28px',margin:'10px 0 20px 18px'}}>
                <Radio.Group size="default" value={WeiXinGameTopRadioChoose} onChange={WeiXinGameChangeTopRadioValue}>
                    <Radio.Button value="views">浏览数</Radio.Button>
                    <Radio.Button value="shares">分享数</Radio.Button>
                    <Radio.Button value="validUsers">有效用户数</Radio.Button>
                    <Radio.Button value="createNum">创建次数</Radio.Button>
                </Radio.Group>
            </div>
            <Spin tip="Loading..." spinning={WeiXinGameTopBarSpin}>
                <div style={{marginTop:'50px'}}>
                    <ResponsiveContainer width="100%" height={350} >
                        <BarChart
                            data={WeiXinGameTopBarContent}
                            barSize={40}
                            margin={{top: 0, right: 30, left: 0, bottom: 30}} >
                            <XAxis dataKey="modelName" stroke='#666666' tickLine={false} allowDataOverflow={false} strokeWidth={1}/>
                            <YAxis stroke="#666666" tickLine={false} />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Brush dataKey='modelName' height={50} stroke="#4989da"/>
                            <Tooltip wrapperStyle={{borderRadius:'5px',border:'1px dotted #b4d5fe'}} labelStyle={{fontSize:'14px',color:'#666666',fontWeight:'700'}} itemStyle={{fontSize:'14px',color:'#4e9ff8',fontWeight:'700'}} cursor={false}/>
                            <ReferenceLine y={0} stroke='#b4d5fe'/>
                            <Legend verticalAlign="top" height={36} />
                            {
                                WeiXinGameTopRadioChoose == 'views' ? <Bar dataKey="浏览数" stackId="a" fill="#b4d5fe" stroke='#666666' strokeWidth=  {1}/> :
                                WeiXinGameTopRadioChoose == 'shares' ? <Bar dataKey="分享数" stackId="a" fill="#b4d5fe" stroke='#666666' strokeWidth={1}/> :
                                WeiXinGameTopRadioChoose == 'validUsers' ? <Bar dataKey="有效用户数" stackId="a" fill="#b4d5fe" stroke='#666666' strokeWidth={1}/> :
                                WeiXinGameTopRadioChoose == 'createNum' ? <Bar dataKey="创建次数" stackId="a" fill="#b4d5fe" stroke='#666666' strokeWidth={1}/> : null
                            }

                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Spin>
        </div>
    );
}


export default WeiXinGameTopChart;
