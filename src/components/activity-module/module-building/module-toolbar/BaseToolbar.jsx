import React, {PropTypes} from 'react';
import styles from './ToolBar.less';
import {Input, Icon, Radio, Select, InputNumber, Upload, Slider,} from 'antd';
import ColorSelect from '../../../common/color-select/ColorSelect';
import ImageBarUpdate from './imageComponent/ImageBarUpdate';

const RadioGroup = Radio.Group;
const Option = Select.Option;

/*
 * 模板编辑工具栏-基本设置工具栏
 */
function BaseToolbar({
    pageKey, pageConfig, moduleProps, updateModuleProps, updatePageProps,
}) {

    let share = moduleProps.share || {};

    let props = pageConfig.props || {};
    let bg = props.bg || {};

    let padding = props.padding || {};
    let padding_bottom = (padding && padding.padding_bottom) || 0;

    function handleModuleNameChange(e) {
        let {target} = e;
        let value = target.value;
        updateModuleProps && updateModuleProps({name: value});
    }

    function handleModuleTypeChange(e) {
        let {target} = e;
        let value = target.value;
        updateModuleProps && updateModuleProps({type: value});
    }

    function handleShareTitleChange(e) {
        let {target} = e;
        let value = target.value;
        let newShare = {...share, title: value};
        updateModuleProps && updateModuleProps({share: newShare});
    }

    function changeShareTitleMaxWords(value) {
        let newShare = {...share, max_title_word: value};
        updateModuleProps && updateModuleProps({share: newShare});
    }

    function handleShareIntroChange(e) {
        let {target} = e;
        let value = target.value;
        let newShare = {...share, intro: value};
        updateModuleProps && updateModuleProps({share: newShare});
    }

    function changeShareIntroMaxWords(value) {
        let newShare = {...share, max_title_word: value};
        updateModuleProps && updateModuleProps({share: newShare});
    }

    function handleShareImgChange(img_url) {
        let newShare = {...share, img_url,};
        updateModuleProps && updateModuleProps({share: newShare});
    }

    function handleBgColorChange(color) {
        let new_bg = {...bg, bg_color: color};
        updatePageProps && updatePageProps(pageKey, {bg: new_bg});
    }

    function handleBgImageChange(img_url) {
        let new_bg = {...bg, bg_img: img_url};
        updatePageProps && updatePageProps(pageKey, {bg: new_bg});
    }
    let commonProp = {pageKey, pageConfig, moduleProps, updateModuleProps, updatePageProps,}
    return (
        <div className={styles.toolbar_cont}>
            模板编辑工具栏-基本设置工具栏

            <div className={styles.base_set_item}>
                <div className={styles.base_set_item_title}>
                    页面背景
                </div>

                <div className={styles.bar_content_line} style={{padding: '5px'}}>
                     <div className={styles.prop_title}>背景色</div>
                     <div className={styles.prop_value}>
                        <ColorSelect
                            width='100px' height='24px'
                            value={bg.bg_color||'#FFF'}
                            onChange={handleBgColorChange}/>
                    </div>
                </div>

                <div className={styles.bar_content_line} style={{padding: '5px'}}>
                     <div className={styles.prop_title}>背景图片</div>
                     <div className={styles.prop_value}>
                        <ImageBarUpdate imgurl={bg.bg_img} changeImage={handleBgImageChange}/>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default BaseToolbar;
