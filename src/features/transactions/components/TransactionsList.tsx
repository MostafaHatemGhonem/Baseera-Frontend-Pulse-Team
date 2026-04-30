/**
 * @file features/transactions/components/TransactionsList.tsx
 */

import { Badge } from '@/shared/ui/Badge/Badge';
import { ShoppingBag, Coffee, MonitorPlay, Zap, CreditCard, Receipt } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransactions } from '../hooks/useTransactions';
import { TransactionsListSkeleton } from './TransactionsListSkeleton';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Shopping: <ShoppingBag size={18} />,
  Food: <Coffee size={18} />,
  Entertainment: <MonitorPlay size={18} />,
  Utilities: <Zap size={18} />,
  Other: <CreditCard size={18} />,
};

// Colors based on the screenshot
const getIconColorClass = (category: string) => {
  if (category === 'Shopping' || category === 'Food' || category === 'Utilities') return 'bg-[#E0F2FE] text-[#1E293B]'; // Light blue circle, dark blue icon
  return 'bg-[#F3E8FF] text-[#8B5CF6]'; // Light purple circle, purple icon
};

export function TransactionsList() {
  const { data: transactions, isLoading, error } = useTransactions(1, 10);

  if (error) {
    return (
      <div className="flex items-center justify-center p-6 text-red-500">
        <p>عذراً، تعذر تحميل المعاملات.</p>
      </div>
    );
  }

  if (isLoading) {
    return <TransactionsListSkeleton count={4} />;
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex items-center justify-center p-6 text-slate-400">
        <p>لا توجد معاملات حالياً.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <AnimatePresence>
        {transactions.map((tx) => {
          const catIcon = CATEGORY_ICONS[tx.category] || CATEGORY_ICONS['Other'];
          const colorClass = getIconColorClass(tx.category);
          
          return (
            <motion.div
              key={tx.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between py-3 px-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors group"
            >
              {/* Right Side */}
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                  {catIcon}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-bold text-[#1E293B] truncate">
                      {tx.merchantName}
                    </p>
                    {tx.isSubscription && (
                      <Badge variant="info" className="text-[10px] py-0 px-1.5 h-4">اشتراك</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <time dateTime={tx.transactionDate}>
                      {new Date(tx.transactionDate).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="truncate">{tx.category || 'أخرى'}</span>
                    {tx.source === 'OCR' && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="flex items-center gap-1 text-[#0EA5E9]">
                          <Receipt size={10} /> OCR
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Left Side */}
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-sm font-bold text-[#1E293B] font-mono">
                  {tx.amount.toLocaleString('ar-SA', { minimumFractionDigits: 0 })} ج.م
                </span>
                <span className="text-[10px] font-medium text-slate-400">
                  {tx.status === 'Confirmed' ? 'مكتملة' : tx.status === 'Pending' ? 'معلقة' : tx.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
