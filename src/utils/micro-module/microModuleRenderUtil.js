import React from 'react';
import animStyles from './anim-library/AnimLibrary.less';
import styles from './microModuleRenderUtil.less';
import Icon from 'antd/lib/icon';
import FormRender from './FormRender';

/*
 *	自定义模板的预览页面解析规则
 * @params renderType 渲染场景
 * @params dateItem 元素数据
 *      1: 模板编辑时的预览
 *      2: 左侧预览区域
 *      3: 机构端设置的手机预览，添加的鼠标悬浮显示效果和点击事件
 *      4: H5端渲染
 */
export function moduleRenderParse(renderType, dateItem, dataIndex) {

	let opacityValue = 1.0 * (100 - (dateItem.opacity || 0)) / 100;
    let action_type = dateItem.action_type || '';

    let animationDuration = ((dateItem.action_speed || 0) * 1000) + 'ms';
    let animationDelay = ((dateItem.action_delay || 0) * 1000) + 'ms';
    let animationIterationCount = dateItem.action_count || 1;

    let border_style = dateItem.border_style || 'none';
    let border_width = dateItem.border_width|| 0;
    let border_color = dateItem.border_color|| '#FFF';

    let paddingTop = dateItem.padding_top || 0;
    let paddingBottom = dateItem.padding_bottom || 0;
    let paddingLeft = dateItem.padding_left || 0;
    let paddingRight = dateItem.padding_right || 0;

    let baseStyles = {
        width: '100%', height: '100%',display: 'table',
        animationDuration, animationDelay, animationIterationCount,
    };

    let wrapProps={
        left: dateItem.x+'px',
        top: dateItem.y+'px',
        width: dateItem.width+'px',
        height: dateItem.height+'px',
    };

    let render_show_build_cont = undefined;

    if(renderType != '1') {
        wrapProps.position = 'absolute';
        wrapProps.transformOrigin = 'center center 0px';
        wrapProps.transform = 'rotate('+dateItem.scale+'deg)';
    }

    //是否允许机构编辑元素
    if(renderType == '3' && dateItem.org_set) {
        let render_show_build_title = '';
        if(dateItem.type == 'text') {
            render_show_build_title = '文本设置';
        } else if(dateItem.type == 'image') {
            render_show_build_title = '图片设置';
        } else if(dateItem.type == 'button') {
            render_show_build_title = '按钮设置';
        } else {
            render_show_build_title = '元素设置';
        }
        render_show_build_cont = (
            <div className={dateItem.isActivity ? styles.render_show_build_cont_activity : styles.render_show_build_cont} onClick={()=> dateItem.onClick && dateItem.onClick(dateItem.item_key)}>
                <div className={styles.render_show_build_title}>{render_show_build_title}</div>
            </div>
        );
    }

    let setProps={
        key:dateItem.item_key + '_' + dataIndex,
        style:{...wrapProps},
        className: styles.position_cont,
    }

    let commonProps = {
        key: dateItem.item_key,
        style: {...baseStyles},
        className: animStyles[action_type],
    };

    let componentProps = {
        borderRadius: dateItem.border_radius + 'px',
        border: border_width + 'px ' + border_style + ' ' + border_color,
        boxShadow: '#000 0px 0px '+dateItem.box_shadow+'px',
        width: '100%',
        height: '100%',
        opacity: opacityValue,
        paddingTop,paddingBottom,paddingLeft,paddingRight,
    };

    if(dateItem.background_img && dateItem.background_img.length > 0) {
        componentProps.backgroundImage = 'url(' + dateItem.background_img + ')';
        componentProps.backgroundRepeat ='no-repeat'
        componentProps.backgroundSize = '100% 100%';
    }

    if(dateItem.background_color && dateItem.background_color.length > 0) {
        componentProps.backgroundColor = dateItem.background_color;
    }

    if(dateItem.type == 'text') {

        let textStyle = {};

        let writing_mode_class = '';

        if(dateItem.text_dir) {
            textStyle.float = 'left';
            textStyle.margin = '0';
            textStyle.boxSizing = 'border-box';

            if(dateItem.text_dir_value == 'right') {
                textStyle.writingMode = 'vertical-rl';
                writing_mode_class = styles.writing_mode_class_rl;
            } else {
                textStyle.writingMode = 'vertical-lr';
                writing_mode_class = styles.writing_mode_class_lr;
            }
        }

        return (
            <div {...setProps}>
                {render_show_build_cont}
                <div {...commonProps}>
                    <pre className={writing_mode_class}
                        style={{
                            ...componentProps,
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            fontSize: dateItem.font_size,
                            lineHeight: dateItem.line_height,
                            color: dateItem.font_color,
                            fontFamily: dateItem.font_family || '思源黑体',
                            fontWeight: dateItem.font_weight || 'normal',
                            fontStyle: dateItem.font_style || 'normal',
                            textDecoration: dateItem.text_decoration || 'normal',
                            textAlign: dateItem.text_align || 'center',
                            textShadow: dateItem.text_shadow,
                            verticalAlign: dateItem.vertical_align || 'middle',
                            display: 'table-cell',
                            letterSpacing: (dateItem.letter_spacing || 1) + 'px',
                            ...textStyle
                        }} >{dateItem.text_content}</pre>
                    </div>
            </div>
        );
    } else if(dateItem.type == 'image') {
        let img_border_radius = dateItem.img_border_radius || 0;

        let border_radius_value = '0';//图片类型的实际圆角
        if(img_border_radius > 0) {
            border_radius_value = img_border_radius + '%';
        } else {
            border_radius_value = (dateItem.border_radius || 0) + 'px';
        }
        return (
            <div {...setProps}>
                {render_show_build_cont}
                <div {...commonProps} >
                        <img src={dateItem.img_url}
                        style={{
                            ...componentProps,
                            borderRadius: border_radius_value,
                         }} />
                </div>
            </div>
        );
    } else if(dateItem.type=='button'){

        let button_href = '';
        if(dateItem.btn_type=="phone") {
            button_href = "tel:" + dateItem.phone_link_href;
        } else if(dateItem.btn_type=="link") {
            button_href = dateItem.link_href;
        } else {
            button_href = "javascript:void(0);";
        }

        let btn_icon_style = {
            marginRight: '10px',
            fontSize: dateItem.btn_size,
        };

        return (
           <div {...setProps}>
                {render_show_build_cont}
                <div {...commonProps} >
                    <a  href={renderType == '4' ? button_href : 'javascript:void(0);'}
                        style={{
                            ...componentProps,
                            fontSize: dateItem.btn_size,
                            lineHeight: dateItem.height+'px',
                            textDecoration: dateItem.text_decoration,
                            textAlign: dateItem.btn_text_align,
                            color: dateItem.btn_color,
                            display: 'block',
                            backgroundColor: dateItem.btn_background_color,
                        }}><Icon type={dateItem.btn_icon} style={btn_icon_style} />{dateItem.btn_content}</a>
                </div>
            </div>
        );
    }else if(dateItem.other_type == 'form'){

        return(
            <div {...setProps}>
                <div {...commonProps}>
                    <FormRender dateItem={dateItem} renderType={renderType} />
                </div>
            </div>
        )

    }
}
