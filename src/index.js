import "./index.html";
import "./index.css";
import dva from "dva";

import "./assets/iconfont/iconfont.css";
import "./assets/font/font.css";
import "./assets/iconfont_callCenter/iconfont.css";

import "./utils/request";

window.BASE_URL = window.BASE_URL || "/guanli"; //本地测试环境请求地址
//window.BASE_URL = window.BASE_URL||'/manage';                      //本地测试环境请求地址
//window.BASE_URL = window.BASE_URL||'http://192.168.1.46/manage'; //本地测试环境请求地址
//window.BASE_URL = window.BASE_URL||'http://192.168.1.210/manage';//本地测试环境请求地址
//window.BASE_URL = window.BASE_URL||'http://192.168.1.52/manage'; //测试环境请求地址

//window.IMAGE_URL = 'http://192.168.1.60/ant-mobile';

window.BASE_URL = window.BASE_URL || "/guanli";

window.IMAGE_URL = "http://www.ishanshan.com/ant-mobile";
window._init_data = {};

// 1. Initialize
const app = dva();

// 2. Model
app.model(require("./models/Over-View/over-view"));
app.model(require("./models/Back-Deploy/postTopic"));
app.model(require("./models/Back-Deploy/userRec"));
app.model(require("./models/Back-Deploy/publicModal"));
app.model(require("./models/Back-Deploy/topicActivity"));

app.model(require("./models/BusinessMgr/bannerMgr"));
app.model(require("./models/BusinessMgr/ggMgr"));
app.model(require("./models/BusinessMgr/homePage"));
app.model(require("./models/BusinessMgr/shanshanShare"));

app.model(require("./models/ChannelMgr/channelMgr"));

app.model(require("./models/DataMgr/koubeishangpin"));
app.model(require("./models/DataMgr/shanshanguanjia"));
app.model(require("./models/DataMgr/shanshanzaojiao"));
app.model(require("./models/DataMgr/yuyueshiting"));
app.model(require("./models/DataMgr/weixinyingxiao"));

app.model(require("./models/GoldBusiness/applicableActivitiesMgr"));
app.model(require("./models/GoldBusiness/goldMgr"));
app.model(require("./models/GoldBusiness/goldShop"));
app.model(require("./models/GoldBusiness/goodsMgr"));
app.model(require("./models/GoldBusiness/secondSale"));
app.model(require("./models/GoldBusiness/signGame"));
app.model(require("./models/GoldBusiness/signList"));

app.model(require("./models/OrganBusiness/organRegister"));
app.model(require("./models/OrganBusiness/organMessage"));
app.model(require("./models/OrganBusiness/tenantMessage"));
app.model(require("./models/OrganBusiness/registrationForm"));

app.model(require("./models/Robot/robot"));

app.model(require("./models/TopicMgr/topicMgr"));

app.model(require("./models/UserMgr/topicReport"));
app.model(require("./models/UserMgr/topicReward"));
app.model(require("./models/UserMgr/userFeedBack"));
app.model(require("./models/UserMgr/userInvite"));
app.model(require("./models/UserMgr/userMgr"));

app.model(require("./models/SaasWeixinMarketing/saasWeiXinMarketingModelMgr"));
app.model(require("./models/SaasWeixinMarketing/saasWeiXinMarketingPackage"));
app.model(
  require("./models/SaasWeixinMarketing/saasWeiXinMarketingOpeningMgr")
);
app.model(require("./models/SaasWeixinMarketing/saasCaseManage"));

app.model(require("./models/SaasScrmOverView/SaasScrmOverView"));
app.model(require("./models/SaasPackageManage/SaasPackageManage"));
app.model(require("./models/domain-name-setting/DomainNameSetting"));
app.model(require("./models/packageUpdate/PackageUpdate")); // 套餐升级
app.model(require("./models/brand-manage/BrandManage"));
app.model(require("./models/hq-package-dispatch/HqPackageDispatch"));
app.model(require("./models/face-Mgr/faceMgr"));

app.model(require("./models/KouBeiGameMgr/kouBeiGameMgr"));

app.model(require("./models/mainMenu"));

app.model(require("./models/ZhiDianZheNa/banbenyouer"));
app.model(require("./models/ZhiDianZheNa/pinghecairen"));

app.model(require("./models/activity-module/activityModuleMgrModel")); //自定义模板-管理界面
app.model(require("./models/activity-module/activityModuleBuildModel")); //自定义模板-工具界面
app.model(
  require("./models/SaasWeixinMarketing/module-form/moduleBasePropsFormModel")
); //自定义模板-基础属性表单界面
app.model(
  require("./models/SaasWeixinMarketing/module-form/modulePageConfigFormModel")
); //自定义模板-页面配置表单界面

app.model(require("./models/Advertisement/supervision"));
app.model(require("./models/Advertisement/delivery"));

/*模板标签*/
app.model(require("./models/TemplateTag/Labeling")); //标签管理
app.model(require("./models/TemplateTag/TagManagement")); //打标签

app.model(require("./models/payment-center/to-review/toReviewModel")); //体现审核
app.model(require("./models/payment-center/wallet-account/walletAccountModel"));
app.model(require("./models/payment-center/educationPay/EducationPayModel")); //支付宝教育缴费
app.model(
  require("./models/payment-center/ws-businessInfo/WsBusinessInfoModel")
); //网上商户信息
app.model(
  require("./models/payment-center/ws-settlementReport/WsSettlementReportModel")
); //网上商户结算报表
app.model(
  require("./models/payment-center/transactionStatisticsReport/transactionStatisticsReportModel")
); //交易统计报表
app.model(
  require("./models/payment-center/ws-sendMaterialReport/WsSendMaterialModel")
); //邮寄物料报表
app.model(
  require("./models/payment-center/ws-promoterInfo/WsPromoterInfoModel")
); //推广员信息
/* 新闻编辑 */
app.model(require("./models/news/news_in/news_inModel")); //新闻录入
app.model(require("./models/news/news-banner/NewsBannerModel")); //官网banner

app.model(
  require("./models/SaasWeixinMarketing/module-form/moduleLeafletsBaseConfigFromModel")
); //线下传单模板-基础属性表单界面

//呼叫中心
app.model(require("./models/CallCenter/customerManageModel")); //客户管理
app.model(require("./models/CallCenter/atTheManageModel")); //坐席管理
app.model(require("./models/CallCenter/outboundPackageManageModel")); //外呼套餐管理

//小程序
app.model(require("./models/Wechat/wechatTenantModel")); //租户管理
app.model(require("./models/Wechat/wechatMechanismModel")); //机构管理
app.model(require("./models/Wechat/wechatOpenUpModel")); //小程序开通管理
app.model(require("./models/Wechat/wechatTempletModel")); //小程序模板管理
// 3. Router
app.router(require("./router"));

// 4. Start
app.start("#root");
