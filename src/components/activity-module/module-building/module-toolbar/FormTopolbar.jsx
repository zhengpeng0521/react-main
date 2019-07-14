import React, {PropTypes} from 'react';
import styles from './ToolBar.less';
import {Menu,Icon,Slider,InputNumber,Select,message} from 'antd';
import ColorSelect from '../../../common/color-select/ColorSelect';
import ImageBarUpdate from './imageComponent/ImageBarUpdate'

/*
 *模板编辑工具栏-高级工具栏-添加表单
 */
const SubMenu = Menu.SubMenu;
function OtherTopolbar({
    pageKey,activeItemKey,activeItem,propsType,updatePageItem,changePropType,moduleConfigData
}){
    let i = 2;
    function addForm(otherType){
        let configData = moduleConfigData.pages;
        let flag = false;
        configData.map(function(dateItem,dateIndex){
            let items = dateItem.items;
            items.map(function(iitem,index){
                if(iitem.type == 'other' && iitem.other_type == 'form'){
                    i++;
                }
            })
            if(i>2){
               flag = true;
            }
        })

        if(flag){
            message.warn('一个模板最多只能添加一个表单!');
            return;
        }
        let formItem={
                item_key:'',
                type:'other',
                x: 175,
                y: 430,
                width: 400,
                height: 520,
                scale:0,
                other_type:otherType,
                border_radius:5,
                background:'rgba(255,255,255,0)',
                background_img:'',
                inputPublicSet:{
                    font_size:'14px',
                    height:40,
                    width:241,
                    border_radius:5,
                    color:'#000',
                    border_color:'red',
                    background_img:'',
                },
                inputSet:[
                    {
                        input_key: '1',
                        name: 'campus',
                        input_type: 'select',
                        textcontent: '机构选择',
                    },
                    {
                        input_key:'2',
                        name: 'name',
                        input_type: 'input',
                        textcontent:'学员姓名',
                    },
                    {
                        input_key:'3',
                        name: 'mobile',
                        input_type: 'phone',
                        textcontent:'联系电话',
                    },
                    {
                        input_key:'4',
                        name: 'birthday',
                        input_type: 'date',
                        textcontent:'学员生日',
                    },
                    {
                        input_key:'5',
                        name: 'note',
                        input_type: 'area',
                        textcontent:'备注',
                    }
                ],
                buttonSet:{
                    font_size:'16px',
                    btn_text:'提交',
                    height:40,
                    width:241,
                    font_color:'#000',
                    background_color:"red",
                    background_img:'',
                    border:'none',
                    border_radius:5,
                    border_color:'red',
                }
        };
        updatePageItem && updatePageItem(pageKey, '', formItem);
    }
    function addMusic(otherType){
        let musicItem = {
            item_key:'',
            type:'other',
            other_type:otherType,
            x:0,
            y:0,
            width:100,
            height:100,
            scale:0,
            music_icon:'',
            music_url:'',
        };
        updatePageItem && updatePageItem(pageKey, '', musicItem);
    }
    let border_radius = activeItem.border_radius;

    let form_borderRadius='';
    let font_color = '';
    let btn_textContent = '';
    let btn_backgroundColor = '';
    let btn_font_color = '';
    let input_textFirst = '';
    let input_textSecond = '';
    let input_textThird = '';
    let input_textFour = '';
    let input_textFive = '';
    let btn_backgroundImage = '';
    let objLength = Object.keys(activeItem);
    let btn_fontSize = '';
    let input_fontSize = '';
    let inputPublicSet = {};
    let inptFirst = {};
    let buttonSet = {};
    let btn_border = '';
    let input_borderColor = '';
    let input_backgroundImage = '';
    let btn_borderColor =''
    let input_fontColor = '';
    let backgroundColor = activeItem.background;
    let backgroundImage = activeItem.background_img;
    if(objLength.length > 0 && activeItem.buttonSet && activeItem.inputPublicSet){
         form_borderRadius = activeItem.inputPublicSet && activeItem.inputPublicSet.border_radius || '';
         btn_textContent = activeItem.buttonSet && activeItem.buttonSet.btn_text || '';
         btn_backgroundColor = activeItem.buttonSet.background_color || '';
         btn_font_color = activeItem.buttonSet.font_color || '';
         input_textFirst = activeItem.inputSet.length > 0 ? activeItem.inputSet['0'].textcontent || '' : '';
         input_textSecond = activeItem.inputSet.length > 1 ? activeItem.inputSet['1'].textcontent || '' : '';
         input_textThird = activeItem.inputSet.length > 2 ? activeItem.inputSet['2'].textcontent || '' : '';
         input_textFour = activeItem.inputSet.length > 3 ? activeItem.inputSet['3'].textcontent || '' : '';
         input_textFive = activeItem.inputSet.length > 4 ? activeItem.inputSet['4'].textcontent || '' : '';
         btn_backgroundImage = activeItem.buttonSet.background_img || '';
         btn_fontSize = activeItem.buttonSet.font_size;
         input_fontSize = activeItem.inputPublicSet.font_size;
         input_fontColor = activeItem.inputPublicSet.color;
         inputPublicSet = activeItem.inputPublicSet || {};
         inptFirst = activeItem.inputSet['0'];
         buttonSet = activeItem.buttonSet || {};
         input_borderColor = activeItem.inputPublicSet.border_color;
         btn_border = activeItem.buttonSet.border_radius;
         btn_borderColor = activeItem.buttonSet.border_color
    }
    function loopOtherInstRender() {
        let {otherType} = activeItem.otherType;

        if(otherType == 'form') {
             return (
                <div>music</div>
             );
        } else if(otherType == 'music') {

            }
    }


    function changeInputRadius(border_radius) {
        let new_inputPublicSet = {
            ...inputPublicSet,
            border_radius,
        };
        updatePageItem && updatePageItem(pageKey,activeItemKey,{inputPublicSet: new_inputPublicSet});
    }
    function changeInputFontColor(color){
        let new_inputPublicSet = {
            ...inputPublicSet,
            color,
        };
        updatePageItem && updatePageItem(pageKey,activeItemKey,{inputPublicSet: new_inputPublicSet});
    }
    function changeIputFontSize(font_size){
        let new_inputPublicSet = {
            ...inputPublicSet,
            font_size,
        };
        updatePageItem && updatePageItem(pageKey,activeItemKey,{inputPublicSet: new_inputPublicSet});
    }
    function changButtonBorderRadius(border_radius){
          let new_buttonSet = {
            ...buttonSet,
            border_radius,
        };
        updatePageItem && updatePageItem(pageKey,activeItemKey,{buttonSet: new_buttonSet});
    }
    function changeInputBorderColor(border_color){
        let new_inputPublicSet = {
            ...inputPublicSet,
            border_color,
        };
        updatePageItem && updatePageItem(pageKey,activeItemKey,{inputPublicSet: new_inputPublicSet});
    }
    function changeInputTitle(input_index,e){
        let {target} = e
        let current_arr = activeItem.inputSet;
        let current_item = current_arr[input_index];
        current_item.textcontent = target.value;

        updatePageItem && updatePageItem(pageKey,activeItemKey,{inputSet: current_arr});
    }
    function btnBackgroundColor(background_color){
        let new_buttonSet = {
            ...buttonSet,
            background_color,
        };
        updatePageItem && updatePageItem(pageKey,activeItemKey,{buttonSet: new_buttonSet});
    }
    function btnFontColor(font_color){
        let new_buttonSet = {
            ...buttonSet,
            font_color,
        };
        updatePageItem && updatePageItem(pageKey,activeItemKey,{buttonSet: new_buttonSet});
    }
    function allChangeBorderRadius(border_radius){
        updatePageItem && updatePageItem(pageKey,activeItemKey,{border_radius});
    }
    function btnTextContent(e){
        let {target} = e;
        let value = target.value;
        let new_buttonSet = {
            ...buttonSet,
            btn_text:value,
        };
        updatePageItem && updatePageItem(pageKey,activeItemKey,{buttonSet: new_buttonSet});
    }
    function btnBackgroundImage(background_img){
         let new_buttonSet = {
            ...buttonSet,
            background_img,
        };
        updatePageItem && updatePageItem(pageKey,activeItemKey,{buttonSet: new_buttonSet});
    }
    function btnFontSize(font_size){
        let new_buttonSet = {
            ...buttonSet,
            font_size,
        };
        updatePageItem && updatePageItem(pageKey,activeItemKey,{buttonSet: new_buttonSet});
    }
    function btnBorderColor(border_color){
        let new_buttonSet = {
            ...buttonSet,
            border_color,
        };
        updatePageItem && updatePageItem(pageKey,activeItemKey,{buttonSet: new_buttonSet});
    }
    function allBackgroundColor(backgroundColor){
        updatePageItem && updatePageItem(pageKey,activeItemKey,{background:backgroundColor});
    }
    function allBackgroundImage(backgroundImage){
        updatePageItem && updatePageItem(pageKey,activeItemKey,{background_img:backgroundImage});
    }

    let propsComponent ={pageKey,activeItemKey,activeItem,propsType,updatePageItem,changePropType,};
    return(
        <div className={styles.toolbar_cont}>
            <div className={styles.add_iamge_bar_cont}>
                <div className={styles.bar_cont_title}>模板编辑工具栏-高级工具栏</div>
                    {(activeItemKey == undefined || activeItemKey == '') ?
                        <div className={styles.bar_content}>
                            <div className={styles.form_bar_content} onClick={()=>addForm('form')}>
                                <div className={styles.form_bar_icon}>
                                    <Icon type='biaodan' style={{fontSize:60}}/>
                                </div>
                                <p className={styles.form_bar_txt}>表单</p>
                            </div>

                        </div>
                     :
                        <div className={styles.form_bar_operate}>
                            <div className={styles.form_all_operate}>
                                <div className={styles.form_all_operate_title}>表单项</div>
                                <div className={styles.form_all_operate_slider}>
                                    <div className={styles.form_all_operate_slider_title}>圆角</div>
                                    <div className={styles.form_props_slider}>
                                        <Slider min={0} max={100} onChange={allChangeBorderRadius} value={border_radius||0} />
                                    </div>
                                    <div className={styles.form_all_operate_slider_value}>
                                        <InputNumber
                                            min={0}
                                            max={100}
                                            style={{width: '100%'}}
                                            value={border_radius||0}
                                            onChange={allChangeBorderRadius}
                                          />
                                    </div>
                                </div>
                                <div className={styles.form_all_backgroun_color}>
                                    <div className={styles.form_all_backgroun_color_txt}>背景颜色</div>
                                    <div className={styles.form_all_backgroun_color_operate}>
                                        <ColorSelect  width='80px' height='24px' value={backgroundColor} onChange={allBackgroundColor}/>
                                    </div>
                                </div>
                                <div className={styles.all_background_img}>
                                    <div className={styles.all_background_img_txt}>背景图片</div>
                                    <div className={styles.all_background_img_operate}>
                                        <ImageBarUpdate imgurl={backgroundImage} changeImage={allBackgroundImage} />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.form_input_operate}>
                                <div className={styles.form_input_operate_title}>输入框配置</div>
                                <div className={styles.form_input_operate_content}>
                                    <div className={styles.form_all_operate_slider_title}>圆角</div>
                                    <div className={styles.form_props_slider}>
                                        <Slider min={0} max={100} onChange={(form_borderRadius)=>changeInputRadius(form_borderRadius)} value={form_borderRadius||0} />
                                    </div>
                                    <div className={styles.form_all_operate_slider_value}>
                                        <InputNumber
                                            min={0}
                                            max={100}
                                            style={{width: '100%'}}
                                            value={form_borderRadius||0}
                                            onChange={(form_borderRadius)=>changeInputRadius(form_borderRadius)}
                                          />
                                    </div>
                                </div>
                                <div className={styles.form_input_font_color}>
                                    <div className={styles.form_input_font_color_txt}>字体颜色</div>
                                    <div className={styles.form_input_font_color_operate}>
                                        <ColorSelect  width='80px' height='24px' value={input_fontColor} onChange={(input_fontColor)=>changeInputFontColor(input_fontColor)}/>
                                    </div>
                                </div>
                                 <div className={styles.form_input_border_color}>
                                    <div className={styles.form_input_border_color_txt}>边框颜色</div>
                                    <div className={styles.form_input_border_color_operate}>
                                        <ColorSelect  width='80px' height='24px' value={input_borderColor} onChange={changeInputBorderColor}/>
                                    </div>
                                </div>
                                <div className={styles.form_input_font_size}>
                                    <div className={styles.form_input_font_size_text}>
                                        字体大小
                                    </div>
                                    <div className={styles.form_input_form_size_operate}>
                                         <FontSizeSelect value={input_fontSize} onChange={(input_fontSize)=>changeIputFontSize(input_fontSize)}/>
                                    </div>
                                </div>
                                <div className={styles.form_operate_inputTextFirst}>
                                    <div className={styles.form_operatre_textTitleFirst}>标题</div>
                                    <div className={styles.form_operatre_textOperate}><input type='text' value={input_textFirst} onChange={(value)=>changeInputTitle(0, value)}/></div>
                                </div>
                                <div className={styles.form_operate_inputTextSecond}>
                                    <div className={styles.form_operatre_textTitleSecond}>标题</div>
                                    <div><input type='text' value={input_textSecond} onChange={(value)=>changeInputTitle(1, value)}/></div>
                                </div>
                                <div className={styles.form_operate_inputTextThird}>
                                    <div className={styles.form_operatre_textTitleThird}>标题</div>
                                    <div><input type='text' value={input_textThird} onChange={(value)=>changeInputTitle(2, value)}/></div>
                                </div>
                                <div className={styles.form_operate_inputTextThird}>
                                    <div className={styles.form_operatre_textTitleThird}>标题</div>
                                    <div><input type='text' value={input_textFour} onChange={(value)=>changeInputTitle(3, value)}/></div>
                                </div>
                                <div className={styles.form_operate_inputTextThird}>
                                    <div className={styles.form_operatre_textTitleThird}>标题</div>
                                    <div><input type='text' value={input_textFive} onChange={(value) => changeInputTitle(4, value)} /></div>
                                </div>
                            </div>
                            <div className={styles.form_button_operate}>
                                <div className={styles.form_button_operate_title}>按钮配置</div>
                                <div className={styles.form_btn_operate_slider}>
                                    <div className={styles.form_btn_operate_slider_title}>圆角</div>
                                    <div className={styles.form_props_slider}>
                                        <Slider min={0} max={100} onChange={(btn_border)=>changButtonBorderRadius(btn_border)} value={btn_border||0}/>
                                    </div>
                                    <div className={styles.form_btn_operate_slider_value}>
                                        <InputNumber
                                            min={0}
                                            max={100}
                                            style={{width: '100%'}}
                                            value={btn_border||0}
                                            onChange={(btn_border)=>changButtonBorderRadius(btn_border)}
                                          />
                                    </div>
                                </div>
                                <div className={styles.form_button_backgroun_color}>
                                    <div className={styles.form_button_backgroun_color_txt}>背景颜色</div>
                                    <div className={styles.form_button_backgroun_color_operate}>
                                        <ColorSelect  width='80px' height='24px' value={btn_backgroundColor} onChange={(btn_backgroundColor)=>btnBackgroundColor(btn_backgroundColor)}/>
                                    </div>
                                </div>
                                <div className={styles.form_button_font_color}>
                                    <div className={styles.form_button_font_color_txt}>字体颜色</div>
                                    <div className={styles.form_button_font_color_operate}>
                                        <ColorSelect  width='80px' height='24px' value={btn_font_color} onChange={(btn_font_color)=>btnFontColor(btn_font_color)}/>
                                    </div>
                                </div>
                                <div className={styles.form_button_border_color}>
                                    <div className={styles.form_button_border_color_txt}>边框颜色</div>
                                    <div className={styles.form_button_border_color_operate}>
                                        <ColorSelect  width='80px' height='24px' value={btn_borderColor} onChange={(btn_borderColor)=>btnBorderColor(btn_borderColor)}/>
                                    </div>
                                </div>
                                <div className={styles.form_button_textContent}>
                                    <div className={styles.form_button_textTitle}>按钮文字</div>
                                    <div className={styles.form_button_text_operate}>
                                        <input type='text' value={btn_textContent} onChange={btnTextContent}/>
                                    </div>
                                </div>
                                <div className={styles.btn_background_img_bar}>
                                    <div className={styles.btn_background_img_txt}>背景图片</div>
                                    <div className={styles.btn_background_img_operate}>
                                        <ImageBarUpdate imgurl={btn_backgroundImage} changeImage={(btn_backgroundImage)=>btnBackgroundImage(btn_backgroundImage)} />
                                    </div>
                                </div>
                                <div className={styles.form_btn_font_size}>
                                    <div className={styles.form_btn_font_size_text}>
                                        字体大小
                                    </div>
                                    <div className={styles.form_btn_form_size_operate}>
                                         <FontSizeSelect value={btn_fontSize} onChange={(btn_fontSize)=>btnFontSize(btn_fontSize)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
            </div>
        </div>
    )
}

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

export default OtherTopolbar;
