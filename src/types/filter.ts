import { DatePickerType, DatePickerValue } from '@mantine/dates'

export type Filter<
  T extends string,
  DateType extends DatePickerType = 'default',
> = (
  | { id: T; type: 'text'; value: string }
  | { id: T; type: 'number'; value: number | '' }
  | { id: T; type: 'date'; value: DatePickerValue<DateType> | undefined }
  | { id: T; type: 'datetime'; value: Date | null | undefined }
  | { id: T; type: 'select'; value: string[] }
)[]
