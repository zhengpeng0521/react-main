import React, {PropTypes} from 'react';
import styles from './ToolBar.less';
import {Button, Tabs, Upload, Icon, Popover, Select, Input, Checkbox, InputNumber,Slider, Switch} from 'antd';
import CommonPropsBuildComponent from './CommonPropsBuildComponent';
import ColorSelect from '../../../common/color-select/ColorSelect';
import FontFamilySelect from '../../../common/font-family-select/FontFamilySelect';
import ImageBarUpdate from './imageComponent/ImageBarUpdate'

const TabPane = Tabs.TabPane;
const Option = Select.Option;

/*
 * 模板编辑工具栏-图片工具栏

 {
    item_key: '',
    type: 'text',
    x: 0,
    y: 0,
    width: 200,
    height: 80,
    scale:  0,
    text_content: string,//文本内容
    font_family: string,//字体类型
    font_size: number,  //字体大小
    line_height: string,//行间距
    font_color: string, //字体颜色
    font_weight: string,//字体粗细
    font_style: string, //是否倾斜
    text_align: string, //对齐方式
    h_shadow:number,//水平阴影位置，值可为负
    v_shadow:number,//垂直阴影位置，值可为负
    blur:number,//阴影模糊距离
    text_shadow_color:string,//阴影颜色
 }
 */
function TextToolbar({
    pageKey,activeItemKey,activeItem,propsType,updatePageItem,changePropType,
}) {

    function addTextItem(textType) {
        let textItem = {
            item_key: '',
            type: 'text',
            x: 0,
            y: 0,
            width: 300,
            height: 150,
            scale:  0,

            text_content: '文本',
            font_size: '14px',
            line_height: '14px',
            font_color: '#000',
            text_align: 'center',
            blur:1,
            h_shadow:1,
            v_shadow:1,
            text_shadow_color:"#fff",
            background_color:'rgba(255,255,255,0)',
            background_img:'',
            opcity:100,
            vertical_align:'',
        };

        if(textType == '1') {
            textItem.text_content = '大标题';
            textItem.font_size = '90px';
            textItem.line_height = '1.5';
            textItem.font_weight = 'bold';
        } else if(textType == '2') {
            textItem.text_content = '标题';
            textItem.font_size = '80px';
            textItem.line_height = '1.35';
        } else if(textType == '3') {
            textItem.text_content = '副标题';
            textItem.font_size = '45px';
            textItem.line_height = '1';
        } else if(textType == '4') {
            textItem.text_content = '正文内容';
            textItem.font_size = '24px';
            textItem.line_height = '1';
        }

        updatePageItem && updatePageItem(pageKey, '', textItem);
    }

    function handleTextContentChange(e) {
        let {target} = e;
        let value = target.value;
        updatePageItem && updatePageItem(pageKey, activeItemKey, {text_content: value});
    }

    function changeMaxWordsNum(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {max_word_num: value});
    }

    function changeOrgSet(e) {
        let {target} = e;
        let value = target.checked;
        updatePageItem && updatePageItem(pageKey, activeItemKey, {org_set: value});
    }
    function changeVShadow(value){
        updatePageItem && updatePageItem(pageKey, activeItemKey, {v_shadow: value});
    }
    function changeHShadow(value){
        updatePageItem && updatePageItem(pageKey, activeItemKey, {h_shadow: value});
    }
    function changeBlur(value){
        updatePageItem && updatePageItem(pageKey, activeItemKey, {blur: value});
    }
    function changeTextShadowColor(value){
        updatePageItem && updatePageItem(pageKey, activeItemKey, {text_shadow_color: value});
    }
     function changeBackgroundColor(value){
        updatePageItem && updatePageItem(pageKey, activeItemKey, {background_color:value});
    }
    function changeBackgroundgImage(value) {
        updatePageItem && updatePageItem(pageKey,activeItemKey,  {background_img:value});
    }

    function changeLetterSpacing(value) {
        updatePageItem && updatePageItem(pageKey,activeItemKey,  {letter_spacing:value});
    }

    /*文字方向变更*/
    function handleTextDirChange(value) {
        updatePageItem && updatePageItem(pageKey,activeItemKey,  {text_dir: value});
    }

    /*文字方向变更*/
    function handleTextDirValueChange(value) {
        updatePageItem && updatePageItem(pageKey,activeItemKey,  {text_dir_value: value ? 'right' : 'left'});
    }

    let font_color = activeItem && activeItem.font_color;
    let font_family = activeItem && activeItem.font_family;
    let font_size = activeItem && activeItem.font_size;
    let line_height = activeItem && activeItem.line_height;
    let text_content = activeItem && activeItem.text_content;
    let font_weight = activeItem && activeItem.font_weight;
    let font_style = activeItem && activeItem.font_style;
    let text_decoration = activeItem && activeItem.text_decoration;
    let text_align = activeItem && activeItem.text_align;
    let blur = activeItem && activeItem.blur;
    let background_color = activeItem && activeItem.background_color;
    let background_img = activeItem && activeItem.background_img;
    let org_set = activeItem && activeItem.org_set;//是否允许机构设置
    let max_word_num = activeItem && activeItem.max_word_num;//最大允许字数
    let h_shadow = activeItem && activeItem.h_shadow;//水平阴影位置，值可为负
    let v_shadow = activeItem && activeItem.v_shadow;//垂直阴影位置，值可为负
    let text_shadow_color = activeItem && activeItem.text_shadow_color;//阴影颜色
    let vertical_align = activeItem && activeItem.vertical_align;
    let letter_spacing = activeItem && activeItem.letter_spacing;

    let text_dir = activeItem && activeItem.text_dir;
    let text_dir_value = activeItem && activeItem.text_dir_value || 'left';

    let orgSetComponent = (
        <div className={styles.org_set_toolbar}>
            <div className={styles.bar_content_line} style={{marginTop: '10px', padding: '5px'}}>
                 <Checkbox checked={org_set} onChange={changeOrgSet}>是否允许机构设置</Checkbox>
            </div>
            {!!org_set &&
            <div className={styles.org_set_list}>
                <div className={styles.bar_content_line} style={{padding: '5px'}}>
                     <div className={styles.prop_title}>最大允许字数</div>
                     <div className={styles.prop_value}>
                        <InputNumber
                            min={0}
                            style={{width: '100%'}}
                            value={max_word_num||0}
                            onChange={changeMaxWordsNum}
                          />
                    </div>
                </div>
            </div>
            }
        </div>

    );

    let propsComponent = {pageKey,activeItemKey,activeItem,propsType,updatePageItem,changePropType,orgSetComponent,};

    return (
        <div className={styles.toolbar_cont}>
           {(activeItemKey == undefined || activeItemKey == '') ?
            <div className={styles.add_iamge_bar_cont}>
                <div className={styles.bar_cont_title}>模板编辑工具栏-文本工具栏</div>
                <div className={styles.bar_content}>
                    <div className={styles.add_text_type_1} onClick={()=>addTextItem('1')}>大标题</div>
                    <div className={styles.add_text_type_2} onClick={()=>addTextItem('2')}>标题</div>
                    <div className={styles.add_text_type_3} onClick={()=>addTextItem('3')}>副标题</div>
                    <div className={styles.add_text_type_4} onClick={()=>addTextItem('4')}>正文内容</div>

                    <div className={styles.split_line}></div>
                </div>
            </div>
            :
            <CommonPropsBuildComponent {...propsComponent} >
                <div className={styles.text_bar_content}>
                      <div className={styles.text_shadow_bar}>

                        <div className={styles.text_h_shadow}>
                            <div className={styles.text_h_shadow_title}>文字水平阴影位置</div>
                            <div className={styles.text_h_shadow_operate}>
                                    <InputNumber
                                        min={-10}
                                        max={10}
                                        style={{width:'100%'}}
                                        value={h_shadow || 0}
                                        onChange={changeHShadow}
                                    />
                            </div>
                          </div>
                          <div className={styles.text_v_shadow}>
                              <div className={styles.text_v_shadow_title}>文字垂直阴影位置</div>
                              <div className={styles.text_v_shadow_operate}>
                                   <InputNumber
                                        min={-10}
                                        max={10}
                                        style={{width:'100%'}}
                                        value={v_shadow || 0}
                                        onChange={changeVShadow}
                                    />
                              </div>
                          </div>
                          <div className={styles.text_shadow_blur}>
                              <div className={styles.text_shadow_blur_title}>文字阴影模糊距离</div>
                              <div className={styles.text_shadow_blur_operate}>
                                  <InputNumber
                                    min={0}
                                    max={10}
                                    style={{width:'100%'}}
                                    value={blur || 0}
                                    onChange={changeBlur}
                                    />
                              </div>
                          </div>

                          <div className={styles.text_shadow_blur}>
                              <div className={styles.text_shadow_blur_title}>文字间距</div>
                              <div className={styles.text_shadow_blur_operate}>
                                  <InputNumber
                                    min={0}
                                    step={0.1}
                                    style={{width:'100%'}}
                                    value={letter_spacing || 0}
                                    onChange={changeLetterSpacing}
                                    />
                              </div>
                          </div>

                          <div className={styles.text_shadow_color}>
                             <div className={styles.text_shadow_color_title}>文字阴影颜色</div>
                             <div className={styles.text_shadow_color_oparete}>
                                 <ColorSelect  width='70px' height='24px' value={text_shadow_color} onChange={changeTextShadowColor}/>
                             </div>
                          </div>
                    </div>
                     <div className={styles.background_bar}>
                            <div className={styles.background_color_bar}>
                                <div className={styles.background_color_txt}>背景色</div>
                                <div className={styles.background_color_operate}>
                                        <ColorSelect  width='80px' height='24px' value={background_color} onChange={changeBackgroundColor}/>
                                </div>
                            </div>
                            <div className={styles.background_img_bar}>
                                <div className={styles.background_img_txt}>背景图片</div>
                                <div className={styles.background_img_operate}>
                                        <ImageBarUpdate imgurl={background_img} changeImage={changeBackgroundgImage} />
                                </div>
                            </div>
                    </div>
                    <div className={styles.bar_content_line}>
                        <div className={styles.color_select_bar}>
                           <ColorSelect width='80px' height='28px' value={font_color} onChange={(color)=>updatePageItem(pageKey,activeItemKey,{font_color: color})}/>
                        </div>

                        <div className={styles.family_select_bar}>
                            <FontFamilySelect value={font_family} onChange={(font_family)=>updatePageItem(pageKey,activeItemKey,{font_family})}/>
                        </div>

                        <div className={styles.fontsize_select_bar}>
                            <FontSizeSelect value={font_size} onChange={(font_size)=>updatePageItem(pageKey,activeItemKey,{font_size})}/>
                        </div>

                        <div className={styles.fontsize_select_bar}>
                            <LineHeightSelect value={line_height} onChange={(line_height)=>updatePageItem(pageKey,activeItemKey,{line_height})}/>
                        </div>

                    </div>

                    <div className={styles.bar_content_line}>
                        <Icon
                           type="jiacu"
                           style={(font_weight=='bold'?{color: '#000'} : {color: '#999'})}
                           className={styles.font_style_bar}
                           onClick={()=>updatePageItem(pageKey,activeItemKey,{font_weight: (font_weight=='bold'?'normal':'bold')})}
                        />

                        <Icon
                           type="qingxie"
                           style={(font_style=='italic'?{color: '#000'} : {color: '#999'})}
                           className={styles.font_style_bar}
                           onClick={()=>updatePageItem(pageKey,activeItemKey,{font_style: (font_style=='italic'?'normal':'italic')})}
                        />

                        <Icon
                           type="xiahuaxian"
                           style={(text_decoration=='underline'?{color: '#000'} : {color: '#999'})}
                           className={styles.font_style_bar}
                           onClick={()=>updatePageItem(pageKey,activeItemKey,{text_decoration: (text_decoration=='underline'?'none':'underline')})}
                        />

                    </div>

                    <div className={styles.bar_content_line}>
                        <Icon
                           type="zuoduiqi1"
                           title='水平靠左'
                           style={(text_align=='left'?{color: '#000'} : {color: '#999'})}
                           className={styles.font_style_bar}
                           onClick={()=>updatePageItem(pageKey,activeItemKey,{text_align: 'left'})}
                        />

                        <Icon
                           type="shuipingjuzhong"
                           title='水平居中'
                           style={(text_align=='center'?{color: '#000'} : {color: '#999'})}
                           className={styles.font_style_bar}
                           onClick={()=>updatePageItem(pageKey,activeItemKey,{text_align: 'center'})}
                        />

                        <Icon
                           type="youduiqi1"
                           title='水平靠右'
                           style={(text_align=='right'?{color: '#000'} : {color: '#999'})}
                           className={styles.font_style_bar}
                           onClick={()=>updatePageItem(pageKey,activeItemKey,{text_align: 'right'})}
                        />
                    </div>
                    <div className={styles.bar_content_line}>

                        <Icon
                            type="chuizhidingduiqi"
                            title='垂直顶部'
                           style={(vertical_align=='top'?{color: '#000'} : {color: '#999'})}
                           className={styles.font_style_bar}
                           onClick={()=>updatePageItem(pageKey,activeItemKey,{vertical_align: 'top'})}
                        />
                        <Icon
                            type="chuizhijuzhong"
                            title='垂直居中'
                           style={(vertical_align=='middle'?{color: '#000'} : {color: '#999'})}
                           className={styles.font_style_bar}
                           onClick={()=>updatePageItem(pageKey,activeItemKey,{vertical_align: 'middle'})}
                        />
                        <Icon
                            type="chuizhididuiqi"
                            title='水平底部'
                           style={(vertical_align=='bottom'?{color: '#000'} : {color: '#999'})}
                           className={styles.font_style_bar}
                           onClick={()=>updatePageItem(pageKey,activeItemKey,{vertical_align: 'bottom'})}
                        />
                    </div>
                    <div className={styles.bar_content_line} style={{marginTop: '10px', padding: '5px'}}>
                        <Input type="textarea" style={{width: '100%'}} rows={4} value={text_content} onChange={handleTextContentChange} />
                    </div>

                    <div className={styles.bar_content_line} style={{marginTop: '10px', padding: '5px'}}>
                        <Switch checked={text_dir} checkedChildren="纵向" unCheckedChildren="横向" onChange={handleTextDirChange}/>

                        {!!text_dir &&
                        <Switch style={{marginLeft: '20px'}} checked={text_dir_value == 'right'} checkedChildren="靠右" unCheckedChildren="靠左" onChange={handleTextDirValueChange}/>
                        }
                    </div>

                </div>
            </CommonPropsBuildComponent>
           }

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
           size: this.props.value || '20px',
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
        let minFontSize = 12;
        let maxFontSize = 195;

        for(let i = minFontSize; i < maxFontSize; i++) {
            fontSizeOpts.push(
                <Option key={'font_size_'+i} value={i+'px'}>{i+'px'}</Option>
            );
            i++;
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
 * 字体选择组件
 */
class LineHeightSelect extends React.Component {
    constructor(props) {
        super(props);

        // 设置 initial state
        this.state = {
           lineHeight: this.props.value || '1',
        };

        this.handleChangeValue = this.handleChangeValue.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.value != this.props.value) {
            this.setState({
                lineHeight: nextProps.value,
            });
        }
    }

    handleChangeValue(value) {
        this.setState({
            lineHeight: value,
        });
        this.props.onChange && this.props.onChange(value);
    }

    render() {

        let {lineHeight} = this.state;

        let {width,height,value,onChange,} = this.props;

        return (
            <div className={styles.size_select_cont}>
                <Select value={lineHeight} className={styles.size_select} onChange={this.handleChangeValue}>
                    <Option  value='1'>1</Option>
                    <Option  value='1.2'>1.2</Option>
                    <Option  value='1.35'>1.35</Option>
                    <Option  value='2'>2</Option>
                    <Option  value='2.5'>2.5</Option>
                </Select>
            </div>
        );
    }
}

export default TextToolbar;
