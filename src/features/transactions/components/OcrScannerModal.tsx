/**
 * @file features/transactions/components/OcrScannerModal.tsx
 * @description نافذة المسح الضوئي للإيصالات — ترسل البيانات عبر POST /api/Transactions/ocr
 */

import { useEffect, useState } from 'react';
import { ScanLine, FileText } from 'lucide-react';
import { useSubmitOcr } from '../hooks/useTransactions';

interface OcrScannerModalProps {
  isOpen:  boolean;
  onClose: () => void;
}

export function OcrScannerModal({ isOpen, onClose }: OcrScannerModalProps) {
  const [scanning, setScanning] = useState(true);
  const { mutate: submitOcr } = useSubmitOcr();

  useEffect(() => {
    if (isOpen) {
      setScanning(true);
      // Simulate scanning process
      const timer = setTimeout(() => {
        setScanning(false);
        // Automatically submit a mock transaction when scan completes
        submitOcr(
          {
            merchantName: 'مطعم السعادة',
            amount: 150,
            category: 'Food',
            transactionDate: new Date().toISOString(),
          },
          {
            onSuccess: () => {
              setTimeout(() => {
                onClose();
              }, 1500);
            },
          }
        );
      }, 3000); // 3 seconds scan time

      return () => clearTimeout(timer);
    }
  }, [isOpen, submitOcr, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-fade-in"
      dir="rtl"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-[400px] bg-[#F8FAFC] rounded-[24px] shadow-2xl flex flex-col items-center p-8 text-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ocr-modal-title"
      >
        
        {/* Top Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#E0E7FF] text-[#8B5CF6] flex items-center justify-center mb-6 shadow-sm">
          <ScanLine size={28} />
        </div>

        {/* Text */}
        <h2 id="ocr-modal-title" className="text-2xl font-bold text-[#1E293B] mb-2">جاري تحليل الإيصال...</h2>
        <p className="text-[#64748B] text-sm mb-8 px-4">
          يقوم الذكاء الاصطناعي باستخراج البيانات وتصنيف النفقات
        </p>

        {/* Scanner Image Area */}
        <div className="relative w-full h-[220px] bg-slate-100 rounded-xl overflow-hidden mb-8 border border-slate-200 flex items-center justify-center">
          
          {/* Mock Receipt Background */}
          <div className="w-3/4 h-full bg-white shadow-sm border border-slate-200 rotate-2 p-4 text-left flex flex-col gap-2 relative">
            <h4 className="text-center font-mono font-bold text-slate-700 text-xs border-b border-dashed border-slate-300 pb-2">RESTAURANT RECEIPT</h4>
            <div className="flex justify-between font-mono text-[10px] text-slate-500 mt-2">
              <span>STEAK</span><span>$99.00</span>
            </div>
            <div className="flex justify-between font-mono text-[10px] text-slate-500">
              <span>BEVERAGE</span><span>$24.00</span>
            </div>
            <div className="flex justify-between font-mono text-[10px] text-slate-500">
              <span>TAX</span><span>$10.00</span>
            </div>
            <div className="flex justify-between font-mono text-xs font-bold text-slate-700 border-t border-dashed border-slate-300 pt-2 mt-auto">
              <span>TOTAL</span><span>$133.00</span>
            </div>
            <div className="text-center font-mono text-[8px] text-slate-400 mt-2">THANK YOU</div>
          </div>

          {/* Scanning Line Animation */}
          {scanning && (
            <>
              <div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B5CF6]/30 to-[#8B5CF6] opacity-40 animate-scan"
                style={{ height: '50%', borderBottom: '2px solid #8B5CF6' }}
              />
            </>
          )}

          {!scanning && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[2px]">
              <div className="bg-[#10B981] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                <FileText size={16} />
                تم الاستخراج بنجاح
              </div>
            </div>
          )}

        </div>

        {/* Cancel Button */}
        <button 
          onClick={onClose}
          className="px-6 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
        >
          إلغاء التحليل
        </button>

      </div>
    </div>
  );
}
