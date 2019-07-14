import React, {PropTypes} from 'react';
import styles from './ModuleBuildPrev.less';
import {Tabs} from 'antd';
import ModulePagePrev from './ModulePagePrev';
import PageLayerPrev from './PageLayerPrev';
import {objListSort} from '../../../../utils/arrayUtils';

const TabPane = Tabs.TabPane;

/*
 * 模板编辑页面-页面预览
 */
class ModuleBuildPrev extends React.Component {
    constructor(props) {
        super(props);

        // 设置 initial state
        this.state = {
           prevType : 'pages',//当前选中的工具栏类型
        };

        this.handleChangeToolType = this.handleChangeToolType.bind(this);
        this.parsePages = this.parsePages.bind(this);
    }

    handleChangeToolType(prevType) {
        this.setState({
            prevType
        });
    }

    /*格式化模板的页面*/
    parsePages(moduleConfigData) {
        let pages = [];
        if(moduleConfigData && moduleConfigData.pages && moduleConfigData.pages.length > 0) {
            pages = moduleConfigData.pages;
        }

        let sortPages = [];
        pages && pages.length > 0 && pages.map(function(pageItem) {
            sortPages.push(pageItem);
        });

        return objListSort(sortPages, 'seq_no');
    }

    render() {

        let {prevType} = this.state;

        let {moduleConfigData, currentPageKey, currentPageConfig, onCreatePage, onCopyPage,
             onRemovePage,changeActivePage,activeItemKey,changeActiveItem,deletePageItem,toPrevPageItem,toNextPageItem,copyPageItem,} = this.props;

        let {page_type} = moduleConfigData;

        let pages = this.parsePages(moduleConfigData);

        let items = (currentPageConfig && currentPageConfig.items) || [];

        return (
            <div className={styles.module_prev_cont}>
                <Tabs
                   activeKey={prevType}
                   onChange={this.handleChangeToolType}
                   >
                    <TabPane tab="页面" key="pages"  >
                        <ModulePagePrev
                            pages={pages}
                            pageType={page_type}
                            currentPageKey={currentPageKey}
                            onCreatePage={onCreatePage}
                            onCopyPage={onCopyPage}
                            onRemovePage={onRemovePage}
                            changeActivePage={changeActivePage} />
                    </TabPane>

                    <TabPane tab="图层" key="layers" >
                        <PageLayerPrev
                            items={items}
                            pageKey={currentPageKey}
                            activeItemKey={activeItemKey}
                            changeActiveItem={changeActiveItem}
                            deletePageItem={deletePageItem}
                            toPrevPageItem={toPrevPageItem}
                            toNextPageItem={toNextPageItem}
                            copyPageItem={copyPageItem}
                        />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default ModuleBuildPrev;
