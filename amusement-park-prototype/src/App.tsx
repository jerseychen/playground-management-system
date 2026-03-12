import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BasicLayout from './layouts/BasicLayout';
import Dashboard from './pages/Dashboard';
import TicketManagement from './pages/Ticket';
import MemberManagement from './pages/Member';
import ProductManagement from './pages/Product';
import DeviceManagement from './pages/Device';
import FinanceManagement from './pages/Finance';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 登录页 */}
        <Route path="/login" element={<Login />} />
        
        {/* 主布局内的页面 */}
        <Route path="/" element={<BasicLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* 票务管理 */}
          <Route path="ticket" element={<TicketManagement />} />
          <Route path="ticket/sell" element={<TicketManagement />} />
          <Route path="ticket/query" element={<TicketManagement />} />
          <Route path="ticket/refund" element={<TicketManagement />} />
          <Route path="ticket/statistics" element={<TicketManagement />} />
          <Route path="ticket/package" element={<TicketManagement />} />
          
          {/* 会员管理 */}
          <Route path="member" element={<MemberManagement />} />
          <Route path="member/archive" element={<MemberManagement />} />
          <Route path="member/points" element={<MemberManagement />} />
          <Route path="member/marketing" element={<MemberManagement />} />
          <Route path="member/records" element={<MemberManagement />} />
          <Route path="member/analysis" element={<MemberManagement />} />
          
          {/* 商品管理 */}
          <Route path="product" element={<ProductManagement />} />
          <Route path="product/list" element={<ProductManagement />} />
          <Route path="product/inventory" element={<ProductManagement />} />
          <Route path="product/purchase" element={<ProductManagement />} />
          <Route path="product/sales" element={<ProductManagement />} />
          <Route path="product/category" element={<ProductManagement />} />
          
          {/* 设备管理 */}
          <Route path="device" element={<DeviceManagement />} />
          <Route path="device/monitor" element={<DeviceManagement />} />
          <Route path="device/maintenance" element={<DeviceManagement />} />
          <Route path="device/alarm" element={<DeviceManagement />} />
          <Route path="device/archive" element={<DeviceManagement />} />
          <Route path="device/statistics" element={<DeviceManagement />} />
          
          {/* 财务管理 */}
          <Route path="finance" element={<FinanceManagement />} />
          <Route path="finance/income-expense" element={<FinanceManagement />} />
          <Route path="finance/reconciliation" element={<FinanceManagement />} />
          <Route path="finance/reports" element={<FinanceManagement />} />
          <Route path="finance/invoice" element={<FinanceManagement />} />
          <Route path="finance/cash-flow" element={<FinanceManagement />} />
          
          {/* 404页面 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;