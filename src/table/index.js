import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import './index.sass';
import Table from './FixedTable';
import makeData from './makeData';

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName'
          },
          {
            Header: 'Last Name',
            accessor: 'lastName'
          }
        ]
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age'
          },
          {
            Header: 'Visits',
            accessor: 'visits'
          },
          {
            Header: 'Status',
            accessor: 'status'
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress'
          }
        ]
      }
    ],
    []
  );

  const data = React.useMemo(() => makeData(2000), []);

  return (
    <div className="table">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
