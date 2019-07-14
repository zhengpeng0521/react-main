import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import styles from './RenderLayer.less';

const style = {
	width: '155px',
	overflow: 'hidden',
	float: 'left',
	textOverflow: 'ellipsis',
	height: '20px',
	textIndent: '10px',
  	cursor: 'move',
};

const itemBox = {
	height : '20px',
	width : '100%',
	borderBottom: '1px #f1f1f1 solid',
}

const visibilityBox = {
	width : '20px',
	height : '20px',
	marginLeft: '10px',
	float: 'left',
	borderRightColor: '#f1f1f1',
	borderRightStyle: 'solid',
	borderRightWidth: '1px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	paddingRight: '5px',
	cursor: 'pointer',
}

const hiddenIcon = {
	width : '15px',
	height : '10px',
	backgroundSize: '100% 100%',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center',
}

const showIcon = {
	width : '15px',
	height : '10px',
	backgroundSize: '100% 100%',
	backgroundRepeat:' no-repeat',
	backgroundPosition: 'center',
	backgroundImage: 'url(http://img.ishanshan.com/gimg/img/7e519fdc6239d45790a0c4ec8d0f2bac)',
}

const itemText = {
    width: '155px',
    overflow: 'hidden',
    float: 'left',
    textOverflow: 'ellipsis',
    height: '20px',
	textIndent: '10px',
}

const itemTextSelect = {
	width: '155px',
    overflow: 'hidden',
    float: 'left',
    textOverflow: 'ellipsis',
    height: '20px',
	textIndent: '10px',
	backgroundColor: '#f1f1f1',
}


const cardSource = {
	
	beginDrag(props) {		
    	return {
			id: props.id,
      		index: props.index,
    	};
  	},
	
	endDrag(props, monitor, component) {
		 
		//拖拽结束
		props.endDrag(props);		 
	}
};

const cardTarget = {
	
	hover(props, monitor, component) {
		
		const dragIndex = monitor.getItem().index;
		
		const hoverIndex = props.index;

		if (dragIndex === hoverIndex) {
		  return;
		}

    	const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

   	 	const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

   		const clientOffset = monitor.getClientOffset();

    	const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    	if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      		return;
    	}

    	if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      		return;
    	}

    	props.moveCard(dragIndex, hoverIndex);
				
		monitor.getItem().index = hoverIndex;
  	},
};

@DropTarget('card', cardTarget, connect => ({
  	connectDropTarget: connect.dropTarget(),
}))

@DragSource('card', cardSource, (connect, monitor) => ({
  	connectDragSource: connect.dragSource(),
  	isDragging: monitor.isDragging(),
}))

export default class Card extends Component {
	
  	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		item: PropTypes.any.isRequired,
		text: PropTypes.string.isRequired,
		moveCard: PropTypes.func.isRequired,
		changeElementvisibility : PropTypes.func.isRequired,
  	};


	render() {		
		
    	const { index, item, text, isDragging, connectDragSource, connectDropTarget } = this.props;
				
		const opacity = isDragging ? 0 : 1;

		return connectDragSource(connectDropTarget(
			<div style={{ ...itemBox, opacity }}>
				<div style={{ ...visibilityBox }} onClick={this.props.changeElementvisibility.bind(this, item.visibility, index)}>
					<div style={item.visibility ? showIcon : hiddenIcon}></div>
				</div>
				<div style={ item.visibility ? itemTextSelect : itemText }>
					{item.type == 'image' ? '图片' : item.type == 'qrImage' ? '二维码' : item.value}
				</div>
			</div>
    	));
  	}
}