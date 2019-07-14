import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon, Radio } from 'antd';
import { Surface, Pie, BarChart, Bar, XAxis, YAxis,ZAxis, CartesianGrid, Tooltip, Legend, LineChart, Line,PieChart, Sector, Cell,Treemap,ReferenceLine,Brush,ScatterChart,Scatter,AreaChart,Area,ResponsiveContainer } from 'recharts';
import styles from './DataMgr.less';

const data1 = [
  { name: 'iphone4', value: 120, fill: '#ff7300' },
  { name: 'iphone4s', value: 500, fill: '#e5671a' },
  { name: 'iphone5', value: 600, fill: '#907213' }
];
const data2 = [
      {name: '美吉姆早教中心萧山店', uv: 4000, pv: 2400, amt: 2400},
      {name: '美吉姆早教中心萧山店', uv: 3000, pv: 1398, amt: 2210},
      {name: '美吉姆早教中心萧山店', uv: 2000, pv: 9800, amt: 2290},
      {name: '美吉姆早教中心萧山店', uv: 2780, pv: 3908, amt: 2000},
      {name: '美吉姆早教中心萧山店', uv: 1890, pv: 4800, amt: 2181},
      {name: '美吉姆早教中心萧山店', uv: 2390, pv: 3800, amt: 2500},
      {name: '美吉姆早教中心萧山店', uv: 4000, pv: 2400, amt: 2400},
      {name: '美吉姆早教中心萧山店', uv: 3000, pv: 1398, amt: 2210},
      {name: '美吉姆早教中心萧山店', uv: 2000, pv: 9800, amt: 2290},
      {name: '美吉姆早教中心萧山店', uv: 2780, pv: 3908, amt: 2000},
];
const data3 = [{name: '练习本', value: 400}, {name: '钢笔', value: 400},
                  {name: '铅笔', value: 400}, {name: '水彩笔', value: 400}
              , {name: '尺子', value: 400}];
const data01 = [{x: 10, y: 30}, {x: 30, y: 200}, {x: 45, y: 100}, {x: 50, y: 400}, {x: 70, y: 150}, {x: 100, y: 250}];
const data02 = [{x: 30, y: 20}, {x: 50, y: 180}, {x: 75, y: 240}, {x: 100, y: 100}, {x: 120, y: 190}];
/*for(let i=0;i<data2.length;i++){
    if(data2[i].name.length>5){
        data2[i].name=data2[i].name.substring(0,5)
    }
}*/

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{` ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#0088FE','#0088FE'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
function Charts({
    loading, list, total,bottomChoose,topChoose,inverted,share,aim,colorType,point,Xdata,activeIndex,
    changeIndex,PasswordFormVisible,OpenContent
  }) {

    function onPieEnter(data, index){
        changeIndex(data, index);
    }

    if(true==OpenContent){
        return (
            <div>
                <div style={{width:'100%',height:'400px'}}>
                    <ResponsiveContainer width="80%" height="80%">
                        <BarChart data={data2}
                            margin={{top: 25, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <ReferenceLine y={0} stroke='#000'/>
                            <Brush dataKey='name' height={30} stroke="#FF8042"/>
                            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                            <Bar dataKey="amt" stackId="a" fill="#FF8042" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    <BarChart  width={1600} height={300} data={data2}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend verticalAlign="bottom" wrapperStyle={{lineHeight: '40px'}}/>
                        <ReferenceLine y={0} stroke='#000'/>
                        <Brush dataKey='name' height={30} stroke="#FF8042"/>
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart >
                </div>
                <div>
                    <LineChart width={1600} height={300} data={data2}
                        margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="name"/>
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" label='Y1'/>
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" label='Y2'/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend verticalAlign="top" height={36}/>
                        <Line type="monotone" yAxisId="left" dataKey="pv" stroke="#8884d8" />
                        <Line type="monotone" yAxisId="right" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </div>
                <div>
                    <PieChart width={800} height={400} onMouseEnter={onPieEnter}>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={data3}
                            cx={300}
                            cy={200}
                            innerRadius={50}
                            outerRadius={80}
                            fill="#8884d8">
                        {
                            data3.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index]}/>
                        ))
                        }
                        </Pie>
                    </PieChart>
                </div>
                <div>
                    <ScatterChart width={600} height={400} margin={{top: 20, right: 20, bottom:     20, left: 20}}>
                        <XAxis dataKey={'x'} name='stature' unit='cm'/>
                        <YAxis dataKey={'y'} name='weight' unit='kg'/>
                        <ZAxis range={[100]}/>
                        <CartesianGrid />
                        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                        <Legend/>
                        <Scatter name='A school' data={data01} fill='#8884d8' line shape="cross"/>
                        <Scatter name='B school' data={data02} fill='#82ca9d' line shape="diamond"/>
                    </ScatterChart>
                </div>
                <div>
                    <div>
                        <h4>A demo of synchronized AreaCharts</h4>
                        <AreaChart width={1600} height={150} data={data2} syncId="anyId"
                            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
                        </AreaChart>
                    </div>
                    <div>
                        <p>Maybe some other content</p>
                        <AreaChart width={1600} height={150} data={data2} syncId="anyId"
                            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Area type='monotone' dataKey='pv' stroke='#82ca9d' fill='#82ca9d' />
                        </AreaChart>
                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <div>

            </div>
        );
    }

}

Charts.propTypes = {
    loading : PropTypes.any,
    list: PropTypes.array,
    total : PropTypes.any,
    bottomChoose : PropTypes.any,
    topChoose : PropTypes.any,
    colorType : PropTypes.any,
};

export default Charts;
