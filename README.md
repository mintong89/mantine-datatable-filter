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
```tsx
import { DataTable } from 'mantine-datatable'
import useMantineDataTableFilter from 'mantine-datatable-filter'

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
        // pass to backend
    },
    debounced: 200
})

return <DataTable
          {...dtFilter.props}
          columns={[
            {
              accessor: 'id',
              title: 'ID',
              sortable: true,
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
| Property | Type | Description |
| --- | --- | --- |
| columns -> id | string | Column ID for filtering. |
| columns -> type | "text" \| "number" \| "date" \| "datetime" \| "select" | Column value type

wip
