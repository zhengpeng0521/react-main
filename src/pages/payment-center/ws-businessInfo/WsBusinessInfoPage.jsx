import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import QRCode from 'qrcode.react';
import { Spin , Row ,Col , Button, } from 'antd';
import WsBusinessInfoComponent from '../../../components/payment-center/ws-businessInfo/WsBusinessInfoCom';
import styles from '../../../components/payment-center/ws-businessInfo/WsBusinessInfoCom.less';

function WsBusinessInfoPage({ dispatch, WsBusinessInfoModel }){
    let {
        dataSource,
        isShowSearch,
        total,
        pageSize,
        pageIndex,
        searchContent,
        tableLoading,
        mchId,
        businessShort ,     //商户简称
				appNameList,        //服务商信息下拉列表
				appId,            //服务商信息

    } = WsBusinessInfoModel;

    function showSearchFun(){
        dispatch({
            type:'WsBusinessInfoModel/updateState',
            payload:{
                isShowSearch : !isShowSearch,
            }
        });
    }

    //搜索
    function SearchSubmit(searchContent){
        dispatch({
            type:'WsBusinessInfoModel/queryWsMchInfoList',
            payload:{
                pageIndex : 0,
                pageSize,
                searchContent
            }
        });
    }
    //分页
    let tableOnChange = function(pagination, filters, sorter) {
        dispatch({
            type: 'WsBusinessInfoModel/queryWsMchInfoList',
            payload: {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
                searchContent
            },
        });
    };

    //导出
    function exportFun(){
		let url = `${BASE_URL}/wsmchController/exportWsMchInfoList?`;
		for(let i in searchContent){
			if(searchContent[i]){
				url = url + i +'='+searchContent[i]+'&'
			}
		}
        window.open(url, '_blank');
	}

    //文件保存
    function saveFile(data, filename){
	    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
	    save_link.href = data;
	    save_link.download = filename;

	    var event = document.createEvent('MouseEvents');
	    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	    save_link.dispatchEvent(event);
	};

    /*台卡更新*/
    function cardLoad(value1,value2){
        dispatch({
            type:'WsBusinessInfoModel/updateState',
            payload:{
               mchId :value1,
               businessShort : value2,
            }
        });
        var card = document.getElementById("card");
	    html2canvas(card).then(function(canvas) {
			var img_data = Canvas2Image.saveAsPNG(canvas, true).getAttribute('src');
			saveFile(img_data, 'cardImage.png');
		});
    }

    /*二维码更新*/
    function qrCodeLoad(value1,value2){
        dispatch({
            type:'WsBusinessInfoModel/updateState',
            payload:{
               mchId :value1,
               businessShort : value2,
            }
        });
        var qrcode = document.getElementById("qrcode");
	    html2canvas(qrcode).then(function(canvas) {
			var img_data = Canvas2Image.saveAsPNG(canvas, true).getAttribute('src');
			saveFile(img_data, 'qrcodeImage.png');
		});
    }

	function appNameChange(value){
		dispatch({
			type : 'WsBusinessInfoModel/updateState',
			payload : {
				appName : value,
			}
		})
	}

    let imageCardHtml = (
        <div id="card" style={{width: '2000px', height: '1415px', position: 'absolute' , top: '-159vh', right:'17px' ,background:'#ddd'}}>
            <div style={{padding:'202px 232px',display:'flex',justifyContent:'space-between'}}>
                <div style={{backgroundImage:"url('/guanli/wsmchController/getImage?src=img.ishanshan.com/gimg/n/20181126/4673c3d5b16113d462ccc7712e71097c')",width:'686.5px',height:'1030.2px',verticalAlign:'middle',backgroundSize:'contain',display:'inline-block',position:'relative',marginRight:'40px',backgroundRepeat: 'no-repeat'}}>
										<div className={styles.cardImg_qrcode}>
												<QRCode value = { `https://saas.ishanshan.com/paygateway/payGateway/wsPayPage?mchId=`+mchId || '' } size = { 340 } />
												<div className={styles.card_org_name}>{businessShort}</div>
										</div>
								</div>
                <div style={{backgroundImage:"url('/guanli/wsmchController/getImage?src=img.ishanshan.com/gimg/n/20181128/265e28cf3316ebf91f774b69ca14dbfe')",width:'371.28px',height:'587.52px',verticalAlign:'middle',backgroundSize:'contain',display:'inline-block',position:'relative',marginRight:'40px',backgroundRepeat: 'no-repeat'}}>
									<div>
										<div className={styles.badgeImg_qrcode}>
											<QRCode value = { `https://saas.ishanshan.com/paygateway/payGateway/wsPayPage?mchId=`+mchId || '' } size = { 225 } />
											<div className={styles.badge_org_name}>{businessShort}</div>
										</div>
									</div>
								</div>
                <div style={{backgroundImage:"url('/guanli/wsmchController/getImage?src=img.ishanshan.com/gimg/n/20181128/265e28cf3316ebf91f774b69ca14dbfe')",width:'371.28px',height:'587.52px',verticalAlign:'middle',backgroundSize:'contain',display:'inline-block',position:'relative',marginRight:'40px',backgroundRepeat: 'no-repeat'}}>
									<div>
										<div className={styles.badgeImg_qrcode}>
											<QRCode value = { `https://saas.ishanshan.com/paygateway/payGateway/wsPayPage?mchId=`+mchId || '' } size = { 225 } />
											<div className={styles.badge_org_name}>{businessShort}</div>
										</div>
									</div>
								</div>
            </div>
        </div>
    );

    //贴牌二维码
    let QrcodeHtml = (
        <div id="qrcode" style={{width: '821px', height: '192px', position: 'absolute' , top: '-24vh', right:'17px' ,background:'#dddddd'}}>
            <div style={{padding:'0 95px'}}>
                <div style={{display:'inline-block'}}>
                    <div style={{background:'#fff', width:'180px',height:'192px',marginRight:'30px',position:'relative',display:'inline-block'}}>
                        <div style={{textAlign:'center',paddingTop:'9px'}}>
                            <QRCode value = { `https://saas.ishanshan.com/paygateway/payGateway/wsPayPage?mchId=`+mchId || '' } size = { 165 } />
                        </div>
                        <div style={{fontSize:"12px" , textAlign:'center' , color:'#000',lineHeight:'12px'}}>{businessShort}</div>
                    </div>
                 </div>
				 <div style={{background:'#fff', width:'180px',height:'192px',marginRight:'30px',position:'relative',display:'inline-block'}}>
					<div style={{textAlign:'center',paddingTop:'9px'}}>
						<QRCode value = { `https://saas.ishanshan.com/paygateway/payGateway/wsPayPage?mchId=`+mchId || '' } size = { 165 } />
					</div>
					<div style={{fontSize:"12px" , textAlign:'center' , color:'#000',lineHeight:'12px'}}>{businessShort}</div>
				 </div>
				 <div style={{background:'#fff',width:'180px',height:'192px',position:'relative',display:'inline-block'}}>
					<div style={{textAlign:'center',paddingTop:'9px'}}>
						<QRCode value = { `https://saas.ishanshan.com/paygateway/payGateway/wsPayPage?mchId=`+mchId || '' } size = { 165 } />
					</div>
					<div style={{fontSize:"12px" , textAlign:'center' , color:'#000',lineHeight:'12px'}}>{businessShort}</div>
				 </div>
            </div>
        </div>
    );

    let WsBusinessInfoProps = {
        dataSource,
        isShowSearch,
        showSearchFun,
        SearchSubmit,
        total,
        pageSize,
        pageIndex,
        tableOnChange,
        exportFun,
        tableLoading,
        mchId,
        cardLoad,   //台卡工牌更新
        businessShort ,     //商户简称
        qrCodeLoad,  //二维码的下载
		appNameList,        //服务商信息下拉列表
		appNameChange,   //服务商信息的更新
		appId,            //服务商信息
    };

    return (
        <div>
            <div style={{opacity: 1, width: '0', height: '0'}}>{imageCardHtml}</div>
            <div style={{opacity: 0, width: '0', height: '0'}}>{QrcodeHtml}</div>
            <WsBusinessInfoComponent { ...WsBusinessInfoProps } />
        </div>
    )
};

function mapStateToProps ({ WsBusinessInfoModel }){
	return { WsBusinessInfoModel };
};

export default connect( mapStateToProps )( WsBusinessInfoPage );
