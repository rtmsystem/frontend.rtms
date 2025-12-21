import FinanceTab from '@/views/apps/tournament/id/finance' 
import type { ChildrenType } from '@core/types'
import { serverFetchApi } from '@/hooks/authServer'

type FinancePageProps = ChildrenType & {
    params: Promise<{
        id: string
    }>
}

const FinancePage = async (props: FinancePageProps) => {
    const { params } = props
    const { id: tournamentId } = await params
    
    const response = await serverFetchApi(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/tournaments/${tournamentId}/transactions/`
    )

    const transactionsData = await response.json()
   
    const transactions:any[] = transactionsData.data
    
    return (
       <FinanceTab transactions={transactions} /> 
    )
}

export default FinancePage