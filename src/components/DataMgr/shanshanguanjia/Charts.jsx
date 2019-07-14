import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon, Radio } from 'antd';
import styles from './DataMgr.less';

function Charts({
    loading, list, total,bottomChoose,topChoose,inverted,share,aim,colorType,point,
    shanghuList,mendianList,shanghuzhanghaoList,shanghudengluList,zidingyiTime,zidingyiTimeContent,XTime,
  }) {
    let titleAppend = zidingyiTime==true?`(${zidingyiTimeContent.startTime}~${zidingyiTimeContent.endTime})`:
                      topChoose=='1'?'(昨日)':
                      topChoose=='7'?'(近7日)':
                      topChoose=='30'?'(近30日)':'';
    let Tenant = document.getElementById('Tenant');
    let Stores = document.getElementById('Stores');
    let TenantId = document.getElementById('TenantId');
    let Login = document.getElementById('Login');
    if(bottomChoose=='1'){
        if(Tenant!=null&&Stores!=null&&TenantId!=null&&Login!=null){
            Tenant.style.display='block';
            Stores.style.display='none';
            TenantId.style.display='none';
            Login.style.display='none';
        }
    }else if(bottomChoose=='2'){
        if(Tenant!=null&&Stores!=null&&TenantId!=null&&Login!=null){
            Tenant.style.display='none';
            Stores.style.display='block';
            TenantId.style.display='none';
            Login.style.display='none';
        }
    }else if(bottomChoose=='3'){
        if(Tenant!=null&&Stores!=null&&TenantId!=null&&Login!=null){
            Tenant.style.display='none';
            Stores.style.display='none';
            TenantId.style.display='block';
            Login.style.display='none';
        }
    }else if(bottomChoose=='4'){
        if(Tenant!=null&&Stores!=null&&TenantId!=null&&Login!=null){
            Tenant.style.display='none';
            Stores.style.display='none';
            TenantId.style.display='none';
            Login.style.display='block';
        }
    }
  return (
    <div className={styles.Charts}>
        <div id='Tenant' key='Tenant' style={{height:'40vh'}}>
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
                    $('#Tenant').highcharts({
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
                            text: `商户${titleAppend}`,
                            x: -20 //center
                        },
                        subtitle: {
                            text: 'www.ishanshan.com',
                            x: -20
                        },
                        xAxis: {
                            categories: XTime,
                        },
                        yAxis: {
                            title: {
                                text: '增量'
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
                        series: shanghuList.line,
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

        <div id='Stores'  key='Stores' style={{display:'none',height:'40vh'}}>
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
                    $('#Stores').highcharts({
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
                            text:`门店${titleAppend}`,
                            x: -20 //center
                        },
                        subtitle: {
                            text: 'www.ishanshan.com',
                            x: -20
                        },
                        xAxis: {
                            categories: XTime,
                        },
                        yAxis: {
                            title: {
                                text: '增量'
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
                        series: mendianList.line,
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

        <div id='TenantId' key='TenantId' style={{display:'none',height:'40vh'}}>
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
                $('#TenantId').highcharts({
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
                        text: `商户帐号${titleAppend}`,
                        x: -20 //center
                    },
                    subtitle: {
                        text: 'www.ishanshan.com',
                        x: -20
                    },
                    xAxis: {
                        categories: XTime,
                    },
                    yAxis: {
                        title: {
                            text: '增量'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    plotOptions: {
                          series: {
                            allowPointSelect: point=='1'?true:false,  //节点是否可点击
                          }
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
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: shanghuzhanghaoList.line,
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

        <div id='Login' key='Login' style={{display:'none',height:'40vh'}}>
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
                $('#Login').highcharts({
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
                        text: `商户登录${titleAppend}`,
                        x: -20 //center
                    },
                    subtitle: {
                        text: 'www.ishanshan.com',
                        x: -20
                    },
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    yAxis: {
                        title: {
                            text: '增量'
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
                    series: shanghudengluList.line,
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
