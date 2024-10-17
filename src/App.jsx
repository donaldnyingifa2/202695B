import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

function App() {
  const [data, setData] = useState({
    "row_name": ["Row 1", "Row 2", "Row 3"],
    "e0": ["Data e0 1", "Data e0 2", "Data e0 3"],
    "e1": ["Data e1 1", "Data e1 2", "Data e1 3"],
    "e2": ["Data e2 1", "Data e2 2", "Data e2 3"],
  });
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const columns = [
    { field: 'row_name', headerName: 'Row Name', width: 150 },
    ...Object.keys(data)
      .filter((key) => key !== 'row_name')
      .map((key, index) => ({
        field: key,
        headerName: `Environment ${index}`,
        width: 150,
        hide: index !== currentTab,
      })),
  ];

  const rows = data.row_name.map((rowName, index) => ({
    id: index,
    row_name: rowName,
    ...Object.keys(data)
      .filter((key) => key !== 'row_name')
      .reduce((acc, key) => ({ ...acc, [key]: data[key][index] }), {}),
  }));

  return (
    <div>
      <Tabs value={currentTab} onChange={handleChange}>
        {Object.keys(data)
          .filter((key) => key !== 'row_name')
          .map((key, index) => (
            <Tab key={index} label={`Environment ${index}`} />
          ))}
      </Tabs>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

export default App;