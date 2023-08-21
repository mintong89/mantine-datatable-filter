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
          id: 'id',
          type: 'number',
          inputProps: {
              label: 'ID',
              placeholder: 'Search by ID',
          }
      },
      {
          id: 'name',
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
### Options

#### Columns
| Property | Type | Description |
| --- | --- | --- |
| accessor | string | Primary key for each column. |
| type | "text" \| "number" \| "date" \| "datetime" \| "select" | Column type.
| post? | "text" \| "number" \| "date" \| "datetime" \| "select" | Post value handle function for a column. Note this will affect only for cleaned value.
| inputProps? | InputProps | Props for filter input.
| resetLabel? | string | Date type only.

#### Sorts?
| Property | Type | Description |
| --- | --- | --- |
| columnAccessor | string | Default sorting key. |
| direction | "asc" \| "desc" | Direction of sorting. |

wip
