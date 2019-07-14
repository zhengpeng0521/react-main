import React from "react";
import { Router, Route, IndexRoute } from "dva/router";

import MainPage from "./components/main-page/MainPage";

import NotFound from "./pages/NotFound";

import PostTopic from "./pages/Back-Deploy/PostTopic/PostTopic";
import UserRec from "./pages/Back-Deploy/UserRec/UserRec";
import PublicModal from "./pages/Back-Deploy/PublicModal/PublicModal";
import TopicActivity from "./pages/Back-Deploy/TopicActivity/TopicActivity";

import BannerMgr from "./pages/BusinessMgr/banner-mgr/BannerMgr";
import GgMgr from "./pages/BusinessMgr/gg-mgr/GgMgr";
import HomePageMgr from "./pages/BusinessMgr/homepage-mgr/HomePage";
import ShanShanShare from "./pages/BusinessMgr/shanshan-share/ShanShanShare";

import ChannelMgr from "./pages/ChannelMgr/channel-mgr/ChannelMgr";

import KouBeiShangPin from "./pages/DataMgr/koubeishangpin/DataMgr";
import ShanShanGuanJia from "./pages/DataMgr/shanshanguanjia/DataMgr";
import ShanShanZaoJiao from "./pages/DataMgr/shanshanzaojiao/DataMgr";
import YuYueShiTing from "./pages/DataMgr/yuyueshiting/DataMgr";
import WeiXinYingXiao from "./pages/DataMgr/weixinyingxiao/DataMgr";

import ApplicableActivitiesMgr from "./pages/GoldBusiness/applicable-activities-mgr/ApplicableActivitiesMgr";
import GoldMgr from "./pages/GoldBusiness/gold-mgr/GoldMgr";
import GoldShop from "./pages/GoldBusiness//gold-shop/GoldShop";
import GoodsMgr from "./pages/GoldBusiness//goods-mgr/GoodsMgr";
import SecondSale from "./pages/GoldBusiness//second-sale/SecondSale";
import SignGame from "./pages/GoldBusiness//sign-game/SignGame";
import SignList from "./pages/GoldBusiness//sign-list/SignList";

import OrginRegister from "./pages/OrganBusiness/organ-register/OrganRegister";
import OrganMessage from "./pages/OrganBusiness/organ-message/OrganMessage";
import TenantMessage from "./pages/OrganBusiness/tenant-message/TenantMessage";
import RegistrationForm from "./pages/OrganBusiness/registration-form/RegistrationForm";

import Overview from "./pages/overview/Overview";

import Robot from "./pages/Robot/Robot";

import TopicMgr from "./pages/TopicMgr/TopicMgr";

import TopicReport from "./pages/UserMgr/topic-report/TopicReport";
import TopicReward from "./pages/UserMgr/topic-reward/TopicReward";
import UserFeedBack from "./pages/UserMgr/user-feedback/UserFeedBack";
import UserInvite from "./pages/UserMgr/user-invite/UserInvite";
import UserMgr from "./pages/UserMgr/user-mgr/UserMgr";

import WeiXinMarketingModelMgr from "./pages/SaasWeixinMarketing/ModalMgr/WeiXinMarketingModelSet";
import WeiXinMarketingPackage from "./pages/SaasWeixinMarketing/MarketingPackage/WeiXinMarketingPackage";
import WeiXinMarketingOpeningMgr from "./pages/SaasWeixinMarketing/OpeningMgr/WeiXinMarketingOpeningMgr";
import SaasScrmOverView from "./pages/SaasScrmOverView/SaasScrmOverView";
import SaasPackageManage from "./pages/SaasPackageManage/SaasPackageManage";
import DomainNameSetting from "./pages/domain-name-setting/DomainNameSetting";
import PackageUpdate from "./pages/packageUpdate/PackageUpdate"; // 套餐升级
import BrandManage from "./pages/brand-manage/BrandManage";
import HqPackageDispatch from "./pages/hq-package-dispatch/HqPackageDispatch";
import CaseManage from "./pages/SaasWeixinMarketing/CaseManage/CaseManage";
import KouBeiGameMgr from "./pages/KouBeiGameMgr/KouBeiGameMgr";

import BanBenYouEr from "./pages/ZhiDianZheNa/banbenyouer/DataMgr";
import PingHeCaiRen from "./pages/ZhiDianZheNa/pinghecairen/DataMgr";

import Supervision from "./pages/Advertisement/Supervision"; //广告管理
import Delivery from "./pages/Advertisement/Delivery";

import TagManagement from "./pages/TemplateTag/TagManagement";
import Labeling from "./pages/TemplateTag/Labeling";

import ActivityModuleBuild from "./pages/activity-module/activity-module-build/ActivityModuleBuild"; //微活动模板编辑

import ToReview from "./pages/payment-center/to-review/toReviewPage"; //提现审核
import WalletAccount from "./pages/payment-center/wallet-account/walletAccountPage"; //钱包账号
import EducationPay from "./pages/payment-center/educationPay/EducationPayPage"; //支付宝教育缴费
import WsBusinessInfo from "./pages/payment-center/ws-businessInfo/WsBusinessInfoPage"; //商户信息
import WsSettlementReport from "./pages/payment-center/ws-settlementReport/WsSettlementReportPage"; //商户结算报表
import transactionStatisticsReport from "./pages/payment-center/transactionStatisticsReport/transactionStatisticsReportPage";
import WsSendMaterialReport from "./pages/payment-center/ws-sendMaterialReport/WsSendMaterialPage"; //商户结算报表
import WsPromoterInfo from "./pages/payment-center/ws-promoterInfo/WsPromoterInfoPage"; //推广员信息
/* 新闻编辑 */
import NewBanner from "./pages/news/news-banner/NewsBannerPage"; //官网banner
import news_in from "./pages/news/news_in/news_inPage"; //新闻录入

import CustomerManage from "./pages/CallCenter/CustomerManage"; //客户管理
import AtTheManage from "./pages/CallCenter/AtTheManage"; //坐席管理
import OutboundPackageManage from "./pages/CallCenter/OutboundPackageManage"; //外呼套餐管理

import WechatTenant from "./pages/Wechat/WechatTenant"; //小程序租户管理
import WechatMechanism from "./pages/Wechat/WechatMechanism"; //小程序机构管理
import WechatOpenUp from "./pages/Wechat/WechatOpenUp"; //小程序开通管理
import WechatTemplet from "./pages/Wechat/WechatTemplet"; //小程序模板管理
import FaceMgr from "./pages/face-Mgr/FaceMgr";

/* eslint react/prop-types:0 */
export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={MainPage}>
        <IndexRoute component={Overview} />
        <Route path="/topic_mgr" component={TopicMgr} />
        <Route path="/user_mgr" component={UserMgr} />
        <Route path="/user_feedback" component={UserFeedBack} />
        <Route path="/user_invite" component={UserInvite} />
        <Route path="/user_topic_reward" component={TopicReward} />
        <Route path="/user_topic_report" component={TopicReport} />
        <Route path="/channel_mgr" component={ChannelMgr} />
        <Route path="/banner_mgr" component={BannerMgr} />
        <Route path="/gg_mgr" component={GgMgr} />
        <Route path="/main_page_mgr" component={HomePageMgr} />
        <Route path="/shanshan_share" component={ShanShanShare} />
        <Route
          path="/applicable_activities_mgr"
          component={ApplicableActivitiesMgr}
        />
        <Route path="/second_sale" component={SecondSale} />
        <Route path="/goods_mgr" component={GoodsMgr} />
        <Route path="/gold_shop" component={GoldShop} />
        <Route path="/gold_mgr" component={GoldMgr} />
        <Route path="/sign_list" component={SignList} />
        <Route path="/sign_game_mgr" component={SignGame} />
        <Route path="/robot" component={Robot} />
        <Route path="/shanshanzaojiao" component={ShanShanZaoJiao} />
        <Route path="/shanshanguanjia" component={ShanShanGuanJia} />
        <Route path="/koubeishangpin" component={KouBeiShangPin} />
        <Route path="/yuyueshiting" component={YuYueShiTing} />
        <Route path="/weixinyingxiao" component={WeiXinYingXiao} />
        <Route path="/organ_register" component={OrginRegister} />
        <Route path="/organ_message" component={OrganMessage} />
        <Route path="/registration_form" component={RegistrationForm} />
        <Route path="/tenant_message" component={TenantMessage} />
        <Route path="/post_topic" component={PostTopic} />
        <Route path="/user_rec" component={UserRec} />
        <Route path="/public_modal" component={PublicModal} />
        <Route path="/topic_activity" component={TopicActivity} />
        <Route
          path="/saas_weixin_market_model_set"
          component={WeiXinMarketingModelMgr}
        />
        <Route
          path="/saas_weixin_market_marketing_package"
          component={WeiXinMarketingPackage}
        />
        <Route
          path="/saas_weixin_market_opening_mgr"
          component={WeiXinMarketingOpeningMgr}
        />
        <Route path="/saas_weixin_market_case_mgr" component={CaseManage} />
        <Route
          path="/saas_activity_module_mgr"
          component={ActivityModuleBuild}
        />
        <Route path="/saas_scrm_overview" component={SaasScrmOverView} />
        <Route path="/saas_package_mgr" component={SaasPackageManage} />
        <Route path="/domain_name_setting" component={DomainNameSetting} />
        <Route path="/package_update" component={PackageUpdate} />
        <Route path="/face_mgr" component={FaceMgr} />

        <Route path="/brand_manage" component={BrandManage} />
        <Route path="/hq_package_dispatch" component={HqPackageDispatch} />
        <Route path="/koubei_game" component={KouBeiGameMgr} />
        <Route path="/sakamotou" component={BanBenYouEr} />
        <Route path="/saitou" component={PingHeCaiRen} />
        <Route path="/tag_management" component={TagManagement} />
        <Route path="/labeling" component={Labeling} />
        <Route path="/supervision_advertising" component={Supervision} />
        <Route path="/delivery_management" component={Delivery} />
        <Route path="to_review" component={ToReview} />
        <Route path="wallet_account" component={WalletAccount} />
        <Route path="education_pay" component={EducationPay} />
        <Route path="ws_businessInfo" component={WsBusinessInfo} />
        <Route path="ws_settlementReport" component={WsSettlementReport} />
        <Route
          path="transactionStatisticsReport"
          component={transactionStatisticsReport}
        />
        {/* 新闻编辑 */}
        <Route path="news_banner" component={NewBanner} />
        <Route path="news_in" component={news_in} /> {/*新闻录入*/}
        <Route path="ws_sendMaterialReport" component={WsSendMaterialReport} />
        <Route path="ws_promoterInfo" component={WsPromoterInfo} />
        <Route path="customer_manage" component={CustomerManage} />
        <Route path="at_the_manage" component={AtTheManage} />
        <Route
          path="outbound_package_manage"
          component={OutboundPackageManage}
        />
        {/*小程序*/}
        <Route path="/sys_wechat_tenant" component={WechatTenant} />
        <Route path="/sys_wechat_mechanism" component={WechatMechanism} />
        <Route path="/sys_wechat_openUp" component={WechatOpenUp} />
        <Route path="/sys_wechat_templet" component={WechatTemplet} />
        <Route path="/*" component={NotFound} />
      </Route>
    </Router>
  );
}
