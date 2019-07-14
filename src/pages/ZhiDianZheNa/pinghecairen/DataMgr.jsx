import React, { PropTypes } from 'react';
import ConsultingList from '../../../components/ZhiDianZheNa/pinghecairen/ConsultingList';
import ConsultingModal from '../../../components/ZhiDianZheNa/pinghecairen/ConsultingModal';
import TestModal from '../../../components/ZhiDianZheNa/pinghecairen/TestModal';
import ButtonDesign from '../../../components/ZhiDianZheNa/pinghecairen/ButtonMaker';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';

function PingHeCaiRen({ dispatch, pinghecairen }) {

    let {
        divProps,            //固定div属性
    } = pinghecairen;


    let onMouseMove = function(event,obj){
        console.info('-----')
        console.info(event);
        /*let X = event.clientX - obj.offsetLeft;
        let Y = event.clientY - obj.offsetTop;
        divProps = { left : X , right : Y }*/
    }

    let consultingListProps = {
        divProps,            //固定div属性

        onMouseMove
    };

    return (
        <div>
            <ConsultingList {...consultingListProps} />
        </div>
  );
}

PingHeCaiRen.propTypes = {
  pinghecairen: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ pinghecairen }) {
  return { pinghecairen };
}

export default connect(mapStateToProps)(PingHeCaiRen);
