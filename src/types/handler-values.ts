import { DataTableSortStatus } from 'mantine-datatable'
import { Filter } from './filter'

export type HandlerValues<T extends string> = {
  sort?: Omit<DataTableSortStatus, 'columnAccessor'> & {
    columnAccessor: T
  }
  filters: Filter<T>
  pagination?: {
    page: number
    size: number
  }
}

export type HandlerCleanedValues<T extends string> = Omit<
  HandlerValues<T>,
  'filters'
> & {
  filters: Partial<Filter<T>>
}
