import React, { PropTypes } from 'react';
import { Form, Input, Modal,Button, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const ChartsIntro = ({
    formLoading, formVisible,formCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

    function handleCancel(e) {
        e.preventDefault();
        formCancel();
    }
    const modalOpts = {
        title: '说明',
        visible : formVisible,
        onCancel : handleCancel,
        maskClosable : false,
        closable : true,
        footer : [
            <Button key="cancel" type="primary" size="large" onClick={handleCancel}>关闭</Button>,
        ],
    };

    return (
        <Modal {...modalOpts}>
            <p>
                1.上方搜索框可以<strong>“自定义时间”</strong>，注意结束日期不可超过当日日期，并且日期跨度不宜过大，防止表格数据密集不易观察。<br/><br/>
                2.点击<strong>“昨日”</strong>，<strong>“近7日”</strong>，<strong>“近30日”</strong>可快速选择表格和折线图可视类型。<br/><br/>
                3.点击<strong>“数字表格下方左边选项”</strong>，可以查看对应表格的图表数据。<br/><br/>
                4.点击<strong>“X轴Y轴对调”</strong>可将图表的X轴与Y轴对调观看。<br/><br/>
                5.点击准星选项可选择<strong>“准星类型”</strong>，点击关闭取消准星功能，默认关闭。<br/><br/>
                6.点击悬停选项可选择<strong>“悬停类型”</strong>，当鼠标在折线节点悬停时可看到当前数据或者所有的数据，<strong>默认显示节点自身</strong>。<br/><br/>
                7.将鼠标放置于<strong>“图表中节点处”</strong>即可显示详细信息，点击右侧<strong>对应折线描述</strong>可控制相应折线是否显示。<br/><br/>
                8.表格中<strong>“滑动左鼠”</strong>可圈住选项，随后可放大所圈选项以便详细观看，点击<strong>恢复缩放</strong>即可回复原来大小。<br/><br/>
                9.如若想导出图表可点击<strong>“图表右上角导出栏”</strong>。<br/><br/>
                10.<strong>折线图右方</strong>可明确颜色所代表的含义，点击可<strong>取消显示</strong>或者<strong>再次显示</strong>此折线。<br/><br/>
                11.点击折线图右下角<strong>“www.ishanshan.com”</strong>可进入<strong>闪闪官网</strong>。
            </p>
        </Modal>
    );
};

ChartsIntro.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formVisible : PropTypes.any,
    formCancel : PropTypes.func,
};

export default Form.create()(ChartsIntro);
