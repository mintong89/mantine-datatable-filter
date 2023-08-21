import { Column } from './types'

export const getFilterType = <T extends string>(column: Column<T>) => {
  switch (column.type) {
    case 'text':
      return {
        accessor: column.accessor,
        type: column.type,
        value: '',
      }

    case 'number':
      return {
        accessor: column.accessor,
        type: column.type,
        value: '' as const,
      }

    case 'select':
      return {
        accessor: column.accessor,
        type: column.type,
        value: [],
      }

    case 'date':
      return {
        accessor: column.accessor,
        type: column.type,
        value: undefined,
      }

    case 'datetime':
      return {
        accessor: column.accessor,
        type: column.type,
        value: undefined,
      }
  }
}

export const _obj = <K extends string, V>(arr: [K, V][]) =>
  Object.fromEntries(arr) as Record<K, V>
