import { createElement, useCallback, useState } from 'react'
import { useDebouncedState, useDidUpdate } from '@mantine/hooks'
import {
  Button,
  MultiSelect,
  NumberInput,
  Stack,
  TextInput,
} from '@mantine/core'
import {
  DatePicker,
  DateTimePicker,
  DateValue,
  DatesRangeValue,
} from '@mantine/dates'
import { HandlerOptions, Filter, HandlerValues, HandlerReturn } from './types'
import { getFilterType, _obj } from './utils'

export default <T extends string>(options: HandlerOptions<T>) => {
  // sort
  const [sort, setSort] = useState(options?.sort)

  // filter
  const [filters, setFilters] = useState<Filter<T>>(
    options.columns.map(column => getFilterType(column)),
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
      filters: _obj(filters.map(filter => [filter.accessor, filter])),
      pagination: { page: page, size: pageSize },
    },
    options?.debounced ?? 0,
  )

  useDidUpdate(
    () =>
      setDebouncedValue({
        sort,
        filters: _obj(filters.map(filter => [filter.accessor, filter])),
        pagination: { page: page, size: pageSize },
      }),
    [sort, filters, page, pageSize],
  )

  const handleChange = useCallback(
    () =>
      options.onChange?.(debouncedValue, {
        ...debouncedValue,
        filters: _obj(
          filters
            .filter(filter => filter.value)
            .map(filter => {
              // eslint-disable-next-line
              const post: ((value: any) => any) | undefined =
                options.columns.find(
                  column => column.accessor === filter.accessor,
                )?.post

              return [
                filter.accessor,
                { ...filter, value: post ? post(filter.value) : filter.value },
              ]
            }),
        ),
      }),
    [sort, filters, page, pageSize],
  )
  useDidUpdate(handleChange, [debouncedValue, ...[options.deps]])

  const getFilterProps = (accessor: T) => {
    const accessorIndex = options.columns.findIndex(
      column => column.accessor === accessor,
    )
    const column = options.columns[accessorIndex]
    const filter = filters[accessorIndex]

    if (!column) return null

    switch (column.type) {
      case 'text':
        return {
          filter: createElement(TextInput, {
            ...column?.inputProps,
            value: filter.value as string,
            onChange: event =>
              setFilters(filters => {
                const result = [...filters]

                const filter = filters[accessorIndex]
                filter.value = event.target.value

                return result
              }),
          }),
          filtering: filter.value !== '',
        }

      case 'number':
        return {
          filter: createElement(NumberInput, {
            ...column?.inputProps,
            value: filter.value as number | '' | undefined,
            onChange: value =>
              setFilters(filters => {
                const result = [...filters]

                const filter = filters[accessorIndex]
                filter.value = value

                return result
              }),
          }),
          filtering: filter.value !== '',
        }

      case 'date':
        return {
          filter: createElement(Stack, {
            children: [
              createElement(DatePicker, {
                ...column.inputProps,
                value: filter.value as
                  | DateValue
                  | DatesRangeValue
                  | Date[]
                  | undefined,
                onChange: value =>
                  setFilters(filters => {
                    const result = [...filters]

                    const filter = filters[accessorIndex]
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
        return {
          filter: createElement(Stack, {
            children: [
              createElement(DateTimePicker, {
                ...column.inputProps,
                value: filter.value as Date,
                onChange: value =>
                  setFilters(filters => {
                    const result = [...filters]

                    const filter = filters[accessorIndex]
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
            value: filter.value as string[],
            onChange: value =>
              setFilters(filters => {
                const result = [...filters]

                const filter = filters[accessorIndex]
                filter.value = value

                return result
              }),
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
