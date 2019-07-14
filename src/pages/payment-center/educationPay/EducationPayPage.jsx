import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import QRCode from 'qrcode.react';
import { Spin , Row ,Col , Button } from 'antd';
import EducationPayComponent from '../../../components/payment-center/educationPay/EducationPayComponent';
import AddNewModelComponent from '../../../components/payment-center/educationPay/AddNewModelComponent';

function EducationPayPage({ dispatch,  EducationPayModel }){
    let {
        dataSource,
        isShowSearch,
        total,
        pageSize,
        pageIndex,
        searchContent,
        tableLoading,
		addNewSchoolVisible,    //新增学校的弹窗显示

    } = EducationPayModel;

	/*筛选*/
    function showSearchFun(){
        dispatch({
            type:'EducationPayModel/updateState',
            payload:{
                isShowSearch : !isShowSearch,
            }
        });
    }

    //搜索
    function SearchSubmit(searchContent){
        dispatch({
            type:'EducationPayModel/schoolQueryList',
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
            type: 'EducationPayModel/schoolQueryList',
            payload: {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
                searchContent
            },
        });
    };

    //导出
    function exportFun(){
		let url = `${BASE_URL}/wsmchController/exportTradeTotalReport?`;
		for(let i in searchContent){
			if(searchContent[i]){
				url = url + i +'='+searchContent[i]+'&'
			}
		}
        window.open(url, '_blank');
    }
	/*新增学校弹窗打开*/
	function addNewSchoolFun(){
		dispatch({
			type : 'EducationPayModel/updateState',
			payload : {
				addNewSchoolVisible : true,
			}
		})
	}
	/*新增学校的弹窗关闭*/
	function addNewSchoolModalCancel(){
		dispatch({
			type : 'EducationPayModel/updateState',
			payload : {
				addNewSchoolVisible : false,
				bool : false,
			}
		})
	}
	/*确定添加*/
	function addNewSchoolModalSubmit(data){
		dispatch({
			type:'EducationPayModel/addSchool',
			payload:{
				...data
			}
		});
	}
	/*地址变更*/
	function addrChange(value, selectedOptions){
		if(selectedOptions){
			let pro = selectedOptions[0];
			let city = selectedOptions[1];
			let district = selectedOptions[2];
			dispatch({
				type:'EducationPayModel/updateState',
				payload:{
					provinceCode : pro.value,
					provinceName : pro.label,
					cityCode : city.value,
					cityName : city.label,
					districtCode : district.value,
					districtName : district.label,
				}
			})
		}
	}

    let EducationPayProps = {
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
		addNewSchoolFun,      //新增学校
    };

	let AddNewModelProps = {
        addNewSchoolVisible,           //新增学校的弹窗显示
		addNewSchoolModalCancel,       //新增学校的弹窗关闭
		addNewSchoolModalSubmit,       //新增学校的信息提交
		addrChange,                    //地址选择
    };

    return (
        <div>
            < EducationPayComponent { ... EducationPayProps } />
			{
				addNewSchoolVisible ?
				<AddNewModelComponent { ...AddNewModelProps }/>
				:
				null
			}
        </div>
    )
};

function mapStateToProps ({  EducationPayModel }){
	return {  EducationPayModel };
};

export default connect( mapStateToProps )(  EducationPayPage );
