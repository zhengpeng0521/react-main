/*
 * 微活动模板编辑
 */
export default {

  namespace: 'activityModuleBuildModel',

  state: {
      moduleConfigData: {},//整个模板的配置项
      currentPageKey: '',//当前操作的页面键
      currentPageConfig: {},//当前操作的页面配置
      activeItemKey: '',//当前正在编辑的元素
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {

    updateState(state, action) {
        return { ...state, ...action.payload };
    },

    /*改变模板基础属性*/
    updateModuleProps(state, action) {
        let {props} = action.payload;
        let {moduleConfigData} = state;
        moduleConfigData = {...moduleConfigData, ...props};
        return { ...state, moduleConfigData };
    },

    /*删除页内元素*/
    deletePageItem(state, action) {
        let {pageKey, itemKey} = action.payload;
        let {moduleConfigData, currentPageConfig} = state;

        let pages = moduleConfigData.pages;

        if(pages && pages.length > 0) {
            pages.map(function(pageItem, pageIndex) {
                if(pageItem.page_key == pageKey) {

                    //编辑元素
                    let items = pageItem.items;

                    if(items == undefined) {
                        items = [];
                    }
                    let new_items = [];
                    for(let i in items) {
                        let iitem = items[i];
                        if(iitem.item_key != itemKey) {
                            new_items.push(iitem);
                        }
                    }
                    pageItem.items = new_items;
                    currentPageConfig = pageItem;
                }

            });
        }

        return { ...state, moduleConfigData, currentPageConfig, };
    },

    /*改变模板单页基础属性*/
    updatePageProps(state, action) {
        let {pageKey, props} = action.payload;
        let {moduleConfigData, currentPageConfig} = state;

        let pages = moduleConfigData.pages;

        if(pages && pages.length > 0) {
            pages.map(function(pageItem, pageIndex) {
                if(pageItem.page_key == pageKey) {
                    let oldPageProps = pageItem.props;

                    if(oldPageProps == undefined) {
                        oldPageProps = {};
                    }

                    pageItem.props = {...oldPageProps, ...props};
                    currentPageConfig = pageItem;
                }

            });
        }

        return { ...state, moduleConfigData, currentPageConfig, };
    },

    /*切换正在编辑的元素*/
    changeActiveItem(state, action) {
        let {itemKey} = action.payload;
        return { ...state, activeItemKey: itemKey };
    },

    /*编辑元素*/
    updatePageItem(state, action) {
        let {pageKey, itemKey, itemValue} = action.payload;
        let {moduleConfigData,currentPageConfig} = state;

        let pages = moduleConfigData.pages;

        if(pages && pages.length > 0) {
            pages.map(function(pageItem, pageIndex) {
                if(pageItem.page_key == pageKey) {

                    //编辑元素
                    let items = pageItem.items;

                    if(items == undefined) {
                        items = [];
                    }

                    if(itemKey == undefined || itemKey == '') {
                        itemValue.item_key = items.length + '';
                        items.push(itemValue);
                    } else {
                        for(let i in items) {
                            let iitem = items[i];
                            if(iitem.item_key == itemKey) {
                                let newItem = {...iitem, ...itemValue};
                                items[i] = newItem;
                            }
                        }
                    }
                    pageItem.items = items;
                    currentPageConfig = pageItem;
                }
            });
        }

        return { ...state, moduleConfigData, currentPageConfig, };
    },

    /*切换当前编辑页面*/
    changeActivePage(state, action) {
        let {pageKey} = action.payload;
        let {moduleConfigData,currentPageKey,currentPageConfig} = state;

        let pages = moduleConfigData.pages;
        if(pages && pages.length > 0) {
            pages.map(function(pageItem, pageIndex) {
                if(pageItem.page_key == pageKey) {
                    currentPageConfig = pageItem;
                    currentPageKey = pageKey;
                }
            });
        }

        return { ...state, currentPageKey, currentPageConfig, activeItemKey: '' };
    },

    /*删除某页*/
    onRemovePage(state, action) {
        let {fromIndex} = action.payload;
        let {moduleConfigData,currentPageKey,currentPageConfig,activeItemKey} = state;
        let isRemoveCurrentPage = false;
        let pages = moduleConfigData.pages;
        if(pages && pages.length > 0) {
            let newPages = [];
            pages.map(function(pageItem, pageIndex) {
                if(pageItem.index != fromIndex) {
                    newPages.push(pageItem);
                } else {
                    isRemoveCurrentPage = pageItem.page_key == currentPageKey;
                }
            });
            moduleConfigData.pages = newPages;
            if(isRemoveCurrentPage) {
                currentPageKey = '';
                currentPageConfig = {};
                activeItemKey = '';
            }
        }

        return { ...state, moduleConfigData, currentPageKey, currentPageConfig, };
    },

    /*在某一页后面增加一页*/
    onCreatePage(state, action) {
        let {fromIndex} = action.payload;

        let {moduleConfigData,currentPageKey,currentPageConfig} = state;

        let pages = moduleConfigData.pages;
        let newPageKey = '0';//新建页面的Key
        let newPageIndex = 0;
        let newPageSeqno = 0;

        if(pages && pages.length > 0) {
            let lastItem = pages[pages.length-1];
            let lastIndex = lastItem.index;
            newPageIndex = lastIndex + 1;
            newPageKey = newPageIndex + '';
            if(fromIndex == undefined) {
                //添加到最后一页
                newPageSeqno = newPageIndex;
            } else {
                let fromItem = {};

                pages.map(function(pageItem, pageIndex) {
                    if(pageItem.index == fromIndex) {
                        fromItem = pageItem;
                    }
                });

                let fromSeqNo = fromItem.seq_no;
                newPageSeqno = fromSeqNo + 1;

                pages.map(function(pageItem, pageIndex) {
                    if(pageItem.seq_no > fromSeqNo) {
                        pageItem.seq_no = pageItem.seq_no + 1;
                    }
                });
            }
        } else {
            pages = [];
        }

        currentPageKey = newPageKey;
        currentPageConfig = {
            index: newPageIndex,
            page_key: newPageKey,
            seq_no: newPageSeqno,
            items: [],
        };
        pages.push(currentPageConfig);

        moduleConfigData.pages = pages;


        return { ...state, moduleConfigData, currentPageKey, currentPageConfig, activeItemKey: ''};
    },

  },

};
