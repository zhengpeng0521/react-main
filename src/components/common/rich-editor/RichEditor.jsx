import React from 'react';
import styles from './RichEditor.less';
import LzEditor from 'react-lz-editor';

class RichEditor extends React.Component{
    constructor(props){
		super(props);
        this.state = {
            html: props.value,
			imageList: [],
        }
		this.cbReceiver = this.cbReceiver.bind(this);
    }

    componentWillReceiveProps(nextProps) {
		if ('value' in nextProps) {
			let value = nextProps.value;
          	this.setState({
			  	html: value,
          	});
        }
    }


    componentWillUnmount() {
        this.setState({
            html: undefined,
        });
    }

    cbReceiver(content) {
    	this.setState({
    		html: content,
    		imageList: [],
    	});

    	this.props.onChange && this.props.onChange(content);
    }

    render() {

        let me = this;

    	let uploadProps = {
    		name: 'file',
			action: me.props.action || BASE_URL+'/systemController/upload',
	        listType: 'picture',
	        headers: {
	            authorization: 'authorization-text',
	        },
	        accept: 'image/*',
	        fileList: me.state.imageList,
		  	onChange(info) {
			    let fileList = info.fileList;
			    let new_fileList = [];
			    fileList && fileList.length > 0 && fileList.map(function(item, index) {
			    	if(item.status === 'done' && item.response && item.response.data) {
			    		item.url = item.response.data.url;
			    	}
			    });

			    me.setState({
			    	imageList: fileList,
			    });
		  	},
    	};

        return (
            <div className="common_rich_editor_cont">
				<LzEditor
					active={false}
                	importContent={me.state.html}
                	cbReceiver={me.cbReceiver}
                	uploadProps={uploadProps}
                	image={true}
                	video={false}
          			audio={false}
					fullScreen={false}
					autoSave={false}
					alignment={true}
					convertFormat="html"
                />
            </div>
        )
    }
}

export default RichEditor;
