import React, {PropTypes} from 'react';
import {Upload,Icon} from 'antd';
import styles from '../ToolBar.less';


/*
 *图片类型-图片切换组件
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

        if(this.props.imgurl != undefined && this.props.imgurl != nextProps.imgurl) {
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

        this.props.changeImage && this.props.changeImage(img_url);
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

export default ImageBarUpdate;
