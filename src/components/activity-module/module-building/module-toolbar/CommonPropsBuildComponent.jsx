import React, {PropTypes} from 'react';
import styles from './CommonPropsBuildComponent.less';
import {Button, Tabs, InputNumber, Slider, Icon, Upload, Radio, Collapse, Select,} from 'antd';
import ColorSelect from '../../../common/color-select/ColorSelect';
let TabPane = Tabs.TabPane;
let RadioGroup = Radio.Group;
let CollPanel = Collapse.Panel;
let Option = Select.Option;
/*
 * 公共显示属性的面板
 */
function CommonPropsBuildComponent({
    pageKey,activeItemKey,activeItem,propsType,updatePageItem,changePropType,children,orgSetComponent,
}) {
    let {
        item_key,type,x,y,width,height,scale,box_shadow,border_radius,opacity,
        action_type,action_speed,action_delay,action_count,background_color,background_img,
        border_width,border_style,border_color,
        padding_top,padding_bottom,padding_left,padding_right,
    } = activeItem;

    let animPanelProps = {
        pageKey,activeItemKey,activeItem,updatePageItem,
    };

    function changeOpacity(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {opacity: value});
    }
    function changeBorderRadius(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {border_radius: value});
    }
    function changeBoxShadow(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {box_shadow: value});
    }
    function changeScale(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {scale: value});
    }

    function changeWidth(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {width: value});
    }
    function changeHeight(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {height: value});
    }
    function changeX(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {x: value});
    }
    function changeY(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {y: value});
    }
    function changeBorderWidth(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {border_width: value});
    }
    function changeBorderStyle(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {border_style: value});
    }
    function changeBorderColor(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {border_color: value});
    }

    function changePaddingTop(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {padding_top: value});
    }

    function changePaddingBottom(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {padding_bottom: value});
    }

    function changePaddingLeft(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {padding_left: value});
    }

    function changePaddingRight(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {padding_right: value});
    }

    return (
        <div className={styles.iamge_build_bar_cont}>
            <Tabs activeKey={propsType} onChange={changePropType}>
                <TabPane tab="属性" key="base">
                    <div className={styles.base_props_cont}>
                        <div className={styles.base_common_props_cont}>
                            <Collapse defaultActiveKey={'4'}	>
                                <CollPanel header="基本属性" key="1">
                                    <div className={styles.base_common_props_item}>
                                        <div className={styles.prop_title}>透明</div>
                                        <Slider className={styles.props_slider} min={0} max={100} onChange={changeOpacity} value={opacity||0} />
                                        <div className={styles.prop_value}>
                                            <InputNumber
                                                min={0}
                                                max={100}
                                                style={{width: '100%'}}
                                                value={opacity||0}
                                                onChange={changeOpacity}
                                              />
                                        </div>
                                    </div>

                                    <div className={styles.base_common_props_item}>
                                        <div className={styles.prop_title}>阴影</div>
                                        <Slider className={styles.props_slider} min={0} max={100} onChange={changeBoxShadow} value={box_shadow||0} />
                                        <div className={styles.prop_value}>
                                            <InputNumber
                                                min={0}
                                                max={100}
                                                style={{width: '100%'}}
                                                value={box_shadow||0}
                                                onChange={changeBoxShadow}
                                              />
                                        </div>
                                    </div>

                                    <div className={styles.base_common_props_item}>
                                        <div className={styles.prop_title}>旋转</div>
                                        <Slider
                                            className={styles.props_slider}
                                            min={0} max={360}
                                            onChange={changeScale}
                                            value={scale||0}
                                            marks={{0: '0', 90: '90', 180: '180', 360: '360'}}
                                        />
                                        <div className={styles.prop_value}>
                                            <InputNumber
                                                min={0}
                                                max={360}
                                                style={{width: '100%'}}
                                                value={scale||0}
                                                onChange={changeScale}
                                              />
                                        </div>
                                    </div>
                                </CollPanel>

                                <CollPanel header="边框属性" key="2">

                                    <div className={styles.base_common_props_item}>
                                        <div className={styles.prop_title}>类型</div>

                                        <Select value={border_style||'none'} style={{ width: '100%' }} onChange={changeBorderStyle}>
                                          <Option value="none">无边框</Option>
                                          <Option value="solid">实线</Option>
                                          <Option value="dashed">虚线</Option>
                                          <Option value="dotted">点状</Option>
                                          <Option value="double">双线</Option>
                                          <Option value="groove">凹槽</Option>
                                          <Option value="ridge">垄状</Option>
                                          <Option value="inset">inset</Option>
                                          <Option value="outset">outset</Option>
                                        </Select>
                                    </div>

                                    <div className={styles.base_common_props_item}>
                                        <div className={styles.prop_title}>粗细</div>
                                        <Slider
                                            className={styles.props_slider}
                                            min={0} max={50} step={0.1}
                                            onChange={changeBorderWidth}
                                            value={border_width||0}
                                        />
                                        <div className={styles.prop_value}>
                                            <InputNumber
                                                min={0} max={50} step={0.1}
                                                style={{width: '100%'}}
                                                value={border_width||0}
                                                onChange={changeBorderWidth}
                                              />
                                        </div>
                                    </div>

                                    <div className={styles.base_common_props_item}>
                                        <div className={styles.prop_title}>圆角</div>
                                        <Slider className={styles.props_slider} min={0} max={100} onChange={changeBorderRadius} value={border_radius||0} />
                                        <div className={styles.prop_value}>
                                            <InputNumber
                                                min={0}
                                                max={100}
                                                style={{width: '100%'}}
                                                value={border_radius||0}
                                                onChange={changeBorderRadius}
                                              />
                                        </div>
                                    </div>

                                    <div className={styles.base_common_props_item}>
                                        <div className={styles.prop_title}>颜色</div>

                                        <ColorSelect
                                            width='100px' height='24px'
                                            value={border_color||'#FFF'}
                                            onChange={changeBorderColor}/>
                                    </div>

                                    <div className={styles.base_common_props_item}>
                                        <div className={styles.prop_title}>上间距</div>
                                        <div className={styles.prop_value}>
                                            <InputNumber
                                                min={0} step={0.1}
                                                style={{width: '100%'}}
                                                value={padding_top||0}
                                                onChange={changePaddingTop}
                                              />
                                        </div>
                                    </div>

                                     <div className={styles.base_common_props_item}>
                                        <div className={styles.prop_title}>下间距</div>
                                        <div className={styles.prop_value}>
                                            <InputNumber
                                                min={0} step={0.1}
                                                style={{width: '100%'}}
                                                value={padding_bottom||0}
                                                onChange={changePaddingBottom}
                                              />
                                        </div>
                                    </div>

                                    <div className={styles.base_common_props_item}>
                                        <div className={styles.prop_title}>右间距</div>
                                        <div className={styles.prop_value}>
                                            <InputNumber
                                                min={0} step={0.1}
                                                style={{width: '100%'}}
                                                value={padding_right||0}
                                                onChange={changePaddingRight}
                                              />
                                        </div>
                                    </div>

                                    <div className={styles.base_common_props_item}>
                                        <div className={styles.prop_title}>左间距</div>
                                        <div className={styles.prop_value}>
                                            <InputNumber
                                                min={0} step={0.1}
                                                style={{width: '100%'}}
                                                value={padding_left||0}
                                                onChange={changePaddingLeft}
                                              />
                                        </div>
                                    </div>
                                </CollPanel>

                                <CollPanel header="位置属性" key="3">
                                    <div className={styles.base_common_props_item}>
                                          <div className={styles.base_align_props_text}>对齐</div>
                                          <div className={styles.base_align_props_item}>
                                                <Icon
                                                   type="zuoduiqi1"
                                                   title='水平靠左'
                                                   style={(x==0?{color: '#000'} : {color: '#999'})}
                                                   className={styles.font_style_bar}
                                                   onClick={()=>updatePageItem(pageKey,activeItemKey,{x: 0})}
                                                />

                                                <Icon
                                                   type="shuipingjuzhong"
                                                   title='水平居中'
                                                   style={(x==(740-width)/2?{color: '#000'} : {color: '#999'})}
                                                   className={styles.font_style_bar}
                                                   onClick={()=>updatePageItem(pageKey,activeItemKey,{x:(740-width)/2})}
                                                />

                                                <Icon
                                                   type="youduiqi1"
                                                   title='水平靠右'
                                                   style={(x==740-width?{color: '#000'} : {color: '#999'})}
                                                   className={styles.font_style_bar}
                                                   onClick={()=>updatePageItem(pageKey,activeItemKey,{x: 740-width})}
                                                />
                                                <Icon
                                                    type="chuizhidingduiqi"
                                                    title='垂直顶部'
                                                   style={(y==0?{color: '#000'} : {color: '#999'})}
                                                   className={styles.font_style_bar}
                                                   onClick={()=>updatePageItem(pageKey,activeItemKey,{y: 0})}
                                                />
                                                <Icon
                                                    type="chuizhijuzhong"
                                                    title='垂直居中'
                                                   style={(y==(1320-height)/2?{color: '#000'} : {color: '#999'})}
                                                   className={styles.font_style_bar}
                                                   onClick={()=>updatePageItem(pageKey,activeItemKey,{y: (1320-height)/2})}
                                                />
                                                <Icon
                                                    type="chuizhididuiqi"
                                                    title='垂直底部'
                                                   style={(y==(1320-height)?{color: '#000'} : {color: '#999'})}
                                                   className={styles.font_style_bar}
                                                   onClick={()=>updatePageItem(pageKey,activeItemKey,{y:1320-height})}
                                                />
                                          </div>
                                    </div>
                                    <div className={styles.base_common_props_item}>
                                        <div className={styles.prop_title}>宽度</div>
                                        <div className={styles.prop_value}>
                                            <InputNumber
                                                min={0}
                                                style={{width: '100%'}}
                                                value={width||0}
                                                onChange={changeWidth}
                                              />
                                        </div>

                                        <div className={styles.prop_title}>高度</div>
                                        <div className={styles.prop_value}>
                                            <InputNumber
                                                min={0}
                                                style={{width: '100%'}}
                                                value={height||0}
                                                onChange={changeHeight}
                                              />
                                        </div>
                                    </div>

                                    <div className={styles.base_common_props_item}>
                                        <div className={styles.prop_title}>横向</div>
                                        <div className={styles.prop_value}>
                                            <InputNumber
                                                min={0}
                                                style={{width: '100%'}}
                                                value={x||0}
                                                onChange={changeX}
                                              />
                                        </div>

                                        <div className={styles.prop_title}>纵向</div>
                                        <div className={styles.prop_value}>
                                            <InputNumber
                                                min={0}
                                                style={{width: '100%'}}
                                                value={y||0}
                                                onChange={changeY}
                                              />
                                        </div>
                                    </div>

                                </CollPanel>

                                <CollPanel header="特有属性" key="4">
                                    <div className={styles.other_props_cont}>
                                        {children}
                                    </div>
                                </CollPanel>

                                <CollPanel header="机构设置" key="5">
                                    <div className={styles.other_props_cont}>
                                        {orgSetComponent}
                                    </div>
                                </CollPanel>
                            </Collapse>

                        </div>

                    </div>
                </TabPane>
                <TabPane tab="动作" key="anim"><AnimSelectPanelComponent {...animPanelProps} /></TabPane>
            </Tabs>
        </div>
    );
}


/*
 * 字体选择组件
 */
class FontSizeSelect extends React.Component {
    constructor(props) {
        super(props);

        // 设置 initial state
        this.state = {
           size: this.props.value || '1rem',
        };

        this.handleChangeValue = this.handleChangeValue.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.value != this.props.value) {
            this.setState({
                size: nextProps.value,
            });
        }
    }

    handleChangeValue(value) {
        this.setState({
            size: value,
        });
        this.props.onChange && this.props.onChange(value);
    }

    render() {

        let {size} = this.state;

        let {width,height,value,onChange,} = this.props;

        let fontSizeOpts = [];
        let minFontSize = 10;
        let maxFontSize = 95;

        for(let i = minFontSize; i < maxFontSize; i++) {
            fontSizeOpts.push(
                <Option key={'font_size_'+i} value={i+'px'}>{i+'px'}</Option>
            );
        }

        return (
            <div className={styles.size_select_cont}>
                <Select value={size} className={styles.size_select} onChange={this.handleChangeValue}>
                    {fontSizeOpts}
                </Select>
            </div>
        );
    }
}


/*
 * 动画选择面板
 */
function AnimSelectPanelComponent({
    pageKey,activeItemKey,activeItem,updatePageItem,
}) {

    let {action_type,action_speed,action_delay,action_count} = activeItem;

    function changeActionSpeed(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {action_speed: value});
    }

    function changeActionDelay(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {action_delay: value});
    }
	
	function changeActionCount(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {action_count: value.target.value});
    }

    function changeActionType(value) {
		
		let itemValue = {action_type: value};
		
        if(action_speed == undefined || action_speed == '') {
            itemValue.action_speed = 1;
        }
        if(action_delay == undefined || action_delay == '') {
            itemValue.action_delay = 0;
        }
		if(action_count == undefined || action_count == '') {
			itemValue.action_count = 1;
		}
        updatePageItem && updatePageItem(pageKey, activeItemKey, itemValue);

    }

    if(action_type == undefined || action_type == '') {
        action_type = 'none';
    }
	
    let animLib = [
        {label: '无动画', 			 	 icon: 'video-camera',	   key: 'none',},
        {label: '左侧淡入', 			icon: 'video-camera', 	  key: 'ani_left_fade_in_class',},
        {label: '右侧淡入', 			icon: 'video-camera',	  key: 'ani_right_fade_in_class',},
		{label: '左侧淡出', 			icon: 'video-camera',	  key: 'ani_left_fade_out',},
		{label: '右侧淡出',				icon: 'video-camera',	  key: 'ani_right_fade_out',},
		{label: '从上出现-短',	       icon: 'video-camera',	 key: 'ani_top_to_bottom',},
		{label: '从上出现-长',	       icon: 'video-camera',	 key: 'ani_top_to_bottom_long',},
		{label: '右向左全屏穿过',	   	  icon: 'video-camera',		key: 'ani_right_through',},
		{label: '左向右全屏穿过',	   	  icon: 'video-camera',		key: 'ani_left_through',},
		{label: '左右晃动',			 	icon: 'video-camera',	  key: 'ani_swing',},
		{label: '摆动后停止',			icon: 'video-camera',	  key: 'ani_swing_stop',},
		{label: '抖动',			  	  icon: 'video-camera',		key: 'ani_jitter',},
		{label: '上下不规则抖动',	   	  icon: 'video-camera',		 key: 'ani_top_bottom_jitter',},
		{label: '旋转出现',			 	icon: 'video-camera',	   key: 'ani_rotate_show',},
		{label: '固定中心点左右晃动',  	 icon: 'video-camera',		key: 'ani_fixed_center_swing',},
		{label: '持续变大缩小',	       icon: 'video-camera',	  key: 'ani_grow_continuous_change',},
		{label: '固定中心点左右晃动剧烈', icon: 'video-camera',	   key: 'ani_fixed_center_swing_severe',},
		{label: '逐渐变大(平缓)',		  icon: 'video-camera',		  key: 'ani_grow_big',},
		{label: '逐渐变大加抖动(弹性)',	icon: 'video-camera',		key: 'ani_grow_big_jitter',},
		{label: '逐渐变小',				icon: 'video-camera',	   key: 'ani_grow_small',},
		{label: '流星动画',				icon: 'video-camera',	   key: 'ani_shooting_star',},
		{label: '360°旋转',			 icon: 'video-camera',		key: 'ani_rotate360',},
		{label: '高空降落弹性跳动',		 icon: 'video-camera',		key: 'ani_landing',},
		{label: '上升消失',				icon: 'video-camera',	   key: 'ani_rising',},
		{label: '上下摆动',				icon: 'video-camera',	   key: 'ani_shaking',},
		{label: '上下跳动',				icon: 'video-camera',	   key: 'ani_beating',},
		{label: '左摆球',				 icon: 'video-camera',		key: 'ani_newton_l',},
		{label: '右摆球',				 icon: 'video-camera',		key: 'ani_newton_r',},
		{label: '上下摆动平缓',		   icon: 'video-camera',	  key: 'ani_shaking_gentle',},
		{label: '呼吸模式',		   		icon: 'video-camera',	  key: 'ani_breathing',},
		{label: '从下到上出现-端距离',	 icon: 'video-camera',	  key: 'ani_bottom_to_top',},
		{label: '从下到上出现-长距离',	 icon: 'video-camera',	  key: 'ani_bottom_to_top_long',},
		{label: '180°旋转',		   	  icon: 'video-camera',	  key: 'ani_rotate180',},
		{label: '90°旋转',		     icon: 'video-camera',	  key: 'ani_rotate90',},
		{label: '45°旋转',		      icon: 'video-camera',	  key: 'ani_rotate45',},
		{label: '360°反向旋转*',		icon: 'video-camera',	  key: 'ani_contrary_rotate360',},
		{label: '180°旋转',		     icon: 'video-camera',	  key: 'ani_contrary_rotate180',},
		{label: '90°旋转',		     icon: 'video-camera',	  key: 'ani_contrary_rotate90',},
		{label: '45°旋转',		     icon: 'video-camera',	  key: 'ani_contrary_rotate45',},
		{label: '下降消失',		   	    icon: 'video-camera',	  key: 'ani_falling',},
		{label: '刹车后移动(左侧进入)',		   icon: 'video-camera',	  key: 'ani_brake_sprint_left',},
		{label: '刹车后移动(右侧进入)',		   icon: 'video-camera',	  key: 'ani_brake_sprint_right',},
		{label: '刹车后移动(上侧进入)',		   icon: 'video-camera',	  key: 'ani_brake_sprint_top',},
		{label: '刹车后移动(下侧进入)',		   icon: 'video-camera',	  key: 'ani_brake_sprint_bottom',},

    ];
	
    return (
        <div className={styles.anim_select_panel}>
            <div className={styles.base_common_props_cont}>

                <div className={styles.anim_props_cont}>
                    <div className={styles.base_common_props_item}>
                        <div className={styles.prop_title}>速度(秒)</div>
                        <Slider className={styles.props_slider} min={0} max={10} step={0.1} onChange={changeActionSpeed} value={action_speed||0} />
                        <div className={styles.prop_value}>
                            <InputNumber
                                min={0}
                                max={100}
                                step={0.1}
                                style={{width: '100%'}}
                                value={action_speed||0}
                                onChange={changeActionSpeed}
                              />
                        </div>
                    </div>

                    <div className={styles.base_common_props_item}>
                        <div className={styles.prop_title}>延迟(秒)</div>
                        <Slider className={styles.props_slider} min={0} max={10} step={0.1} onChange={changeActionDelay} value={action_delay||0} />
                        <div className={styles.prop_value}>
                            <InputNumber
                                min={0}
                                max={100}
                                step={0.1}
                                style={{width: '100%'}}
                                value={action_delay||0}
                                onChange={changeActionDelay}
                              />
                        </div>
                    </div>
					 <div className={styles.base_common_props_item}>
                        <div className={styles.prop_title}>重复次数</div>
						<RadioGroup onChange={changeActionCount} value={action_count||1}>
							<Radio value={1}>重复一次</Radio>
							<Radio value={'infinite'}>无线重复</Radio>
						</RadioGroup>
                    </div>
                </div>

                <div className={styles.anim_type_cont}>

                   {animLib && animLib.map(function(animItem, animIndex) {
                        return (
                            <div
                              onClick={()=>changeActionType(animItem.key)}
                              key={'anim_type_item_'+animIndex}
                              className={styles.anim_type_item}>
                                <Icon type={animItem.icon}
                                    className={(action_type == animItem.key) ? styles.anim_type_icon_active : styles.anim_type_icon}/>
                                <span className={styles.anim_type_text}>{animItem.label}</span>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    );
}

export default CommonPropsBuildComponent;
