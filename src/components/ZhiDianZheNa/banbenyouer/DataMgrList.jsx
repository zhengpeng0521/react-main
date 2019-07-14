import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon, Radio } from 'antd';
import styles from './DataMgr.less';

function DataMgrList({
    loading, list, total,
    handleSizeChangeTop,handleSizeChangeBottomLeft,handleSizeChangeBottomAxis,handleSizeChangeBottomAim,handleSizeChangeAll,chartsIntro,handleSizeChangeBottomPoint,
    bottomChoose,aim,share,inverted,point,topChoose,PasswordFormVisible,OpenContent
  }) {


    if(true==OpenContent){
        return (
            <div>
                <br/>
                <div style={{position:'relative',width:'100%',height:'40px',border:'1px solid #666666',borderRadius:'5px'}}>
                    <div style={{position:'relative',width:'80%',height:'20px',top:'10px',left:'10px'}}>
                        总收入:<strong>￥10000000</strong>
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
