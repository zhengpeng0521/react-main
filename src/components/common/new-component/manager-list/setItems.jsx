import React from 'react';
import { Menu, Dropdown, Icon, Checkbox } from 'antd';
const MenuItem = Menu.Item;
import styles from './SetItems.less';
const CheckboxGroup = Checkbox.Group;

class SetItems extends React.Component{

	constructor(props) {
        super( props );
		this.state = {
			visible      : false,
			selectedKeys : [],
		}

		/*手动绑定函数*/
		this.visibleChange = this.visibleChange.bind( this );
		this.onChange = this.onChange.bind( this );
    }

	visibleChange( visible ){
		this.setState({
			visible : visible
		})
	}

	onChange( selectedKeys ){
		this.setState({
			visible      : true,
			selectedKeys : selectedKeys
		})
		this.props.changeTableItems( selectedKeys )
	}

	render(){

		let columns = this.props.columns;
		let newColumns = this.props.newColumns;
		let columnKeys = [];
		if( !!this.props.newColumns && this.props.newColumns.length == 0 ){
			!!columns && columns.map( function( item, index ){
				if( index != 0 ){
					columnKeys.push( item.key )
				}
			})
		} else {
			!!newColumns && newColumns.map(function( item, index ){
				if( index != 0 ){
					columnKeys.push( item.key )
				}
			})
		}

		const checkbox = (
			<CheckboxGroup
				className = 'set_item_check_box'
				onChange = { this.onChange }
				defaultValue = { columnKeys }
			>
				{ columns && columns.map(function( item, index ){
					if( index != 0 ){
						return ( <Checkbox key = { 'contract_order_stu_' + item.key } value = { item.key }>{ item.title }</Checkbox> )
					}
				})}
			</CheckboxGroup>
		)

		return (
			<Dropdown
				overlay = { checkbox }
				trigger = {[ 'click' ]}
				onVisibleChange = { this.visibleChange }
				visible = { this.state.visible }
			>
				<div className = { styles.setting } >
					<div className = { styles.setting_img }></div>
				</div>
			</Dropdown>
		)
	}
}

export default SetItems;
