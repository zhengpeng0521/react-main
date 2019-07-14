import React, { PropTypes } from 'react';
import { Modal, Button, message } from 'antd';
import style from './common.less';

const DIYButton = ({

  }) => {
    function handleClickOne(){
        message.success('按钮ONE');
    }
    function handleClickTwo(){
        message.success('按钮TWO');
    }
    return (
        <div className={style.all}>
            <div className={style.one} onClick={handleClickOne}>
                <div className={style.buttonOne}>
                    <span>按钮ONE</span>
                </div>
            </div>
            <br/><br/>
            <div className={style.two} onClick={handleClickTwo}>
                <div className={style.buttonTwo}>
                    <span>按钮TWO</span>
                </div>
            </div>
        </div>
    );
};

DIYButton.propTypes = {

};

export default DIYButton;
