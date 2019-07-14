import React from 'react';
import { Menu, Icon, Modal } from 'antd';
import { Link } from 'dva/router';
import styles from './Header.less';

function getMenuKeyFromUrl(pathname) {
    let key = '';
    try {
         key = pathname.match(/\/([^\/]*)/i)[1];
        /* eslint no-empty:0 */
    } catch (e) {

    }
    return key;
}

function Header({ dp , location }) {

    function zhuxiao() {
        window.location = '/thinknode/web/manager/login/logout';
    }

    function Logout(){
        window.location.href = `${BASE_URL}/login/out`
    }

    function ClickChangePwd(){
        dp('mainMenu/updateState' , { changePwdModalVisible : true })
    }

    return (
        <div style={{width:'100%',height:'100%',backgroundColor:'#2f4151'}}>
            <Menu
                className="header_menu"
                selectedKeys={[getMenuKeyFromUrl(location.pathname)]}
                mode="horizontal"
                theme="light"
                style={{width:'240px',display:'inline-block'}}
            >
                <Menu.Item key="home">
                    <Link to="/" className={styles.menu_link} style={{color:'rgba(255,255,255,0.9)'}}>返回首页</Link>
                </Menu.Item>
                {!!(window.manager_platform == 'thinknode') &&
                <Menu.Item key="404" >
                    <div onClick={zhuxiao}><Icon type="frown-circle" />注销</div>
                </Menu.Item>
                }

                <Menu.Item key="changePWD" >
                    <div onClick = { ClickChangePwd }>修改密码</div>
                </Menu.Item>

                <Menu.Item key="logout" >
                    <div onClick = { Logout }>注销</div>
                </Menu.Item>

            </Menu>
            <div className={styles.marquee}>
                <marquee direction = 'left'>
					<font style={{color:'rgba(255,255,255,0.9)',lineHeight:'48px',fontSize:'17px'}}><Icon type="star-o" className={styles.icon_star}/>&nbsp;&nbsp;闪闪后台管理系统&nbsp;&nbsp;<Icon type="star-o" className={styles.icon_star}/></font>
				</marquee>
            </div>
        </div>
    );
}

export default Header;
