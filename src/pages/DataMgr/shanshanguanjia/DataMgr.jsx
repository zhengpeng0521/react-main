import React, { PropTypes } from 'react';
import DataMgrSearch from '../../../components/DataMgr/shanshanguanjia/DataMgrSearch';
import DataMgrList from '../../../components/DataMgr/shanshanguanjia/DataMgrList';
import AlertModal from '../../../components/DataMgr/shanshanguanjia/AlertModal';
import ChartsIntro from '../../../components/DataMgr/ChartsIntro';
import Charts from '../../../components/DataMgr/shanshanguanjia/Charts';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';



import styles from './DataMgr.less';

function DataMgr({ dispatch, shanshanguanjia }) {

    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, AlertVisible,formVisible,formType,                    //form表单数据
        searchData, searchVisible, searchChannelList,XTime,                   //search查询框数据
        topChoose,bottomChoose,inverted,share,aim,colorArray1,colorArray2,colorType,point,zidingyiTime,zidingyiTimeContent, //图表数据
        shanghuList,mendianList,shanghuzhanghaoList,shanghudengluList,  //表格数据
    } = shanshanguanjia;

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'shanshanguanjia/updateState',
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
            type:'shanshanguanjia/updateState',
            payload: {
                zidingyiTime:true,
                zidingyiTimeContent:data,
                topChoose:'',
            }
        });
        dispatch({
            type:'shanshanguanjia/SearchModalOne',
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
        let selectItem = shanshanguanjia.bottomChoose;
        dispatch({
            type:'shanshanguanjia/updateState',
            payload: {
                topChoose : selectDay,
                zidingyiTime : false,
                zidingyiTimeContent:'',
                AlertVisible : false,
            }
        });
        dispatch({
            type:'shanshanguanjia/SearchModalOne',
            payload: {
                selectDay,
            }
        });
    }

    //下方左边选择
    let handleSizeChangeBottomLeft = function(data){
        let value = data.target.value;
        let selectDay = shanshanguanjia.topChoose;
        let timeRange = shanshanguanjia.zidingyiTimeContent;
        let Type ;
        let rand = Math.random();//生成[0,1)随机数如果大于等于0.5，取colorArray1；反之取取colorArray2
        if(rand>0.6){
            Type = RandomArray(shanshanguanjia.colorArray1);
        }else if(rand>0.2){
            Type = RandomArray(shanshanguanjia.colorArray2);
        }else {
            Type = RandomArray(shanshanguanjia.colorType);
        }
        dispatch({
            type:'shanshanguanjia/updateState',
            payload: {
                bottomChoose : value,
                colorType : Type,
                topChoose : shanshanguanjia.topChoose,
            }
        });
    }

    //节点是否可点击
    let handleSizeChangeBottomPoint = function(data){
       if(shanshanguanjia.point=='1'){
            dispatch({
                type:'shanshanguanjia/updateState',
                payload: {
                    point : '',
                }
            });
        }else if(shanshanguanjia.point==''){
            dispatch({
                type:'shanshanguanjia/updateState',
                payload: {
                    point : '1',
                }
            });
        }
    }

    //X轴Y轴对调
    let handleSizeChangeBottomAxis = function(data){
        if(shanshanguanjia.inverted=='1'){
            dispatch({
                type:'shanshanguanjia/updateState',
                payload: {
                    inverted : '',
                }
            });
        }else if(shanshanguanjia.inverted==''){
            dispatch({
                type:'shanshanguanjia/updateState',
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
            type:'shanshanguanjia/updateState',
            payload: {
                share : value,
            }
        });
    }

    //十字准星
    let handleSizeChangeBottomAim = function(data){
        let value = data.target.value;
        dispatch({
            type:'shanshanguanjia/updateState',
            payload: {
                aim : value,
            }
        });
    }
    //打开说明框
    let chartsIntro = function(){
        dispatch({
            type:'shanshanguanjia/updateState',
            payload: {
                formVisible : true,
            }
        });
    }

    //关闭说明框
    let formCancel = function(){
        dispatch({
            type:'shanshanguanjia/updateState',
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
        shanghuList,mendianList,shanghuzhanghaoList,shanghudengluList,
    };

    let alertModaltProps = {
        AlertVisible,formCancel,topChoose,handleSizeChangeTop,
    };

    let chartsProps = {
        loading, list, total,bottomChoose,topChoose,inverted,share,aim,colorType,point,
        shanghuList,mendianList,shanghuzhanghaoList,shanghudengluList,zidingyiTime,zidingyiTimeContent,XTime,
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

function mapStateToProps({ shanshanguanjia }) {
  return { shanshanguanjia };
}

export default connect(mapStateToProps)(DataMgr);
