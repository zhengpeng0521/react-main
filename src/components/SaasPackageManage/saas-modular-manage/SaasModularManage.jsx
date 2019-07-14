import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon, Spin, Tree, Radio } from 'antd';
import styles from './SaasModularManage.less';

const TreeNode = Tree.TreeNode;
//saas模块管理
function SaasModularManage({
    /*模块列表*/
    modularResType,                     //模块类型(1机构/2总部)
    modularListLoading,                 //模块列表加载状态
    allModularList,                     //模块列表数据
    wetherSelectModularItem,            //选中模块的索引项

    ModularResTypeOnChange,             //切换系统类型(1机构/2总部)
    CheckModular,                       //查看模块中包含的子模块和菜单
    AddOrEditModular,                   //打开新增编辑模块modal,入参为类型('add'/'edit')
    SaveModularMenu,                    //对应模块菜单保存更新版本
    SaveModularMenuNotUpdate,           //对应模块菜单保存不更新版本

    /*菜单列表*/
    menuListLoading,                    //菜单加载状态
    allMenuList,                        //菜单列表内容
    menuCheckedArray,                   //选中的菜单
    secondListArray,                    //打开的树结构(默认是二级菜单)

    MenuListOnExpend,                   //点击展开菜单
    MenuListOnCheck,                    //选中菜单
}) {

    /*模块列表数据*/
    let modular = [];
    if(allModularList && allModularList.length > 0){
        modular = allModularList.map((item,index) => {
            //选中时的状态
            if(wetherSelectModularItem == index){
                return(
                    <div className={styles.modular} key={item.id} onClick={() => CheckModular(item,index)} style={{color:'#000',fontWeight:'600',fontSize:'18px',height:'50px',lineHeight: '50px'}}>
                        {item.name}
                        <a className={styles.operation} onClick={() => AddOrEditModular('edit',item)}>
                            编辑
                        </a>
                    </div>
                );
            }else{
                return(
                    <div className={styles.modular} key={item.id} onClick={() => CheckModular(item,index)}>
                        {item.name}
                        <a className={styles.operation} onClick={() => AddOrEditModular('edit',item)}>
                            编辑
                        </a>
                    </div>
                );
            }
        })
    }

    /*菜单列表数据*/
    const loopAllMenuList = data => data.map((item) => {
        if (item.list) {
            if(item.mainTitle == true){
                return <TreeNode title={<span style={{fontSize:'16px',color:'#666',lineHeight:'20px'}}>{item.name}</span>} key={item.id} >{loopAllMenuList(item.list)}</TreeNode>;
            }else{
                return <TreeNode title={<span style={{fontSize:'14px',color:'#666',lineHeight:'18px'}}>{item.name}</span>} key={item.id} >{loopAllMenuList(item.list)}</TreeNode>;
            }
        }else{
            return <TreeNode title={<span style={{fontSize:'14px',color:'#666'}}>{item.name}</span>} key={item.id} />
        }
    });

    return (
        <div className={styles.all}>
            <div className={styles.content}>
                <div className={styles.top_content}>
                    <div className={styles.black_block}></div>
                    <div className={styles.title}>模块</div>
                    <Radio.Group value = { modularResType } onChange = { ModularResTypeOnChange }>
                        <Radio value = '1'>机构</Radio>
                        <Radio value = '2'>总部</Radio>
                    </Radio.Group>
                </div>
                <Spin title='Loading' spinning={modularListLoading}>
                    <div className={styles.bottom_content}>
                            {modular || []}
                    </div>
                </Spin>
                <Button type='primary' size='default' style={{float:'right'}} onClick={() => AddOrEditModular('add')}><Icon type='plus'/>新增模块</Button>
            </div>

            <div className={styles.content}>
                <div className={styles.top_content}>
                    <div className={styles.black_block}></div><div className={styles.title}>菜单（默认展开二级菜单）</div>
                </div>
                <Spin title='Loading' spinning={menuListLoading}>
                    <div className={styles.bottom_content}>
                        <Tree
                            checkable
                            checkedKeys={menuCheckedArray}
                            expandedKeys={secondListArray}
                            onExpand={MenuListOnExpend}
                            onCheck={MenuListOnCheck}
                        >
                            { loopAllMenuList(allMenuList) || [] }
                        </Tree>
                    </div>
                </Spin>

                <Popconfirm title={<p>确定保存不更新版本吗</p>} onConfirm={() => SaveModularMenuNotUpdate()}>
                    <Button type='primary' size='default' style={{float:'left'}}><Icon type="star-o" />保存（不更新版本）</Button>
                </Popconfirm>

                <Popconfirm title={<p>确定保存并更新版本吗</p>} onConfirm={() => SaveModularMenu()}>
                    <Button type='primary' size='default' style={{float:'right'}}><Icon type="star-o" />保存（更新版本）</Button>
                </Popconfirm>
            </div>
        </div>
    );
}

export default SaasModularManage;
