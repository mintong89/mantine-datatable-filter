import { createElement, useCallback, useState } from 'react'
import { HandlerOptions } from './types/handler-options'
import { Filter } from './types/filter'
import { initializeFilter } from './initialize-filter'
import { useDebouncedState, useDidUpdate } from '@mantine/hooks'
import {
  Button,
  MultiSelect,
  NumberInput,
  Stack,
  TextInput,
} from '@mantine/core'
import { DatePicker, DateTimePicker, DateValue } from '@mantine/dates'
import { HandlerValues } from './types/handler-values'
import { HandlerReturn } from './types/handler-return'

export default <T extends string>(options: HandlerOptions<T>) => {
  // sort
  const [sort, setSort] = useState(options?.sort)

  // filter
  const [filters, setFilters] = useState<Filter<T>>(
    options.columns.map(column => initializeFilter(column)),
  )

  // pagination
  const [pageSize, setPageSize] = useState(
    options?.pagination?.sizes
      ? typeof options.pagination.sizes === 'number'
        ? options.pagination.sizes
        : options.pagination.sizes[0]
      : 10,
  )
  const [page, setPage] = useState(1)

  // debounced
  const [debouncedValue, setDebouncedValue] = useDebouncedState<
    HandlerValues<T>
  >(
    {
      sort,
      filters: filters,
      pagination: { page: page, size: pageSize },
    },
    options?.debounced ?? 0,
  )

  useDidUpdate(
    () =>
      setDebouncedValue({
        sort,
        filters,
        pagination: { page: page, size: pageSize },
      }),
    [sort, filters, page, pageSize],
  )

  const handleChange = useCallback(
    () =>
      options.onChange?.(debouncedValue, {
        ...debouncedValue,
        filters: filters.filter(filter => filter.value),
      }),
    [sort, filters, page, pageSize],
  )
  useDidUpdate(handleChange, [debouncedValue, ...[options.deps]])

  const getFilterProps = (accessor: T) => {
    const accessorIndex = options.columns.findIndex(
      column => column.id === accessor,
    )
    const column = options.columns[accessorIndex]
    const filter = filters[accessorIndex]

    if (!column) return null

    switch (column.type) {
      case 'text':
        if (filter.type !== 'text') return null
        return {
          filter: createElement(TextInput, {
            ...column?.inputProps,
            value: filter.value,
            onChange: event =>
              setFilters(filters => {
                const result = [...filters]

                const filter = filters[accessorIndex]
                if (filter.type !== 'text') return filters
                filter.value = event.target.value

                return result
              }),
          }),
          filtering: filter.value !== '',
        }

      case 'number':
        if (filter.type !== 'number') return null
        return {
          filter: createElement(NumberInput, {
            ...column?.inputProps,
            value: filter.value,
            onChange: value =>
              setFilters(filters => {
                const result = [...filters]

                const filter = filters[accessorIndex]
                if (filter.type !== 'number') return filters
                filter.value = value

                return result
              }),
          }),
          filtering: filter.value !== '',
        }

      case 'date':
        if (filter.type !== 'date') return null
        return {
          filter: createElement(Stack, {
            children: [
              createElement(DatePicker, {
                ...column.inputProps,
                value: filter.value,
                onChange: value =>
                  setFilters(filters => {
                    const result = [...filters]

                    const filter = filters[accessorIndex]
                    if (filter.type !== 'date') return filters
                    filter.value = value as DateValue

                    return result
                  }),
              }),
              createElement(Button as unknown as 'button', {
                disabled: !filter.value,
                color: 'red',
                onClick: () =>
                  setFilters(filters => {
                    const result = [...filters]

                    const filter = filters[accessorIndex]
                    if (filter.type !== 'date') return filters
                    filter.value = undefined

                    return result
                  }),
                children: column?.resetLabel ?? 'Reset',
              }),
            ],
          }),
          filtering: !!filter.value,
        }

      case 'datetime':
        if (filter.type !== 'datetime') return null
        return {
          filter: createElement(Stack, {
            children: [
              createElement(DateTimePicker, {
                ...column.inputProps,
                value: filter.value,
                onChange: value =>
                  setFilters(filters => {
                    const result = [...filters]

                    const filter = filters[accessorIndex]
                    if (filter.type !== 'datetime') return filters
                    filter.value = value

                    return result
                  }),
              }),
              createElement(Button as unknown as 'button', {
                disabled: !filter.value,
                color: 'red',
                onClick: () =>
                  setFilters(filters => {
                    const result = [...filters]

                    const filter = filters[accessorIndex]
                    if (filter.type !== 'date') return filters
                    filter.value = undefined

                    return result
                  }),
                children: column?.resetLabel ?? 'Reset',
              }),
            ],
          }),
        }

      case 'select':
        if (filter.type !== 'select') return null
        return {
          filter: createElement(MultiSelect, {
            clearable: true,
            searchable: true,
            data: column.data,
            ...column?.inputProps,
          }),
        }
    }
  }

  return <HandlerReturn<T>>{
    values: debouncedValue,
    getFilterProps: getFilterProps,
    refetch: handleChange,
    props: {
      sortStatus: sort,
      onSortStatusChange: setSort,
      totalRecords: options.pagination?.totalRecords,
      recordsPerPage: pageSize,
      page: page,
      onPageChange: (p: number) => setPage(p),
      recordsPerPageOptions:
        typeof options?.pagination?.sizes === 'object'
          ? options?.pagination?.sizes
          : [],
      onRecordsPerPageChange: setPageSize,
    },
  }
}
