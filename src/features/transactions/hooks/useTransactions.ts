import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsApi } from '../api/transactions.api';
import type { OcrResult, TransactionStatus } from '@/shared/lib/schemas/openapi.schema';

export function useTransactions(page = 1, pageSize = 50) {
  return useQuery({
    queryKey: ['transactions', page, pageSize],
    queryFn: () => transactionsApi.getTransactions(page, pageSize),
  });
}

export function useSubmitOcr() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ocrData: OcrResult) => transactionsApi.submitOcrResult(ocrData),
    onSuccess: () => {
      // Invalidate to fetch the new pending transaction
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}

export function useUpdateTransactionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TransactionStatus }) => 
      transactionsApi.updateTransactionStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}
