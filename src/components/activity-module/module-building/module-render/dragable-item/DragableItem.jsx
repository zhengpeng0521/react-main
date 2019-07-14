import React from 'react';
import Draggable from 'react-draggable';
import styles from './DragableItem.less';

class DragableItem extends React.Component {
    constructor(props) {
        super(props);

        // 设置 initial state
        this.state = {
            mouseState: 'normal',   //鼠标状态  normal 正常  over 鼠标在组件上方
            dragState: 'normal',    //拖拽状态  normal 正常  drag 正在拖拽中

            itemX: this.props.itemX || 0,
            itemY: this.props.itemY || 0,
        };

        // ES6 类中函数必须手动绑定
        this.onHover = this.onHover.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleStop = this.handleStop.bind(this);

        this.keyDownEvent = this.keyDownEvent.bind(this);

        this.handleScaleDrag = this.handleScaleDrag.bind(this);//元素编辑缩放的按钮拖动事件
    }

    onHover() {
        this.setState({
            mouseState: 'over'
        });
    }

    onMouseOut() {
        this.setState({
            mouseState: 'normal'
        });
    }

    handleStart(e, data) {
        this.props.changeDragData && this.props.changeDragData(data, this.props.drag_key);
        this.setState({
            dragState: 'drag'
        });
    }

    handleDrag(e, data) {
        let sacle_value = 2.0;

        let final_x = data.x * sacle_value;
        let final_y = data.y * sacle_value;
        this.setState({
            mouseState: 'drag',
            itemX: final_x,
            itemY: final_y,
        });
    }

    handleStop(e, data) {
        let sacle_value = 2.0;

        let final_x = data.x * sacle_value;
        let final_y = data.y * sacle_value;

        this.setState({
            mouseState: 'over',
            itemX: final_x,
            itemY: final_y,
        });

        this.props.changeProps && this.props.changeProps({x: final_x, y: final_y});
    }

    handleScaleDrag(e, data, scaleType) {
        let sacle_value = 2.0;
        let {x,y,deltaX,deltaY} = data;
        let {itemX, itemY, itemWidth, itemHeight, scale, changeProps} = this.props;
//        _('x= '+data.x, 'y= '+data.y, 'deltaX= '+data.deltaX, 'deltaY= '+data.deltaY, 'lastX= '+ data.lastX, 'lastY= '+ data.lastY);

        itemWidth = (parseFloat(itemWidth+'') + parseFloat(deltaX+'')) * sacle_value;
        itemHeight = (parseFloat(itemHeight+'') + parseFloat(deltaY+'')) * sacle_value;
        changeProps && changeProps({width: itemWidth, height: itemHeight});
    }

    keyDownEvent(e) {
        let keyCode = e.keyCode || '';
        let deat = 1;
        let deat2 = 20;

        if(keyCode == '38') {
            //方向键上
            this.props.changeActivityItemProps && this.props.changeActivityItemProps({y: -deat});
        } else if(keyCode == '40') {
            //方向键下
            this.props.changeActivityItemProps && this.props.changeActivityItemProps({y: deat});
        } else if(keyCode == '37') {
            //方向键左
            this.props.changeActivityItemProps && this.props.changeActivityItemProps({x: -deat});
        } else if(keyCode == '39') {
            //方向键右
            this.props.changeActivityItemProps && this.props.changeActivityItemProps({x: deat});
        } else if(keyCode == '87') {
            //方向键上
            this.props.changeActivityItemProps && this.props.changeActivityItemProps({y: -deat2});
        } else if(keyCode == '83') {
            //方向键下
            this.props.changeActivityItemProps && this.props.changeActivityItemProps({y: deat2});
        } else if(keyCode == '65') {
            //方向键左
            this.props.changeActivityItemProps && this.props.changeActivityItemProps({x: -deat2});
        } else if(keyCode == '68') {
            //方向键右
            this.props.changeActivityItemProps && this.props.changeActivityItemProps({x: deat2});
        }
    }

    componentDidMount() {
        //添加键盘监听事件
        let me = this;
        setTimeout(function() {
            if(window.drag_item_keydown_event == undefined) {
                document.onkeydown= me.keyDownEvent;
                window.drag_item_keydown_event = 1;
            }
        }, 500);
    }

    componentWillReceiveProps(nextProps) {
        let {itemX, itemY} = nextProps;
        this.setState({
            itemX, itemY
        });
    }

    render() {
        let {mouseState,dragState,itemX, itemY, } = this.state;

        let {scale, activiteDrag,itemClick,action_type,action_speed,action_delay,} = this.props;

        let activite_edit_flg = activiteDrag && (dragState == 'drag');//是否激活的正在编辑的元素

        let dragableStyle = {
            transform: 'rotate(' + scale + 'deg)',
            display: 'inline-block',
            transformOrigin: 'center center',
        };

        return (
            <Draggable
                axis="both"
                handle='.common_dragable_cls'
                cancel='.common_drag_scale_tool'
                position={{x: itemX, y: itemY}}

                grid={[10, 10]}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}
                >
                 <div className={activite_edit_flg ? 'common_dragable_cls common_dragable_draging' : 'common_dragable_cls common_dragable_nodrag'} style={activite_edit_flg ? {border: 0, margin: 0} : {}} onClick={itemClick}>
                     <div style={dragableStyle}>
                         {this.props.children}
                     </div>
                     <div className={activite_edit_flg ? 'common_drag_scale_cont' : styles.noraml_drag_sacle} style={{transform: 'rotate(' + scale + 'deg)'}}>
                         <DragScaleItem scaleType='common_drag_scale_size' handleDrag={this.handleScaleDrag} />
                     </div>
                 </div>
            </Draggable>
        );
    }
}

class DragScaleItem extends React.Component {
    constructor(props) {
        super(props);

        // 设置 initial state
        this.state = {
            dragState: 'normal',    //拖拽状态  normal 正常  drag 正在拖拽中
        };

        // ES6 类中函数必须手动绑定
        this.handleScaleDrag = this.handleScaleDrag.bind(this);//元素编辑缩放的按钮拖动事件
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);//元素编辑缩放的按钮拖动事件
    }

    handleScaleDrag(e, data) {
        let {scaleType} = this.props;
        this.props.handleDrag && this.props.handleDrag(e, data, scaleType);
    }

    handleStart(e, data) {
        this.setState({
            dragState: 'drag',
        });
    }

    handleStop(e, data) {
        this.setState({
            dragState: 'normal',
        });
    }

    render() {
        let {scaleType} = this.props;
        let {dragState} = this.state;
      return (
          <Draggable
            axis='both'
            handle='.common_drag_scale_tool'
            grid={[10, 10]}
            position= {{x: 0, y: 0}}
            onStart={this.handleStart}
            onDrag={this.handleScaleDrag}
            onStop={this.handleStop}
            >
            <div className={'common_drag_scale_tool ' + scaleType} style={dragState == 'normal' ? {opacity: '0.8'} : {opacity: '0'}}></div>
          </Draggable>
      );
    }
}

export default DragableItem;
