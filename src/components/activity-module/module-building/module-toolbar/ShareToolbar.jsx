import React, {PropTypes} from 'react';
import styles from './ToolBar.less';
import CommonPropsBuildComponent from './CommonPropsBuildComponent';
import {Button, Input, Icon, InputNumber, Select,} from 'antd';
import ImageBarUpdate from './imageComponent/ImageBarUpdate'
import MusicToolBar from './MusicToolBar';

const Option = Select.Option;
/*
 * 模板编辑工具栏-基本设置工具栏
 */
function ShareToolbar({
    pageKey, pageConfig, moduleProps, updateModuleProps, updatePageProps,
}) {

    let props = moduleProps.props || {};
    let share = props.share || {};

    function handleShareTitleChange(e) {
        let {target} = e;
        let value = target.value;
        let newShare = {...share, title: value};
        let new_props = {
            ...props,
            share: newShare,
        }
        updateModuleProps && updateModuleProps({props: new_props});
    }

    function changeShareTitleMaxWords(value) {
        let newShare = {...share, max_title_word: value};
        let new_props = {
            ...props,
            share: newShare,
        }
        updateModuleProps && updateModuleProps({props: new_props});
    }

    function handleShareIntroChange(e) {
        let {target} = e;
        let value = target.value;
        let newShare = {...share, intro: value};
        let new_props = {
            ...props,
            share: newShare,
        }
        updateModuleProps && updateModuleProps({props: new_props});
    }

    function changeShareIntroMaxWords(value) {
        let newShare = {...share, max_intro_word: value};
        let new_props = {
            ...props,
            share: newShare,
        }
        updateModuleProps && updateModuleProps({props: new_props});
    }

    function handleShareImgChange(img_url) {
        let newShare = {...share, img_url,};
        let new_props = {
            ...props,
            share: newShare,
        }
        updateModuleProps && updateModuleProps({props: new_props});
    }

    function handleModuleSwitchTypeChange(value) {
        updateModuleProps && updateModuleProps({switch_type: value});
    }

    function handleModuleSwitchDirChange(value) {
        updateModuleProps && updateModuleProps({switch_dir: value});
    }

    let commonProp = {pageKey, pageConfig, moduleProps, updateModuleProps, updatePageProps,}

    return (
        <div className={styles.toolbar_cont}>
            <div className={styles.add_iamge_bar_cont} >
                <div className={styles.bar_cont_title}>模板编辑工具栏-分享工具栏</div>
                <div className={styles.bar_content}>
                    <div className={styles.base_set_item}>
                        <div className={styles.base_set_item_title}>
                            分享配置
                        </div>

                        <div className={styles.bar_content_line} style={{padding: '5px'}}>
                             <div className={styles.prop_title}>分享标题</div>
                             <div className={styles.prop_value}>
                                <Input
                                    style={{width: '100%'}}
                                    value={share.title||''}
                                    onChange={handleShareTitleChange}
                                  />
                            </div>
                        </div>

                        <div className={styles.bar_content_line} style={{padding: '5px'}}>
                             <div className={styles.prop_title}>标题最大字数</div>
                             <div className={styles.prop_value}>
                                <InputNumber
                                    min={0}
                                    style={{width: '100%'}}
                                    value={share.max_title_word||0}
                                    onChange={changeShareTitleMaxWords}
                                  />
                            </div>
                        </div>

                        <div className={styles.bar_content_line} style={{padding: '5px'}}>
                             <div className={styles.prop_title}>分享简介</div>
                             <div className={styles.prop_value}>
                                <Input
                                    type="textarea"
                                    style={{width: '100%'}}
                                    value={share.intro||''}
                                    onChange={handleShareIntroChange}
                                  />
                            </div>
                        </div>

                        <div className={styles.bar_content_line} style={{padding: '5px'}}>
                             <div className={styles.prop_title}>简介最大字数</div>
                             <div className={styles.prop_value}>
                                <InputNumber
                                    min={0}
                                    style={{width: '100%'}}
                                    value={share.max_intro_word||0}
                                    onChange={changeShareIntroMaxWords}
                                  />
                            </div>
                        </div>

                        <div className={styles.bar_content_line} style={{padding: '5px'}}>
                             <div className={styles.prop_title}>分享图片</div>
                             <div className={styles.prop_value}>
                                <ImageBarUpdate imgurl={share.img_url} changeImage={handleShareImgChange}/>
                            </div>
                        </div>

                    </div>

                    <MusicToolBar {...commonProp}></MusicToolBar>

                    <div className={styles.base_set_item}>
                        <div className={styles.base_set_item_title}>
                            模板属性
                        </div>

                        <div className={styles.bar_content_line} style={{padding: '5px'}}>
                             <div className={styles.prop_title}>页面切换类型</div>
                             <div className={styles.prop_value}>
                                <Select
                                    value={moduleProps.switch_type}
                                    style={{ width: '100%' }}
                                    onChange={handleModuleSwitchTypeChange}>
                                    <Option value="type_1">位移</Option>
                                    <Option value="type_2">3D流</Option>
                                    <Option value="type_3">淡入</Option>
                                    <Option value="type_4">方块</Option>
                                    <Option value="type_5">翻转</Option>
                                </Select>
                            </div>
                        </div>

                        <div className={styles.bar_content_line} style={{padding: '5px'}}>
                             <div className={styles.prop_title}>页面切换方向</div>
                             <div className={styles.prop_value}>
                                <Select
                                    value={moduleProps.switch_dir||'vertical'}
                                    style={{ width: '100%' }}
                                    onChange={handleModuleSwitchDirChange}>
                                    <Option value="horizontal">横向</Option>
                                    <Option value="vertical">纵向</Option>
                                </Select>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default ShareToolbar;
