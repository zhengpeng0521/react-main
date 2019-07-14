/* treeSelect课件分类下拉列表查询
 * @author 赵健
 */

import React from 'react';
import { TreeSelect } from 'antd';
import Media from 'react-media';
import styles from './TreeSelectCourseware.less';
const TreeNode = TreeSelect.TreeNode;

class TreeSelectCourseware extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            courseware : undefined,             //显示值
            loading : false,                    //是否加载中
            listContent : [],
            allow_clear : false,
        }
    }

    componentWillReceiveProps(nextProps) {
        let value = nextProps && nextProps.value ? nextProps.value : undefined;
        this.setState({ courseware : value });
    }

    componentDidMount(){
        let me = this;
        serviceRequest(`${BASE_URL}/crm/hq/coursewareCategory/catTree`, {},
            function(ret) {
                me.setState({ listContent : ret.results })
            }
        );
    }

    onChange(value){
        this.setState({ courseware : value });
        this.props.onChange && this.props.onChange(value)
    }

    onSelect(value, node, extra){
        this.setState({ courseware : value });
        this.props.onSelect && this.props.onSelect(value,node.props.title)
    }

    formatData(data){
        let courseware = this.state.courseware;
        return(
            data && data.map((item,index) => {
                if(item.children && item.children.length > 0) {
                    return (
                        <TreeNode key = { item.id } title = { item.name } value = { item.id } disabled = { !item.choosable || courseware == item.id || this.props.value == item.id }>
                            { this.formatData(item.children) }
                        </TreeNode>
                    );
                }else{
                    return <TreeNode key = { item.id } title = { item.name } value = { item.id } disabled = { !item.choosable || courseware == item.id || this.props.value == item.id }/>;
                }
            })
        )
    }

    render(){
        let { listContent , courseware , allow_clear } = this.state;
        let renderListContent = this.formatData(listContent);
        return(
            <Media query="(max-width: 1350px)">
                { matches => matches ?
                    (<TreeSelect
                        showSearch
                        treeDefaultExpandAll
                        style = {{ width: this.props.width || 200 }}
                        dropdownStyle = {{ maxHeight: 400, overflow: 'auto' }}
                        value = { courseware || this.props.value || undefined }
                        placeholder = "请选择课件分类"
                        allowClear = { allow_clear }
                        onChange = {(value) => this.onChange(value)}
                        onSelect = {(value, node, extra) => this.onSelect(value, node, extra)}
                        disabled = { this.props.disabled || false }
                        searchPlaceholder = "查询课件分类"
                        treeNodeFilterProp = 'title'
                        notFoundContent = '没有分类'
                        getPopupContainer = { this.props.getPopupContainer || document.getElementById('body') }
                      >
                          <TreeNode value = "all_courseware" title = "所有分类" key = "all_courseware" disabled>
                              { renderListContent }
                          </TreeNode>
                    </TreeSelect>)
                    :
                    (<TreeSelect
                        showSearch
                        treeDefaultExpandAll
                        style = {{ width: this.props.width || 300 }}
                        dropdownStyle = {{ maxHeight: 400, overflow: 'auto' }}
                        value = { courseware || this.props.value || undefined }
                        placeholder = "请选择课件分类"
                        allowClear = { allow_clear }
                        onChange = {(value) => this.onChange(value)}
                        onSelect = {(value, node, extra) => this.onSelect(value, node, extra)}
                        disabled = { this.props.disabled || false }
                        searchPlaceholder = "查询课件分类"
                        treeNodeFilterProp = 'title'
                        notFoundContent = '没有分类'
                        getPopupContainer = { this.props.getPopupContainer || document.getElementById('body') }
                      >
                          <TreeNode value = "all_courseware" title = "所有分类" key = "all_courseware" disabled>
                              { renderListContent }
                          </TreeNode>
                    </TreeSelect>)}
            </Media>
        )
    }
}

export default TreeSelectCourseware;
