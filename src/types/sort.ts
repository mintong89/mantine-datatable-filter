import { DataTableSortStatus } from 'mantine-datatable'

export type Sort<T> = Omit<DataTableSortStatus, 'columnAccessor'> & {
  columnAccessor: T
}
