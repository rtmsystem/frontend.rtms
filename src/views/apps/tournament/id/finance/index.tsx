import type { Transaction } from '@/types/apps/tournament/transactionTypes'
import TransactionListTable from './TransactionListTable'

type FinanceTabProps = {
    transactions: Transaction[]
}

const FinanceTab = ({ transactions }: FinanceTabProps) => {
    return (
        <TransactionListTable transactionData={transactions} />
    )
}

export default FinanceTab