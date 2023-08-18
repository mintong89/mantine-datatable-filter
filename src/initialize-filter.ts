import { ColumnType } from './types/column-type'

export const initializeFilter = <T extends string>(column: ColumnType<T>) => {
  switch (column.type) {
    case 'text':
      return {
        id: column.id,
        type: column.type,
        value: '',
      }

    case 'number':
      return {
        id: column.id,
        type: column.type,
        value: '' as '',
      }

    case 'select':
      return {
        id: column.id,
        type: column.type,
        value: [],
      }

    case 'date':
      return {
        id: column.id,
        type: column.type,
        value: null,
      }

    case 'datetime':
      return {
        id: column.id,
        type: column.type,
        value: null,
      }
  }
}
