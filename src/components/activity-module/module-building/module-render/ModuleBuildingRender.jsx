import React, {PropTypes} from 'react';
import styles from './ModuleBuildingRender.less';
import animStyles from './anim-library/AnimLibrary.less';
import DragableItem from './dragable-item/DragableItem';
import {Icon, Button,} from 'antd';
import {moduleRenderParse} from '../../../../utils/micro-module/microModuleRenderUtil';
/*
 * 模板编辑渲染-按配置变量渲染预览界面
 */
function ModuleBuildingRender({
    moduleConfigData,pageKey, pageConfig, updatePageItem,
    itemClick,//在元素上点击
    activeItem, changeActiveItem,changeActivityItemProps,
}) {

    let items = (pageConfig && pageConfig.items) || [];
    let props = (pageConfig && pageConfig.props) || {};
    let bg_props = props.bg || {};
    let padding_props = props.padding || {};
    let page_type = moduleConfigData.page_type;

    let bgStyle = {};
    if(bg_props.bg_img && bg_props.bg_img.length > 0) {
        bgStyle.backgroundImage = 'url(' + bg_props.bg_img + ')';
        bgStyle.backgroundRepeat ='no-repeat';
        bgStyle.backgroundSize = '100% 100%';
    }

    if(bg_props.bg_color && bg_props.bg_color.length > 0) {
        bgStyle.backgroundColor = bg_props.bg_color;
    }

    //单页类型的微模板
    if(page_type && page_type == 'one') {
        bgStyle.overflowY = 'auto';
    } else {
        bgStyle.overflowY = 'hidden';
    }

    bgStyle.paddingBottom = (padding_props.padding_bottom || 0) + 'px';

    let me = this;

    return (
        <div
           className={styles.module_building_cont}
           style={bgStyle}
        >
            {items && items.map(function(item, index) {

                let sacle_value = 2.0;

                let dragItem = {
                    ...item,
                    x: item.x / sacle_value,
                    y: item.y / sacle_value,
                    width: item.width / sacle_value,
                    height: item.height / sacle_value,
                };

                if(item.border_width != undefined) {
                    dragItem.border_width = item.border_width / sacle_value;
                }

                if(item.padding_top != undefined) {
                    dragItem.padding_top = item.padding_top / sacle_value;
                }
                if(item.padding_right != undefined) {
                    dragItem.padding_right = item.padding_right / sacle_value;
                }
                if(item.padding_bottom != undefined) {
                    dragItem.padding_bottom = item.padding_bottom / sacle_value;
                }
                if(item.padding_left != undefined) {
                    dragItem.padding_left = item.padding_left / sacle_value;
                }

                if(item.border_radius != undefined) {
                    dragItem.border_radius = item.border_radius / sacle_value;
                }

                let font_size = item.font_size;
                if(font_size != undefined && font_size.length > 0) {
                    font_size = font_size + '';
                    let font_size_arr = font_size.split('px');
                    if(font_size_arr && font_size_arr.length > 0) {
                        let drag_font_size = parseFloat(font_size_arr[0]) / sacle_value;
                        dragItem.font_size = drag_font_size + 'px';
                    }
                }

                if(item.inputPublicSet != undefined) {
                    let inputPublicSet = JSON.parse(JSON.stringify(item.inputPublicSet));

                    let input_font_size = inputPublicSet.font_size;
                    if(input_font_size != undefined && input_font_size.length > 0) {
                        input_font_size = input_font_size + '';

                        let input_font_size_arr = input_font_size.split('px');
                        if(input_font_size_arr && input_font_size_arr.length > 0) {
                            let drag_input_font_size = parseFloat(input_font_size_arr[0]) / sacle_value;
                            inputPublicSet.font_size = drag_input_font_size + 'px';
                        }
                    }

                    dragItem.inputPublicSet = inputPublicSet;
                }

                if(item.buttonSet != undefined) {
                    let buttonSet = JSON.parse(JSON.stringify(item.buttonSet));

                    let input_font_size = buttonSet.font_size;
                    if(input_font_size != undefined && input_font_size.length > 0) {
                        input_font_size = input_font_size + '';

                        let input_font_size_arr = input_font_size.split('px');
                        if(input_font_size_arr && input_font_size_arr.length > 0) {
                            let drag_input_font_size = parseFloat(input_font_size_arr[0]) / sacle_value;
                            buttonSet.font_size = drag_input_font_size + 'px';
                        }
                    }

                    dragItem.buttonSet = buttonSet;
                }

                let dragProps = {
                    activiteDrag: dragItem.item_key == activeItem,
                    drag_key: dragItem.item_key,
                    itemX: dragItem.x,
                    itemY: dragItem.y,
                    itemWidth: dragItem.width,
                    itemHeight: dragItem.height,
                    scale: dragItem.scale||0,
                    changeDragData: (dragData, itemKey) => {         //更改拖拽对象  元素点击时触发
                        changeActiveItem && changeActiveItem(itemKey)
                    },
                    changeProps: (itemValue)=>{       //更改拖拽对象的属性
                        updatePageItem && updatePageItem(pageKey, dragItem.item_key, itemValue);
                    },
                    changeActivityItemProps: (itemValue)=> {
                        changeActivityItemProps && changeActivityItemProps(itemValue);
                    },
                    itemClick,
                };

                return (
                    <DragableItem {...dragProps} key={dragItem.item_key}>
                        {moduleRenderParse('1', dragItem)}
                    </DragableItem>
                )
            })}
        </div>
    );
}

export default ModuleBuildingRender;
