import React, {PropTypes} from 'react';
import styles from './ToolBar.less';
import {Button, Tabs, Upload, Icon, Slider, InputNumber, Checkbox, } from 'antd';
import CommonPropsBuildComponent from './CommonPropsBuildComponent';
import {getImageInfo} from '../../../../utils/imageUtil';

const TabPane = Tabs.TabPane;

/*
 * 模板编辑工具栏-图片工具栏

 {
    item_key: '',
    type: 'image',
    x: 0,
    y: 0,
    width: 200,
    height: 80,
    scale:  0,
    img_url: 'http://img.ishanshan.com/gimg/img/dafc0da13fc9f62dc6f17b0018eeaf31',
 }
 */
function ImageToolbar({
    pageKey,activeItemKey,activeItem,propsType,updatePageItem,changePropType,
}) {

    function addImage(imgurl) {
        //异步取得图片的尺寸  按比例生成图片
        let imageInfo = getImageInfo(imgurl);
        imageInfo.then(function(imageObj) {

            let realWidth = imageObj.width;
            let realHeight = imageObj.height;

            updatePageItem && updatePageItem(pageKey, '',
             {
                item_key: '',
                type: 'image',
                x: 0,
                y: 0,
                width: realWidth,
                height: realHeight,
                scale:  0,
                img_url: imgurl,
             });
        });
    }

    function changeImgItem(img_url) {
        updatePageItem && updatePageItem(pageKey,activeItemKey, {img_url});
    }

    function changeBorderRadius(value) {
        updatePageItem && updatePageItem(pageKey, activeItemKey, {img_border_radius: value});
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

    let img_url = activeItem.img_url;
    let img_border_radius = activeItem.img_border_radius;

    return (
        <div className={styles.toolbar_cont}>
           {(activeItemKey == undefined || activeItemKey == '') ?
            <div className={styles.add_iamge_bar_cont}>
                <div className={styles.bar_cont_title}>模板编辑工具栏-图片工具栏</div>
                <div className={styles.bar_content}>
                    <ImageBarSelect onSelectPicture={addImage}/>
                </div>
            </div>
            :
            <CommonPropsBuildComponent {...propsComponent} >
                <div className={styles.text_bar_content}>
                    <div className={styles.bar_content_line}>
                        <ImageBarUpdate imgurl={img_url} changeImgItem={changeImgItem}/>
                    </div>

                    <div className={styles.bar_content_line}>
                        <div className={styles.prop_title}>图片圆角</div>
                            <Slider
                                className={styles.props_slider} min={0} max={100}
                                onChange={changeBorderRadius} value={img_border_radius||0} />
                            <div className={styles.prop_value}>
                                <InputNumber
                                    min={0}
                                    max={100}
                                    style={{width: '100%'}}
                                    value={img_border_radius||0}
                                    onChange={changeBorderRadius}
                                  />
                            </div>
                    </div>
                </div>
            </CommonPropsBuildComponent>
           }

        </div>
    );
}

/*
 * 图片类型-图片切换
 */
class ImageBarUpdate extends React.Component {
    constructor(props) {
        super(props);

        // 设置 initial state
        let imgurl = props.imgurl;
        let fileList = [];

        if(imgurl && imgurl.length > 0) {
            fileList.push({
               uid: -1,
              status: 'done',
              url: imgurl,
           });
        }
        this.state = {
           fileList,
        };

        this.handleChangeImage = this.handleChangeImage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.imgurl != nextProps.imgurl) {
            let imgurl = nextProps.imgurl;
            let fileList = [];
            if(imgurl && imgurl.length > 0) {
                fileList.push({
                   uid: -1,
                  status: 'done',
                  url: imgurl,
               });
            }
            this.setState({
               fileList,
            });
        }
    }

    handleChangeImage(info) {
        let {fileList} = info;
        this.setState({
            fileList
        });

        let img_url = '';
        if(fileList && fileList.length > 0) {
            let file = fileList[0];
            let response = file.response;
            if(response && response.data) {
                img_url = response.data.url;
            }
        }

        this.props.changeImgItem && this.props.changeImgItem(img_url);
    }

    render() {
        let {fileList}  = this.state;
        let {onSelectPicture} = this.props;

        return (
            <div className={styles.image_bar_select_cont}>
                <Upload
                    action={window.manager_platform == 'thinknode' ? '/thinknode/upload/image' : `${BASE_URL}/systemController/upload`}
                  listType="picture-card"
                  fileList={fileList}
                  onChange={this.handleChangeImage}
                  withCredentials={true}
                >
                    {!!(fileList.length == 0) &&
                    <div>
                        <Icon type="plus" />
                        <div className="ant-upload-text">Upload</div>
                    </div>
                    }
                </Upload>
            </div>
        );
    }
}

/*
 * 图片类型-选择图片
 */
class ImageBarSelect extends React.Component {
    constructor(props) {
        super(props);

        // 设置 initial state
        this.state = {
           fileList : [],
        };

        this.handleChangeImage = this.handleChangeImage.bind(this);
    }

    handleChangeImage(info) {
        let {fileList} = info;
        this.setState({
            fileList
        });

    }

    render() {
        let {fileList}  = this.state;
        let {onSelectPicture} = this.props;

        return (
            <div className={styles.image_bar_select_cont}>
                <Upload
                    action={window.manager_platform == 'thinknode' ? '/thinknode/upload/image' : `${BASE_URL}/systemController/upload`}
                  listType="picture"
                  fileList={fileList}
                  onChange={this.handleChangeImage}
                  withCredentials={true}
                  showUploadList={false}
                >
                  <Button icon="cloud-upload-o">选择图片</Button>
                </Upload>

                <div className={styles.img_prev_list}>

                    {fileList.map(function(item, index) {

                        let response = item.response;
                        let imgurl = '';
                        if(response && response.data) {
                            imgurl = response.data.url;
                        }
                        if(imgurl != undefined && imgurl != '') {
                            return (
                                <div key={'img_prev_item_'+index} className={styles.img_prev_item}
                                   onClick={()=>{
                                        onSelectPicture && onSelectPicture(imgurl)
                                    }}
                                >
                                    <img  className={styles.img_prev_content} src={imgurl}/>
                                </div>
                            )
                        }
                    })}

                </div>
            </div>
        );
    }
}

export default ImageToolbar;
