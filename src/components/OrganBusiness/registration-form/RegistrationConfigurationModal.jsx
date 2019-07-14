import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Cascader, message, Select, Checkbox, Upload, Icon, Radio ,Carousel } from 'antd';
import ColorSelect from './ColorSelect';
import positionArr from '../tenant-message/CascaderAddressOptions';
import style from './RegistrationForm.less';
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const Dragger = Upload.Dragger;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const formItemLayout2 = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 24,
  },
};
const formItemLayout3 = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 20,
  },
};

const formItemLayoutCode = {
    wrapperCol: { span: 24 },
};

/*配置表单*/
function RegistrationConfigurationModal({


    addConfigurationModalVisible,               //编辑添加配置表单modal是否显示
    addConfigurationModalButtonLoading,         //编辑添加配置表单modal按钮是否在加载状态

    AddConfigurationModalSubmit,            //编辑添加配置表单渠道提交
    AddConfigurationModalCancel,            //编辑添加配置表单渠道modal关闭
    formSet,                                //初始表单配置
    editConfigurationContent,               //编辑表单内容
    channelsId,                             //渠道id
    bannerListArry,                         //banner列表
    bannerName,
    isRegister,                             //是否注册/报名, true注册, false报名
    h5BgImg,
    extraFormSet,                               //额外表单
    addExtra,                                   //添加额外表单
    deleteExtra,                                //删除额外表单
    changeExtra,                                //type改变
    changeItem,                                 //选项改变
    changeLabel,                                //标题改变
    changeRequire,
    formStyleCfg,
    // otherFormCfg,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
        setFieldsValue,
    }

}){

//图片上传
    console.info('bannerName',bannerName);
    function normFile(e) {
        if (Array.isArray(e)) {
          return e;
        }
        if(e.fileList && e.fileList.length>0){
            e.fileList.map((item,index)=>{
                if( e.fileList[index].response &&e.fileList[index].response.data.url){
                     e.fileList[index].url = e.fileList[index].response.data.url;
                }
            })
        }
        return e && e.fileList;
    }
//选择图片按钮
    let uploadButton = (
      <div>
        <Icon type="plus" />
        <div className={style.select_picture_btn}>选择图片</div>
      </div>
    );

 //控制上传的图片格式和大小
    function imgMaxSize(file, fileList, size, title) {
        let fileSize = file.size;
        if(fileSize > 1048576 * size) {
            message.error(title + '不能大于' + size + 'M!');
            return false;
        }
        return true;
    }


    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors,values) => {
            if (!!errors) {
                return;
            }
            let data = [];
            let baseForm = '';
            let bannerMsg = [];
            let channelName = values.channelName;
            let isRegister = values.isRegister;
            let bannerList = getFieldValue('bannerList');
            let otherFormCfg = values.otherFormCfg;
            bannerList.map(function(item,index) {
                let bannerArr = {};
                let bannerImg_i = getFieldValue('bannerImg_'+item.key);
                let bannerUrl_i = getFieldValue('bannerUrl_'+item.key);
                if(bannerImg_i.length>0){
                    if(bannerImg_i[0].url){
                        bannerArr.bannerImg = bannerImg_i[0].url;
                     }else{
                        bannerArr.bannerImg = bannerImg_i[0].response.data.url;
                     }
                }else{
                    bannerArr.bannerImg = ''
                }
                bannerArr.bannerUrl = bannerUrl_i || '';
                bannerArr.id = item.id;
                bannerArr.bannerName = '';
                bannerMsg.push(bannerArr);
            });

            let myform = formSet;
            let options = values.options;
            let require = values.require;
            for(let i in myform){
                let arrItem = myform[i];
                arrItem.hide = 0;
                for(let j in  options){
                    if(options[j] == arrItem.name){
                        arrItem.hide = 1;
                        break;
                    }
                }
            }
            for(let i in myform){
                let arrItem = myform[i];
                arrItem.require = 0;
                for(let z in require){
                    if(require[z] == arrItem.name){
                        arrItem.require = 1;
                         break;
                       }
                    }
            }

            !!otherFormCfg && otherFormCfg.forEach((form, index) => {
                if(form.type == 'input'){
                    form.data = '';
                }
                if(form.require){
                    form.require = 1
                }else{
                    form.require = 0
                }
                form.hide = extraFormSet[index].hide;
                form.hint = extraFormSet[index].hint;
                form.name = extraFormSet[index].name;
                form.base = extraFormSet[index].base;
            })

            baseForm = myform;
            data.baseForm = {'id':channelsId,'customForm':'',baseForm:myform};
            data.bannerMsg = bannerMsg;
            data.formName = channelName;
            data.isRegister = isRegister;
            data.h5BgImg = bgImgUrl;
            data.otherFormCfg = otherFormCfg;
            data.formStyleCfg = {
                formBgColor: values.formBgColor,
                confirmBtnText: values.confirmBtnText,
                confirmBtnColor: values.confirmBtnColor
            }
            AddConfigurationModalSubmit(data);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        AddConfigurationModalCancel();
    }

//添加机构简介

    function addBanner(){
        let bannerList = getFieldValue('bannerList') || [];
        if(bannerList.length > 4){
            message.error('只能添加5张banner图');
            return;
        }
        if(bannerList.length > 0) {
            let maxItem = bannerList[bannerList.length -1] || {};
            let maxKey = maxItem.key || 0;
            bannerList.push({
                bannerUrl: '',
                bannerImg: '',
                key:maxKey+1,
            });
        }
        setFieldsValue({bannerList});
    }

//删除机构简介

    function moveBanner(moveKey){
        let bannerList = getFieldValue('bannerList') || [];
        let newBannerList = [];
        bannerList && bannerList.length > 0 && bannerList.map(function(item, index) {
            if(item.key != moveKey) {
                newBannerList.push(item);
            }
        });
        setFieldsValue({'bannerList': newBannerList});
    }
    let bannert = [{key:'k1',bannerUrl:'',bannerImg:''}];
    if(bannerListArry=='' && bannerListArry.length == 0){
        bannerListArry = undefined;
    }
    let bannerList = bannerListArry || bannert;
    let objInitBanner = [];
    let bannerRender = [];
    let bannerContent = [];

    bannerList && bannerList.length > 0 && bannerList.map(function(item, index) {
        objInitBanner.push({
            bannerUrl:item.bannerUrl,
            bannerImg:item.bannerImg,
            key: item.key || index,
            id: item.id || '0',
        });
    });


    getFieldDecorator('bannerList', {
        initialValue: objInitBanner,
    });
    let bannerArry =  getFieldValue('bannerList');

     bannerArry && bannerArry.length > 0 && bannerArry.map(function(banItem, banIndex) {
         let removeBanner = bannerArry.length > 1;
         let url = banItem.bannerUrl;
         let Img = [];
         if(banItem.bannerImg==''){
            Img = [];
         }else{
            Img = [{
              uid:(banIndex)*-1,
              url:banItem.bannerImg,
              status: 'done',
            }]
         }
         bannerContent.push(
                <div key={"banner_"+banItem.key} className={style.banner_list} style={{position:'relative'}}>
                    <FormItem
                        {...formItemLayout}
                        label='图片：'
                        key={'bannerImg' + banItem.key}
                        className={style.img_form_item}
                    >
                        {getFieldDecorator('bannerImg_' + banItem.key, {
                            initialValue:Img,
                            valuePropName: 'fileList',
                            normalize: normFile,
                            })(

                            <Upload
                                action={BASE_URL+'/systemController/upload'}
                                listType="picture-card"
                                beforeUpload={(file, fileList) => imgMaxSize(file, fileList, 2, '详情图片')}
                                >
                                    {getFieldValue('bannerImg_' + banItem.key) && getFieldValue('bannerImg_' + banItem.key).length >= 1 ? null : uploadButton}
                                </Upload>
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='连接：'
                        key={'bannerUrl' + banItem.key}
                        className={style.text_form_item}
                    >
                        {getFieldDecorator('bannerUrl_' + banItem.key, {
                            initialValue: url,
                        })(
                            <Input type='text' rows={2} placeholder='如http://www.ishanshan.com' style={{width: '90%'}}/>
                        )}
                    </FormItem>
                    {!!removeBanner &&
                            <a className={style.banner_dele} onClick={() => moveBanner(banItem.key)} style={{position: 'absolute',bottom:'0px',right:'0px'}}>删除</a>
                         }

                 </div>
         );
            let flag = getFieldValue('bannerImg_' + banItem.key);
            let img;
            if(flag == ''){
                img = "";
            }else{
                if(!!flag[0].url){
                    img = flag[0].url;
                }else if(flag[0].response && flag[0].response.data && flag[0].response.data.url){
                    img = flag[0].response.data.url;
                }

            }

            bannerRender.push(
                <div key={banItem.key} className={style.banner_img}>
                    {
                        img == "" ?
                        <div className={style.banner_text}>请添加banner图</div>
                        :
                        <div style={{backgroundImage:'url('+img+')',backgroundSize:'100% 100%',backgroundRepeat:'no-repeat',width:'100%',height:'100px'}}></div>
                    }
                </div>
            )

    });

    let preH5Img = [];
    let bgImgUrl = '';
    if(h5BgImg){
        preH5Img = [{
            uid:-1,
            url:h5BgImg,
            status: 'done',
        }]
        bgImgUrl = h5BgImg;
    }
    getFieldDecorator('bgImg', {
        initialValue:preH5Img || '',
    })
    let bgImg = getFieldValue('bgImg');

    if(bgImg){
        if(bgImg.length>0&&bgImg[0].response&&bgImg[0].response.data.url){
             bgImgUrl = bgImg[0].response.data.url;
             preH5Img =  [{
                uid:-1,
                url:bgImgUrl,
                status: 'done',
            }]
        }else if(bgImg[0] && bgImg[0].url){
            bgImgUrl = bgImg[0].url;
        }else{
            bgImgUrl = "";
        }
    }else{
         preH5Img =  [];
    }
    let bgCont =
        <FormItem
            {...formItemLayout}
                label='背景图片：'
                key={'bgImg'}
                 className={style.img_form_item}
            >
                {getFieldDecorator('bgImg', {
                    initialValue:preH5Img || '',
                    valuePropName: 'fileList',
                    normalize: normFile,
                })(
                    <Upload
                         action={BASE_URL+'/systemController/upload'}
                         listType="picture-card"
                         beforeUpload={(file, fileList) => imgMaxSize(file, fileList, 2, '详情图片')}
                        >
                            {getFieldValue('bgImg') && getFieldValue('bgImg').length >= 1 ? null : uploadButton}
                    </Upload>
                )}
        </FormItem>;
    let schoolTypeArr = formSet[3].data;
    let formContent = [];
    let require = [];
    let initValue = [];
    let giveForm = editConfigurationContent;
    let formArry =  giveForm || formSet;
    for(let i in formArry){
        formContent.push({
            label : formArry[i].label,
            value : formArry[i].name,
            disabled : (formArry[i].base == '1')
        });

        if(formArry[i].hide == '1'){
            initValue.push(formArry[i].name);
        }
        if(formArry[i].require == '1'){
            require.push(formArry[i].name);
        }
    }
    let bannerLeft = [];
    let extraFormLeft = [];
    let cityRequire = true;
    let addressRequire = true;
    let orgNeedRequire = true;
    let bannerPull =  getFieldValue('options') || initValue;
    let required = getFieldValue('require') || require; //是否为必填
    let num = [];
    bannerPull && bannerPull.length > 0 && bannerPull.map(function(item ,index){
        required && required.length > 0 && required.map(function(itema,indexa){
            if(item == itema){
                num.push(itema);
            }
        })

    })
    num && num.length > 0 && num.map(function(item,index){
        if(item == 'city'){
            cityRequire = false;
        }else if(item == 'address'){
            addressRequire = false;
        }else if(item == 'orgNeed'){
            orgNeedRequire = false;
        }
    })
    bannerPull && bannerPull.length > 0 && bannerPull.map(function(item ,index){
        if(item == 'orgName'){
            bannerLeft.push(
                 <div className={style.input_organ_box} key = {index}>
						<div className={style.h5_label}><span style={{color:"red"}}>*</span>机构名称</div>
						<div className={style.h5_input}>
						   <FormItem {...formItemLayout2}>
							  {getFieldDecorator('orgName', {
							  })(
								   <Input placeholder="请输入机构名称" />
							   )}
							</FormItem>
						</div>
					</div>
            )
        }else if(item == 'tel'){
                 bannerLeft.push(
                    <div key = {index}>
                        <div className={style.input_organ_box}>
                            <div className={style.h5_label}><span style={{color:"red"}}>*</span>联系电话</div>
                            <div className={style.h5_input}>
                               <FormItem {...formItemLayout2}>
                                  {getFieldDecorator('personPhone', {

                                  })(
                                       <Input style={{width:'100%'}} placeholder="请输入联系电话" type="number" />
                                   )}
                                </FormItem>
                            </div>
					   </div>

                        <div className={style.input_organ_box}>
                            <div className={style.h5_label}><span style={{color:"red"}}>*</span>验证码</div>
                            <div className={style.h5_input_code}>
                                <FormItem {...formItemLayoutCode}>
                                    {getFieldDecorator("verificationCode", {

                                    })(
                                        <Input placeholder="请输入验证码" type="number"/>
                                    )}
                                </FormItem>
                            </div>
							<div className={style.h5_code_f1f1f1}>验证码</div>
                        </div>
                    </div>
                )
        }else if(item == 'userName'){
                bannerLeft.push(
                    <div key={index} className={style.input_organ_box} key = {index}>
						<div className={style.h5_label}><span style={{color:"red"}}>*</span>联系人</div>
						<div className={style.h5_input}>
						   <FormItem {...formItemLayout2}>
							  {getFieldDecorator('personName', {

							  })(
								   <Input placeholder="请输入联系人" />
							   )}
							</FormItem>
						</div>
					</div>
                )
        }else if(item == 'city'){
             bannerLeft.push(
                     <div key={index}  className={style.input_organ_box} key = {index}>
						<div className={style.h5_label}>{cityRequire?" ":<span style={{color:"red"}}>*</span>}详细地址</div>
						<div className={style.h5_input}>
						   <FormItem {...formItemLayout2}>
							  {getFieldDecorator('city', {
                            })(
                               <Cascader style={{width: '100%',border: 'none',marginTop:"4px"}} placeholder="请输入地址" options={positionArr} changeOnSelect size='default'/>
                            )}
							</FormItem>
						</div>
					</div>
                )
        }else if(item == 'orgType'){
            bannerLeft.push(
                    <div key = {index}>
                        <div className={style.input_organ_box}>
                            <div className={style.h5_label}><span style={{color:"red"}}>*</span>机构类型</div>
                            <div className={style.h5_input}>
                               <FormItem {...formItemLayout2}>
                                  {getFieldDecorator('organType', {

                                  })(
                                        <Select
                                            placeholder="请选择机构类型"
                                        >
                                            {
                                                schoolTypeArr&&schoolTypeArr.map((item, index) => {
                                                    return <Option key={index} value={item.value} className={style.h5_option}>{item.value}</Option>
                                                })
                                            }
                                        </Select>
                                  )}
                                </FormItem>
                            </div>
                        </div>
                    </div>
                )
        }else if(item == 'address'){
             bannerLeft.push(
                    <div key={index}  className={style.input_organ_box} key = {index}>
						<div className={style.h5_label}>{addressRequire?" ":<span style={{color:"red"}}>*</span>}邮箱</div>
						<div className={style.h5_input}>
						   <FormItem {...formItemLayout2}>
							  {getFieldDecorator('address', {

							  })(
								   <Input style={{width:'100%'}} placeholder="请输入邮箱" />
							   )}
							</FormItem>
						</div>
					</div>
                )
        }else if(item == 'orgNeed'){
                bannerLeft.push(
                  <div key={index}  className={style.input_organ_box} key = {index}>
						<div className={style.h5_label}>{orgNeedRequire?" ":<span style={{color:"red"}}>*</span>}机构需求</div>
						<div className={style.h5_input}>
						   <FormItem {...formItemLayout2}>
							  {getFieldDecorator('demand', {

							  })(
								   <Input style={{width:'100%'}} placeholder="机构需求" />
							   )}
							</FormItem>
						</div>
					</div>
                )
        }
    })
    extraFormSet && extraFormSet.length > 0 && extraFormSet.map((extra, key) => {
        if(extra.type == 'input'){
            extraFormLeft.push(
                <div key={key}  className={style.input_organ_box}>
                    <div className={style.h5_label}>{!extra.require?" ":<span style={{color:"red"}}>*</span>}{extra.label}</div>
                    <div className={style.h5_input}>
                        <FormItem {...formItemLayout2}>
                            <Input style={{width:'100%'}} placeholder={extra.hint} />
                        </FormItem>
                    </div>
                </div>
            )
        }else if(extra.type == 'select'){
            let opts = extra.data.split(',')

            extraFormLeft.push(
                <div key={key}  className={style.input_organ_box}>
                    <div className={style.h5_label}>{!extra.require?" ":<span style={{color:"red"}}>*</span>}{extra.label}</div>
                    <div className={style.h5_input}>
                        <FormItem {...formItemLayout2}>
                            <Select
                                placeholder={extra.hint}
                            >
                                {
                                    opts && opts.map((item, index) => {
                                        return <Option key={index} value={item} className={style.h5_option}>{item}</Option>
                                    })
                                }
                            </Select>
                        </FormItem>
                    </div>
                </div>
            )
        }
    })

//模态框的属性
    let modalOpts = {
        title: '编辑表单',
        maskClosable : false,
        visible : addConfigurationModalVisible,
        closable : true,
        width : 900,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" onClick={handleCancel}>取消</Button>,
            <Button key="submit" type="primary"
                    onClick={handleComplete}
                    disabled={addConfigurationModalButtonLoading}
                    loading={addConfigurationModalButtonLoading}
                    style={{marginLeft:'10px'}}>保存</Button>
        ],
        className : ''
    };

    /*检验是否只输入了空格*/
    function checkWetherSpace(rule, value, callback){
        if(value == '' || value == undefined || value == null){
            callback();
        }else if(/^[u4E00-u9FA5]+$/.test(value)){
            callback(new Error('输入不能为空'));
        }else{
            callback();
        }
    }


    if(window._initcarousel == undefined) {
        window._initcarousel = true;
        bannerRender.push(
            <div key='-1' className={style.banner_img}></div>
        );
        bannerLeft.push(<div key='-1' className={style.banner_img}></div>)
    }

    /**删除当前额外表单 */
    function deleteExtraAction(index){
        let otherFormCfg = [...getFieldValue('otherFormCfg')]
        otherFormCfg.splice(index, 1)
        deleteExtra(otherFormCfg, resetFields)
    }

    let extraForm = extraFormSet && extraFormSet.map((item, index) => {
        let label = index == 0 ? '其他' : `其他${index}`;

        return (
            <div key={`extra_${index}`} className={style.extraBox}>
                <FormItem
                    {...formItemLayout}
                    label="表单类型"
                >
                    { getFieldDecorator('otherFormCfg['+index+'].type', {
                        initialValue : item.type || 'input'
                    })(
                        <RadioGroup onChange={changeExtra.bind(this, index)}>
                            <Radio value="input">输入框</Radio>
                            <Radio value="select">选择框</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="表单标题"
                >
                    { getFieldDecorator('otherFormCfg['+index+'].label', {
                        initialValue : item.label || label,
                        rules : [
                            { required: true, message: '请填写表单标题' },
                        ]
                    })(
                        <Input placeholder='请填写表单标题' size='default' style={{width: '90%'}} onChange={changeLabel.bind(this, index)} />
                    )}
                </FormItem>
                <a className={style.extraDelete} onClick={deleteExtraAction.bind(this, index)}>删除</a>
                {getFieldValue('otherFormCfg['+index+'].type') == 'select' ? <FormItem
                    {...formItemLayout}
                    label="选项"
                >
                    { getFieldDecorator('otherFormCfg['+index+'].data', {
                        initialValue : item.data || '选项1',
                        rules : [
                            { required: true, message: '请填写表单选项' },
                        ]
                    })(
                        <Input placeholder='请填写表单选项(逗号隔开)' size='default' style={{width: '90%'}} onChange={changeItem.bind(this, index)} />
                    )}
                </FormItem> : null}
                <FormItem
                    {...formItemLayout}
                    label=""
                >
                    { getFieldDecorator('otherFormCfg['+index+'].require', {
                        initialValue : item.require == 1,
                    })(
                        <Checkbox style={{marginLeft: 92}} checked={item.require == 1} onChange={changeRequire.bind(this, index)}>是否必填</Checkbox>
                    )}
                </FormItem>
            </div>
        )
    });

    let newStyle = !!getFieldValue('formBgColor') ? {background: getFieldValue('formBgColor')} : {};

    let btnStyle = !!getFieldValue('confirmBtnColor') ? {background: getFieldValue('confirmBtnColor')} : {};

    let btnText = !!getFieldValue('confirmBtnText') ? getFieldValue('confirmBtnText') : '申请试用';

    return (
        <div>
            <Modal {...modalOpts}>
                <Form className={style.formLeft}>
                    <div className={style.form_left} style={newStyle}>
                        <div className={style.form_worp}>
                            <div className={style.form_banner}>
                                <Carousel autoplay dots='false'>
                                    {bannerRender}
                                </Carousel>
                            </div>
                            {!!(bannerLeft && bannerLeft.length > 0) &&
                            <div className={style.form_config}>
                                {bannerLeft}
                                {extraFormLeft}
                            </div>
                            }
                            <div className={style.form_btn}>
                                <div id="registeredRelative" className={style.h5_registered_cont} style={btnStyle}>{btnText}</div>
                            </div>
                            <div>
                                {
                                    bgImgUrl?<img src={bgImgUrl} style={{width:"100%"}}/>:""
                                }
                            </div>
                        </div>
                    </div>

                    <div className={style.form_right}>
                        <div >
						  <span>表单名称:</span>
					    </div>
                        <FormItem
                            label="名称"
                            {...formItemLayout}
                            style={{lineHeight:'12px'}}
                        >
                            {getFieldDecorator('channelName', {
                                initialValue : bannerName || '' ,
                                rules: [
                                    { required: true, message: '请填写表单名称' },{validator: checkWetherSpace},
                                ],
                            })(
                                <Input type="text" placeholder='请填写表单名称' size='default'/>
                            )}
                        </FormItem>
                        <div >
						  <span>是否注册:</span>
					    </div>
                        <FormItem
                            label="注册类型"
                            {...formItemLayout}
                            style={{lineHeight:'12px'}}
                            extra={'是否是机构申请注册, 还是单纯的报名表单'}
                        >
                            {getFieldDecorator('isRegister', {
                                initialValue : isRegister || 'true' ,
                                rules: [
                                    { required: true, message: '请选择表单注册类型' }
                                ],
                            })(
                                <RadioGroup>
                                    <Radio value="true">注册</Radio>
                                    <Radio value="false">报名</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <div >
						  <span>banner设置:</span>
					    </div>
                        {bannerContent && bannerContent.length > 0 && bannerContent}
                        <FormItem
                            {...formItemLayout}
                            label=""
                        >
                            <div className={style.banner_addBtn}>
                                <Button type="dashed" style={{ width: '50%' }} onClick={addBanner}>
                                    <Icon type="plus" />添加banner
                                </Button>
                            </div>
                        </FormItem>
                        <div >
						  <span>表单样式设置:</span>
					    </div>
                        <FormItem
                            {...formItemLayout}
                            label="背景颜色"
                        >
                            { getFieldDecorator('formBgColor' , {
                                initialValue : formStyleCfg.formBgColor || '#f1f1f1',
                                rules : [
                                    { required: true, message: '请填写背景颜色' },
                                ]
                            })(
                                <ColorSelect width='95px' height='20px' />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="按钮文案"
                        >
                            { getFieldDecorator('confirmBtnText' , {
                                initialValue : formStyleCfg.confirmBtnText || '申请试用',
                                rules : [
                                    { required: true, message: '请填写按钮文案' },
                                ]
                            })(
                                <Input placeholder='请填写按钮文案' size='default' />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="按钮颜色"
                        >
                            { getFieldDecorator('confirmBtnColor' , {
                                initialValue : formStyleCfg.confirmBtnColor || '#88c70a',
                                rules : [
                                    { required: true, message: '请填写按钮颜色' },
                                ]
                            })(
                                <ColorSelect width='95px' height='20px' />
                            )}
                        </FormItem>
                        <div >
						  <span>背景图片设置:</span>
					    </div>
                        {bgCont}
                        <div >
						  <span>表单设置:</span>
					    </div>
                        <FormItem
                        label="收集信息"
                        { ...formItemLayout }
                        >
                        { getFieldDecorator('options' , {
							initialValue : initValue,
							rules : [
								{ type: 'array', required: true, message: '请选择表单选项' },
							]
						})(
							<CheckboxGroup options={ formContent || []} />
						)}
                        </FormItem>
                        <FormItem
                        label="选填必填"
                        { ...formItemLayout }
                        >
                        { getFieldDecorator('require' , {
							initialValue : num,
							rules : [
								{ type: 'array', required: true, message: '请选择表单选项' },
							]
						})(
							<CheckboxGroup options={ formContent || []} />
						)}
                        </FormItem>
                        <div style={{marginLeft: '70px', color: 'red',}}>
                            （注意：机构名称，联系人，手机号码为必填）
                        </div>
                        <div >
						  <span>额外表单设置:</span>
					    </div>
                        {extraForm}
                        <FormItem
                            {...formItemLayout}
                            label=""
                        >
                            <div className={style.banner_addBtn}>
                                <Button type="dashed" style={{ width: '50%' }} onClick={addExtra}>
                                    <Icon type="plus" />添加额外表单
                                </Button>
                            </div>
                        </FormItem>
                    </div>

                </Form>
            </Modal>
        </div>
    );
}
export default Form.create()(RegistrationConfigurationModal);
