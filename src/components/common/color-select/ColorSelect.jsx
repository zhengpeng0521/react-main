import React, {PropTypes} from 'react';
import styles from './ColorSelect.less';
import { SketchPicker } from 'react-color';
import {Popover} from 'antd';

/*
 * 颜色选择组件
 */
class ColorSelect extends React.Component {
    constructor(props) {
        super(props);
        // 设置 initial state
        this.state = {
           visible : false,
           color: this.props.value || '#000',
        };

        this.handleChangeVisible = this.handleChangeVisible.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.value != this.props.value) {
            this.setState({
                color: nextProps.value,
            });
        }
    }

    handleChangeVisible(visible) {
        this.setState({
            visible
        });
    }

    handleChangeColor({rgb}) {
        let {r,g,b,a} = rgb;

        let color_value = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';

        this.setState({
            color: color_value,
        });
        this.props.onChange && this.props.onChange(color_value);
    }

    render() {

        let {visible,color,} = this.state;

        let {width,height,value,onChange,} = this.props;

        let colorSelectCont = (
            <SketchPicker color={color} onChange={this.handleChangeColor} />
        );

        return (
            <div className={styles.color_select_cont}>
                <Popover
                    content={colorSelectCont}
                    placement="left"
                    title={null}
                    trigger="click"
                    visible={visible}
                    onVisibleChange={this.handleChangeVisible}
                >
                    <div className={styles.color_select_btn}
                        style={{
                            width: (width || '40px'),
                            height: (height || '40px'),
                            backgroundColor: color,
                        }}
                    ></div>
                </Popover>
            </div>
        );

    }

}

export default ColorSelect;
