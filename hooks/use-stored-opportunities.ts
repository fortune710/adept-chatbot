// hooks/useStoredOpportunities.ts
import { Opportunity } from '@/lib/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export function useStoredOpportunities() {
  // Initialize state with an empty array

  const { data: opportunities, isLoading } = useQuery({
    queryKey: ['stored-opportunities'],
    queryFn: async () => {
      const storedOpportunities = localStorage.getItem('storedOpportunities')
      return !storedOpportunities ? [] : JSON.parse(storedOpportunities)
    }
  })

  const queryClient = useQueryClient();

  // Store an opportunity
  const storeOpportunity = async (opportunity: Opportunity) => {
    if (!opportunities) return

    const exists = opportunities.some((op: any) => op.noticeid === opportunity.noticeid)
    if (exists) return
    
    // Add new opportunity to array
    const newOpportunities = [...opportunities, opportunity]
    // Persist to localStorage
    localStorage.setItem('storedOpportunities', JSON.stringify(newOpportunities))
  }
  

  // Remove an opportunity
  const removeOpportunity = (opportunityId: string) => {
    const newOpportunities = opportunities.filter((op: any) => op.noticeid !== opportunityId)
    localStorage.setItem('storedOpportunities', JSON.stringify(newOpportunities))
    return queryClient.invalidateQueries({
      queryKey: ['stored-opportunities'],
    })
  }

  // Clear all stored opportunities
  const clearOpportunities = () => {
    localStorage.removeItem('storedOpportunities')
    return queryClient.invalidateQueries({
      queryKey: ['stored-opportunities'],
    })
  }

  // Check if an opportunity is stored
  const isStored = (opportunityId: string) => {
    if (!opportunities) return false
    return opportunities?.some((op: any) => op.noticeid === opportunityId)
  }

  const { mutateAsync } = useMutation({
    mutationFn: storeOpportunity,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['stored-opportunities'],
      })
    }
  })

  return {
    opportunities,
    storeOpportunity: mutateAsync,
    removeOpportunity,
    clearOpportunities,
    isStored,
    isLoading
  }
}