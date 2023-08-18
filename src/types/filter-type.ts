import { DatePickerType, DatePickerValue } from '@mantine/dates'

export type FilterType<
  T extends string,
  DateType extends DatePickerType = 'default',
> = (
  | { id: T; type: 'text'; value: string }
  | { id: T; type: 'number'; value: number | '' }
  | { id: T; type: 'date'; value: DatePickerValue<DateType> | null }
  | { id: T; type: 'datetime'; value: Date | null }
  | { id: T; type: 'select'; value: string[] }
)[]
