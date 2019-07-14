import React, {PropTypes} from 'react';
import styles from './ToolBar.less';
import {Button, Tabs, Upload, Icon, Popover, Select, Input, Checkbox, InputNumber,Slider} from 'antd';
import CommonPropsBuildComponent from './CommonPropsBuildComponent';
import ColorSelect from '../../../common/color-select/ColorSelect';
import FontFamilySelect from '../../../common/font-family-select/FontFamilySelect';
import ImageBarUpdate from './imageComponent/ImageBarUpdate'

const TabPane = Tabs.TabPane;
const Option = Select.Option;

function ArrayToolbar({
    pageKey,activeItemKey,activeItem,propsType,updatePageItem,changePropType,
}) {

    let propsComponent = {pageKey,activeItemKey,activeItem,propsType,updatePageItem,changePropType,};

    return (
        <div className={styles.toolbar_cont}>
           {(activeItemKey == undefined || activeItemKey == '') ?
            <div className={styles.add_iamge_bar_cont}>
                <div className={styles.bar_cont_title}>模板编辑工具栏-数组工具栏</div>
                <div>正在开发中...</div>
            </div>
            :
            <CommonPropsBuildComponent {...propsComponent} >
                <div className={styles.text_bar_content}>


                </div>
            </CommonPropsBuildComponent>
           }

        </div>
    );
}

export default ArrayToolbar;
