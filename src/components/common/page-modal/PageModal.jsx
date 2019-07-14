import React from 'react';
import {Icon,Popconfirm,} from 'antd';
import styles from './PageModal.less';

/*
 * 侧边滑动出现的弹框
 * 用于显示一些比较长的页面
 */
function PageModal({visible, title='标题', children, onClose, maskClosable=true, width='600px', footer}) {
    let pageModalProps = {
        visible,maskClosable,onClose,
    };

    return (
        <div className={visible ? 'form_modal_box form_modal_box_open' : 'form_modal_box form_modal_box_close'} id='common_form_modal_box'>

          <div className={visible ? 'form_modal_page form_modal_page_active' : 'form_modal_page'} style={{width}}>
              <div className={styles.form_modal_header}>

                   <div className={styles.header_title_text} id='common_form_modal_header'>
                       {title}
                   </div>

                   <div className={styles.header_close_btn} >
                       {!!visible && <FormModalCloseIcon {...pageModalProps}/>}
                   </div>
               </div>

               <div className={styles.form_modal_content} id='common_form_modal_content' style={footer ? {width: '100%', height: 'calc(100% - 80px)'} : {width: '100%', height: 'calc(100% - 30px)'}}>
                 <div className={styles.form_modal_warp}>
                     <div className={styles.form_modal_body}>
                          {children}
                      </div>
                 </div>
               </div>

               {!!footer &&
               <div className={styles.formal_modal_footer}>
                    {footer.map(function(footerItem, footerIndex) {
                         return (
                            <div className={styles.footer_item} key={'footer_item_' + footerIndex}>
                                <Popconfirm
                                   key={'footer_popconfirm_' + footerIndex}
                                   arrowPointAtCenter={true}
                                   title={footerItem.msg}
                                   onConfirm={footerItem.handle}
                                   okText="确定" cancelText="取消">
                                    {footerItem.component}
                                 </Popconfirm>
                             </div>
                        )
                     })}
               </div>
               }
          </div>

        </div>
    );
}

class FormModalCloseIcon extends React.Component {
    constructor(props) {
        super(props);

        // 设置 initial state
        this.state = {
            iconType: 'close'
        };

        // ES6 类中函数必须手动绑定
        this.onHover = this.onHover.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.otherClick = this.otherClick.bind(this);
        this.handleOnClose = this.handleOnClose.bind(this);
    }

    componentDidMount() {
        let me = this;
        setTimeout(function() {
            window.addEventListener('click', me.otherClick, false);
        }, 500);

        //弹框区域内的点击事件阻止冒泡
        document.getElementById('common_form_modal_content').addEventListener('click', function(e) {
            e.isInComponent = true;
//            e.stopPropagation();
        });
        document.getElementById('common_form_modal_header').addEventListener('click', function(e) {
            e.isInComponent = true;
//            e.stopPropagation();
        });
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.otherClick, false);
    }

    otherClick(e) {
        let isInComponent = e && e.isInComponent;//是否在组件内部的点击事件
        let {visible,maskClosable,onClose} = this.props;
        if(!isInComponent && visible && maskClosable) {
            onClose && onClose();
        }
    }

    onHover() {
        this.setState({
            iconType: 'close-square'
        });
    }

    onMouseOut() {
        this.setState({
            iconType: 'close'
        });
    }

    handleOnClose(e) {
        this.props.onClose && this.props.onClose();
    }

    render() {
        return (
			<Popconfirm
			   key="key"
			   placement="bottomRight"
			   title="确定要关闭吗?"
			   onConfirm={this.handleOnClose}
			   okText="确定" cancelText="取消">
            	<Icon type={this.state.iconType} onMouseOver={this.onHover} onMouseOut={this.onMouseOut}/>
			</Popconfirm>
        );
    }
}

export default PageModal;
