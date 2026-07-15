import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaxConfiguration, updateTaxConfiguration } from '@/features/finance/api/taxConfigurationApi';

export function useTaxConfiguration() {
  const queryClient = useQueryClient();

  const configurationQuery = useQuery({
    queryKey: ['tax-configuration'],
    queryFn: getTaxConfiguration,
  });

  const updateMutation = useMutation({
    mutationFn: updateTaxConfiguration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tax-configuration'] });
    },
  });

  return {
    configurationQuery,
    updateMutation,
  };
}
