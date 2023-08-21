import { DatePickerType, DatePickerValue } from '@mantine/dates'

export type FilterType<
  T extends string,
  DateType extends DatePickerType = 'default',
> =
  | { accessor: T; type: 'text'; value: string }
  | { accessor: T; type: 'number'; value: number | '' }
  | { accessor: T; type: 'date'; value: DatePickerValue<DateType> | undefined }
  | { accessor: T; type: 'datetime'; value: Date | null | undefined }
  | { accessor: T; type: 'select'; value: string[] }

export type Filter<
  T extends string,
  DateType extends DatePickerType = 'default',
> = FilterType<T, DateType>[]

export type FilterReturn<
  T extends string,
  DateType extends DatePickerType = 'default',
> = Record<T, FilterType<T, DateType>>
