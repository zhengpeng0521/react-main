import React, {PropTypes} from 'react';
import styles from './ModulePagePrev.less';
import {Button,Icon,} from 'antd';
import {moduleRenderParse} from '../../../../utils/micro-module/microModuleRenderUtil';

/*
 * 模板编辑页面-H5显示框架
 */
function ModulePagePrev({
    pages, pageType, currentPageKey, onCreatePage, onRemovePage, changeActivePage, onCopyPage,
}) {
    return (
        <div className={styles.page_prev_cont} style={{height: 'calc(100vh - 250px)', position: 'relative'}}>

           <div className={styles.page_item_list} style={{height: 'calc(100% - 40px)'}}>

           {pages && pages.map(function(pageItem, pageIndex) {
                let isActive = currentPageKey == pageItem.page_key;
                let bg_img = '';
                let bg_color = '';
                if(pageItem.props != undefined){
                    let bg_props = pageItem.props.bg || {};
                    bg_img = bg_props.bg_img || '';
                    bg_color = bg_props.bg_color || '';
                }
                return (
                    <div
                       key={'page_prev_item_' + pageIndex}
                       className={isActive ? styles.page_prev_item_active : styles.page_prev_item} >
                        <div className={styles.item_prev_cont} onClick={()=>changeActivePage(pageItem.page_key)} style={{
                                backgroundImage:'url('+bg_img+')',
                                backgroundSize:'100% 100%',
                                backgroundRepeat:'no-repeat',
                                backgroundColor:bg_color,
                                transform:'scale(0.12, 0.09)',
                                width: '750px',
                                height: '1334px',
                                position:'absolute',
                                left:'-312px',
                                top:'-600px',
                            }}>

                            {pageItem.items && pageItem.items.map(function(iitem, iindex) {
                                return (moduleRenderParse('2', iitem))
                            })}
                        </div>
                        <div className={styles.item_bar}>
                            <div className={styles.page_item_name} title={'第' + (pageIndex+1) + '个页面'}>
                                {pageIndex+1}
                            </div>
                            {!!(pageType == 'many') &&
                            <div className={styles.item_bar_cont}>
                                <Icon type="delete" title="删除当前页" className={styles.item_bar_icon} onClick={()=>onRemovePage(pageItem.index)}/>
                                <Icon type="copy" title="复制当前页" className={styles.item_bar_icon} onClick={()=>onCopyPage(pageItem.index)}/>
                                <Icon type="plus" title="增加一页" className={styles.item_bar_icon} onClick={()=>onCreatePage(pageItem.index)}/>
                            </div>
                            }
                        </div>
                    </div>
                )
            })}
            </div>

           {!!(pageType == 'many') &&
           <div className={styles.add_btn_cont}>
                <Button className={styles.add_btn} type="primary" onClick={()=>onCreatePage()}><Icon type="plus" /></Button>
            </div>
           }

        </div>
    );
}

export default ModulePagePrev;
