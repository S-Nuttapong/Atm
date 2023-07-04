import { MockAtmRepository } from "@entities/atm/AtmRepository"
import { useQuery } from "@shared/react-query"

export const useAtmBanknotes = (AtmSerivce = MockAtmRepository) => {
    const atmSerivce = new AtmSerivce()
    const result = useQuery({
        queryKey: ['banknotes'],
        queryFn: () => atmSerivce.banknotes(),
    })
    return result
}