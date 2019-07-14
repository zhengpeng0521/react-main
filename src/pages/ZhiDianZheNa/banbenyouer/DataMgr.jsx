import React, { PropTypes } from 'react';
import { message } from 'antd';
import DataMgrSearch from '../../../components/ZhiDianZheNa/banbenyouer/DataMgrSearch';
import DataMgrList from '../../../components/ZhiDianZheNa/banbenyouer/DataMgrList';
import ChartsIntro from '../../../components/ZhiDianZheNa/banbenyouer/ChartsIntro';
import Charts from '../../../components/ZhiDianZheNa/banbenyouer/Charts';
import PassWord from '../../../components/ZhiDianZheNa/banbenyouer/Password';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';



import styles from './DataMgr.less';

function BanBenYouEr({ dispatch, banbenyouer }) {

    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formVisible,formType,                    //form表单数据
        searchData, searchVisible, searchChannelList, PasswordFormVisible, OpenContent,                 //search查询框数据
        topChoose,bottomChoose,inverted,share,aim,colorArray1,colorArray2,colorType,point,Xdata,zidingyiTime,zidingyiTimeContent, //图表数据
        activeIndex,
    } = banbenyouer;
    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'banbenyouer/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'banbenyouer/query',
            payload: {
                pageIndex,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'banbenyouer/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'banbenyouer/query',
            payload: {
                ...searchData,
            },
        });
    };

    //打开说明框
    let chartsIntro = function(){
        dispatch({
            type:'banbenyouer/updateState',
            payload: {
                formVisible : true,
            }
        });
    }

    //关闭说明框
    let formCancel = function(){
        dispatch({
            type:'banbenyouer/updateState',
            payload: {
                PasswordFormVisible : false,
                OpenContent: false,
            }
        });
    }

    let PassWordSubmit = function(data){
        if('123456'==data.userName&&'123456'==data.password){
            dispatch({
                type:'banbenyouer/updateState',
                payload:{
                    PasswordFormVisible:false,
                    OpenContent: true,
                }
            });
        }else{
            message.error('账号或密码不正确');
        }
    }

    let changeIndex = function(data, index){
        dispatch({
            type:'banbenyouer/updateState',
            payload: {
                activeIndex : index,
            }
        });
    }

    let handleOpenModal = function(){
        message.success('打开弹窗');
    }

    let dataMgrSearchProps = {
        searchData, searchVisible,searchChannelList,PasswordFormVisible,OpenContent,
        searchReset,
        searchSubmit,
        handleOpenModal,
    };


    let dataMgrListProps = {
        loading, list, total,
        bottomChoose,share,aim,inverted,point,topChoose,PasswordFormVisible,OpenContent
    };

    let chartsProps = {
        loading, list, total,bottomChoose,topChoose,inverted,share,aim,colorType,point,Xdata,activeIndex,changeIndex,PasswordFormVisible,OpenContent
    };

    let chartsIntroProps = {
        formLoading,formVisible,formCancel,formVisible
    }

    let passwordProps = {
        formLoading, PasswordFormVisible,PassWordSubmit,formCancel,
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
            <ChartsIntro {...chartsIntroProps} />
            <Charts {...chartsProps} />
            <PassWord {...passwordProps} />
        </div>
  );
}

BanBenYouEr.propTypes = {
  banbenyouer: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ banbenyouer }) {
  return { banbenyouer };
}

export default connect(mapStateToProps)(BanBenYouEr);
