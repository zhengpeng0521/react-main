import React, { PropTypes } from 'react';
import DataMgrSearch from '../../../components/DataMgr/yuyueshiting/DataMgrSearch';
import DataMgrList from '../../../components/DataMgr/yuyueshiting/DataMgrList';
import AlertModal from '../../../components/DataMgr/yuyueshiting/AlertModal';
import ChartsIntro from '../../../components/DataMgr/ChartsIntro';
import Charts from '../../../components/DataMgr/yuyueshiting/Charts';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';



import styles from './DataMgr.less';

function DataMgr({ dispatch, yuyueshiting }) {

    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formVisible,formType,AlertVisible,                    //form表单数据
        searchData, searchVisible, searchChannelList,                   //search查询框数据
        topChoose,bottomChoose,inverted,share,aim,colorArray1,colorArray2,colorType,point,zidingyiTime,zidingyiTimeContent,dinggoumendianList,yuyueshuList,yuyuemendianList,XTime //图表数据
    } = yuyueshiting;
    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'yuyueshiting/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'yuyueshiting/query',
            payload: {
                pageIndex,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(data) {
        dispatch({
            type:'yuyueshiting/updateState',
            payload: {
                zidingyiTime:true,
                zidingyiTimeContent:data,
                topChoose:'',
            }
        });
        dispatch({
            type:'yuyueshiting/SearchModalOne',
            payload: {
                ...data,
            }
        });
    };

    //生成冒泡排序随机数，在sort参数中如果传入的参数是0，两个数位置不变。如果参数小于0，就交换位置，如果参数大于0就不交换位置
    let RandomArray = function(array){
        return array.sort(function(){return 0.35 - Math.random()});
    };

    //上方选择
    let handleSizeChangeTop = function(data){
        let selectDay = data.target.value;
        let selectItem = yuyueshiting.bottomChoose;
        dispatch({
            type:'yuyueshiting/updateState',
            payload: {
                topChoose : selectDay,
                zidingyiTime : false,
                zidingyiTimeContent:'',
                AlertVisible : false,
            }
        });
        dispatch({
            type:'yuyueshiting/SearchModalOne',
            payload: {
                selectDay,
            }
        });
    }

    //下方左边选择
    let handleSizeChangeBottomLeft = function(data){
        let value = data.target.value;
        let selectDay = yuyueshiting.topChoose;
        let timeRange = yuyueshiting.zidingyiTimeContent;
        let Type ;
        let rand = Math.random();//生成[0,1)随机数如果大于等于0.5，取colorArray1；反之取取colorArray2
        if(rand>0.6){
            Type = RandomArray(yuyueshiting.colorArray1);
        }else if(rand>0.2){
            Type = RandomArray(yuyueshiting.colorArray2);
        }else {
            Type = RandomArray(yuyueshiting.colorType);
        }
        dispatch({
            type:'yuyueshiting/updateState',
            payload: {
                bottomChoose : value,
                colorType : Type,
                topChoose : yuyueshiting.topChoose,
            }
        });
    }

    //节点是否可点击
    let handleSizeChangeBottomPoint = function(data){
       if(yuyueshiting.point=='1'){
            dispatch({
                type:'yuyueshiting/updateState',
                payload: {
                    point : '',
                }
            });
        }else if(yuyueshiting.point==''){
            dispatch({
                type:'yuyueshiting/updateState',
                payload: {
                    point : '1',
                }
            });
        }
    }

    //X轴Y轴对调
    let handleSizeChangeBottomAxis = function(data){
        if(yuyueshiting.inverted=='1'){
            dispatch({
                type:'yuyueshiting/updateState',
                payload: {
                    inverted : '',
                }
            });
        }else if(yuyueshiting.inverted==''){
            dispatch({
                type:'yuyueshiting/updateState',
                payload: {
                    inverted : '1',
                }
            });
        }
    }
    //选择鼠标悬停节点显示自身或者全部
    let handleSizeChangeAll = function(data){
        let value = data.target.value;
        dispatch({
            type:'yuyueshiting/updateState',
            payload: {
                share : value,
            }
        });
    }
    //十字准星
    let handleSizeChangeBottomAim = function(data){
        let value = data.target.value;
        dispatch({
            type:'yuyueshiting/updateState',
            payload: {
                aim : value,
            }
        });
    }
    //打开说明框
    let chartsIntro = function(){
        dispatch({
            type:'yuyueshiting/updateState',
            payload: {
                formVisible : true,
            }
        });
    }

    //关闭说明框
    let formCancel = function(){
        dispatch({
            type:'yuyueshiting/updateState',
            payload: {
                formVisible : false,
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
        bottomChoose,share,aim,inverted,point,topChoose,dinggoumendianList,yuyueshuList,yuyuemendianList
    };

    let chartsProps = {
        loading, list, total,bottomChoose,topChoose,inverted,share,aim,colorType,point,
        dinggoumendianList,yuyueshuList,yuyuemendianList,XTime,zidingyiTime,zidingyiTimeContent,
    };

    let alertModaltProps = {
        AlertVisible,formCancel,topChoose,handleSizeChangeTop,
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

function mapStateToProps({ yuyueshiting }) {
  return { yuyueshiting };
}

export default connect(mapStateToProps)(DataMgr);
