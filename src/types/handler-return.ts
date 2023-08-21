import { Dispatch, SetStateAction } from 'react'
import { HandlerValues, FilterProps, Sort } from '.'
export type HandlerReturn<T extends string> = {
  values: HandlerValues<T>
  getFilterProps: (accessor: T) => FilterProps
  refetch: () => void
  props: (
    | {
        sortStatus?: never
        onSortStatusChange?: never
      }
    | {
        sortStatus: Sort<T | string>
        onSortStatusChange?: Dispatch<SetStateAction<Sort<T | string>>>
      }
  ) & {
    totalRecords: number | undefined
    recordsPerPage: number
    page: number
    onPageChange: (p: number) => void
    recordsPerPageOptions: number[]
    onRecordsPerPageChange: Dispatch<SetStateAction<number>>
  }
}
