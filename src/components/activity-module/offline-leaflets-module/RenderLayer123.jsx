import React, { Component } from 'react';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {Icon} from 'antd';
import Card from './Card';

const style = {
	height : '210px',
	width : '190px',
   	border: '1px #cccccc solid',
    marginLeft: '50px',
	overflow: 'auto',
};

const iconImage = {
	height : '20px',
	width: '17px',
	float: 'right',
    marginTop: '3px',
	marginRight: '10px',
}

const itemHerder = {
	marginTop: '400px',
    width: '190px',
    height: '25px',
    lineHeight: '25px',
    paddingLeft: '10px',
    color: '#666',
	backgroundColor: '#f1f1f1',
	marginLeft: '50px',
	paddingLeft: '10px',
    borderTop: '1px #cccccc solid',
    borderLeft: '1px #cccccc solid',
    borderRight: '1px #cccccc solid',
}


const itemFooter = {
	width: '190px',
    height: '25px',
	lineHeight: '25px',
    paddingLeft: '10px;',
	backgroundColor:' #f1f1f1',
	marginLeft: '50px',
    borderBottom: '1px #cccccc solid',
    borderLeft: '1px #cccccc solid',
    borderRight: '1px #cccccc solid',
}

@DragDropContext(HTML5Backend)

export default class Container extends Component {
	constructor(props) {
    	super(props);
    	this.moveCard = this.moveCard.bind(this);
		this.endDrag = this.endDrag.bind(this);	 
		this.changeElementvisibility = this.changeElementvisibility.bind(this);
    	this.state = {
      		cards: props.cords,
    	};
  	}

  	moveCard(dragIndex, hoverIndex) {
	  	  
    	const { cards } = this.state;
		
    	const dragCard = cards[dragIndex];

    	this.setState(update(this.state, {
      		cards: {
        		$splice: [
			  		[dragIndex, 1],
			  		[hoverIndex, 0, dragCard],
				],
			},
    	}));
  	}
	
	endDrag(param) {
		this.props.funcNewElementLocation(param);
	}

	changeDelectElement() {
		_(11);	
	}
	
	changeCopyElement() {
		_(22);	
	}
	
	changeElementvisibility(value, index) {
		this.props.funcChangeElementVisbisilety(value, index);
	}
	
  	render() {
    	const { cards } = this.state;
			
		return (
			<div>
				<div style={itemHerder}>图层列表</div>
				<div style={style}>
					{cards.map((card, i) => (
						<Card
							key={card.index}
							index={i}
							id={card.index}
							text={card.key}
							item={card.item}
							moveCard={this.moveCard}
							endDrag={this.endDrag}
							changeElementvisibility={this.changeElementvisibility}
						/>
					))}
				</div>
				<div style={itemFooter}>
				 	<Icon type="delete" title="删除元素" style={iconImage} onClick={this.changeDelectElement} />
					<Icon type="copy" title="复制元素" style={iconImage} onClick={this.changeCopyElement}  />
				</div>
			</div>
		);
	}
}