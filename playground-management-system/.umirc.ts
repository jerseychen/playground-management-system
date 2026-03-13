import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  tailwindcss: false,
  publicPath: '/',
  history: {
    type: 'hash',
  },
  layout: {
    title: '游乐场管理系统',
    locale: false,
    siderWidth: 200,
    splitMenus: false,
    keepalive: ['/dashboard/analysis', '/business/:path*', '/package/:path*', '/product/:path*', '/marketing/:path*', '/member/:path*', '/miniprogram/:path*', '/report/:path*', '/equipment/:path*', '/sports/:path*', '/settings/:path*'],
  },
  routes: [
    {
      path: '/',
      redirect: '/dashboard/analysis',
    },
    {
      name: '首页',
      path: '/dashboard/analysis',
      icon: 'HomeOutlined',
      component: './Dashboard/Analysis',
      hideInMenu: true,
    },
    {
      name: '营业',
      path: '/business',
      icon: 'DollarOutlined',
      routes: [
        {
          name: '门店结账',
          path: '/business/checkout',
          routes: [
            { name: '交班结账', path: '/business/checkout/shift' },
            { name: '营业报表', path: '/business/checkout/report' },
          ],
        },
        {
          name: '支付对账',
          path: '/business/payment',
          routes: [
            { name: '支付订单', path: '/business/payment/orders' },
            { name: '订单退款记录', path: '/business/payment/refunds' },
            { name: '支付方式对账', path: '/business/payment/reconciliation' },
          ],
        },
        {
          name: '营业查询',
          path: '/business/query',
          routes: [
            { name: '营业数据', path: '/business/query/data' },
            { name: '销售查询', path: '/business/query/sales' },
            { name: '交账录入', path: '/business/query/entry' },
            { name: '历史账目', path: '/business/query/history' },
            { name: '币单价', path: '/business/query/coin-price' },
            { name: '客单价', path: '/business/query/avg-price' },
            { name: '确收报表', path: '/business/query/revenue' },
            { name: '经营对比', path: '/business/query/comparison' },
            { name: '门店资产对账', path: '/business/query/asset-recon' },
            { name: '门店实物币对账', path: '/business/query/physical-coin' },
            { name: '漫游对账', path: '/business/query/roaming' },
          ],
        },
        {
          name: '其它收支',
          path: '/business/other',
          routes: [
            { name: '其他收入查询', path: '/business/other/income' },
            { name: '其他支出查询', path: '/business/other/expense' },
            { name: '其他收支设置', path: '/business/other/settings' },
          ],
        },
        {
          name: '分账管理',
          path: '/business/ledger',
          routes: [
            { name: '分账方', path: '/business/ledger/parties' },
            { name: '分账查询', path: '/business/ledger/query' },
          ],
        },
        {
          name: '支付管理',
          path: '/business/payment-mgmt',
        },
      ],
    },
    {
      name: '套餐',
      path: '/package',
      icon: 'GiftOutlined',
      routes: [
        {
          name: '币票套餐',
          path: '/package/coin-ticket',
          routes: [
            { name: '售币套餐', path: '/package/coin-ticket/coin' },
            { name: '门票套餐', path: '/package/coin-ticket/ticket' },
          ],
        },
        {
          name: '组合套餐',
          path: '/package/combo',
          routes: [
            { name: '充值大礼包', path: '/package/combo/gift' },
            { name: '组合销售', path: '/package/combo/sales' },
          ],
        },
        {
          name: '入会套餐',
          path: '/package/member',
          routes: [
            { name: '代币入会', path: '/package/member/coin' },
            { name: '门票入会', path: '/package/member/ticket' },
          ],
        },
        {
          name: '弹珠套餐',
          path: '/package/marble',
        },
        {
          name: '机台套餐',
          path: '/package/machine',
          routes: [
            { name: '机台包时', path: '/package/machine/time' },
            { name: '机台局数', path: '/package/machine/rounds' },
          ],
        },
        {
          name: '其它套餐',
          path: '/package/other',
          routes: [
            { name: '杂项套餐', path: '/package/other/misc' },
            { name: '资产转换', path: '/package/other/convert' },
            { name: '生日套餐', path: '/package/other/birthday' },
            { name: '会员升级', path: '/package/other/upgrade' },
            { name: '借卡套餐', path: '/package/other/borrow' },
          ],
        },
        {
          name: '团购核销',
          path: '/package/group',
          routes: [
            { name: '渠道配置', path: '/package/group/channel-config' },
            { name: '渠道套餐', path: '/package/group/channel-package' },
            { name: '一物一码', path: '/package/group/qr-code' },
          ],
        },
        {
          name: '套餐设置',
          path: '/package/settings',
          routes: [
            { name: '销售位置', path: '/package/settings/pos' },
          ],
        },
        {
          name: '会员资产',
          path: '/package/assets',
          routes: [
            { name: '优惠券管理', path: '/package/assets/coupon' },
            { name: '积分管理', path: '/package/assets/points' },
            { name: '礼品卡管理', path: '/package/assets/gift-card' },
          ],
        },
      ],
    },
    {
      name: '商品',
      path: '/product',
      icon: 'ShoppingOutlined',
      routes: [
        {
          name: '商品资料',
          path: '/product/info',
        },
        {
          name: '库存管理',
          path: '/product/inventory',
          routes: [
            { name: '商品申购', path: '/product/inventory/purchase-request' },
            { name: '商品采购', path: '/product/inventory/purchase' },
            { name: '总部集采', path: '/product/inventory/central-purchase' },
            { name: '库存管理', path: '/product/inventory/mgmt' },
            { name: '商品调拨', path: '/product/inventory/transfer' },
            { name: '库存盘点', path: '/product/inventory/stocktaking' },
            { name: '库存盘点确认', path: '/product/inventory/stock-confirm' },
            { name: '成本核算', path: '/product/inventory/costing' },
          ],
        },
        {
          name: '库存查询',
          path: '/product/query',
          routes: [
            { name: '库存查询', path: '/product/query/stock' },
            { name: '库存变动', path: '/product/query/changes' },
            { name: '盘点差异', path: '/product/query/variance' },
            { name: '滞销商品', path: '/product/query/unsold' },
            { name: '出入仓总结', path: '/product/query/summary' },
            { name: '核算记录', path: '/product/query/cost-records' },
            { name: '商品利润', path: '/product/query/profit' },
          ],
        },
        {
          name: '基础设置',
          path: '/product/settings',
          routes: [
            { name: '基础设置', path: '/product/settings/basic' },
            { name: '仓库设置', path: '/product/settings/warehouse' },
            { name: '供应商管理', path: '/product/settings/supplier' },
            { name: '出入仓类型', path: '/product/settings/inout-type' },
            { name: '商品类型', path: '/product/settings/product-type' },
            { name: '商品单位', path: '/product/settings/unit' },
          ],
        },
      ],
    },
    {
      name: '营销',
      path: '/marketing',
      icon: 'FireOutlined',
      routes: [
        {
          name: '营销中心',
          path: '/marketing/center',
          routes: [
            { name: '营销中心', path: '/marketing/center/main' },
            { name: '促销营销', path: '/marketing/center/promotion' },
            { name: '机台营销', path: '/marketing/center/machine' },
            { name: '项目营销', path: '/marketing/center/project' },
            { name: '会员营销', path: '/marketing/center/member' },
            { name: '其它营销', path: '/marketing/center/other' },
          ],
        },
        {
          name: '氛围系统',
          path: '/marketing/atmosphere',
          routes: [
            { name: '日常氛围', path: '/marketing/atmosphere/daily' },
            { name: '活动氛围', path: '/marketing/atmosphere/event' },
            { name: '氛围市场', path: '/marketing/atmosphere/market' },
            { name: '工控盒子管理', path: '/marketing/atmosphere/box' },
            { name: '灯控器管理', path: '/marketing/atmosphere/light' },
          ],
        },
        {
          name: '活动通知',
          path: '/marketing/notice',
          routes: [
            { name: '通知管理', path: '/marketing/notice/mgmt' },
          ],
        },
      ],
    },
    {
      name: '会员',
      path: '/member',
      icon: 'UserOutlined',
      routes: [
        {
          name: '会员管理',
          path: '/member/mgmt',
          routes: [
            { name: '会员级别', path: '/member/mgmt/level' },
            { name: '会员权益', path: '/member/mgmt/benefits' },
            { name: '会员标签', path: '/member/mgmt/tags' },
            { name: '权益项目配置', path: '/member/mgmt/benefit-config' },
          ],
        },
        {
          name: '会员升降级',
          path: '/member/upgrade',
        },
        {
          name: '会员卡',
          path: '/member/card',
          routes: [
            { name: '会员卡管理', path: '/member/card/mgmt' },
          ],
        },
      ],
    },
    {
      name: '小程序',
      path: '/miniprogram',
      icon: 'MobileOutlined',
      routes: [
        {
          name: '微信小程序',
          path: '/miniprogram/wechat',
          routes: [
            { name: '小程序装修', path: '/miniprogram/wechat/decorate' },
            { name: '小程序设置', path: '/miniprogram/wechat/settings' },
            { name: '门店管理', path: '/miniprogram/wechat/store' },
            { name: '弹窗广告', path: '/miniprogram/wechat/popup' },
            { name: '活动海报', path: '/miniprogram/wechat/poster' },
          ],
        },
        {
          name: '异业联盟',
          path: '/miniprogram/alliance',
          routes: [
            { name: '异业商户管理', path: '/miniprogram/alliance/merchants' },
          ],
        },
        {
          name: '京东礼品',
          path: '/miniprogram/jd',
          routes: [
            { name: '订单查询', path: '/miniprogram/jd/orders' },
            { name: '门店设置', path: '/miniprogram/jd/store-settings' },
          ],
        },
        {
          name: '自营礼品',
          path: '/miniprogram/self',
          routes: [
            { name: '自营礼品商城', path: '/miniprogram/self/mall' },
          ],
        },
        {
          name: '小程序查询',
          path: '/miniprogram/query',
          routes: [
            { name: '订单查询', path: '/miniprogram/query/orders' },
            { name: '退款申请', path: '/miniprogram/query/refunds' },
            { name: '会员绑定记录', path: '/miniprogram/query/binding' },
            { name: '弹窗阅读记录', path: '/miniprogram/query/popup-read' },
          ],
        },
      ],
    },
    {
      name: '报表',
      path: '/report',
      icon: 'BarChartOutlined',
      routes: [
        {
          name: '数据大屏',
          path: '/report/dashboard',
        },
        {
          name: '定制报表',
          path: '/report/custom',
        },
        {
          name: '销售报表',
          path: '/report/sales',
          routes: [
            { name: '销售查询', path: '/report/sales/query' },
            { name: '销售趋势', path: '/report/sales/trend' },
            { name: '套餐客单价', path: '/report/sales/avg-price' },
          ],
        },
        {
          name: '兑换/回收',
          path: '/report/exchange',
          routes: [
            { name: '兑换查询', path: '/report/exchange/query' },
            { name: '回收记录', path: '/report/exchange/recycle' },
          ],
        },
        {
          name: '机台报表',
          path: '/report/machine',
        },
        {
          name: '会员报表',
          path: '/report/member',
        },
        {
          name: '大项目报表',
          path: '/report/project',
          routes: [
            { name: '大项目消费', path: '/report/project/consumption' },
            { name: '入闸时间分析', path: '/report/project/gate-time' },
          ],
        },
        {
          name: '设备报表',
          path: '/report/equipment',
        },
        {
          name: '稽查报表',
          path: '/report/audit',
          routes: [
            { name: '授权记录', path: '/report/audit/auth' },
            { name: 'AI风控记录', path: '/report/audit/ai-risk' },
            { name: '例外报告', path: '/report/audit/exception' },
            { name: '机台报警记录', path: '/report/audit/alarm' },
          ],
        },
      ],
    },
    {
      name: '设备',
      path: '/equipment',
      icon: 'ToolOutlined',
      routes: [
        {
          name: '设备看板',
          path: '/equipment/dashboard',
        },
        {
          name: '游戏机',
          path: '/equipment/game',
          routes: [
            { name: '游戏机档案', path: '/equipment/game/archive' },
            { name: '游戏机库存', path: '/equipment/game/inventory' },
            { name: '游戏机地址卡', path: '/equipment/game/address-card' },
            { name: '游戏机机种', path: '/equipment/game/type' },
            { name: '游戏机状态', path: '/equipment/game/status' },
            { name: '卡头激活码', path: '/equipment/game/activation' },
          ],
        },
        {
          name: '大项目',
          path: '/equipment/project',
          routes: [
            { name: '大项目管理', path: '/equipment/project/mgmt' },
          ],
        },
        {
          name: '营业设备',
          path: '/equipment/business',
        },
        {
          name: '抽奖机',
          path: '/equipment/lottery',
        },
        {
          name: '彩票王',
          path: '/equipment/lottery-king',
        },
        {
          name: '礼品柜',
          path: '/equipment/gift-cabinet',
        },
        {
          name: '设备租赁',
          path: '/equipment/rental',
          routes: [
            { name: '租赁项目', path: '/equipment/rental/projects' },
            { name: '租赁记录', path: '/equipment/rental/records' },
          ],
        },
        {
          name: '基站设置',
          path: '/equipment/base-station',
          routes: [
            { name: '区域基站', path: '/equipment/base-station/area' },
            { name: '区域设置', path: '/equipment/base-station/settings' },
            { name: '无线通讯质量分析查询', path: '/equipment/base-station/quality' },
          ],
        },
        {
          name: '机台/大项目分组',
          path: '/equipment/group',
        },
      ],
    },
    {
      name: '运动',
      path: '/sports',
      icon: 'TrophyOutlined',
      routes: [
        {
          name: '运动管理',
          path: '/sports/mgmt',
          routes: [
            { name: '徽章设置', path: '/sports/mgmt/badge' },
            { name: '特权设置', path: '/sports/mgmt/privilege' },
            { name: '经验值等级方案', path: '/sports/mgmt/exp-level' },
            { name: '功能项目', path: '/sports/mgmt/functions' },
            { name: '功能项目分支', path: '/sports/mgmt/function-branch' },
            { name: '打卡点管理', path: '/sports/mgmt/checkpoint' },
            { name: '路线', path: '/sports/mgmt/route' },
            { name: '排行榜', path: '/sports/mgmt/ranking' },
            { name: '服务终端设置', path: '/sports/mgmt/terminal' },
            { name: '年龄段组别', path: '/sports/mgmt/age-group' },
            { name: '自定义提示', path: '/sports/mgmt/custom-tips' },
          ],
        },
        {
          name: '运动设备',
          path: '/sports/equipment',
          routes: [
            { name: '打卡设备管理', path: '/sports/equipment/checkpoint' },
            { name: '玩家服务站', path: '/sports/equipment/service-station' },
            { name: '玩家任务站', path: '/sports/equipment/task-station' },
            { name: '手持运动助手', path: '/sports/equipment/handheld' },
          ],
        },
        {
          name: '团建管理',
          path: '/sports/team',
          routes: [
            { name: '教练登记', path: '/sports/team/coach' },
            { name: '团建订单', path: '/sports/team/orders' },
          ],
        },
        {
          name: '运动查询',
          path: '/sports/query',
          routes: [
            { name: '路线使用查询', path: '/sports/query/route' },
            { name: '会员能量查询', path: '/sports/query/energy' },
          ],
        },
      ],
    },
    {
      name: '设置',
      path: '/settings',
      icon: 'SettingOutlined',
      routes: [
        {
          name: '用户管理',
          path: '/settings/user',
          routes: [
            { name: '用户管理', path: '/settings/user/mgmt' },
            { name: '部门管理', path: '/settings/user/department' },
            { name: '消息订阅', path: '/settings/user/subscription' },
          ],
        },
        {
          name: '门店管理',
          path: '/settings/store',
          routes: [
            { name: '门店管理', path: '/settings/store/mgmt' },
            { name: '标签管理', path: '/settings/store/tags' },
            { name: '门店组管理', path: '/settings/store/groups' },
          ],
        },
        {
          name: 'AI风控',
          path: '/settings/ai-risk',
          routes: [
            { name: '风控设置', path: '/settings/ai-risk/settings' },
          ],
        },
        {
          name: '系统设置',
          path: '/settings/system',
          routes: [
            { name: '系统参数设置', path: '/settings/system/params' },
            { name: '更改营业日期', path: '/settings/system/business-date' },
            { name: '备注内容设置', path: '/settings/system/remarks' },
            { name: '报警号管理', path: '/settings/system/alarm' },
            { name: '日历设置', path: '/settings/system/calendar' },
            { name: '合作经营', path: '/settings/system/partnership' },
            { name: '定位手环', path: '/settings/system/wristband' },
            { name: 'POS设置', path: '/settings/system/pos' },
          ],
        },
        {
          name: '系统日志',
          path: '/settings/logs',
          routes: [
            { name: '操作日志', path: '/settings/logs/operation' },
          ],
        },
        {
          name: '系统运维',
          path: '/settings/ops',
          routes: [
            { name: '旧数据处理', path: '/settings/ops/old-data' },
            { name: '消息推送设置', path: '/settings/ops/push' },
            { name: '门店数据上传', path: '/settings/ops/upload' },
            { name: '数据推送', path: '/settings/ops/data-push' },
          ],
        },
      ],
    },
  ],
  npmClient: 'npm',
});
