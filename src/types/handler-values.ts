import { DataTableSortStatus } from 'mantine-datatable'
import { FilterReturn } from '.'

export type HandlerValues<T extends string> = {
  sort?: Omit<DataTableSortStatus, 'columnAccessor'> & {
    columnAccessor: T
  }
  filters: FilterReturn<T>
  pagination?: {
    page: number
    size: number
  }
}

export type HandlerCleanedValues<T extends string> = Omit<
  HandlerValues<T>,
  'filters'
> & {
  filters: Partial<FilterReturn<T>>
}
