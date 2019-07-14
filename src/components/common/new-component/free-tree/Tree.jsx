/* 树状结构
 * @author 赵健
 * data array 数据源(平级) { id , name , pid }
 * limit number/string 数据源限制结构层数(默认无限制)
 * outClassName string/object 最外层className
 * itemHeight number/string 每一项的高度(默认28px)
 * itemMarginLeft number/string 子元素相对于父元素前面离开的距离(默认40px)
 * itemMarginBottom number/string 元素下边距(默认10px)
 * hoverLine hex,rgb... 鼠标经过时虚线的颜色
 * fatherHover object 鼠标经过时当前元素的属性(背景色,字体颜色)
 * fatherHoverSon object 鼠标经过时当前元素子元素的属性(背景色,字体颜色)
 */

import React from 'react';
import { Icon , message } from 'antd';
import { AlertModal } from '../NewComponent';
import QueueAnim from 'rc-queue-anim';
import styles from './Tree.less';
class FreeTree extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : JSON.parse(JSON.stringify(this.props.data)) || [],
            type : '',
            limit : !isNaN(this.props.limit + '') ? parseInt(this.props.limit) : 'infinite',
            animationType : this.props.animationType || 'top',
            outClassName : this.props.outClassName || undefined,
            outStyle : this.props.outStyle || {},
            itemHeight : this.props.itemHeight || 28,
            itemMarginLeft : this.props.itemMarginLeft || 40,
            itemMarginBottom : this.props.itemMarginBottom || 10,
            hoverLine : this.props.hoverLine || '#5d9ece',
            fatherHover : this.props.fatherHover || { bgColor : '#5d9cec' , color : '#fff' },
            fatherHoverSon : this.props.fatherHoverSon || { bgColor : '#e0f0ff' , color : '#666' },

            /*删除提示框*/
            alertModalVisible : false,          //提示框是否显示
            alertModalData : {},                //需要删除的数据，如果点击确定则传给外层
        }
    }

    //初始化参数
    initData(item,key,boolean){
        if(item[key] == undefined || item[key] == true || item[key] == ''){ item[key] = boolean }
    }

    componentWillReceiveProps(nextProps){
        //初始化数据中的data
        let data = [];
        if(!!nextProps && nextProps.data && nextProps.data.length > 0){
            data = JSON.parse(JSON.stringify(nextProps.data));
            for(let i = 0 , len = data.length ; i < len ; i++){
                this.initData(data[i],'open',true)
                this.initData(data[i],'wether_show',true)
            }
        }
        this.setState({ ...nextProps , data });
    }

    //找子节点
    findChild(pid,data){
        let arr = [];
        for(let i = 0 , len = data.length ; i < len ; i++){
            if(data[i].pid == pid){
                let obj = data[i];
                obj.children = this.findChild(obj.id,data);
                arr.push(obj);
            }
        }
        return arr;
    }


    //平级数据渲染
    transTreeData(data){
        if(data.length > 0){
            let pid = -1 //pid = -1，为最上层节点 ，即无父节点
            let parent = this.findChild(pid,data);//数组
            return parent;
        }else{
            return [];
        }
    }

    //收起打开menu
    openOrClose(item){
        let data = this.state.data;
        let allSonArr = this.getSonIdArr(item.id,[]);
        //将操作所有子元素和子元素的子元素...的wether_show设置为和当前元素的open一样
        for(let i = 0 , len = data.length ; i < len ; i++){
            if(allSonArr.indexOf(data[i].id) > -1){
                data[i].wether_show = !item.open;
                data[i].open = !item.open;
            }
        }
        //将当前元素的open设置为相反量，wether_show不变
        for(let i = 0 , len = data.length ; i < len ; i++){
            if(item.id == data[i].id){
                data[i].open = !data[i].open;
                return this.setState({ data })
            }
        }
    }

    //修改颜色方法和点击展开收起时使用(返回当前hover或点击对象的所有子元素和子元素的子元素...id)
    getSonIdArr(id,arr,besideId){
        let data = this.state.data;
        data && data.length > 0 && data.map((item,index) => {
            if(item.pid == id && id != besideId){
                arr.push(item.id);
                this.getSonIdArr(item.id,arr,besideId);
            }
        });
        return arr;
    }

    //鼠标移过离开事件
    onMouse(item,type){
        let { data , hoverLine , fatherHover , fatherHoverSon } = this.state;
        //鼠标经过当前元素改变
        for(let i = 0 , len = data.length ; i < len ; i++){
            if(item.id == data[i].id){
                data[i].bgColor = type == 'move' ? (fatherHover.bgColor || '#5d9cec') : null;
                data[i].color = type == 'move' ? (fatherHover.color || '#fff') : null;
                data[i].lineColor = type == 'move' ? (hoverLine || '#5d9cec') : null;
                break;
            }
        }
        //鼠标经过当前元素的子元素改变
        let sonId = this.getSonIdArr(item.id,[]);
        data && data.length > 0 && data.map((item,index) => {
            if(sonId.indexOf(item.id) > -1){
                item.bgColor = type == 'move' ? (fatherHoverSon.bgColor || '#e0f0ff') : null;
                item.color = type == 'move' ? (fatherHoverSon.color || '#666') : null;
                item.lineColor = type == 'move' ? (hoverLine || '#5d9cec') : null;
            }
        })
        this.setState({ data })
    }

    //增加子部门
    add(event,item){
        event.stopPropagation();        //阻止菜单展开收起事件
        this.props.onOperation && this.props.onOperation('create_son',item);
    }

    //编辑
    edit(event,item){
        event.stopPropagation();        //阻止菜单展开收起事件
        this.props.onOperation && this.props.onOperation('update',item);
    }

    //删除
    remove(event,item){
        event.stopPropagation();        //阻止菜单展开收起事件
        if(!!item.children && item.children.length > 0){
            return message.warn('该分类存在子类，无法删除');
        }
        this.setState({ alertModalData : item , alertModalVisible : true });
    }

    //确认删除
    removeConfirm(type){
        this.setState({ alertModalVisible : false });
        !!type && this.props.onOperation && this.props.onOperation('delete',this.state.alertModalData);     //type为true时说明点击确认可以提交
    }

    //递归渲染数组
    recursionLopo(data,formatHeight,formatMarginLeft,num){
        num++;
        let initialData = this.state.data;
        let limit = this.state.limit;
        let animationType = this.state.animationType;
        let allIdArr = [];
        initialData && initialData.map((item,index) => {
            allIdArr.push(item.id)
        })
        if(num <= limit || limit == 'infinite'){
            let marginBottom = this.state.itemMarginBottom;
            return data.map((item,index) => {
                //绝对定位的横线
                let lineHeng = <div className = { styles.item_line_heng } style = {{ top : (formatHeight/2) , left : (-formatMarginLeft/2) ,  width : (formatMarginLeft/2) , borderColor : item.lineColor }}></div>;
                if(!!item.children && item.children.length > 0){
                    //为了定位竖线的高度，除去最后一个子项的高度(不计算最后一个子项和子项的子项...的高度)，其余的是(父节点下边距+(open属性为true的子节点+子节点下边距)*子项的数量+最后一个子项的一半高度)
                    let lastSonId = item.children[item.children.length - 1].id;     //获取直属元素最后一个元素id
                    let sonArr = this.getSonIdArr(item.id,[],lastSonId);            //获取所有子元素(排除最后一个直属元素的子元素)
                    sonArr.splice(sonArr.indexOf(lastSonId),1);                     //删除最后一个直属元素id(至此删除直属元素及直属元素的所有子元素)
                    for(let i = 0 , flag = true , len = sonArr.length ; i < len ; flag ? i++ : i){
                        let sonIndex = allIdArr.indexOf(sonArr[i]);
                        if( sonIndex > -1 && (!initialData[sonIndex].wether_show) ){
                            sonArr.splice(i,1); flag = false;
                        }else{
                            flag = true;
                        }
                    }
                    //绝对定位的竖线
                    let lineShu = <div className = { styles.item_line_shu } style = {{ top : formatHeight , left : (formatMarginLeft/2) , height : (marginBottom + (formatHeight + marginBottom)*sonArr.length + formatHeight/2) , borderColor : item.lineColor }}></div>;
                    return(
                        <div
                            key = { item.id }
                            className = { styles.item }
                            style = { num == '1' && index < data.length - 1 ? { marginBottom : 16 } : null }>
                            { item.pid != -1 ? lineHeng : null }
                            { !!item.open ? lineShu : null }
                            <div
                                className = { styles.tree_render_item }
                                style = {{ height : formatHeight , marginBottom : marginBottom , background : item.bgColor , color : item.color }}
                                onClick = {() => this.openOrClose(item)}
                                onMouseOver = {() => this.onMouse(item,'move')}
                                onMouseOut = {() => this.onMouse(item,'out')}>
                                <div className = { styles.tree_render_item_name }>
                                    <Icon type = "caret-right" className = { !!item.open ? styles.item_icon_open : styles.item_icon_close } style = {{ opacity : num < limit ? 1 : 0 }}/>
                                    { item.name }
                                </div>
                                <div className = { styles.tree_render_item_operation }>
                                    { num < limit ? <Icon type="plus" className = { styles.operation_icon } onClick = {(event) => this.add(event,item)}/> : null }
                                    <Icon type = 'edit' className = { styles.operation_icon } onClick = {(event) => this.edit(event,item)}/>
                                    <Icon type = 'close' className = { styles.operation_icon } onClick = {(event) => this.remove(event,item)}/>
                                </div>
                            </div>
                            <QueueAnim
                                type={[animationType , animationType]}
                                ease={['easeOutQuart', 'easeInOutQuart']}>
                                { !!item.open ?
                                    <div className = { styles.item_content } style = {{ marginLeft : formatMarginLeft }} key = { num + '_son' }>
                                        { this.recursionLopo(item.children,formatHeight,formatMarginLeft,num) }
                                    </div>
                                    :
                                    null
                                }
                            </QueueAnim>
                        </div>
                    )
                }else{
                    return(
                        <div
                            key = { item.id }
                            className = { styles.item }
                            style = { num == '1' && index < data.length - 1 ? { marginBottom : 16 } : null }
                            onMouseOver = {() => this.onMouse(item,'move')}
                            onMouseOut = {() => this.onMouse(item,'out')}>
                            { item.pid != -1 ? lineHeng : null }
                            {/* !!item.open ? lineShu : null */}
                            <div
                                style = {{ height : formatHeight , marginBottom : marginBottom , background : item.bgColor , color : item.color }}
                                className = { styles.tree_render_item } /*onClick = {() => this.openOrClose(item)}*/>
                                <div className = { styles.tree_render_item_name }>
                                    <Icon type = 'caret-right' className = { !!item.open ? styles.item_icon_open : styles.item_icon_close } style = {{ opacity : 0 }}/>
                                    { item.name }
                                </div>
                                <div className = { styles.tree_render_item_operation }>
                                    { num < limit ? <Icon type="plus" className = { styles.operation_icon } onClick = {(event) => this.add(event,item)}/> : null }
                                    <Icon type = 'edit' className = { styles.operation_icon } onClick = {(event) => this.edit(event,item)}/>
                                    <Icon type = 'close' className = { styles.operation_icon } onClick = {(event) => this.remove(event,item)}/>
                                </div>
                            </div>
                        </div>
                    )
                }
            })
        }
    }

    render(){
        let { data , limit , type , outClassName , outStyle , itemHeight , itemMarginLeft , alertModalVisible , alertModalData } = this.state;
        return(
            <div className = { outClassName } style = {{ ...outStyle , width : 600 , minWidth : 600 }}>
                { this.recursionLopo(this.transTreeData(data),itemHeight,itemMarginLeft,0) }
                <AlertModal title = '删除' visible = { alertModalVisible } onOk = {() => this.removeConfirm(true)} onCancel = {(event) => this.removeConfirm(false)}>
                    { type == 'structure' ? <div>该部门下的校区将转移至<span style = {{ color : 'red' }}>其他</span>分类中</div> : null }
                    <div>确定删除<span style = {{ color : 'red' }}>{ alertModalData.name }</span>吗</div>
                </AlertModal>
            </div>
        )
    }
}

export default FreeTree;
