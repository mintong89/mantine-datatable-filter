import { DataTableSortStatus } from 'mantine-datatable'
import { FilterType } from './filter-type'

export type HandlerValues<T extends string> = {
  sort?: Omit<DataTableSortStatus, 'columnAccessor'> & {
    columnAccessor: T
  }
  filters: FilterType<T>
  pagination?: {
    page: number
    size: number
  }
}

export type HandlerCleanedValues<T extends string> = Omit<
  HandlerValues<T>,
  'filters'
> & {
  filters: Partial<FilterType<T>>
}
