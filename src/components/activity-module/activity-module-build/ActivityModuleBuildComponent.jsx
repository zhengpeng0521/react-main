import React, {PropTypes} from 'react';
import styles from './ActivityModuleBuildComponent.less';
import ModuleBuilding from '../module-building/ModuleBuilding';
import ModuleBuildingRender from '../module-building/module-render/ModuleBuildingRender';
import ModuleToolBar from '../module-building/module-toolbar/ModuleToolBar';
import ModuleBuildPrev from '../module-building/module-prev/ModuleBuildPrev';
import PageModal from '../../common/page-modal/PageModal';
import {Button,} from 'antd';

/*
 * 模板编辑页面
 *

 {
    id: string,         //模板主键

    name: string,            //模板名称
    type: string,            //模板类型    activity: 微活动; leaflet: 微传单; offlineLeaflets : 线下传单
    page_type: string,            //模板页面类型    one: 单页/长页; many: 多页;
    switch_type: string,     //页面切换方式
    switch_dir: string,     //页面切换方向

    props: {                //模板公共配置
        music: {
            url: string,            //音乐链接
            fileName: string,       //文件名称
            x: number,              //横坐标
            y: number,              //纵坐标
            width: number,          //宽度
            height: number,         //高度
            rotate: boolean,        //是否旋转
            icon: string,           //展示的图标
        },
        share: {                 //分享设置
            title: string,
            intro: string,
            img_url: string,
            max_title_word: number,
            max_intro_word: number,
        },
    },

    pages: [            //页面配置

        {
            index: number,         //加入顺序
            page_key: string,      //键
            seq_no: number,        //顺序
            props: {               //单页属性
                bg: {
                    bg_color: string,//背景色
                    bg_img: string,//背景图片
                    bg_opacity: number,//背景透明度
                },
            }
            items: [               //元素项   元素顺序就是图层顺序
                {
                    item_key: string,   //元素键、元素索引
                    type: string,       //元素类型  base/text/image/button/other   base有且唯一并在最前面
                    other_type: string,      //二级元素类型music/form
                    x: number,          //元素横坐标
                    y: number,          //元素纵坐标
                    width: number,      //元素宽度
                    height: number,     //元素高度
                    scale: number,      //元素旋转角度
                    box_shadow: string, //元素阴影

                    opacity: number,    //透明度 单位%

                    org_set: boolean,   //是否允许机构设置

                    //边框相关
                    border_style, string 边框类型
                    border_width, number 边框粗细
                    border_color, string 边框颜色
                    border_radius: number,//边框圆角大小
                    padding_top: number,
                    padding_right: number,
                    padding_bottom: number,
                    padding_left: number,

                    //动作相关配置
                    action_type: string,//动作类型
                    action_speed: number,//动作速度(几秒内完成动作)
                    action_delay: number,//动作延迟(几秒后开始动作)
					animation_count: infinite || 1, //无限重复 || 重复一次

                    //↓↓↓↓↓基本类型元素↓↓↓↓↓
                    bg_img: string,     //背景图片  URL
                    bg_color: string,   //背景颜色 '#F1F1F1'
                    bg_opacity: number, //背景颜色的透明度  当bg_color不为空时生效
                    //↓↓↓↓↓文本类型元素↓↓↓↓↓
                    text_content: string,//文本内容
                    font_family: string,//字体类型
                    font_size: number,  //字体大小
                    line_height: string,//行间距
                    font_color: string, //字体颜色
                    font_weight: string,//字体粗细
                    font_style: string, //是否倾斜  italic
                    text_decoration: string, //是否下划线  underline
                    text_align: string, //对齐方式
                    letter_spacing: number,  //字间距
                    text_dir: boolean, //文字方向   true-> 纵向
                    text_dir_value: boolean, //纵向文字排版方向  'left'  /  'right'
                    //↓↓↓↓↓图片类型元素↓↓↓↓↓
                    img_url: string,    //图片链接
                    img_border_radius: number,//图片圆角大小
                    //↓↓↓↓↓按钮类型元素↓↓↓↓↓
                    btn_type: string, 按钮的分类 'link','phone'
                    href_url: string,    //点击链接
                    button_text: string,//按钮文本
                    button_fontsize: number,//按钮文本大小
                    //↓↓↓↓↓表单类型元素↓↓↓↓↓



                    background:string//表单背景颜色
                    background_img:string//表单背景图片
                    inputPublicSet:{        //输入框公共属性
                        font_size:string,//输入框字体大小
                        border_radius:,//输入框的圆角
                        color:string,//输入框字体颜色
                        border_color:string,//输入框边框颜色
                        background_img:string,//输入框背景图片
                    }
                    inputSet:[      //输入框
                        {
                            input_key:string,//输入框的索引
                            textcontent:string,//输入框的文本内容
                            name: string,//提交表单的键
                            input_type: string,//表单格式类型  input,phone,date,area,
                        }
                    ]
                    buttonSet:{       //按钮属性
                        font_size:string,//按钮字体大小
                        btn_text:string,//按钮文本内容
                        font_color:string,//按钮字体颜色
                        background_color:string,//按钮背景颜色
                        background_img:string,//按钮背景图片
                        border_radius:number,//按钮圆角
                        border_color:string,//按钮边框
                    }
                }
            ]
        }
    ]

 }

 */
function ActivityModuleBuildComponent({
    visible, loading, formData, onClose, onSubmit, mobileBorderColor, changeMobileBorderColor,

    moduleConfigData,   //全部页面的配置数据
    currentPageKey,     //当前操作页面的键
    currentPageConfig,  //当前操作的页面配置数据

    onCreatePage,       //新增页面
    onCopyPage,         //复制页面
    onRemovePage,       //删除页面
    changeActivePage,   //改变激活(操作)页面
    updatePageItem,     //编辑页面元素
    activeItemKey,      //当前操作元素键
    changeActiveItem,   //改变正在编辑的元素对象
    changeActivityItemProps,

    updateModuleProps,  //改变模板基础属性
    updatePageProps,  //改变模板单页基础属性
    deletePageItem, //删除页内元素
    toPrevPageItem,//图层往上移
    toNextPageItem,//图层往下移
    copyPageItem,//复制图层内容
}) {

    {/*===模板基础属性=====*/}
    let {id, name, type, switch_type, page_type, props, switch_dir,} = moduleConfigData;
    let moduleProps = {id, name, type, switch_type, props, page_type, switch_dir,};

    function itemClick(t, e) {
        t.nativeEvent.isInH5render = true;
    }
    function outH5RenderClick(t, e) {
        if(!t.nativeEvent.isInH5render) {
            changeActiveItem && changeActiveItem('');
        }
    }

    function handleClose() {
        onClose && onClose();
    }

    function handleOnSubmit() {
        onSubmit && onSubmit({}, handleClose);
    }

    return (
        <PageModal
           visible={visible}
           maskClosable={false}
           title="自定义模板"
           width="calc(100vw - 240px)"
           onClose={handleClose}
           footer={[
                {msg: '确定要提交吗?', handle: handleOnSubmit, component: (<Button type="primary" loading={loading}>提交</Button>)},
                {msg: '确定要关闭吗?', handle: handleClose, component: (<Button type="ghost">关闭</Button>)},
            ]}
        >

        <div className={styles.activity_module_build_page_cont}>
            <div className={styles.activity_module_build_page_content} style={{width: 'calc(100% - 20px)'}}>

                {/*左侧卡片预览和图层预览*/}
                <div className={styles.prev_cont}>
                    <ModuleBuildPrev
                        onCreatePage={onCreatePage}
                        onRemovePage={onRemovePage}
                        moduleConfigData={moduleConfigData}
                        currentPageConfig={currentPageConfig}
                        currentPageKey={currentPageKey}
                        changeActivePage={changeActivePage}
                        activeItemKey={activeItemKey}
                        changeActiveItem={changeActiveItem}
                        deletePageItem={deletePageItem}
                        toPrevPageItem={toPrevPageItem}
                        toNextPageItem={toNextPageItem}
                        copyPageItem={copyPageItem}
                        onCopyPage={onCopyPage}
                    />
                </div>

                {/*中间显示模板构建预览*/}
                <div className={styles.building_mobile_cont} style={{width: 'calc(100% - 620px)'}} onClick={outH5RenderClick}>
                    <div className={styles.building_mobile_content}>
                        <ModuleBuilding mobileBorderColor={mobileBorderColor} changeMobileBorderColor={changeMobileBorderColor}>
                            <ModuleBuildingRender
                                moduleConfigData={moduleConfigData}
                                pageKey={currentPageKey}
                                pageConfig={currentPageConfig}
                                updatePageItem={updatePageItem}
                                activeItem={activeItemKey}
                                changeActiveItem={changeActiveItem}
                                itemClick={itemClick}
                                changeActivityItemProps={changeActivityItemProps}
                            />
                        </ModuleBuilding>
                    </div>
                </div>

                {/*右侧显示操作工具栏*/}
                <div className={styles.build_tool_cont}>
                    <ModuleToolBar
                        moduleConfigData={moduleConfigData}
                        moduleProps={moduleProps}
                        pageKey={currentPageKey}
                        pageConfig={currentPageConfig}
                        updatePageItem={updatePageItem}
                        activeItemKey={activeItemKey}
                        updateModuleProps={updateModuleProps}
                        updatePageProps={updatePageProps}
                        changeActiveItem={changeActiveItem}
                    />
                </div>
            </div>
        </div>

        </PageModal>
    );
}

export default ActivityModuleBuildComponent;
