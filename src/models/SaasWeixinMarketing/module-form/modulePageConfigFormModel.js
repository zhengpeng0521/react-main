import {message} from 'antd';
import { parse } from 'qs';
import {moduleFormDetail,moduleFormSubmit,} from '../../../services/SaasWeixinMarketing/moduleFormService';
/*
 * 自定义模板的页面配置数据表单
 */
export default {

  namespace: 'modulePageConfigFormModel',

  state: {
      visible: false,//控制是否显隐
      loading: false,//控制是否加载中
      formData: {},//表单初始数据

      moduleConfigData: {},//整个模板的配置项
      currentPageKey: '',//当前操作的页面键
      currentPageConfig: {},//当前操作的页面配置
      activeItemKey: '',//当前正在编辑的元素

      mobileBorderColor: '#5D9CEC',
},

  effects: {
    *handleShow({ payload }, { call, put }) {

        let formDataId = payload && payload.formDataId;

        let formData = {};
        let moduleConfigData = {};
        let currentPageKey = '';
        let currentPageConfig = {};
        let activeItemKey = '';
        let pageInit ={
            index:0,
            page_key:'0',
            seq_no:0,
            items:[],
        }
        if(formDataId != undefined && formDataId != '') {
            //查询模板详情
            yield put({
                type: 'updateState',
                payload: {
                    loading: true,
                }
            });
            let params = {id: formDataId};
            let {ret} = yield call( moduleFormDetail, parse(params));
			
            if( ret && ret.errorCode == 9000 ){
                formData = {...ret};
                formData.type = formData.type || '';

                let mainCfg = ret.mainCfg || '';
                let detailData = ret.detailData || '';

                if(mainCfg != undefined && mainCfg != '') {
                    moduleConfigData = JSON.parse(mainCfg);
                } else {
                    moduleConfigData.id = ret.id || '';
                    moduleConfigData.name = ret.title || '';
                    moduleConfigData.type = ret.type || '';
                    moduleConfigData.page_type = ret.page_type || '';
                }

                let pages = [pageInit];
                if(detailData != undefined && detailData != '') {
                    pages = JSON.parse(detailData);
                }

                moduleConfigData.pages = pages;

                if(pages && pages.length > 0) {
                    let firstPage = pages[0];
                    currentPageKey = firstPage && firstPage.page_key;
                    currentPageConfig = firstPage;
                }
            } else {
                message.error((ret && ret.errorMessage) || '模板不存在或者已经被删除');
                return false;
            }
        }

        yield put({
            type: 'updateState',
            payload: {
                visible: true,
                loading: false,
                formData,
                moduleConfigData,currentPageKey,currentPageConfig,activeItemKey,
            }
        });
    },

        /*保存基本属性*/
        *handleSubmit({ payload }, { call, put, select }) {
            let values = (payload && payload.values) || {};
            let afterSubmit = payload && payload.afterSubmit;

            let modulePageConfigFormModel = yield select(state => state.modulePageConfigFormModel);
            let { formData,moduleConfigData } = modulePageConfigFormModel;

            yield put({
                type : 'updateState',
                payload : {
                    loading: true,
                }
           });

            let mainCfg = moduleConfigData;
            let detail_data = moduleConfigData.pages;
            mainCfg.pages = undefined;

            let labelIds = [];
            labelIds = formData && formData.labels && formData.labels.map((item,index) => item.id ).join(',');
            formData.labelIds = labelIds;
            delete formData.errorCode;
            delete formData.errorMessage;
            delete formData.labels;
            let params = {
                ...formData,
                id: formData.id,
                mainCfg: JSON.stringify(mainCfg),
                detail_data: JSON.stringify(detail_data),
            };

            let {ret} = yield call( moduleFormSubmit, parse(params));

            if( ret && ret.errorCode == 9000 ){
                message.success('模板页面配置保存成功');
                afterSubmit && afterSubmit();
            } else {
                message.error((ret && ret.errorMessage) || '模板页面配置保存失败');
                yield put({
                    type : 'updateState',
                    payload : {
                        loading: false,
                    }
               });
            }
        },
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },

    handleClose(state, action) {
      return { ...state, visible: false, loading: false, formData: {},};
    },

        /*改变模板基础属性*/
    updateModuleProps(state, action) {
        let {props} = action.payload;
        let {moduleConfigData} = state;
        moduleConfigData = {...moduleConfigData, ...props};
        return { ...state, moduleConfigData };
    },

    /*图层往上移*/
    toPrevPageItem(state, action) {
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

                    let target_index = -1;//操作的元素的下标
                    for(let i in items) {
                        let iitem = items[i];
                        if(iitem.item_key == itemKey) {
                            target_index = i;
                        }
                    }
                    if(target_index < 0) {
                        message.warn('当前没有元素');
                    } else if(target_index == (items.length-1)) {
                        message.warn('已经是最前一个元素');
                    } else {
                        let target_i = parseInt(target_index+'') + 1;
                        let flg = items[target_i];
                        items[target_i] = items[target_index];
                        items[target_index] = flg;
                    }
                    pageItem.items = items;
                    currentPageConfig = pageItem;
                }

            });
        }

        return { ...state, moduleConfigData, currentPageConfig, };
    },

    /*图层往下移*/
    toNextPageItem(state, action) {
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
                    let target_index = -1;//操作的元素的下标
                    for(let i in items) {
                        let iitem = items[i];
                        if(iitem.item_key == itemKey) {
                            target_index = i;
                        }
                    }
                    if(target_index < 0) {
                        message.warn('当前没有元素');
                    } else if(target_index == 0) {
                        message.warn('已经是最后一个元素');
                    } else {
                        let target_i = parseInt(target_index+'') - 1;
                        let flg = items[target_i];
                        items[target_i] = items[target_index];
                        items[target_index] = flg;
                    }
                    pageItem.items = items;
                    currentPageConfig = pageItem;
                }

            });
        }

        return { ...state, moduleConfigData, currentPageConfig, };
    },

    /*元素拷贝*/
    copyPageItem(state, action) {
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
                    let target_index = -1;//操作的元素的下标
                    for(let i in items) {
                        let iitem = items[i];
                        if(iitem.item_key == itemKey) {
                            target_index = i;
                        }
                    }

                    if(target_index < 0) {
                        message.warn('当前没有元素');
                    } else {
                        let target_item = items[target_index];

                        items.push({
                            ...target_item,
                            item_key: items.length+'',
                        });
                    }
                    pageItem.items = items;
                    currentPageConfig = pageItem;
                }

            });
        }

        return { ...state, moduleConfigData, currentPageConfig, };
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
                            new_items.push({
                                ...iitem,
                                item_key: new_items.length + '',
                            });
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

      /*编辑当前激活页面的激活元素*/
      changeActivityItemProps(state, action) {
          let {itemValue} = action.payload || {};
          let {moduleConfigData,currentPageConfig, currentPageKey, activeItemKey,} = state;

          let pageKey = currentPageKey;
          let itemKey = activeItemKey;
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
                          console.info(itemValue)
                          if(itemValue) {
                            itemValue.item_key  = items && items.length + '';
                            items.push(itemValue);
                          }

                      } else {
                          for(let i in items) {
                              let iitem = items[i];
                              if(iitem.item_key == itemKey) {
                                  let newItem = {...iitem,};
                                  let {x, y} = itemValue;
                                  if(x != undefined) {
                                      newItem.x = newItem.x + x;
                                  }
                                  if(y != undefined) {
                                      newItem.y = newItem.y + y;
                                  }
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
                newPageSeqno = fromSeqNo;

                pages.map(function(pageItem, pageIndex) {
                    if(pageItem.seq_no >= fromSeqNo) {
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

      /*在某一页后面增加一页*/
      onCopyPage(state, action) {
          let {fromIndex} = action.payload;

          let {moduleConfigData,currentPageKey,currentPageConfig} = state;

          let pages = moduleConfigData.pages;
          let newPageKey = '0';//新建页面的Key
          let newPageIndex = 0;
          let newPageSeqno = 0;
          let newPageItems = [];
          let newPageProp = {};

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
                  newPageSeqno = fromSeqNo;

                  let frompageProp = fromItem.props || {};
                  newPageProp = {...frompageProp}

                  let fromPageItems = fromItem.items || [];
                  if(fromPageItems && fromPageItems.length > 0) {
                      for(let i in fromPageItems) {
                          let itemObj = fromPageItems[i];
                          newPageItems.push({
                              ...itemObj
                          });
                      }
                  }

                  pages.map(function(pageItem, pageIndex) {
                      if(pageItem.seq_no >= fromSeqNo) {
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
              items: newPageItems,
              props: newPageProp,
          };
          pages.push(currentPageConfig);

          moduleConfigData.pages = pages;


          return { ...state, moduleConfigData, currentPageKey, currentPageConfig, activeItemKey: ''};
      },

  },

};
