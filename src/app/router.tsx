/**
 * @file app/router.tsx
 */

import { createBrowserRouter } from 'react-router-dom';
import { AppLayout }        from './AppLayout';
import { DashboardPage }    from '@/pages/DashboardPage';
import { TransactionsPage } from '@/pages/TransactionsPage';
import { SubscriptionsPage } from '@/pages/SubscriptionsPage';
import { AccountsPage }     from '@/pages/AccountsPage';
import { AnalyticsPage }    from '@/pages/AnalyticsPage';
import { ChatbotPage }      from '@/pages/ChatbotPage';
import { LoginPage }        from '@/pages/LoginPage';

// import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';

export const router = createBrowserRouter([
  { path: '/login',    element: <LoginPage /> },
  {
    path: '/',
    // element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <AppLayout />,
        children: [
          { index: true,               element: <DashboardPage /> },
          { path: 'transactions',      element: <TransactionsPage /> },
          { path: 'subscriptions',     element: <SubscriptionsPage /> },
          { path: 'accounts',          element: <AccountsPage /> },
          { path: 'analytics',         element: <AnalyticsPage /> },
          { path: 'chatbot',           element: <ChatbotPage /> },
        ],
      },
    ],
  },
]);
