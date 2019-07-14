import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon, Radio } from 'antd';
import styles from './DataMgr.less';

function Charts({
    loading, list, total,bottomChoose,topChoose,inverted,share,aim,colorType,point,
    zidingyiTime,zidingyiTimeContent,dinggoumendianList,shangpinshuList,xinzengshangpinfugaimendianList,shangjiashangpinList,xinzengshangpinzongmendianshuList,chengjiaodingdanList,dingdanchengjiaojineList,hexiaoshuliangList,hexiaojineList,XTime,
  }) {
    let titleAppend = zidingyiTime==true?`(${zidingyiTimeContent.startTime}~${zidingyiTimeContent.endTime})`:
                      topChoose=='1'?'(昨日)':
                      topChoose=='7'?'(近7日)':
                      topChoose=='30'?'(近30日)':'';
    let OrderStore = document.getElementById('OrderStore');
    let Goods = document.getElementById('Goods');
    let GoodsCover = document.getElementById('GoodsCover');
    let UpGoods = document.getElementById('UpGoods');
    let Store = document.getElementById('Store');
    let ComOrder = document.getElementById('ComOrder');
    let ComOrderMoney = document.getElementById('ComOrderMoney');
    let HeXiaoNo = document.getElementById('HeXiaoNo');
    let HeXiaoMoney = document.getElementById('HeXiaoMoney');
    if(bottomChoose=='1'){
        if(OrderStore!=null&&Goods!=null&&GoodsCover!=null&&Store!=null&&ComOrder!=null&&ComOrderMoney!=null&&HeXiaoNo!=null&&HeXiaoMoney!=null){
            OrderStore.style.display='block';
            Goods.style.display='none';
            GoodsCover.style.display='none';
            UpGoods.style.display='none';
            Store.style.display='none';
            ComOrder.style.display='none';
            ComOrderMoney.style.display='none';
            HeXiaoNo.style.display='none';
            HeXiaoMoney.style.display='none';
        }
    }else if(bottomChoose=='2'){
        if(OrderStore!=null&&Goods!=null&&GoodsCover!=null&&Store!=null&&ComOrder!=null&&ComOrderMoney!=null&&HeXiaoNo!=null&&HeXiaoMoney!=null){
            OrderStore.style.display='none';
            Goods.style.display='block';
            GoodsCover.style.display='none';
            UpGoods.style.display='none';
            Store.style.display='none';
            ComOrder.style.display='none';
            ComOrderMoney.style.display='none';
            HeXiaoNo.style.display='none';
            HeXiaoMoney.style.display='none';
        }
    }else if(bottomChoose=='3'){
        if(OrderStore!=null&&Goods!=null&&GoodsCover!=null&&Store!=null&&ComOrder!=null&&ComOrderMoney!=null&&HeXiaoNo!=null&&HeXiaoMoney!=null){
            OrderStore.style.display='none';
            Goods.style.display='none';
            GoodsCover.style.display='block';
            UpGoods.style.display='none';
            Store.style.display='none';
            ComOrder.style.display='none';
            ComOrderMoney.style.display='none';
            HeXiaoNo.style.display='none';
            HeXiaoMoney.style.display='none';
        }
    }else if(bottomChoose=='4'){
        if(OrderStore!=null&&Goods!=null&&GoodsCover!=null&&Store!=null&&ComOrder!=null&&ComOrderMoney!=null&&HeXiaoNo!=null&&HeXiaoMoney!=null){
            OrderStore.style.display='none';
            Goods.style.display='none';
            GoodsCover.style.display='none';
            UpGoods.style.display='block';
            Store.style.display='none';
            ComOrder.style.display='none';
            ComOrderMoney.style.display='none';
            HeXiaoNo.style.display='none';
            HeXiaoMoney.style.display='none';
        }
    }else if(bottomChoose=='5'){
        if(OrderStore!=null&&Goods!=null&&GoodsCover!=null&&Store!=null&&ComOrder!=null&&ComOrderMoney!=null&&HeXiaoNo!=null&&HeXiaoMoney!=null){
            OrderStore.style.display='none';
            Goods.style.display='none';
            GoodsCover.style.display='none';
            UpGoods.style.display='none';
            Store.style.display='block';
            ComOrder.style.display='none';
            ComOrderMoney.style.display='none';
            HeXiaoNo.style.display='none';
            HeXiaoMoney.style.display='none';
        }
    }else if(bottomChoose=='6'){
        if(OrderStore!=null&&Goods!=null&&GoodsCover!=null&&Store!=null&&ComOrder!=null&&ComOrderMoney!=null&&HeXiaoNo!=null&&HeXiaoMoney!=null){
            OrderStore.style.display='none';
            Goods.style.display='none';
            GoodsCover.style.display='none';
            UpGoods.style.display='none';
            Store.style.display='none';
            ComOrder.style.display='block';
            ComOrderMoney.style.display='none';
            HeXiaoNo.style.display='none';
            HeXiaoMoney.style.display='none';
        }
    }else if(bottomChoose=='7'){
        if(OrderStore!=null&&Goods!=null&&GoodsCover!=null&&Store!=null&&ComOrder!=null&&ComOrderMoney!=null&&HeXiaoNo!=null&&HeXiaoMoney!=null){
            OrderStore.style.display='none';
            Goods.style.display='none';
            GoodsCover.style.display='none';
            UpGoods.style.display='none';
            Store.style.display='none';
            ComOrder.style.display='none';
            ComOrderMoney.style.display='block';
            HeXiaoNo.style.display='none';
            HeXiaoMoney.style.display='none';
        }
    }else if(bottomChoose=='8'){
        if(OrderStore!=null&&Goods!=null&&GoodsCover!=null&&Store!=null&&ComOrder!=null&&ComOrderMoney!=null&&HeXiaoNo!=null&&HeXiaoMoney!=null){
            OrderStore.style.display='none';
            Goods.style.display='none';
            GoodsCover.style.display='none';
            UpGoods.style.display='none';
            Store.style.display='none';
            ComOrder.style.display='none';
            ComOrderMoney.style.display='none';
            HeXiaoNo.style.display='block';
            HeXiaoMoney.style.display='none';
        }
    }else if(bottomChoose=='9'){
        if(OrderStore!=null&&Goods!=null&&GoodsCover!=null&&Store!=null&&ComOrder!=null&&ComOrderMoney!=null&&HeXiaoNo!=null&&HeXiaoMoney!=null){
            OrderStore.style.display='none';
            Goods.style.display='none';
            GoodsCover.style.display='none';
            UpGoods.style.display='none';
            Store.style.display='none';
            ComOrder.style.display='none';
            ComOrderMoney.style.display='none';
            HeXiaoNo.style.display='none';
            HeXiaoMoney.style.display='block';
        }
    }
  return (
    <div className={styles.Charts}>
        <div id='OrderStore' style={{height:'40vh'}}>
              <script type="text/javascript">
                $(function () {
                    Highcharts.setOptions({   // 所有语言文字相关配置都设置在 lang 里
                        lang: {
                            resetZoom: '恢复缩放',
                            resetZoomTitle: '恢复图表',
                            printChart:"打印图表",
                            downloadJPEG:"下载JPEG图片",
                            downloadPDF:"下载PDF文件",
                            downloadPNG:"下载PNG文件",
                            downloadSVG:"下载SVG文件",
                        }
                    }),
                    $('#OrderStore').highcharts({
                        chart: {
                            inverted:inverted=='1'?true:false,
                            events: {
                                selection: function (event) {
                                    var text,
                                        label;
                                    if (event.xAxis) {
                                        text = 'min: ' + Highcharts.numberFormat(event.xAxis[0].min, 2) + ', max: ' + Highcharts.numberFormat(event.xAxis[0].max, 2);
                                    } else {
                                        text = 'Selection reset';
                                    }
                                    label = this.renderer.label(text, 100, 120)
                                        .attr({
                                        fill: Highcharts.getOptions().colors[0],
                                        padding: 10,
                                        r: 5,
                                        zIndex: 8
                                    })
                                        .css({
                                        color: '#FFFFFF',
                                    })
                                        .add();
                                    setTimeout(function () {
                                        label.fadeOut();
                                    }, 1000);
                                }
                            },
                            zoomType: 'x',
                            resetZoomButton:{// 重置按钮样式
                                theme: {
                                    fill: '#2db7f5', //填充色
                                    stroke: 'silver', //边框
                                    r: 8,  //圆角
                                    style:{
                                        color: '#ffffff',
                                    },
                                    states: {
                                        hover: {
                                            fill: '#57c5f7',
                                            style: {
                                                color: '#ffffff'
                                            }
                                        }
                                    }
                                }
                            },
                        },
                        title: {
                            text: `订购门店${titleAppend}`,
                            x: -20 //center
                        },
                        subtitle: {
                            text: 'www.ishanshan.com',
                            x: -20
                        },
                        xAxis: {
                            categories: XTime
                        },
                        yAxis: {
                            title: {
                                text: '数量'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            valueSuffix: '个',
                            backgroundColor: '#FFFFFF',   // 背景颜色
                            borderColor: '#57c5f7',         // 边框颜色
                            borderRadius: 10,             // 边框圆角
                            shadow: true,                 // 是否显示阴影
                            shared: share=='1'?false:true, //是否显示全部信息
                            crosshairs: aim=='1'?[{},{width: 2,color: 'red'}]:      // 竖直及水平准星线
                                        aim=='2'?[{width: 2,color: 'red'}]:
                                        aim=='3'?[{width: 2,color: 'red'}, {width: 2,color: 'red'}]:
                                        aim=='4'?[]:'',
                        },
                        plotOptions: {
                          series: {
                            allowPointSelect: point=='1'?true:false,  //节点是否可点击
                          }
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        },
                        series: dinggoumendianList.line,
                        colors: colorType,
                        credits:{
                            text: 'www.ishanshan.com',             // 显示的文字
                            href: 'http://www.ishanshan.com',      // 链接地址
                            style: {                               // 样式设置
                                color: 'red',
                            }
                        },
                    })
                });
            </script>
        </div>

        <div id='Goods'  style={{display:'none',height:'40vh'}}>
            <script type="text/javascript">
                $(function () {
                    Highcharts.setOptions({   // 所有语言文字相关配置都设置在 lang 里
                        lang: {
                            resetZoom: '恢复缩放',
                            resetZoomTitle: '恢复图表',
                            printChart:"打印图表",
                            downloadJPEG:"下载JPEG图片",
                            downloadPDF:"下载PDF文件",
                            downloadPNG:"下载PNG文件",
                            downloadSVG:"下载SVG文件",
                        }
                    }),
                    $('#Goods').highcharts({
                        chart: {
                            inverted:inverted=='1'?true:false,
                            events: {
                                selection: function (event) {
                                    var text,
                                        label;
                                    if (event.xAxis) {
                                        text = 'min: ' + Highcharts.numberFormat(event.xAxis[0].min, 2) + ', max: ' + Highcharts.numberFormat(event.xAxis[0].max, 2);
                                    } else {
                                        text = 'Selection reset';
                                    }
                                    label = this.renderer.label(text, 100, 120)
                                        .attr({
                                        fill: Highcharts.getOptions().colors[0],
                                        padding: 10,
                                        r: 5,
                                        zIndex: 8
                                    })
                                        .css({
                                        color: '#FFFFFF',
                                    })
                                        .add();
                                    setTimeout(function () {
                                        label.fadeOut();
                                    }, 1000);
                                }
                            },
                            zoomType: 'x',
                            resetZoomButton:{// 按钮样式
                                theme: {
                                    fill: '#2db7f5', //填充色
                                    stroke: 'silver', //边框
                                    r: 8,  //圆角
                                    style:{
                                        color: '#ffffff',
                                    },
                                    states: {
                                        hover: {
                                            fill: '#57c5f7',
                                            style: {
                                                color: '#ffffff'
                                            }
                                        }
                                    }
                                }
                            },
                        },
                        title: {
                            text:`商品数${titleAppend}`,
                            x: -20 //center
                        },
                        subtitle: {
                            text: 'www.ishanshan.com',
                            x: -20
                        },
                        xAxis: {
                            categories: XTime
                        },
                        yAxis: {
                            title: {
                                text: '数量'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            valueSuffix: '个',
                            backgroundColor: '#FFFFFF',   // 背景颜色
                            borderColor: '#57c5f7',         // 边框颜色
                            borderRadius: 10,             // 边框圆角
                            shadow: true,                 // 是否显示阴影
                            shared: share=='1'?false:true,
                            crosshairs: aim=='1'?[{},{width: 2,color: 'red'}]:      // 竖直及水平准星线
                                        aim=='2'?[{width: 2,color: 'red'}]:
                                        aim=='3'?[{width: 2,color: 'red'}, {width: 2,color: 'red'}]:
                                        aim=='4'?[]:'',
                        },
                        plotOptions: {
                          series: {
                            allowPointSelect: point=='1'?true:false,  //节点是否可点击
                          }
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        },
                        series: shangpinshuList.line,
                        colors: colorType,
                        credits:{
                            text: 'www.ishanshan.com',             // 显示的文字
                            href: 'http://www.ishanshan.com',      // 链接地址
                            style: {                               // 样式设置
                                color: 'red',
                            }
                        }
                    })
                });
            </script>
        </div>

        <div id='GoodsCover'  style={{display:'none',height:'40vh'}}>
            <script type="text/javascript">
            $(function () {
                Highcharts.setOptions({   // 所有语言文字相关配置都设置在 lang 里
                        lang: {
                            resetZoom: '恢复缩放',
                            resetZoomTitle: '恢复图表',
                            printChart:"打印图表",
                            downloadJPEG:"下载JPEG图片",
                            downloadPDF:"下载PDF文件",
                            downloadPNG:"下载PNG文件",
                            downloadSVG:"下载SVG文件",
                        }
                }),
                $('#GoodsCover').highcharts({
                    chart: {
                        inverted:inverted=='1'?true:false,
                        events: {
                            selection: function (event) {
                                var text,
                                    label;
                                if (event.xAxis) {
                                    text = 'min: ' + Highcharts.numberFormat(event.xAxis[0].min, 2) + ', max: ' + Highcharts.numberFormat(event.xAxis[0].max, 2);
                                } else {
                                    text = 'Selection reset';
                                }
                                label = this.renderer.label(text, 100, 120)
                                    .attr({
                                    fill: Highcharts.getOptions().colors[0],
                                    padding: 10,
                                    r: 5,
                                    zIndex: 8
                                })
                                    .css({
                                    color: '#FFFFFF',
                                })
                                    .add();
                                setTimeout(function () {
                                    label.fadeOut();
                                }, 1000);
                            }
                        },
                        zoomType: 'x',
                        resetZoomButton:{// 按钮样式
                            theme: {
                                fill: '#2db7f5', //填充色
                                stroke: 'silver', //边框
                                r: 8,  //圆角
                                style:{
                                    color: '#ffffff',
                                },
                                states: {
                                    hover: {
                                        fill: '#57c5f7',
                                        style: {
                                            color: '#ffffff'
                                        }
                                    }
                                }
                            }
                        },
                    },
                    title: {
                        text: `新增商品覆盖门店${titleAppend}`,
                        x: -20 //center
                    },
                    subtitle: {
                        text: 'www.ishanshan.com',
                        x: -20
                    },
                    xAxis: {
                        categories: XTime
                    },
                    yAxis: {
                        title: {
                            text: '数量'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                            valueSuffix: '个',
                            backgroundColor: '#FFFFFF',   // 背景颜色
                            borderColor: '#57c5f7',         // 边框颜色
                            borderRadius: 10,             // 边框圆角
                            shadow: true,                 // 是否显示阴影
                            shared: share=='1'?false:true,
                            crosshairs: aim=='1'?[{},{width: 2,color: 'red'}]:      // 竖直及水平准星线
                                        aim=='2'?[{width: 2,color: 'red'}]:
                                        aim=='3'?[{width: 2,color: 'red'}, {width: 2,color: 'red'}]:
                                        aim=='4'?[]:'',
                    },
                    plotOptions: {
                          series: {
                            allowPointSelect: point=='1'?true:false,  //节点是否可点击
                          }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: xinzengshangpinfugaimendianList.line,
                    colors: colorType,
                    credits:{
                            text: 'www.ishanshan.com',             // 显示的文字
                            href: 'http://www.ishanshan.com',      // 链接地址
                            style: {                               // 样式设置
                                color: 'red',
                            }
                    }
                })
            });
            </script>
        </div>

        <div id='UpGoods'  style={{display:'none',height:'40vh'}}>
            <script type="text/javascript">
            $(function () {
                Highcharts.setOptions({   // 所有语言文字相关配置都设置在 lang 里
                        lang: {
                            resetZoom: '恢复缩放',
                            resetZoomTitle: '恢复图表',
                            printChart:"打印图表",
                            downloadJPEG:"下载JPEG图片",
                            downloadPDF:"下载PDF文件",
                            downloadPNG:"下载PNG文件",
                            downloadSVG:"下载SVG文件",
                        }
                }),
                $('#UpGoods').highcharts({
                    chart: {
                        inverted:inverted=='1'?true:false,
                        events: {
                            selection: function (event) {
                                var text,
                                    label;
                                if (event.xAxis) {
                                    text = 'min: ' + Highcharts.numberFormat(event.xAxis[0].min, 2) + ', max: ' + Highcharts.numberFormat(event.xAxis[0].max, 2);
                                } else {
                                    text = 'Selection reset';
                                }
                                label = this.renderer.label(text, 100, 120)
                                    .attr({
                                    fill: Highcharts.getOptions().colors[0],
                                    padding: 10,
                                    r: 5,
                                    zIndex: 8
                                })
                                    .css({
                                    color: '#FFFFFF',
                                })
                                    .add();
                                setTimeout(function () {
                                    label.fadeOut();
                                }, 1000);
                            }
                        },
                        zoomType: 'x',
                        resetZoomButton:{// 按钮样式
                            theme: {
                                fill: '#2db7f5', //填充色
                                stroke: 'silver', //边框
                                r: 8,  //圆角
                                style:{
                                    color: '#ffffff',
                                },
                                states: {
                                    hover: {
                                        fill: '#57c5f7',
                                        style: {
                                            color: '#ffffff'
                                        }
                                    }
                                }
                            }
                        },
                    },
                    title: {
                        text: `上架商品${titleAppend}`,
                        x: -20 //center
                    },
                    subtitle: {
                        text: 'www.ishanshan.com',
                        x: -20
                    },
                    xAxis: {
                        categories: XTime
                    },
                    yAxis: {
                        title: {
                            text: '数量'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                            valueSuffix: '个',
                            backgroundColor: '#FFFFFF',   // 背景颜色
                            borderColor: '#57c5f7',         // 边框颜色
                            borderRadius: 10,             // 边框圆角
                            shadow: true,                 // 是否显示阴影
                            shared: share=='1'?false:true,
                            crosshairs: aim=='1'?[{},{width: 2,color: 'red'}]:      // 竖直及水平准星线
                                        aim=='2'?[{width: 2,color: 'red'}]:
                                        aim=='3'?[{width: 2,color: 'red'}, {width: 2,color: 'red'}]:
                                        aim=='4'?[]:'',
                    },
                    plotOptions: {
                          series: {
                            allowPointSelect: point=='1'?true:false,  //节点是否可点击
                          }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: shangjiashangpinList.line,
                    colors: colorType,
                    credits:{
                            text: 'www.ishanshan.com',             // 显示的文字
                            href: 'http://www.ishanshan.com',      // 链接地址
                            style: {                               // 样式设置
                                color: 'red',
                            }
                    }
                })
            });
            </script>
        </div>

        <div id='Store'  style={{display:'none',height:'40vh'}}>
            <script type="text/javascript">
            $(function () {
                Highcharts.setOptions({   // 所有语言文字相关配置都设置在 lang 里
                        lang: {
                            resetZoom: '恢复缩放',
                            resetZoomTitle: '恢复图表',
                            printChart:"打印图表",
                            downloadJPEG:"下载JPEG图片",
                            downloadPDF:"下载PDF文件",
                            downloadPNG:"下载PNG文件",
                            downloadSVG:"下载SVG文件",
                        }
                }),
                $('#Store').highcharts({
                    chart: {
                        inverted:inverted=='1'?true:false,
                        events: {
                            selection: function (event) {
                                var text,
                                    label;
                                if (event.xAxis) {
                                    text = 'min: ' + Highcharts.numberFormat(event.xAxis[0].min, 2) + ', max: ' + Highcharts.numberFormat(event.xAxis[0].max, 2);
                                } else {
                                    text = 'Selection reset';
                                }
                                label = this.renderer.label(text, 100, 120)
                                    .attr({
                                    fill: Highcharts.getOptions().colors[0],
                                    padding: 10,
                                    r: 5,
                                    zIndex: 8
                                })
                                    .css({
                                    color: '#FFFFFF',
                                })
                                    .add();
                                setTimeout(function () {
                                    label.fadeOut();
                                }, 1000);
                            }
                        },
                        zoomType: 'x',
                        resetZoomButton:{// 按钮样式
                            theme: {
                                fill: '#2db7f5', //填充色
                                stroke: 'silver', //边框
                                r: 8,  //圆角
                                style:{
                                    color: '#ffffff',
                                },
                                states: {
                                    hover: {
                                        fill: '#57c5f7',
                                        style: {
                                            color: '#ffffff'
                                        }
                                    }
                                }
                            }
                        },
                    },
                    title: {
                        text: `新增商品总门店数${titleAppend}`,
                        x: -20 //center
                    },
                    subtitle: {
                        text: 'www.ishanshan.com',
                        x: -20
                    },
                    xAxis: {
                        categories: XTime
                    },
                    yAxis: {
                        title: {
                            text: '数量'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                            valueSuffix: '个',
                            backgroundColor: '#FFFFFF',   // 背景颜色
                            borderColor: '#57c5f7',         // 边框颜色
                            borderRadius: 10,             // 边框圆角
                            shadow: true,                 // 是否显示阴影
                            shared: share=='1'?false:true,
                            crosshairs: aim=='1'?[{},{width: 2,color: 'red'}]:      // 竖直及水平准星线
                                        aim=='2'?[{width: 2,color: 'red'}]:
                                        aim=='3'?[{width: 2,color: 'red'}, {width: 2,color: 'red'}]:
                                        aim=='4'?[]:'',
                    },
                    plotOptions: {
                          series: {
                            allowPointSelect: point=='1'?true:false,  //节点是否可点击
                          }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: xinzengshangpinzongmendianshuList.line,
                    colors: colorType,
                    credits:{
                            text: 'www.ishanshan.com',             // 显示的文字
                            href: 'http://www.ishanshan.com',      // 链接地址
                            style: {                               // 样式设置
                                color: 'red',
                            }
                    }
                })
            });
            </script>
        </div>

        <div id='ComOrder'  style={{display:'none',height:'40vh'}}>
            <script type="text/javascript">
            $(function () {
                Highcharts.setOptions({   // 所有语言文字相关配置都设置在 lang 里
                        lang: {
                            resetZoom: '恢复缩放',
                            resetZoomTitle: '恢复图表',
                            printChart:"打印图表",
                            downloadJPEG:"下载JPEG图片",
                            downloadPDF:"下载PDF文件",
                            downloadPNG:"下载PNG文件",
                            downloadSVG:"下载SVG文件",
                        }
                }),
                $('#ComOrder').highcharts({
                    chart: {
                        inverted:inverted=='1'?true:false,
                        events: {
                            selection: function (event) {
                                var text,
                                    label;
                                if (event.xAxis) {
                                    text = 'min: ' + Highcharts.numberFormat(event.xAxis[0].min, 2) + ', max: ' + Highcharts.numberFormat(event.xAxis[0].max, 2);
                                } else {
                                    text = 'Selection reset';
                                }
                                label = this.renderer.label(text, 100, 120)
                                    .attr({
                                    fill: Highcharts.getOptions().colors[0],
                                    padding: 10,
                                    r: 5,
                                    zIndex: 8
                                })
                                    .css({
                                    color: '#FFFFFF',
                                })
                                    .add();
                                setTimeout(function () {
                                    label.fadeOut();
                                }, 1000);
                            }
                        },
                        zoomType: 'x',
                        resetZoomButton:{// 按钮样式
                            theme: {
                                fill: '#2db7f5', //填充色
                                stroke: 'silver', //边框
                                r: 8,  //圆角
                                style:{
                                    color: '#ffffff',
                                },
                                states: {
                                    hover: {
                                        fill: '#57c5f7',
                                        style: {
                                            color: '#ffffff'
                                        }
                                    }
                                }
                            }
                        },
                    },
                    title: {
                        text: `成交订单${titleAppend}`,
                        x: -20 //center
                    },
                    subtitle: {
                        text: 'www.ishanshan.com',
                        x: -20
                    },
                    xAxis: {
                        categories: XTime
                    },
                    yAxis: {
                        title: {
                            text: '数量'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                            valueSuffix: '个',
                            backgroundColor: '#FFFFFF',   // 背景颜色
                            borderColor: '#57c5f7',         // 边框颜色
                            borderRadius: 10,             // 边框圆角
                            shadow: true,                 // 是否显示阴影
                            shared: share=='1'?false:true,
                            crosshairs: aim=='1'?[{},{width: 2,color: 'red'}]:      // 竖直及水平准星线
                                        aim=='2'?[{width: 2,color: 'red'}]:
                                        aim=='3'?[{width: 2,color: 'red'}, {width: 2,color: 'red'}]:
                                        aim=='4'?[]:'',
                    },
                    plotOptions: {
                          series: {
                            allowPointSelect: point=='1'?true:false,  //节点是否可点击
                          }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: chengjiaodingdanList.line,
                    colors: colorType,
                    credits:{
                            text: 'www.ishanshan.com',             // 显示的文字
                            href: 'http://www.ishanshan.com',      // 链接地址
                            style: {                               // 样式设置
                                color: 'red',
                            }
                    }
                })
            });
            </script>
        </div>

        <div id='ComOrderMoney'  style={{display:'none',height:'40vh'}}>
            <script type="text/javascript">
            $(function () {
                Highcharts.setOptions({   // 所有语言文字相关配置都设置在 lang 里
                        lang: {
                            resetZoom: '恢复缩放',
                            resetZoomTitle: '恢复图表',
                            printChart:"打印图表",
                            downloadJPEG:"下载JPEG图片",
                            downloadPDF:"下载PDF文件",
                            downloadPNG:"下载PNG文件",
                            downloadSVG:"下载SVG文件",
                        }
                }),
                $('#ComOrderMoney').highcharts({
                    chart: {
                        inverted:inverted=='1'?true:false,
                        events: {
                            selection: function (event) {
                                var text,
                                    label;
                                if (event.xAxis) {
                                    text = 'min: ' + Highcharts.numberFormat(event.xAxis[0].min, 2) + ', max: ' + Highcharts.numberFormat(event.xAxis[0].max, 2);
                                } else {
                                    text = 'Selection reset';
                                }
                                label = this.renderer.label(text, 100, 120)
                                    .attr({
                                    fill: Highcharts.getOptions().colors[0],
                                    padding: 10,
                                    r: 5,
                                    zIndex: 8
                                })
                                    .css({
                                    color: '#FFFFFF',
                                })
                                    .add();
                                setTimeout(function () {
                                    label.fadeOut();
                                }, 1000);
                            }
                        },
                        zoomType: 'x',
                        resetZoomButton:{// 按钮样式
                            theme: {
                                fill: '#2db7f5', //填充色
                                stroke: 'silver', //边框
                                r: 8,  //圆角
                                style:{
                                    color: '#ffffff',
                                },
                                states: {
                                    hover: {
                                        fill: '#57c5f7',
                                        style: {
                                            color: '#ffffff'
                                        }
                                    }
                                }
                            }
                        },
                    },
                    title: {
                        text: `订单成交金额${titleAppend}`,
                        x: -20 //center
                    },
                    subtitle: {
                        text: 'www.ishanshan.com',
                        x: -20
                    },
                    xAxis: {
                        categories: XTime
                    },
                    yAxis: {
                        title: {
                            text: '数量'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                            valueSuffix: '个',
                            backgroundColor: '#FFFFFF',   // 背景颜色
                            borderColor: '#57c5f7',         // 边框颜色
                            borderRadius: 10,             // 边框圆角
                            shadow: true,                 // 是否显示阴影
                            shared: share=='1'?false:true,
                            crosshairs: aim=='1'?[{},{width: 2,color: 'red'}]:      // 竖直及水平准星线
                                        aim=='2'?[{width: 2,color: 'red'}]:
                                        aim=='3'?[{width: 2,color: 'red'}, {width: 2,color: 'red'}]:
                                        aim=='4'?[]:'',
                    },
                    plotOptions: {
                          series: {
                            allowPointSelect: point=='1'?true:false,  //节点是否可点击
                          }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: dingdanchengjiaojineList.line,
                    colors: colorType,
                    credits:{
                            text: 'www.ishanshan.com',             // 显示的文字
                            href: 'http://www.ishanshan.com',      // 链接地址
                            style: {                               // 样式设置
                                color: 'red',
                            }
                    }
                })
            });
            </script>
        </div>

        <div id='HeXiaoNo'  style={{display:'none',height:'40vh'}}>
            <script type="text/javascript">
            $(function () {
                Highcharts.setOptions({   // 所有语言文字相关配置都设置在 lang 里
                        lang: {
                            resetZoom: '恢复缩放',
                            resetZoomTitle: '恢复图表',
                            printChart:"打印图表",
                            downloadJPEG:"下载JPEG图片",
                            downloadPDF:"下载PDF文件",
                            downloadPNG:"下载PNG文件",
                            downloadSVG:"下载SVG文件",
                        }
                }),
                $('#HeXiaoNo').highcharts({
                    chart: {
                        inverted:inverted=='1'?true:false,
                        events: {
                            selection: function (event) {
                                var text,
                                    label;
                                if (event.xAxis) {
                                    text = 'min: ' + Highcharts.numberFormat(event.xAxis[0].min, 2) + ', max: ' + Highcharts.numberFormat(event.xAxis[0].max, 2);
                                } else {
                                    text = 'Selection reset';
                                }
                                label = this.renderer.label(text, 100, 120)
                                    .attr({
                                    fill: Highcharts.getOptions().colors[0],
                                    padding: 10,
                                    r: 5,
                                    zIndex: 8
                                })
                                    .css({
                                    color: '#FFFFFF',
                                })
                                    .add();
                                setTimeout(function () {
                                    label.fadeOut();
                                }, 1000);
                            }
                        },
                        zoomType: 'x',
                        resetZoomButton:{// 按钮样式
                            theme: {
                                fill: '#2db7f5', //填充色
                                stroke: 'silver', //边框
                                r: 8,  //圆角
                                style:{
                                    color: '#ffffff',
                                },
                                states: {
                                    hover: {
                                        fill: '#57c5f7',
                                        style: {
                                            color: '#ffffff'
                                        }
                                    }
                                }
                            }
                        },
                    },
                    title: {
                        text: `核销数量${titleAppend}`,
                        x: -20 //center
                    },
                    subtitle: {
                        text: 'www.ishanshan.com',
                        x: -20
                    },
                    xAxis: {
                        categories: XTime
                    },
                    yAxis: {
                        title: {
                            text: '数量'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                            valueSuffix: '个',
                            backgroundColor: '#FFFFFF',   // 背景颜色
                            borderColor: '#57c5f7',         // 边框颜色
                            borderRadius: 10,             // 边框圆角
                            shadow: true,                 // 是否显示阴影
                            shared: share=='1'?false:true,
                            crosshairs: aim=='1'?[{},{width: 2,color: 'red'}]:      // 竖直及水平准星线
                                        aim=='2'?[{width: 2,color: 'red'}]:
                                        aim=='3'?[{width: 2,color: 'red'}, {width: 2,color: 'red'}]:
                                        aim=='4'?[]:'',
                    },
                    plotOptions: {
                          series: {
                            allowPointSelect: point=='1'?true:false,  //节点是否可点击
                          }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: hexiaoshuliangList.line,
                    colors:colorType,
                    credits:{
                            text: 'www.ishanshan.com',             // 显示的文字
                            href: 'http://www.ishanshan.com',      // 链接地址
                            style: {                               // 样式设置
                                color: 'red',
                            }
                    }
                })
            });
            </script>
        </div>

        <div id='HeXiaoMoney'  style={{display:'none',height:'40vh'}}>
            <script type="text/javascript">
            $(function () {
                Highcharts.setOptions({   // 所有语言文字相关配置都设置在 lang 里
                        lang: {
                            resetZoom: '恢复缩放',
                            resetZoomTitle: '恢复图表',
                            printChart:"打印图表",
                            downloadJPEG:"下载JPEG图片",
                            downloadPDF:"下载PDF文件",
                            downloadPNG:"下载PNG文件",
                            downloadSVG:"下载SVG文件",
                        }
                }),
                $('#HeXiaoMoney').highcharts({
                    chart: {
                        inverted:inverted=='1'?true:false,
                        events: {
                            selection: function (event) {
                                var text,
                                    label;
                                if (event.xAxis) {
                                    text = 'min: ' + Highcharts.numberFormat(event.xAxis[0].min, 2) + ', max: ' + Highcharts.numberFormat(event.xAxis[0].max, 2);
                                } else {
                                    text = 'Selection reset';
                                }
                                label = this.renderer.label(text, 100, 120)
                                    .attr({
                                    fill: Highcharts.getOptions().colors[0],
                                    padding: 10,
                                    r: 5,
                                    zIndex: 8
                                })
                                    .css({
                                    color: '#FFFFFF',
                                })
                                    .add();
                                setTimeout(function () {
                                    label.fadeOut();
                                }, 1000);
                            }
                        },
                        zoomType: 'x',
                        resetZoomButton:{// 按钮样式
                            theme: {
                                fill: '#2db7f5', //填充色
                                stroke: 'silver', //边框
                                r: 8,  //圆角
                                style:{
                                    color: '#ffffff',
                                },
                                states: {
                                    hover: {
                                        fill: '#57c5f7',
                                        style: {
                                            color: '#ffffff'
                                        }
                                    }
                                }
                            }
                        },
                    },
                    title: {
                        text: `核销金额${titleAppend}`,
                        x: -20 //center
                    },
                    subtitle: {
                        text: 'www.ishanshan.com',
                        x: -20
                    },
                    xAxis: {
                        categories: XTime
                    },
                    yAxis: {
                        title: {
                            text: '数量'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                            valueSuffix: '个',
                            backgroundColor: '#FFFFFF',   // 背景颜色
                            borderColor: '#57c5f7',         // 边框颜色
                            borderRadius: 10,             // 边框圆角
                            shadow: true,                 // 是否显示阴影
                            shared: share=='1'?false:true,
                            crosshairs: aim=='1'?[{},{width: 2,color: 'red'}]:      // 竖直及水平准星线
                                        aim=='2'?[{width: 2,color: 'red'}]:
                                        aim=='3'?[{width: 2,color: 'red'}, {width: 2,color: 'red'}]:
                                        aim=='4'?[]:'',
                    },
                    plotOptions: {
                          series: {
                            allowPointSelect: point=='1'?true:false,  //节点是否可点击
                          }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: hexiaojineList.line,
                    colors: colorType,
                    credits:{
                            text: 'www.ishanshan.com',             // 显示的文字
                            href: 'http://www.ishanshan.com',      // 链接地址
                            style: {                               // 样式设置
                                color: 'red',
                            }
                    }
                })
            });
            </script>
        </div>
    </div>
  );
}

Charts.propTypes = {
    loading : PropTypes.any,
    list: PropTypes.array,
    total : PropTypes.any,
    bottomChoose : PropTypes.any,
    topChoose : PropTypes.any,
    colorType : PropTypes.any,
};

export default Charts;
