import React, { PropTypes } from 'react';
import DataMgrSearch from '../../../components/DataMgr/shanshanzaojiao/DataMgrSearch';
import DataMgrList from '../../../components/DataMgr/shanshanzaojiao/DataMgrList';
import ChartsIntro from '../../../components/DataMgr/ChartsIntro';
import AlertModal from '../../../components/DataMgr/shanshanzaojiao/AlertModal';
import Charts from '../../../components/DataMgr/shanshanzaojiao/Charts';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';



import styles from './DataMgr.less';

function DataMgr({ dispatch, shanshanzaojiao }) {

    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formVisible,AlertVisible,formType,                    //form表单数据
        searchData, searchVisible, searchChannelList,XTime,                   //search查询框数据
        topChoose,bottomChoose,inverted,share,aim,colorArray1,colorArray2,colorType,point,zidingyiTime,zidingyiTimeContent, //图表数据
        yonghuzhuceList,yonghudengluList,qidongcishuList,jinbizengjiaList,jinbixiaohaoList,tieziList,
    } = shanshanzaojiao;
    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'shanshanzaojiao/updateState',
            payload: {
                searchData : {},
                zidingyiTime:false,
                zidingyiTimeContent:'',
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(data) {
        dispatch({
            type:'shanshanzaojiao/updateState',
            payload: {
                zidingyiTime:true,
                zidingyiTimeContent:data,
                topChoose:'',
            }
        });
        dispatch({
            type:'shanshanzaojiao/SearchModalOne',
            payload: {
                ...data,
            }
        });
    };

    //生成冒泡排序随机数，在sort参数中如果传入的参数是0，两个数位置不变。如果参数小于0，就交换位置，如果参数大于0就不交换位置,打乱数组的作用
    let RandomArray = function(array){
        return array.sort(function(){return 0.35 - Math.random()});
    };

    //上方选择
    let handleSizeChangeTop = function(data){
        let selectDay = data.target.value;
        let selectItem = shanshanzaojiao.bottomChoose;
        dispatch({
            type:'shanshanzaojiao/updateState',
            payload: {
                topChoose : selectDay,
                zidingyiTime : false,
                zidingyiTimeContent:'',
                AlertVisible : false,
            }
        });
        dispatch({
            type:'shanshanzaojiao/SearchModalOne',
            payload: {
                selectDay,
            }
        });
    }

    //下方左边选择
    let handleSizeChangeBottomLeft = function(data){
        let value = data.target.value;
        let selectDay = shanshanzaojiao.topChoose;
        let timeRange = shanshanzaojiao.zidingyiTimeContent;
        let Type ;
        let rand = Math.random();//生成[0,1)随机数如果大于等于0.5，取colorArray1；反之取取colorArray2
        if(rand>0.6){
            console.log('colorArray1');
            Type = RandomArray(shanshanzaojiao.colorArray1);
        }else if(rand>0.2){
            console.log('colorArray2');
            Type = RandomArray(shanshanzaojiao.colorArray2);
        }else {
            console.log('colorType');
            Type = RandomArray(shanshanzaojiao.colorType);
        }
        dispatch({
            type:'shanshanzaojiao/updateState',
            payload: {
                bottomChoose : value,
                colorType : Type,
                topChoose : shanshanzaojiao.topChoose,
            }
        });
    }

    //X轴Y轴对调
    let handleSizeChangeBottomAxis = function(data){
        if(shanshanzaojiao.inverted=='1'){
            dispatch({
                type:'shanshanzaojiao/updateState',
                payload: {
                    inverted : '',
                }
            });
        }else if(shanshanzaojiao.inverted==''){
            dispatch({
                type:'shanshanzaojiao/updateState',
                payload: {
                    inverted : '1',
                }
            });
        }
    }

    //节点是否可点击
    let handleSizeChangeBottomPoint = function(data){
       if(shanshanzaojiao.point=='1'){
            dispatch({
                type:'shanshanzaojiao/updateState',
                payload: {
                    point : '',
                }
            });
        }else if(shanshanzaojiao.point==''){
            dispatch({
                type:'shanshanzaojiao/updateState',
                payload: {
                    point : '1',
                }
            });
        }
    }

    //选择鼠标悬停节点显示自身或者全部
    let handleSizeChangeAll = function(data){
        let value = data.target.value;
        dispatch({
            type:'shanshanzaojiao/updateState',
            payload: {
                share : value,
            }
        });
    }
    //十字准星
    let handleSizeChangeBottomAim = function(data){
        let value = data.target.value;
        dispatch({
            type:'shanshanzaojiao/updateState',
            payload: {
                aim : value,
            }
        });
    }
    //打开说明框
    let chartsIntro = function(){
        dispatch({
            type:'shanshanzaojiao/updateState',
            payload: {
                formVisible : true,
            }
        });
    }

    //关闭说明框
    let formCancel = function(){
        dispatch({
            type:'shanshanzaojiao/updateState',
            payload: {
                formVisible : false,
                AlertVisible : false,
            }
        });
    }

    let dataMgrSearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
    };


    let dataMgrListProps = {
        loading, list, total,
        handleSizeChangeTop,handleSizeChangeBottomLeft,handleSizeChangeBottomAxis,handleSizeChangeBottomAim,handleSizeChangeAll,chartsIntro,handleSizeChangeBottomPoint,
        bottomChoose,share,aim,inverted,point,topChoose,
        yonghuzhuceList,yonghudengluList,qidongcishuList,jinbizengjiaList,jinbixiaohaoList,tieziList,
    };

    let alertModaltProps = {
        AlertVisible,formCancel,topChoose,handleSizeChangeTop,
    };

    let chartsProps = {
        loading, list, total,bottomChoose,topChoose,inverted,share,aim,colorType,point,
        yonghuzhuceList,yonghudengluList,qidongcishuList,jinbizengjiaList,jinbixiaohaoList,tieziList,zidingyiTime,zidingyiTimeContent,XTime,
    };

    let chartsIntroProps = {
        formLoading,formVisible,formCancel,formVisible
    }

    return (
        <div>
           <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >

				{searchVisible ? [
                   <DataMgrSearch {...dataMgrSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>
            <DataMgrList {...dataMgrListProps} />
            <AlertModal {...alertModaltProps} />
            <ChartsIntro {...chartsIntroProps} />
            <br/>
            <Charts {...chartsProps} />

        </div>
  );
}

DataMgr.propTypes = {
  dataMgr: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ shanshanzaojiao }) {
  return { shanshanzaojiao };
}

export default connect(mapStateToProps)(DataMgr);
