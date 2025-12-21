'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import type { TextFieldProps } from '@mui/material/TextField'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import type { Transaction } from '@/types/apps/tournament/transactionTypes'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomIconButton from '@core/components/mui/IconButton'

// Util Imports
import { getInitials } from '@/utils/getInitials'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type TransactionWithAction = Transaction & {
  action?: string
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, onChange, debounce])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Column Definitions
const columnHelper = createColumnHelper<TransactionWithAction>()

type TransactionListTableProps = {
  transactionData?: Transaction[]
}

const formatCurrency = (amount: number | string | null | undefined): string => {
  const numAmount = Number(amount) || 0
  if (isNaN(numAmount)) return '$0'
  return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
  }).format(numAmount)
}

const TransactionListTable = ({ transactionData }: TransactionListTableProps) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(transactionData)
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedPaymentProof, setSelectedPaymentProof] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Handle payment proof modal
  const handleOpenPaymentProof = (paymentProofUrl: string) => {
    setSelectedPaymentProof(paymentProofUrl)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPaymentProof(null)
  }

  // Handle download payment proof
  const handleDownloadPaymentProof = (paymentProofUrl: string, invoiceNumber: string) => {
    const link = document.createElement('a')
    link.href = paymentProofUrl
    link.download = `comprobante-${invoiceNumber}.jpg`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Get avatar for player
  const getAvatar = (player: Transaction['players_info']) => {
    if (player?.avatar) {
      return <CustomAvatar src={player.avatar} skin='light' size={34} />
    } else {
      const fullName = player?.full_name || `${player?.first_name || ''} ${player?.last_name || ''}`.trim()
      return (
        <CustomAvatar skin='light' size={34}>
          {getInitials(fullName || 'N/A')}
        </CustomAvatar>
      )
    }
  }

  const columns = useMemo<ColumnDef<TransactionWithAction, any>[]>(
    () => [
      columnHelper.accessor('invoice_number', {
        header: 'Número de Factura',
        cell: ({ row }) => (
          <Typography color='primary.main' className='font-medium'>
            {row.original.invoice_number}
          </Typography>
        )
      }),
      columnHelper.accessor('players_info', {
        header: 'Jugador',
        cell: ({ row }) => {
          const player = row.original.players_info
          const fullName = player?.full_name || `${player?.first_name || ''} ${player?.last_name || ''}`.trim()
          const email = player?.email || ''

          return (
            <div className='flex items-center gap-3'>
              {getAvatar(player)}
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {fullName || 'N/A'}
                </Typography>
                {email && <Typography variant='body2'>{email}</Typography>}
              </div>
            </div>
          )
        }
      }),
      columnHelper.accessor('amount', {
        header: 'Total Pagado',
        cell: ({ row }) => (
          <Typography className='font-medium' color='text.primary'>
            {formatCurrency(row.original.amount)}
          </Typography>
        )
      }),
      columnHelper.accessor('created_at', {
        header: 'Fecha de Pago',
        cell: ({ row }) => <Typography>{formatDate(row.original.created_at)}</Typography>
      }),
      columnHelper.accessor('payment_proof_url', {
        header: 'Comprobante',
        cell: ({ row }) => {
          const hasProof = row.original.payment_proof_url || row.original.payment_proof
          const proofUrl = row.original.payment_proof_url || row.original.payment_proof || ''

          return hasProof ? (
            <div className='flex items-center gap-2'>
              <Tooltip title='Ver comprobante'>
                <IconButton
                  onClick={() => handleOpenPaymentProof(proofUrl)}
                  size='small'
                >
                  <i className='tabler-eye text-textSecondary' />
                </IconButton>
              </Tooltip>
              <Tooltip title='Descargar comprobante'>
                <IconButton
                  onClick={() => handleDownloadPaymentProof(proofUrl, row.original.invoice_number)}
                  size='small'
                >
                  <i className='tabler-download text-textSecondary' />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <Typography variant='body2' color='text.disabled'>
              N/A
            </Typography>
          )
        },
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, filteredData]
  )

  const table = useReactTable({
    data: filteredData as Transaction[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  useEffect(() => {
    setFilteredData(data)
  }, [data])

  return (
    <>
      <Card>
        <CardContent className='flex justify-between flex-col items-start md:items-center md:flex-row gap-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4 is-full sm:is-auto'>
            <div className='flex items-center gap-2 is-full sm:is-auto'>
              <Typography className='hidden sm:block'>Mostrar</Typography>
              <CustomTextField
                select
                value={table.getState().pagination.pageSize}
                onChange={e => table.setPageSize(Number(e.target.value))}
                className='is-[70px] max-sm:is-full'
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </CustomTextField>
            </div>
          </div>
          <div className='flex max-sm:flex-col max-sm:is-full sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Buscar transacción'
              className='max-sm:is-full sm:is-[250px]'
            />
          </div>
        </CardContent>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No hay datos disponibles
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
          onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
        />
      </Card>

      {/* Modal para mostrar el comprobante de pago */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth='xl'
        fullWidth
      >
        <DialogTitle className='flex items-center justify-between'>
          <Typography variant='h6'>Comprobante de Pago</Typography>
          <CustomIconButton variant='outlined' size='small' color='secondary' onClick={handleCloseModal}>
            <i className='tabler-x' />
          </CustomIconButton>
        </DialogTitle>
        <DialogContent>
          {selectedPaymentProof && (
            <img
              src={selectedPaymentProof}
              alt='Comprobante de pago'
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px'
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TransactionListTable

