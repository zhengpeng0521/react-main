import React, {PropTypes} from 'react';
import styles from './ToolBar.less';
import {Button,Icon,Input,Checkbox,} from 'antd';
import CommonPropsBuildComponent from './CommonPropsBuildComponent';
import ColorSelect from '../../../common/color-select/ColorSelect'
import ImageBarUpdate from './imageComponent/ImageBarUpdate'

/*
 * 模板编辑工具栏-按钮工具栏
 {
    item_key:'',
    type:'button',
    x:0,
    y:0,
    width:180,
    height:60,
    btn_scale:0,//按钮旋转角度
    btn_color:'#fff',//按钮字体颜色
    btn_background:'#000',//按钮背景颜色
    opacity:70,//按钮透明度
    btn_size:'1rem'//按钮字体大小
    btn_content:string//按钮文本内容
    btn_type:string//按钮类型(phone:电话按钮；link:连接按钮；turning:滑动页面按钮)
    btn_phone:string//电话按钮的号码
    btn_icon:string//按钮图标
    phone_link_href:string//电话按钮连接
    link_height:string//按钮行高
    link_href:string//连接跳转按钮
    text_decoration:string//按钮字体下滑线
 }
 */
function ButtonToolbar({
        pageKey,activeItemKey,activeItem,propsType,updatePageItem,changePropType,

}) {
    function addButtonItem(buttonType){
        let buttonItem={
            item_key:'',
            type:'button',
            x:0,
            y:0,
            width:180,
            height:60,
            btn_scale:0,
            border_radius:5,
            opcity:100,
            btn_color:"#fff",
            btn_background_color:"#000",
            btn_content:"",
            btn_size:"1rem",
            line_height:"1rem",
            btn_text_align:'center',
            phone_link_href:'',
            btn_icon:'',
            btn_phone:"",
            btn_type:"",
            text_decoration:"none"

        };
        switch(buttonType)
            {
            case "phone":
                buttonItem.btn_type="phone"
                buttonItem.btn_content="拨打电话";
                buttonItem.btn_phone="10086"
                buttonItem.phone_link_href="tel:"+buttonItem.btn_phone;
                buttonItem.btn_icon='phone';
                break;
            case 'link':
                buttonItem.btn_type="link"
                buttonItem.btn_content="跳转链接";
                buttonItem.link_href="https://www.baidu.com";
                buttonItem.btn_icon='';
                break;
        }
        updatePageItem && updatePageItem(pageKey,'',buttonItem)
    }
        function handleTextContentChange(e) {
            let {target} = e;
            let value = target.value;
             updatePageItem && updatePageItem(pageKey, activeItemKey, {btn_content: value});
         }
        function handleButtonTextContentChange(e) {
            let {target} = e;
            let value = target.value;
             updatePageItem && updatePageItem(pageKey, activeItemKey, {btn_phone: value});
         }
        function handleLinkContentChange(e) {
            let {target} = e;
            let value = target.value;
             updatePageItem && updatePageItem(pageKey, activeItemKey, {link_href: value});
         }
        function changeBackgroundgImage(value) {
            updatePageItem && updatePageItem(pageKey,activeItemKey,  {background_img:value});
        }

        function changeOrgSet(e) {
            let {target} = e;
            let value = target.checked;
            updatePageItem && updatePageItem(pageKey, activeItemKey, {org_set: value});
        }

        let org_set = activeItem && activeItem.org_set;//是否允许机构设置

        let orgSetComponent = (
            <div className={styles.org_set_toolbar}>
                <div className={styles.bar_content_line} style={{marginTop: '10px', padding: '5px'}}>
                     <Checkbox checked={org_set} onChange={changeOrgSet}>是否允许机构设置</Checkbox>
                </div>
            </div>
        );

        let propsComponent = {pageKey,activeItemKey,activeItem,propsType,updatePageItem,changePropType,orgSetComponent,};
        let btn_color = activeItem && activeItem.btn_color;
        let btn_size = activeItem && activeItem.btn_size;
        let btn_content = activeItem && activeItem.btn_content;
        let btn_phone=activeItem && activeItem.btn_phone;
        let btn_background_color = activeItem && activeItem.btn_background_color;
        let btn_type = activeItem && activeItem.btn_type;
        let link_href = activeItem && activeItem.link_href;
        let background_img = activeItem && activeItem.background_img;
    return (
        <div className={styles.toolbar_cont}>
            {(activeItemKey == undefined || activeItemKey == '') ?
            <div className={styles.add_iamge_bar_cont}>
                <div className={styles.bar_cont_title}>模板编辑工具栏-按钮工具栏</div>
                <div className={styles.bar_content}>
                    <Button icon='phone' className={styles.add_btn_phone} onClick={()=>addButtonItem('phone')}>拨打电话</Button>
                    <Button icon='link' className={styles.add_btn_link} onClick={()=>addButtonItem('link')}>跳转链接</Button>
                </div>
            </div>
            :
            <CommonPropsBuildComponent {...propsComponent}>
                <div className={styles.text_bar_content}>
                    <div className={styles.bar_content_line}>
                        <div className={styles.btn_content_operate}>
                            {(btn_type == "phone") ?
                                <div>
                                    <div>电话</div>
                                    <div className={styles.btn_content_phone}><Input value={btn_phone} onChange={handleButtonTextContentChange}/></div>
                                </div>
                                :
                                <div>
                                    <div>跳转地址</div>
                                    <div className={styles.btn_content_link}><Input value={link_href} onChange={handleLinkContentChange}/></div>
                                </div>
                            }
                            <div>
                                <div>文本</div>
                                <div className={styles.btn_content_text}><Input value={btn_content} onChange={handleTextContentChange}/></div>
                            </div>
                            <div>
                                <div className={styles.btn_font_color}>
                                <div>字体颜色</div>
                                <ColorSelect width='30px' height='30px' value={btn_color} onChange={(color)=>updatePageItem(pageKey, activeItemKey,{btn_color:color})}></ColorSelect>
                                </div>
                                <div>
                                <div>背景颜色</div>
                                <ColorSelect width='30px' height='30px' value={btn_background_color} onChange={(color)=>updatePageItem(pageKey, activeItemKey,{btn_background_color:color})}></ColorSelect>
                                </div>
                            </div>
                            <div className={styles.background_img_bar}>
                                <div className={styles.background_img_txt}>背景图片</div>
                                <div className={styles.background_img_operate}>
                                        <ImageBarUpdate imgurl={background_img} changeImage={changeBackgroundgImage} />
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </CommonPropsBuildComponent>
            }
        </div>
    );
}

export default ButtonToolbar;
