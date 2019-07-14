import React, {PropTypes} from 'react';
import styles from './ModuleToolBar.less';
import {Tabs, Icon, Tooltip, } from 'antd';

import BaseToolbar from './BaseToolbar';
import TextToolbar from './TextToolbar';
import ImageToolbar from './ImageToolbar';
import ButtonToolbar from './ButtonToolbar';
import FormTopolbar from './FormTopolbar';
import ArrayToolbar from './ArrayToolbar';
import ShareToolbar from './ShareToolbar';

const TabPane = Tabs.TabPane;

/*
 * 模板编辑- 工具栏
 */
class ModuleToolBar extends React.Component {
    constructor(props) {
        super(props);

        // 设置 initial state
        this.state = {
           toolType : 'base',//当前选中的工具栏类型
           propsType: 'base',//操作属性类型  base / anim
        };

        this.handleChangeToolType = this.handleChangeToolType.bind(this);
        this.changePropType = this.changePropType.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let new_activeItemKey = nextProps.activeItemKey;
        let old_activeItemKey = this.props.activeItemKey;

        if(new_activeItemKey != old_activeItemKey && new_activeItemKey != '') {
            let items = nextProps.pageConfig && nextProps.pageConfig.items;
            let activeItem = {};

            items && items.map(function(iitem, iindex) {
                if(iitem.item_key == new_activeItemKey) {
                    activeItem = iitem;
                }
            });

            if(activeItem && activeItem.type && activeItem.type != '' ) {
                this.setState({
                    toolType: activeItem.type,
                    propsType: 'base',
                });
            }
        } else if(new_activeItemKey == '') {
            this.setState({
                    toolType: 'base',
                    propsType: 'base',
                });
        }
    }

    handleChangeToolType(toolType) {
        this.setState({
            toolType,propsType: 'base',
        });
        this.props.changeActiveItem && this.props.changeActiveItem(undefined);
    }

    changePropType(value) {
        this.setState({
            propsType: value
        });
    }

    render() {

        let {toolType,propsType} = this.state;

        let {pageKey,pageConfig,updatePageItem,activeItemKey, moduleProps, updateModuleProps, updatePageProps,moduleConfigData} = this.props;

        let items = pageConfig && pageConfig.items;
        let activeItem = {};

        items && items.map(function(iitem, iindex) {
            if(iitem.item_key == activeItemKey) {
                activeItem = iitem;
            }
        });

        let barProps = {
            pageKey,activeItemKey,activeItem,updatePageItem,propsType,changePropType: this.changePropType,moduleConfigData
        };

        let baseProps = {
            pageKey, pageConfig, moduleProps, updateModuleProps, updatePageProps,
        };

        let baseBarTitle = (<span style={{fontSize: 18}}><Tooltip title="背景" placement="left"><Icon type="tablet" /></Tooltip></span>);//文本工具栏标题
        let textBarTitle = (<span style={{fontSize: 18}}><Tooltip title="文本" placement="left"><Icon type="file-text" /></Tooltip></span>);//文本工具栏标题
        let imgBarTitle = (<span style={{fontSize: 18}}><Tooltip title="图片" placement="left"><Icon type="picture" /></Tooltip></span>);//图片工具栏标题
        let buttonBarTitle = (<span style={{fontSize: 18}}><Tooltip title="按钮" placement="left"><Icon type="laptop" /></Tooltip></span>);//按钮工具栏标题
        let otherBarTitle = (<span style={{fontSize: 18}}><Tooltip title="表单" placement="left"><Icon type="gift" /></Tooltip></span>);//图片工具栏标题
        let arrayBarTitle = (<span style={{fontSize: 18}}><Tooltip title="数组" placement="left"><Icon type="bars" /></Tooltip></span>);//数组工具栏标题
        let shareBarTitle = (<span style={{fontSize: 18}}><Tooltip title="属性" placement="left"><Icon type="share-alt" /></Tooltip></span>);//图片工具栏标题

        let module_tool_bar_style = {
            height: 'calc(100vh - 200px)',
            overflowY: 'auto',
            paddingRight: '5px',
        };

        return (
            <div className={styles.module_tool_bar_cont} style={module_tool_bar_style}>
                <Tabs
                   activeKey={toolType}
                   onChange={this.handleChangeToolType}
                   tabPosition="left"
               >
                    <TabPane tab={baseBarTitle} key="base"    >                 <BaseToolbar   {...baseProps}  /></TabPane>
                    <TabPane tab={textBarTitle} key="text"    >                 <TextToolbar   {...barProps}  /></TabPane>
                    <TabPane tab={imgBarTitle} key="image"    >                 <ImageToolbar  {...barProps}  /></TabPane>
                    <TabPane tab={buttonBarTitle} key="button">                 <ButtonToolbar {...barProps}  /></TabPane>
                    <TabPane tab={otherBarTitle} key="other"  >                 <FormTopolbar {...barProps}  /></TabPane>
                    <TabPane tab={arrayBarTitle} key="array"  >                 <ArrayToolbar {...barProps}  /></TabPane>
                    <TabPane tab={shareBarTitle} key="share"  >                 <ShareToolbar {...baseProps}  /></TabPane>
                </Tabs>
            </div>
        );
    }
}

export default ModuleToolBar;
