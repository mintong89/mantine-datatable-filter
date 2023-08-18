import { Dispatch, SetStateAction } from 'react'
import { FilterProps } from './filter-props'
import { Sort } from './handler-options'
import { HandlerValues } from './handler-values'

export type HandlerReturn<T extends string> = {
  values: HandlerValues<T>
  getFilterProps: (accessor: T) => FilterProps
  refetch: () => void
  props: {
    sortStatus: Sort<T> | undefined
    onSortStatusChange: Dispatch<SetStateAction<Sort<T> | undefined>>
    totalRecords: number | undefined
    recordsPerPage: number
    page: number
    onPageChange: (p: number) => void
    recordsPerPageOptions: number[]
    onRecordsPerPageChange: Dispatch<SetStateAction<number>>
  }
}
