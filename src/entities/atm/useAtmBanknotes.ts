import { MockAtmServices } from "@entities/atm/mockAtmServices"
import { useQuery } from "@shared/react-query"

export const useAtmBanknotes = (AtmSerivce = MockAtmServices) => {
    const atmSerivce = new AtmSerivce()
    const result = useQuery({
        queryKey: ['banknotes'],
        queryFn: () => atmSerivce.banknotes(),
    })
    return result
}