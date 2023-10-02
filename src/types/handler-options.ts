import { DependencyList } from 'react'
import { Column, Sort, HandlerValues, HandlerCleanedValues } from '.'

export type Pagination = {
  initialPage?: number
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
