import { DataTableSortStatus } from 'mantine-datatable'
import { ColumnType } from './column-type'
import { HandlerCleanedValues, HandlerValues } from './handler-values'
import { DependencyList } from 'react'

export type HandlerOptions<T extends string> = {
  columns: ColumnType<T>[]
  sort?: Omit<DataTableSortStatus, 'columnAccessor'> & {
    columnAccessor: T
  }
  pagination?: {
    totalRecords: number
    sizes?: number | number[]
  }
  onChange?: (
    values: HandlerValues<T>,
    cleanedValues: HandlerCleanedValues<T>,
  ) => void
  debounced?: number
  deps?: DependencyList
}
