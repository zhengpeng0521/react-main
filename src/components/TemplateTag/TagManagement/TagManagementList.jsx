import React from 'react';
import styles from './TagManagement.less';
import QueueAnim from 'rc-queue-anim';
import { BlockPicker } from 'react-color';
import {Table, Button,Select, Modal, Input, message, Spin,Icon,Form,Popconfirm,Popover } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

function TagManagementList({
        labelListContent,
        labelGroupListContent,
        addLabelFormVisible,
        addLabelButtonLoading,
        labelListType,
        AddOrEditLabelGroupsModal,  //添加或编辑标签组
        AddOrEditLabelModal,        //添加或编辑标签
        deleLabelGroups,            //删除标签组
        deleLabel,                  //删除标签
        moveLabelGroups,            //移动标签组
        moveLabel,                  //移动标签
        labelSubmit,                //修改或编辑提交
        labelGroupsIndex,           //选取标签组的索引
        handleAdCollectCancle,      //添加或编辑标签取消
        handleAdCollectSubmit,      //添加或编辑标签提交
        addOrEditlabel,             //添加或编辑变标签名的值
        onCheckLabelGroup,          //展开子标签

        form:{
            getFieldDecorator,
            validateFields,
            getFieldsValue,
            resetFields,
            getFieldValue,
            validateFieldsAndScroll,
            setFieldsValue,
        },
}) {

    function onAdCollectCancle(e) {
        e.preventDefault();
        handleAdCollectCancle && handleAdCollectCancle();
    }
    let laberPush = [];
    function onMoveUpDown(type,data){
        let array = labelGroupListContent;
        if(type == 'down'){
            if(data < array.length - 1){
                let current = array[data];
                let next = array[(data + 1)];
                //把当前变成下一个
                array.splice((data + 1),1,current);
                //下一个变成当前
                array.splice(data,1,next);
                moveLabelGroups(array,data + 1);
            }
        }else if(type == 'up'){
            if(data > 0){
                let current = array[data];
                let next = array[(data - 1)];
                //把当前变成上一个
                array.splice((data - 1),1,current);
                //上一个变成当前
                array.splice(data,1,next);
                moveLabelGroups(array,data - 1);
            }
        }
    }
    function onMoveChirldUnpDown(type,data){
         let labelArray = labelListContent;
        if(type == 'down'){
            if(data < labelArray.length - 1){
                let current = labelArray[data];
                let next = labelArray[(data + 1)];
                //把当前变成下一个
                labelArray.splice((data + 1),1,current);
                //下一个变成当前
                labelArray.splice(data,1,next);
                moveLabel(labelArray);
            }
        }else if(type == 'up'){
            if(data > 0){
                let current = labelArray[data];
                let next = labelArray[(data - 1)];
                //把当前变成上一个
                labelArray.splice((data - 1),1,current);
                //上一个变成当前
                labelArray.splice(data,1,next);
                moveLabel(labelArray);
            }
        }
    }

    function onAdCollectSubmit(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors,values) => {
            if (!!errors) {
                return;
            }
            handleAdCollectSubmit(values)
        });
    }

    let labelName = getFieldValue('labelName')|| addOrEditlabel;

    /*标签组渲染*/
    let labelGroupArry =  [];
    if(labelGroupListContent && labelGroupListContent.length > 0){
       labelGroupArry = labelGroupListContent.map((item,index) =>{
           if(labelGroupsIndex == index){
              return(
                    <div key ={item.id} className={styles.tag_main_warp} style={{color:'#000000',fontWeight:'600',fontSize:'18px',height:'50px',lineHeight: '50px'}}>
                        <div className={styles.tag_main_warpL} onClick={() => onCheckLabelGroup(item.id,index)}>
                            {item.groupName}
                        </div>
                        <div className={styles.tag_main_warpR}>
                            <a className={styles.tag_main_option} onClick={() => AddOrEditLabelGroupsModal('edit',item)}><Icon style={{fontSize:'20px'}} type="edit" /></a>
                            <Popconfirm title={<p>确定<strong style={{color:'red'}}>删除</strong>吗?</p>} onConfirm={() => deleLabelGroups(item)}>
                            <a className={styles.tag_main_option} ><Icon style={{fontSize:'20px'}} type="delete" /></a>
                            </Popconfirm>
                            <a className={styles.tag_main_option} onClick={() => onMoveUpDown('down',index)}><Icon style={{fontSize:'20px'}} type="arrow-down" /></a>
                            <a className={styles.tag_main_option} onClick={() => onMoveUpDown('up',index)}><Icon style={{fontSize:'20px'}} type="arrow-up" /></a>
                        </div>
                    </div>
                );
            }else{
                return(
                    <div key ={item.id} className={styles.tag_main_warp} onClick={() => onCheckLabelGroup(item.id,index)}>
                        <div className={styles.tag_main_warpL}>
                            {item.groupName}
                        </div>
                    </div>
                );
            }
       })
    }

    /*标签渲染*/
    let labelArry = [];

     if(labelListContent && labelListContent.length > 0){
       labelArry = labelListContent.map((item,index) =>{
              return(
                    <div key ={item.id} className={styles.tag_main_warp}>
                        <div className={styles.tag_main_warpL}>
                            {item.labelName}
                        </div>
                        <div className={styles.tag_main_warpR}>
                            <a className={styles.tag_main_option} onClick={() => AddOrEditLabelModal('edit',item)}><Icon style={{fontSize:'20px'}} type="edit"/></a>
                            <Popconfirm title={<p>确定<strong style={{color:'red'}}>删除</strong>吗?</p>} onConfirm={() =>  deleLabel(item)}>
                            <a className={styles.tag_main_option} ><Icon style={{fontSize:'20px'}} type="delete" /></a>
                            </Popconfirm>
                            <a className={styles.tag_main_option} onClick={() => onMoveChirldUnpDown('down',index)}><Icon style={{fontSize:'20px'}} type="arrow-down" /></a>
                            <a className={styles.tag_main_option} onClick={() => onMoveChirldUnpDown('up',index)}><Icon style={{fontSize:'20px'}} type="arrow-up" /></a>
                        </div>
                    </div>
                );
       })
    }
    return (
        <div className={styles.tag_list_content}>
            <div className={styles.tag_list_left}>
                <div className={styles.tag_title_left}>
                    <div className={styles.tag_icon_left}></div>
                    <div className={styles.tag_name_left}>标签名称</div>
                </div>
                <div className={styles.tag_main_left}>
                    {labelGroupArry || []}
                </div>
                <Button style={{float:'right'}} onClick={() => AddOrEditLabelGroupsModal('add')}><Icon type='plus'/>新增</Button>
            </div>
            <div className={styles.tag_list_right}>
                <div className={styles.tag_title_left}>
                    <div className={styles.tag_icon_right}></div>
                    <div className={styles.tag_name_right}>标签参数</div>
                </div>
                <div className={styles.tag_main_right}>
                    {labelArry || []}
                </div>
                <Button style={{float:'right'}} onClick={() => AddOrEditLabelModal('add')}><Icon type='plus'/>新增</Button>
            </div>
            {addLabelFormVisible?
            <Modal
                title="添加标签"
                visible={addLabelFormVisible}
                onOk={onAdCollectSubmit}
                onCancel={onAdCollectCancle}
                maskClosable={false}
            >
                <Form className='zyf_create_tag_modal'>
                    <FormItem
                        label="标签名称"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}
                    >
                        {getFieldDecorator('labelName', {
                            initialValue : addOrEditlabel || '',
                            rules: [
                                { required: true, message: '请填写标签名称' }],
                        })(
                            <Input type="text" placeholder='请填写标签名称' />
                        )}
                    </FormItem>
                </Form>
            </Modal>
             :
                null
            }
        </div>
    );
}

export default Form.create()(TagManagementList);
