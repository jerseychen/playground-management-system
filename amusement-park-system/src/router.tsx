import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import TicketSalePage from './pages/ticket/Sale';
import TicketQueryPage from './pages/ticket/Query';
import TicketPackagePage from './pages/ticket/Package';
import TicketStatsPage from './pages/ticket/Stats';
import MemberListPage from './pages/member/List';
import MemberPointsPage from './pages/member/Points';
import MemberMarketingPage from './pages/member/Marketing';
import MemberAnalysisPage from './pages/member/Analysis';
import ProductListPage from './pages/product/List';
import ProductInventoryPage from './pages/product/Inventory';
import ProductPurchasePage from './pages/product/Purchase';
import DeviceMonitorPage from './pages/device/Monitor';
import DeviceMaintenancePage from './pages/device/Maintenance';
import DeviceAlertPage from './pages/device/Alert';
import FinanceDailyPage from './pages/finance/Daily';
import FinanceReconciliationPage from './pages/finance/Reconciliation';
import FinanceReportsPage from './pages/finance/Reports';
import SettingsBasicPage from './pages/settings/Basic';
import SettingsPermissionPage from './pages/settings/Permission';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      // 票务管理
      {
        path: 'ticket/sale',
        element: <TicketSalePage />
      },
      {
        path: 'ticket/query',
        element: <TicketQueryPage />
      },
      {
        path: 'ticket/package',
        element: <TicketPackagePage />
      },
      {
        path: 'ticket/stats',
        element: <TicketStatsPage />
      },
      // 会员管理
      {
        path: 'member/list',
        element: <MemberListPage />
      },
      {
        path: 'member/points',
        element: <MemberPointsPage />
      },
      {
        path: 'member/marketing',
        element: <MemberMarketingPage />
      },
      {
        path: 'member/analysis',
        element: <MemberAnalysisPage />
      },
      // 商品管理
      {
        path: 'product/list',
        element: <ProductListPage />
      },
      {
        path: 'product/inventory',
        element: <ProductInventoryPage />
      },
      {
        path: 'product/purchase',
        element: <ProductPurchasePage />
      },
      // 设备管理
      {
        path: 'device/monitor',
        element: <DeviceMonitorPage />
      },
      {
        path: 'device/maintenance',
        element: <DeviceMaintenancePage />
      },
      {
        path: 'device/alert',
        element: <DeviceAlertPage />
      },
      // 财务管理
      {
        path: 'finance/daily',
        element: <FinanceDailyPage />
      },
      {
        path: 'finance/reconciliation',
        element: <FinanceReconciliationPage />
      },
      {
        path: 'finance/reports',
        element: <FinanceReportsPage />
      },
      // 系统设置
      {
        path: 'settings/basic',
        element: <SettingsBasicPage />
      },
      {
        path: 'settings/permission',
        element: <SettingsPermissionPage />
      }
    ]
  }
]);

export default router;