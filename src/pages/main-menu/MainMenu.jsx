import React from "react";
import { Menu, Icon, Modal } from "antd";

import { connect } from "dva";

import { routerRedux } from "dva/router";

import styles from "./MainMenu.less";

let SubMenu = Menu.SubMenu;
let MenuItemGroup = Menu.ItemGroup;

function MainMenu({ dispatch, mainMenu }) {
  let {
    openKeys,
    currentMenuKey,
    menuOneLight, //判断菜单项1是否高亮
    menuTwoLight, //判断菜单项2是否高亮
    menuThreeLight, //判断菜单项3是否高亮
    modalVisible, //蒙层是否显示

    acceptAllMenus,
    accept_menu_role
  } = mainMenu;

  let menuItemClick = function(item) {
    dispatch({
      type: "mainMenu/menuItemClick",
      payload: {
        currentMenuKey: item.key
      }
    });
    dispatch(
      routerRedux.push({
        pathname: item.key
      })
    );
  };

  let subMenuOpenChange = function(openKeys) {
    let openMenuKeys = [];
    if (openKeys && openKeys.length > 0) {
      openMenuKeys.push(openKeys[openKeys.length - 1]);
    }
    dispatch({
      type: "mainMenu/subMenuOpenChange",
      payload: {
        openKeys: openMenuKeys
      }
    });
  };

  let CheckUpdateMessage = function() {
    dispatch({
      type: "mainMenu/querySuccess",
      payload: {
        modalVisible: true
      }
    });
  };

  let modalOnCancel = function() {
    dispatch({
      type: "mainMenu/querySuccess",
      payload: {
        modalVisible: false
      }
    });
  };

  let modalProps = {
    title: "测试",
    maskClosable: false,
    visible: modalVisible,
    closable: true,
    width: 550,
    onCancel: modalOnCancel,
    footer: []
  };

  let menu_split = (
    <div
      style={{
        height: "6px",
        width: "100%",
        borderRadius: "5px",
        backgroundColor: "rgba(255, 255, 255, 0.2)"
      }}
    />
  );

  let all_menus = [
    //        <SubMenu key="topic_sub" title={<span><Icon type="book" /><span>主题管理</span></span>} style={{display: 'none'}}>
    //            <Menu.Item key="topic_mgr"><Icon type="book" />主题管理</Menu.Item>
    //        </SubMenu>,
    //
    //        <SubMenu key="user_sub" title={<span><Icon type="user" /><span>用户管理</span></span>}>
    //            <Menu.Item key="user_mgr"><Icon type="user" />用户管理</Menu.Item>
    //            <Menu.Item key="user_feedback" style={{display: 'none'}}><Icon type="shrink" />用户反馈</Menu.Item>
    //            <Menu.Item key="user_invite"><Icon type="plus-square-o" />用户邀请</Menu.Item>
    //            <Menu.Item key="user_topic_reward"><Icon type="like-o" />用户帖子打赏</Menu.Item>
    //            <Menu.Item key="user_topic_report"><Icon type="dislike-o" />用户帖子举报</Menu.Item>
    //        </SubMenu>,
    //
    //        <SubMenu key="pindao_sub" title={<span><Icon type="windows-o" /><span>频道管理</span></span>}>
    //            <Menu.Item key="channel_mgr"><Icon type="windows-o" />频道管理</Menu.Item>
    //        </SubMenu>,
    //
    //        <SubMenu key="biz_sub" title={<span><Icon type="folder" /><span>业务管理</span></span>}>
    //            <Menu.Item key="banner_mgr"><Icon type="tag-o" />banner管理</Menu.Item>
    //            <Menu.Item key="main_page_mgr"><Icon type="link" />主页管理</Menu.Item>
    //            <Menu.Item key="gg_mgr"><Icon type="paper-clip" />广告管理</Menu.Item>
    //            <Menu.Item key="shanshan_share"><Icon type="camera-o" />闪闪分享</Menu.Item>
    //        </SubMenu>,
    //
    //        <SubMenu key="gold_sub" title={<span><Icon type="pay-circle-o" /><span>金币业务</span></span>}>
    //            <Menu.Item key="goods_mgr"><Icon type="exception" />商品管理</Menu.Item>
    //            <Menu.Item key="gold_shop"><Icon type="credit-card" />金币商城订单</Menu.Item>
    //            <Menu.Item key="second_sale"><Icon type="clock-circle-o" />秒杀活动管理</Menu.Item>
    //            <Menu.Item key="applicable_activities_mgr"><Icon type="video-camera" />试用活动管理</Menu.Item>
    //            <Menu.Item key="sign_game_mgr"><Icon type="heart-o" />签到游戏管理</Menu.Item>
    //            <Menu.Item key="sign_list"><Icon type="check" />签到列表</Menu.Item>
    //            <Menu.Item key="gold_mgr"><Icon type="pay-circle-o" />金币管理</Menu.Item>
    //        </SubMenu>,
    //
    //        <SubMenu key="back_sub" title={<span><Icon type="code-o" /><span>后台配置</span></span>}>
    //            <Menu.Item key="post_topic"><Icon type="bulb" />帖子专题</Menu.Item>
    //            <Menu.Item key="user_rec"><Icon type="solution" />用户推荐</Menu.Item>
    //            <Menu.Item key="topic_activity"><Icon type="share-alt" />帖子活动</Menu.Item>
    //            <Menu.Item key="public_modal"><Icon type="picture" />公众号模板</Menu.Item>
    //        </SubMenu>,
    //
    //        <SubMenu key="robot_sub" title={<span><Icon type="android" /><span>机器人业务</span></span>}>
    //            <Menu.Item key="robot"><Icon type="android" />机器人业务</Menu.Item>
    //        </SubMenu>,

    <MenuItemGroup key="org_menu_group" title={menu_split}>
      <SubMenu
        key="organ_sub"
        title={
          <span>
            <Icon type="laptop" />
            <span style={!!menuOneLight ? { color: "#ff0000" } : null}>
              机构业务
            </span>
          </span>
        }>
        <Menu.Item key="registration_form">
          <Icon type="solution" />
          <span>注册渠道</span>
        </Menu.Item>
        <Menu.Item key="organ_register">
          <Icon type="environment-o" />
          <span>机构注册</span>
        </Menu.Item>
        <Menu.Item key="tenant_message">
          <Icon type="folder" />
          <span style={!!menuOneLight ? { color: "#ff0000" } : null}>
            租户信息
          </span>
        </Menu.Item>
        <Menu.Item key="organ_message">
          <Icon type="file-text" />
          机构信息
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="sys_wechat"
        title={
          <span>
            <Icon type="laptop" />
            <span style={!!menuOneLight ? { color: "#ff0000" } : null}>
              小程序
            </span>
          </span>
        }>
        <Menu.Item key="sys_wechat_tenant">
          <Icon type="bars" />
          <span>租户管理</span>
        </Menu.Item>
        <Menu.Item key="sys_wechat_mechanism">
          <Icon type="bars" />
          <span>机构管理</span>
        </Menu.Item>
        <Menu.Item key="sys_wechat_openUp">
          <Icon type="bars" />
          <span style={!!menuOneLight ? { color: "#ff0000" } : null}>
            开通管理
          </span>
        </Menu.Item>
        <Menu.Item key="sys_wechat_templet">
          <Icon type="bars" />
          模板管理
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="saas_weixin_market"
        title={
          <span>
            <Icon type="qrcode" />
            <span>招生宝营销</span>
          </span>
        }>
        <Menu.Item key="saas_weixin_market_model_set">
          <Icon type="bars" />
          模板管理
        </Menu.Item>
        <Menu.Item key="saas_weixin_market_marketing_package">
          <Icon type="book" />
          营销套餐
        </Menu.Item>
        <Menu.Item key="saas_weixin_market_opening_mgr">
          <Icon type="unlock" />
          <span>开通管理</span>
        </Menu.Item>
        <Menu.Item key="saas_weixin_market_case_mgr">
          <Icon type="code-o" />
          实例管理
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="advertisement"
        title={
          <span>
            <Icon type="switcher" />
            <span>广告投放</span>
          </span>
        }>
        <Menu.Item key="supervision_advertising">
          <Icon type="bars" />
          广告管理
        </Menu.Item>
        <Menu.Item key="delivery_management">
          <Icon type="book" />
          投放管理
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="templatetag"
        title={
          <span>
            <Icon type="tag-o" />
            <span>模板标签</span>
          </span>
        }>
        <Menu.Item key="tag_management">
          <Icon type="tags" />
          标签管理
        </Menu.Item>
        <Menu.Item key="labeling">
          <Icon type="tags-o" />
          打标签
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="saas_package"
        title={
          <span>
            <Icon type="book" />
            <span style={!!menuTwoLight ? { color: "#ff0000" } : null}>
              SAAS管理
            </span>
          </span>
        }>
        <Menu.Item key="saas_scrm_overview">
          <Icon type="notification" />
          SAAS营销首页
        </Menu.Item>
        <Menu.Item key="saas_package_mgr">
          <Icon type="book" />
          <span style={!!menuTwoLight ? { color: "#ff0000" } : null}>
            SAAS套餐管理
          </span>
        </Menu.Item>
        <Menu.Item key="domain_name_setting">
          <Icon type="code-o" />
          <span>域名设置</span>
        </Menu.Item>
        <Menu.Item key="brand_manage">
          <Icon type="solution" />
          <span style={!!menuTwoLight ? { color: "#ff0000" } : null}>
            品牌管理
          </span>
        </Menu.Item>
        <Menu.Item key="hq_package_dispatch">
          <Icon type="share-alt" />
          <span style={!!menuTwoLight ? { color: "#ff0000" } : null}>
            总部套餐分配
          </span>
        </Menu.Item>
        <Menu.Item key="package_update">
          <Icon type="bars" />
          <span style={!!menuTwoLight ? { color: "#ff0000" } : null}>
            套餐升级
          </span>
        </Menu.Item>
        <Menu.Item key="face_mgr">
          <Icon type="scan" />
          <span style={!!menuTwoLight ? { color: "#ff0000" } : null}>
            人脸套餐
          </span>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="koubei_game_mgr"
        title={
          <span>
            <Icon type="qrcode" />
            <span>口碑游戏管理</span>
          </span>
        }>
        <Menu.Item key="koubei_game">
          <Icon type="bars" />
          口碑游戏
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="payment_center"
        title={
          <span>
            <Icon type="bank" />
            <span>支付系统</span>
          </span>
        }>
        <Menu.Item key="to_review">
          <Icon type="pay-circle-o" />
          提现审核
        </Menu.Item>
        <Menu.Item key="wallet_account">
          <Icon type="red-envelope" />
          钱宝账号
        </Menu.Item>
        <Menu.Item key="education_pay">
          <Icon type="pay-circle-o" />
          支付宝教育缴费
        </Menu.Item>
        <Menu.Item key="ws_businessInfo">
          <Icon type="solution" />
          网上商户信息
        </Menu.Item>
        <Menu.Item key="transactionStatisticsReport">
          <Icon type="solution" />
          交易统计报表
        </Menu.Item>
        <Menu.Item key="ws_settlementReport">
          <Icon type="file-text" />
          商户结算报表
        </Menu.Item>
        <Menu.Item key="ws_sendMaterialReport">
          <Icon type="exception" />
          邮寄物料报表
        </Menu.Item>
        <Menu.Item key="ws_promoterInfo">
          <Icon type="solution" />
          推广员信息
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="news"
        title={
          <span>
            <Icon type="switcher" />
            <span>新闻编辑</span>
          </span>
        }>
        <Menu.Item key="news_banner">
          <Icon type="bars" />
          官网banner
        </Menu.Item>
        <Menu.Item key="news_in">
          <Icon type="bars" />
          新闻录入
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="call_center"
        title={
          <span>
            <i className="icon iconfont icon-waihuguanli" />
            &nbsp;&nbsp;
            <span>呼叫中心</span>
          </span>
        }>
        <Menu.Item key="customer_manage">
          <span>
            <i className="icon iconfont icon-kehuguanli" />
            &nbsp;&nbsp;客户管理
          </span>{" "}
        </Menu.Item>
        <Menu.Item key="at_the_manage">
          <span>
            <i className="icon iconfont icon-zuoxiguanli" />
            &nbsp;&nbsp;坐席管理
          </span>{" "}
        </Menu.Item>
        <Menu.Item key="outbound_package_manage">
          <span>
            <i className="icon iconfont icon-waihuguanli" />
            &nbsp;&nbsp;外呼套餐管理
          </span>{" "}
        </Menu.Item>
      </SubMenu>
    </MenuItemGroup>,

    <MenuItemGroup key="data_menu_group" title={menu_split}>
      <SubMenu
        key="data_sub"
        title={
          <span>
            <Icon type="area-chart" />
            <span>数据统计</span>
          </span>
        }>
        <Menu.Item key="shanshanzaojiao">
          <Icon type="bar-chart" />
          闪闪早教
        </Menu.Item>
        <Menu.Item key="shanshanguanjia">
          <Icon type="line-chart" />
          闪闪管家
        </Menu.Item>
        <Menu.Item key="koubeishangpin">
          <Icon type="dot-chart" />
          口碑商品
        </Menu.Item>
        <Menu.Item key="yuyueshiting">
          <Icon type="area-chart" />
          预约试听
        </Menu.Item>
        <Menu.Item key="weixinyingxiao">
          <Icon type="bar-chart" />
          微信营销
        </Menu.Item>
      </SubMenu>
    </MenuItemGroup>,

    <MenuItemGroup key="test_menu_group" title={menu_split}>
      <SubMenu
        key="xiana"
        title={
          <span>
            <Icon type="code-o" />
            <span>贽殿遮那测试专用</span>
          </span>
        }>
        <Menu.Item key="sakamotou">
          <Icon type="bulb" />
          坂本悠二
        </Menu.Item>
        <Menu.Item key="saitou">
          <Icon type="bulb" />
          平贺才人
        </Menu.Item>
      </SubMenu>
    </MenuItemGroup>
  ];

  /*自定义的角色1拥有菜单*/
  let role_1_menus = [
    <SubMenu
      key="saas_weixin_market"
      title={
        <span>
          <Icon type="qrcode" />
          <span>SAAS微信营销</span>
        </span>
      }>
      <Menu.Item key="saas_weixin_market_model_set">
        <Icon type="bars" />
        模板管理
      </Menu.Item>
    </SubMenu>
  ];

  let current_menus = [];

  if (acceptAllMenus) {
    current_menus = all_menus;
  } else {
    if (accept_menu_role == "1") {
      current_menus = role_1_menus;
    }
  }
  return (
    <div className={styles.main_menu_content}>
      <Menu
        theme={"dark"}
        onClick={menuItemClick}
        onOpenChange={subMenuOpenChange}
        className={styles.main_menu}
        openKeys={openKeys}
        selectedKeys={[currentMenuKey]}
        mode="inline">
        {current_menus}
      </Menu>
      <div
        className={styles.check_update_message}
        onClick={() =>
          modalVisible == false ? CheckUpdateMessage() : modalOnCancel()
        }>
        <div className={styles.message}>
          {modalVisible == false ? "查看版本更新信息" : "关闭查看"}
        </div>
        <Icon type="double-right" className={styles.doubleDown} />
      </div>
      <Modal {...modalProps} style={{ display: "none" }} />
    </div>
  );
}

function mapStateToProps({ mainMenu }) {
  return { mainMenu };
}

export default connect(mapStateToProps)(MainMenu);
