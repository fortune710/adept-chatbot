// hooks/useOpportunities.ts
import { useQuery } from '@tanstack/react-query'
import { Opportunity } from '@/lib/types'

export function useOpportunities(naicsCode: string | null, agency: string | null) {
  return useQuery<Opportunity[]>({
    queryKey: ['opportunities', naicsCode || "default", agency || "default"],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (naicsCode) params.set('naicsCode', naicsCode)
      if (agency) params.set('agency', agency)
      
      const response = await fetch(`/api/opportunities?${params}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return (await response.json()).data
    }
  })
}