import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiUrl from './apiConfig';
import Catalog from './Catalog';
import ErrorComponent from './ErrorComponent';

const TableComponent = () => {
  const { table_id } = useParams();
  const [no_table, setNo_table] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTable = async () => {
      try {
        const url = `${apiUrl}/table/${table_id}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('session_id'),
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        setNo_table(data[0].no_table);
      } catch (error) {
        console.error('Error fetching table data:', error.message);
        setError(error.message);
      }
    };
    getTable();
  }, [table_id]);

  return (
    <div>
      {!error ? (
        <>
          <Catalog />
          <h3>dikirim ke meja nomor {no_table}</h3>
        </>
      ) : (
        <ErrorComponent message={error} />
      )}
    </div>
  );
};

export default TableComponent;