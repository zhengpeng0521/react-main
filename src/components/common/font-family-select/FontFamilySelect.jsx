import React, {PropTypes} from 'react';
import styles from './FontFamilySelect.less';
import { SketchPicker } from 'react-color';
import {Select} from 'antd';

const Option = Select.Option;

/*
 * 字体选择组件
 */
class FontFamilySelect extends React.Component {
    constructor(props) {
        super(props);

        // 设置 initial state
        this.state = {
           family: this.props.value || '思源黑体',
        };

        this.handleChangeValue = this.handleChangeValue.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.value != this.props.value) {
            this.setState({
                family: nextProps.value,
            });
        }
    }

    handleChangeValue(value) {
        this.setState({
            family: value,
        });
        this.props.onChange && this.props.onChange(value);
    }

    render() {

        let {family} = this.state;

        let {width,height,value,onChange,} = this.props;

        return (
            <div className={styles.family_select_cont}>
                <Select value={family} className={styles.family_select} onChange={this.handleChangeValue}>
                  <Option value="思源黑体">思源黑体</Option>
                  <Option value="宋体">宋体</Option>
                  <Option value="仿宋">仿宋</Option>
                  <Option value="楷体">楷体</Option>
                  <Option value="黑体">黑体</Option>
                  <Option value="saasfont_font1">毛笔</Option>
                  <Option value="saasfont_font2">风行书</Option>
                  <Option value="saasfont_font3">熊孩子体</Option>
                  <Option value="saasfont_font4">测试字体</Option>
                </Select>
            </div>
        );

    }

}

export default FontFamilySelect;
