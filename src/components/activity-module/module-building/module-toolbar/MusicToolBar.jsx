import React, {PropTypes} from 'react';
import styles from './ToolBar.less';
import {Button, Tabs, Icon,Upload,InputNumber} from 'antd';
const TabPane = Tabs.TabPane;
/*
 *模板编辑工具栏-音乐工具
  {

  }
 */
function MusicToolBar({
pageKey, pageConfig, moduleProps, updateModuleProps, updatePageProps,
}){
    let props = moduleProps.props ||{};
    let music = props.music || {};
    let width = music.width || 0;
    let height = music.height || 0;
    let url = music.url || '';
    let fileName = music.name || '';
    let x = music.x || 0;
    let y = music.y || 0;
    let rotate = music.rotate || {};

     function handleMusicChange(musicUrl, fileName) {
        updateModuleProps && updateModuleProps({
            props: {
                ...props,
                music: {
                    ...music,
                    url: musicUrl,
                    name: fileName,
                }
            }
        });
     }
    return(
        <div className={styles.base_set_item}>
            <div className={styles.base_set_item_title}>
                页面音乐
            </div>
            <div className={styles.base_music_operate}>
                <div className={styles.base_music_operate_title}>上传音乐</div>
                <div className={styles.base_music_operate_content}>
                    <MusicBarSelect musicUrl={url||''} fileName={fileName||''} changeMusic={handleMusicChange}/>
                </div>
            </div>
    </div>
    )

}

/*
 * 音乐切换
 */
class MusicBarSelect extends React.Component {
    constructor(props) {
        super(props);

        // 设置 initial state
        let musicUrl = props.musicUrl;
        let fileName = props.fileName;
        let fileList = [];

        if(musicUrl && musicUrl.length > 0) {
            fileList.push({
               uid: -1,
                name: fileName,
              status: 'done',
              url: musicUrl,
           });
        }
        this.state = {
           fileList,
        };

        this.handleChangeFile = this.handleChangeFile.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.musicUrl != undefined && this.props.musicUrl != nextProps.musicUrl) {
            let musicUrl = nextProps.musicUrl;
            let fileName = nextProps.fileName;
            let fileList = [];
            if(musicUrl && musicUrl.length > 0) {
                fileList.push({
                   uid: -1,
                  status: 'done',
                    name: fileName,
                  url: musicUrl,
               });
            }
            this.setState({
               fileList,
            });
        }
    }

    handleChangeFile(info) {
        let {fileList} = info;
        this.setState({
            fileList
        });

        let musicUrl = '';
        let fileName = '';
        if(fileList && fileList.length > 0) {
            let file = fileList[0];
            let response = file.response;
            if(response && response.data) {
                musicUrl = response.data.url;
                fileName = response.data.fileName;
            }
        }
        this.props.changeMusic && this.props.changeMusic(musicUrl, fileName);
    }

    render() {
        let {fileList}  = this.state;

        return (
            <div className={styles.image_bar_select_cont}>
                <Upload
                  action={window.manager_platform == 'thinknode' ? '/thinknode/upload/file' : `${BASE_URL}/systemController/upload/file`}
                  fileList={fileList}
                  onChange={this.handleChangeFile}
                  withCredentials={true}
                >
                    {!!(fileList.length == 0) &&
                    <Button type='primary'>选择音乐</Button>
                    }
                </Upload>
            </div>
        );
    }
}
export default MusicToolBar;
