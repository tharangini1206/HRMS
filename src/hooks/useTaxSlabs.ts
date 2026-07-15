import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTaxSlab, deleteTaxSlab, getTaxSlabs, updateTaxSlab } from '@/features/finance/api/taxSlabApi';

export function useTaxSlabs() {
  const queryClient = useQueryClient();

  const taxSlabsQuery = useQuery({
    queryKey: ['tax-slabs'],
    queryFn: getTaxSlabs,
  });

  const createMutation = useMutation({
    mutationFn: createTaxSlab,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tax-slabs'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof updateTaxSlab>[1] }) => updateTaxSlab(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tax-slabs'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTaxSlab,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tax-slabs'] });
    },
  });

  return {
    taxSlabsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
