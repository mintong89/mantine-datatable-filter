import { DataTableSortStatus } from 'mantine-datatable'
import { Column } from './column'
import { HandlerCleanedValues, HandlerValues } from './handler-values'
import { DependencyList } from 'react'

export type Sort<T> = Omit<DataTableSortStatus, 'columnAccessor'> & {
  columnAccessor: T
}

export type Pagination = {
  totalRecords: number
  sizes?: number | number[]
}

export type HandlerOptions<T extends string> = {
  columns: Column<T>[]
  sort?: Sort<T>
  pagination?: Pagination
  onChange?: (
    values: HandlerValues<T>,
    cleanedValues: HandlerCleanedValues<T>,
  ) => void
  debounced?: number
  deps?: DependencyList
}
