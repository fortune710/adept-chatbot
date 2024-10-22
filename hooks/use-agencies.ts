import { useQuery } from '@tanstack/react-query'

async function fetchAgencies() {
  const response = await fetch('/api/agencies')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const res = await response.json();
  return res.data
}

export function useAgencies() {
  return useQuery({
    queryKey: ['agencies'],
    queryFn: fetchAgencies,
  })
}