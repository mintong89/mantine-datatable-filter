import {
  MultiSelectProps,
  NumberInputProps,
  SelectItem,
  TextInputProps,
} from '@mantine/core'
import {
  DatePickerProps,
  DatePickerType,
  DatePickerValue,
  DateTimePickerProps,
} from '@mantine/dates'

export type Column<
  T extends string,
  DateType extends DatePickerType = 'default',
> = {
  accessor: T
} & (
  | {
      type: 'text'
      post?: (value: string) => string
      inputProps?: Omit<TextInputProps, 'value' | 'onChange'>
    }
  | {
      type: 'number'
      post?: (value: number | '') => number | ''
      inputProps?: Omit<NumberInputProps, 'value' | 'onChange'>
    }
  | {
      type: 'date'
      post?: (value: DatePickerValue<DateType>) => DatePickerValue<DateType>
      inputProps?: Omit<DatePickerProps<DateType>, 'value' | 'onChange'>
      resetLabel?: string
    }
  | {
      type: 'datetime'
      post?: (value: Date) => Date
      inputProps?: Omit<DateTimePickerProps, 'value' | 'onChange'>
      resetLabel?: string
    }
  | {
      type: 'select'
      data: (string | SelectItem)[]
      post?: (value: string[]) => string[]
      inputProps?: Omit<MultiSelectProps, 'value' | 'onChange' | 'data'>
    }
)
