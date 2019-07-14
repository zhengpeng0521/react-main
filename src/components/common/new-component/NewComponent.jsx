/*
 * NewModal,           //左边划入框
 * StatusFlag,         //状态标志项
 * NewButton,          //新按钮
 * AlertModal,         //提示modal框
 * NullData,           //无数据页面
 * ProgressBarModal,   //进度条modal
 * ProgressBar,        //纯进度条
 * BlockTitle,         //带蓝色小块的标题
 * StatusLegend,       //状态图例
 * CollapseTree，      //折叠面板
*/

import React from 'react';
import { Button, Icon , Modal , Popover , Table , Pagination , Form , Collapse , Tree } from 'antd';
import newModalLess from './NewComponentLess/NewModal.less';
import statusFlag from './NewComponentLess/StatusFlag.less';
import newButton from './NewComponentLess/NewButton.less';
import alertModal from './NewComponentLess/AlertModal.less';
import nullData from './NewComponentLess/NullData.less';
import progressBar from './NewComponentLess/ProgressBar.less'
import progressBarModal from './NewComponentLess/ProgressBarModal.less';
import blockTitle from './NewComponentLess/BlockTitle.less';
import blockHelp from './NewComponentLess/BlockHelp.less';
import statusLegend from './NewComponentLess/StatusLegend.less';
import treeCommon from './NewComponentLess/TreeCommon.less';
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const TreeNode = Tree.TreeNode;

/*
 * 左边划入框
 * @author 赵健
 * children string/ReactNode 内容
 * title string 标题(默认'标题')
 * visible string 是否显示(默认false)
 * closable boolean 是否显示关闭X(默认false)
 * width string modal宽度(默认900)
 * onOk function 点击确认
 * onCancel function 点击取消
 * footer string/ReactNode foot内容(若没有footer属性，则自定生成默认footer;若不显示footer，则footer = '')
 * top string 距离浏览器上方距离(默认0)
 * bottom string 距离浏览器下方距离(默认0)
 * height string/number 高度(默认100%)
 */
export function NewModal({
    children,           //modal_content内容
    headVisible,        //modal的header是否显示
    title,              //modal的标题
    visible,            //modal是否显示
    closable,           //modal右上角是否显示关闭X
    onOk,               //modal点击确认
    onCancel,           //modal点击取消
    width,              //modal宽度(默认600)
    footer,             //modal_foot内容(若没有footer属性，则自定生成默认footer;若不显示footer，则footer = '')
    top,                //距离浏览器上方距离(默认0)
    bottom,             //距离浏览器下方距离(默认0)
    height,             //高度(默认100%)
}) {

    return(
        <div className='common_detail'>
            <div className={ visible ? newModalLess.all_page_right_enter_modal_open : newModalLess.all_page_right_enter_modal_close }
                 style={{ width : width || 902 , top : top || 50 , bottom : bottom || 0 , height : height || '100%' }}>
                { headVisible == false ? null :
                    <div className={newModalLess.page_right_enter_modal_header}>
                        <div className={newModalLess.page_right_enter_modal_header_title}>
                            { title || '标题' }
                        </div>
                        { closable ? <div className={newModalLess.page_right_enter_modal_header_close}>
                                        <Icon type="close" onClick={onCancel} className={newModalLess.page_right_enter_modal_header_close_x}/>
                                     </div> : null
                        }

                    </div>
                }
                <div className={newModalLess.page_right_enter_modal_content}
                    style={ headVisible == false && footer == '' ? { height : '100%' } :
                            headVisible && footer != '' ? { height : 'calc(100% - 100px)' } :
                            { height : 'calc(100% - 50px)' } }>
                    { children }
                </div>
                { footer == undefined ?
                    <div className={newModalLess.page_right_enter_modal_footer}>
                        <div className={newModalLess.page_right_enter_modal_footer_content}>
                            <Button key="cancel" type="ghost" onClick={onCancel}>关闭</Button>,
                            <Button key="submit" type="primary" onClick={onOk} style={{ marginLeft : 10 }}>确认</Button>
                        </div>
                    </div>
                  :
                  footer == '' ? null
                  :
                    <div className={newModalLess.page_right_enter_modal_footer}>
                        <div className={newModalLess.page_right_enter_modal_footer_content}>
                            { footer }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

/*
 * 状态标志项
 * @author 赵健
 * content string 文字内容优先级高
 * children string 文字内容优先级低
 * type string 类型('red','deep_red','gray','yellow','green','light_blue',和默认不填)
 * onClick function 点击事件
 * style object 自定义样式
 */
export function StatusFlag({
    className,
    children,
    content,
    type,
    onClick,
    style
}) {

    return(
        <div className = { statusFlag.status_flag } onClick = { onClick } style = { style }>
            <div className = { statusFlag.status_flag_point }
                style = {{ backgroundColor : type == 'red' ? '#ff7f75' :
                                          type == 'deep_red' ? '#cc4342' :
                                          type == 'gray' ? '#a9b4bc' :
                                          type == 'yellow' ? '#fcc047' :
                                          type == 'green' ? '#88c70a' :
                                          type == 'light_blue' ? '#7eb4f8' : '#5d9cec' }}></div>
            <div>{ content || children || undefined }</div>
        </div>
    );
}

/*
 * 新按钮
 * @author 赵健
 * children string 按钮中文字
 * type string 种类(默认rimary/ghost)
 * style object 自定义样式
 * onClick function 点击事件
 */
export function NewButton({
    children,
    type,
    style,
    onClick,
}) {
    return(
        <div className={ type == 'ghost' ? newButton.new_button_ghost : newButton.new_button_primary } style={style} onClick={onClick}>
            { children }
        </div>
    );
}

/*
 * 提示/二次确认弹窗
 * @author 赵健
 * content string 内容,优先级高
 * children string 内容,优先级低
 * title string 标题(默认'title')
 * maskClosable boolean 是否点击蒙层关闭(默认false)
 * visible string 是否显示(默认false)
 * closable boolean 是否显示关闭X(默认true)
 * width string modal宽度(默认400)
 * onOk function 点击确认
 * onCancel function 点击取消
 * buttonLoading boolean 确认按钮加载状态(默认false)
 * footerEnsure string/ReactNode 确认按钮文字(默认'确认')
 * footerCancel string/ReactNode 取消按钮文字(默认'取消')
 */
export function AlertModal({
    content,
    children,
    title,
    maskClosable,
    visible,
    closable,
    width,
    onOk,
    onCancel,
    buttonLoading,
    footerEnsure,
    footerCancel,
}) {
    return(
        <Modal
            title = { title || 'title' }
            maskClosable = { maskClosable || false }
            visible = { visible || false}
            closable = { closable || true }
            width = { width || 400 }
            onOk = { onOk }
            onCancel = { onCancel }
            footer = {[<Button key="onCancel" type="ghost" size='default' onClick={ onCancel } style={{ minWidth : 80 }}>{ footerCancel || '取消' }</Button>,
                       <Button
                            key="onOk" type="primary" onClick={ onOk } size='default'
                            disabled={ buttonLoading || false }
                            loading={ buttonLoading || false }
                            style={{ minWidth : 80 , marginLeft : 20  }}>{ footerEnsure || '确定' }</Button>]}
            className='common_alert_Modal'>
            { content || children || undefined }
        </Modal>
    );
}

/*
 * 无数据页面
 * @author 赵健
 * height string/number => ('200px',200) 高度 默认200 最小100
 * content string 无数据页面内容，优先级高
 * children string 无数据页面内容，优先级低
 */
export function NullData({
    height,
    width,
    content,
    children,
}) {
    return(
        <div className = { nullData.null_data } style={{ height : height || 200 , width : width || '100%' }}>
            <img src = 'https://img.ishanshan.com/gimg/img/0f4b3e548fb0edce54c578866babc7af' />
            <div>{ content || children || '暂时没有数据'}</div>
        </div>
    );
}

/*
 * 进度条弹窗
 * author 赵健
 * className object/string 自定义类名
 * visible boolean modal是否显示
 * type string 种类('move'/默认'fixed')
 * content string 进度条内文案(默认'Loading')，优先级高
 * children string 进度条内文案(默认'Loading')，优先级低
 * duration string 动画时间(默认4s)
 * timingFunction string 滑动速度曲线
 */
export function ProgressBarModal({
    className,
    visible,
    type,
    content,
    children,
    duration,
    timingFunction,
}) {
    let formatClassName = !!className ? ' ' + className : '';
    return(
        <Modal
            title = { null }
            maskClosable = { false }
            visible = { visible || false }
            closable = { false }
            width = { 550 }
            footer = { null }
            className = { 'zj_common_progress_bar_modal' + formatClassName }>
            <div
                className={type == 'move' ? progressBarModal.progress_move : progressBarModal.progress_fixed}
                data-content={ content || children || '加载中' }
                style = {{ animationDuration : duration || '4s' , animationTimingFunction : timingFunction || 'linear' }}></div>
        </Modal>
    );
}

/*
 * 纯进度条
 * author 赵健
 * type string 种类('move'/默认'fixed')
 * height string/number => ('200px',200) 高度 默认200
 * content string 进度条内文案(默认'Loading')，优先级高
 * children string 进度条内文案(默认'Loading')，优先级低
 * duration string 动画时间(默认5s)
 * timingFunction string 滑动速度曲线
 */
export function ProgressBar({
    type,
    height,
    content,
    children,
    duration,
    timingFunction,
}) {
    return(
        <div className = 'zj_common_progress_bar' style = {{ height : height || 200 }}>
            <div
                className={type == 'move' ? progressBar.progress_move : progressBar.progress_fixed}
                data-content={ content || children || '加载中' }
                style = {{ animationDuration : duration || '4s' , animationTimingFunction : timingFunction || 'linear' }}>
            </div>
        </div>
    );
}

/* 带蓝色小块的标题
 * author 赵健
 * content string/ReactDOM 标题内容(默认'标题内容')，优先级高
 * children string/ReactDOM 标题内容(默认'标题内容')，优先级低
 * popoverContent string/ReactDom 是否出现帮助悬浮
 * popoverTrigger string 帮助是鼠标悬浮显示还是点击显示(默认是'hover')
 * popoverPlacement string 帮助框悬浮位置(默认'right)
 * iconType string logo种类(默认是'question-circle-o')
 * className object/string 自定义类名
 * style object 样式
 */
export function BlockTitle({
    content,
    children,
    popoverContent,
    popoverTrigger,
    popoverPlacement,
    iconType,
    className,
    style
}) {
    let formatClassName = !!className ? ' ' + className : '';
    return(
        <div className = { 'common_block_title' + formatClassName } style = { style }>
            <div className = { blockTitle.title_block }></div>
            <div className = { blockTitle.title_content }>{ content || children }</div>
            { !!popoverContent ?
                <Popover
                    trigger = { popoverTrigger || 'hover' }
                    placement = { popoverPlacement || 'right' }
                    content = { popoverContent }
                >
                    <Icon type = { iconType || "question-circle-o" }/>
                </Popover>
                :
                null
            }
        </div>
    );
}

/* 蓝色背景icon
 * author 赵健
 * key string 如果放在数组中需要设定key值
 * content string/ReactDom popover内容,优先级高(默认'无内容')
 * children ReactDom popover内容,优先级低(默认'无内容')
 * popoverTrigger string 帮助是鼠标悬浮显示还是点击显示(默认是'hover')
 * popoverPlacement string 帮助框悬浮位置(默认'right)
 * iconType string logo种类(默认是'question-circle-o')
 * className object/string 自定义类名
 * style object 样式
 */
export function BlockHelp({
    content,
    children,
    popoverTrigger,
    popoverPlacement,
    iconType,
    className,
    style
}) {
    let formatClassName = !!className ? ' ' + className : '';
    return(
        <div className = { 'common_block_help' + formatClassName } style = { style }>
            <Popover
                trigger = { popoverTrigger || 'hover' }
                placement = { popoverPlacement || 'right' }
                content = { content || children || '无内容' }
            >
                <Icon type = { iconType || "question-circle-o" }/>
            </Popover>
        </div>
    );
}

/* icon状态图例
 * author 赵健
 * key string 如果放在数组中需要设定key值
 * content string/ReactDom 需要解释的内容,优先级高
 * children string/ReactDom 需要解释的内容,优先级低
 * className object/string 自定义类名
 * style object 样式
 * iconClassName object/string icon自定义类名
 * iconStyle object 图标样式
 */
export function StatusLegend({
    iconType,
    content,
    children,
    style,
    className,
    iconClassName,
    iconStyle
}) {
    let formatClassName = !!className ? ' ' + className : '';
    let formatIconClassName = !!iconClassName ? ' ' + iconClassName : '';
    return(
        <div className = { 'common_status_legend' + className } style = { style }>
            { !!iconType ? <Icon type = { iconType } style = { iconStyle } className = { 'common_status_legend_icon' + formatIconClassName }/> : null }
            { content || children || '' }
        </div>
    );
}

/* 折叠面板
 * author 赵健
 * className object/string 自定义类名
 * style object 自定义样式
 * limit number 层数限制
 */
export function TreeCommon({
    className,
    style,
    data,
    limit
}){

    if(!data){ return Modal.error({ title : '缺少data' }) };
    if(!limit){ return Modal.error({ title : '缺少limit' }) };

    let formatClassName = !!className ? ' ' + className : '';
    function mapCollapse(data,num){
        num++;
        if(num <= limit){
            return data.map((item,index) => {
                if (item.children && (item.children).length > 0) {
                    return (
                        <TreeNode
                            key = { item.id }
                            title = {
                                <div className = { (num === 1 ? treeCommon.first_tree : num === 2 ? treeCommon.second_tree : treeCommon.common_tree) + ' ' + treeCommon.tree_item }>
                                    <div className = { treeCommon.tree_name }>{ item.name }</div>
                                    <div className = { treeCommon.tree_operation }>
                                        { num < limit ? <a className = { treeCommon.tree_operation_item }>增加子节点</a> : null }
                                        <a className = { treeCommon.tree_operation_item }>编辑</a>
                                    </div>
                                </div> }
                            >
                            { mapCollapse(item.children,num) }
                        </TreeNode>
                    );
                }else{
                    return <TreeNode
                                key = { item.id }
                                title = {
                                <div className = { (num === 1 ? treeCommon.first_tree : num === 2 ? treeCommon.second_tree : treeCommon.common_tree) + ' ' + treeCommon.tree_item }>
                                    <div className = { treeCommon.tree_name }>{ item.name }</div>
                                    <div className = { treeCommon.tree_operation }>
                                        { num < limit ? <a className = { treeCommon.tree_operation_item }>增加子节点</a> : null }
                                        <a className = { treeCommon.tree_operation_item }>编辑</a>
                                    </div>
                                </div> }
                            />
                }
            });
        }
    }
    return (
        <div className = { 'zj_tree_common' + formatClassName } style = { style }>
            <Tree
                showLine
                defaultExpandAll = { true }>
                { mapCollapse(data,0) }
            </Tree>
        </div>
    )
}
