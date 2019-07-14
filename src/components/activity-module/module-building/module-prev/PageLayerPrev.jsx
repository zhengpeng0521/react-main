import React, {PropTypes} from 'react';
import styles from './PageLayerPrev.less';
import {Icon,Tooltip,} from 'antd';

/*
 * 模板编辑页面-H5显示框架
 */
function PageLayerPrev({
    pageKey,items,activeItemKey,changeActiveItem,deletePageItem,toPrevPageItem,toNextPageItem,copyPageItem,
}) {

    let itemArr = [];

    if(items && items.length > 0) {
        for(let i = (items.length-1); i >= 0; i--) {
            let itemObj = items[i];

            let {type,item_key} = itemObj;
            let layerPrev;
            //根据不同的类型显示图层
            if(type == 'text') {
                layerPrev = (
                    <div className={styles.layer_prev}>
                        <Icon type="file-text" className={styles.layer_prev_icon} />
                        <span className={styles.layer_prev_title}>{itemObj.text_content||'文本'}</span>
                    </div>
                );
            } else if(type == 'image') {
                layerPrev = (
                    <div className={styles.layer_prev}>
                        <Icon type="file-text" className={styles.layer_prev_icon} />
                        <span className={styles.layer_prev_title}>{itemObj.text_content||'图片'}</span>
                    </div>
                );
            } else if(type == 'button'){
                layerPrev = (
                    <div className={styles.layer_prev}>
                        <Icon type='file-text' className={styles.layer_prev_icon}/>
                        <span className={styles.layer_prev_title}>{itemObj.btn_content||'按钮'}</span>
                    </div>
                )
            }else{
                layerPrev = (
                    <div className={styles.layer_prev}>
                        <Icon type="file-text" className={styles.layer_prev_icon} />
                        <span className={styles.layer_prev_title}>{'文本'}</span>
                    </div>
                );
            }

            let deleteCont = (
                <div className={styles.layer_tool_cont}>
                    <Icon title='删除元素' type="delete" style={{cursor: 'pointer', marginLeft: '3px'}} onClick={()=>deletePageItem(pageKey, item_key)}/>
                    <Icon title='图层上移' type="arrow-up" style={{cursor: 'pointer', marginLeft: '8px'}} onClick={()=>toPrevPageItem(pageKey, item_key)}/>
                    <Icon title='图层下移' type="arrow-down" style={{cursor: 'pointer', marginLeft: '8px'}} onClick={()=>toNextPageItem(pageKey, item_key)}/>
                    <Icon title='复制元素' type="copy" style={{cursor: 'pointer', marginLeft: '8px'}} onClick={()=>copyPageItem(pageKey, item_key)}/>
                </div>
            );
            itemArr.push(
                <div key={'page_layer_item_'+i}
                   onClick={()=>changeActiveItem(item_key)}
                   className={item_key==activeItemKey ? styles.page_layer_item_active : styles.page_layer_item}>
                    <Tooltip placement="right" title={deleteCont}>
                        {layerPrev}
                    </Tooltip>
                </div>
            );
        }
    }

    return (
        <div className={styles.page_layers_cont} style={{height: 'calc(100vh - 190px)', overflowY: 'auto'}}>
            {itemArr}
        </div>
    );
}

export default PageLayerPrev;
