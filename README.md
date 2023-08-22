# Mantine Datatable Filter
a lightweight hook which help to handle [mantine datatable](https://github.com/icflorescu/mantine-datatable) filtering, column sorting and pagination.

## Installation
```
npm install mantine-datatable-filter
```

## Dependencies
- @mantine/core
- @mantine/hooks
- mantine-datatable

## Example
1. Import libraries.
```tsx
import { DataTable } from 'mantine-datatable'
import useMantineDataTableFilter from 'mantine-datatable-filter'
```
2. Create handler hook.
```tsx
const dtFilter = useMantineDataTableFilter({
    sort: {
        columnAccessor: 'id',
        direction: 'desc',
    },
    pagination: {
        totalRecords: totalRecords ?? 0,
        sizes: [10, 15, 20],
    },
    columns: [
      {
          accessor: 'id',
          type: 'number',
          inputProps: {
              label: 'ID',
              placeholder: 'Search by ID',
          }
      },
      {
          accessor: 'name',
          type: 'text',
          inputProps: {
              label: 'Name',
              placeholder: 'Search by name',
          }
      }
    ],
    onChange: (values, cleanedValues) => {
        // handle change
    },
    debounced: 200
})
```
3. Add props to datatable.
```tsx
return <DataTable
           // Add handler props here.
           {...dtFilter.props}
           columns={[
               {
                 accessor: 'id',
                 title: 'ID',
                 sortable: true,
                 // Add filter props for each of columns.
                 ...dtFilter.getFilterProps('id')
               },
               {
                 accessor: 'name',
                 title: 'Name',
                 sortable: true,
                 ...dtFilter.getFilterProps('name')
               }
           ]}
       />
```

## APIs
### HandlerOptions

#### columns
| Property | Type | Default Value | Description |
| --- | --- | --- | --- |
| accessor | string | | Primary key for each column. |
| type | "text" \| "number" \| "date" \| "datetime" \| "select" | | Column type. |
| post? | "text" \| "number" \| "date" \| "datetime" \| "select" | () => {} | Post process  function for a column. Note this will affect only for cleaned value. |
| inputProps? | InputProps | {} | Props for filter input. Please refer to mantine documentations for input props. |
| resetLabel? | string | "Reset" | Date type only. |

#### sorts?
| Property | Type | Default Value | Description |
| --- | --- | --- | --- |
| columnAccessor | string | | Default sorting key. |
| direction | "asc" \| "desc" | | Direction of sorting. |

#### pagination
| Property | Type | Default Value | Description |
| --- | --- | --- | --- |
| totalRecords | number | | Total records. |
| sizes? | number \| number\[\] | 10 | Total records per page. |

#### onChange(values, cleanedValues) => void
| Property | Type | Default Value | Description |
| --- | --- | --- | --- |
| values | HandlerValues | | Raw values. |
| cleanedValues | HandlerCleanedValues | | Cleaned, with post data process and removed blank filters' values. |

| Property | Type | Default Value | Description |
| --- | --- | --- | --- |
| debounced? | number | 0 | Debounced state for onChange when user input on filters. |
| deps? | DependencyList \| any[] | [] | Dependencies for triggering onChange. This is useful for adding extra features to the handler. |

### HandlerReturn
| Property | Type | Description |
| --- | --- | --- |
| values | HandlerValues | Handler values. |
| getFilterProps | (accessor: string) => FilterProps | Getter for generating filter option props for a column. |
| refetch | () => void | Function for triggering onChange. |
| props | DatatableProps | Sorting and pagination props for datatable. |

### HandlerValues
| Property | Type | Description |
| --- | --- | --- |
| sort | DataTableSortStatus \| null | Column for sorting. |
| filters | all of { key: FilterType } | Column filters values. |
| pagination | { page: number; size: number } | Column pagination values. |

### FilterType
| Property | Type | Description |
| --- | --- | --- |
| accessor | string | Primary key for each column. |
| type | "text" \| "number" \| "date" \| "datetime" \| "select" | Column type. |
| value | (depends on type, refer to mantine documentation) | Column value. |
