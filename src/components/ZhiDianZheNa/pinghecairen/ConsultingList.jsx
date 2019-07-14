import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import styles from './Cousulting.less';

function ConsultingList({
    divProps,            //固定div属性

    onMouseMove
}) {

    return (
		<div id="canvas" onMouseMove='onMouseMove(event,this)' className={styles.canvas}>
			<div className={styles.div1} style={{ left : divProps.left , right : divProps.right }}></div>
      		<div className={styles.div2} style={{ left : divProps.left ? divProps.left : null , right : divProps.right ? divProps.right : null }}></div>
		</div>
    );
}

export default ConsultingList;
