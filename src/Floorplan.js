import React, { useState, useEffect } from 'react';
import apiUrl from './apiConfig';
import Table from './Table';
import './Floorplan.css';

const Floorplan = ({ auth }) => {
    const [tables, setTables] = useState([]);
    const [editedTable, setEditedTable] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl + '/table/all', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('session_id')
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setTables(data);
            } catch (error) {
                console.error('Error fetching catalog data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const handleSave = async (table_id, position) => {
        try {
            await fetch(apiUrl + '/table/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('session_id')
                },
                body: JSON.stringify({
                    table_id,
                    xpos: position.x,
                    ypos: position.y,
                }),
            });
        } catch (error) {
            console.error('Error updating table data:', error);
        }
    };

    const onDrag = async (e) => {
        const bodyElement = document.body;
        if (e) bodyElement.classList.add('overscroll-contain');
        else bodyElement.classList.remove('overscroll-contain');
    };

    return (
        <div>
            <helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <div className="kontener">

                    {loading ? (
                        <div className="centered-text">Loading...</div>
                    ) : (
                        <>
                            {tables.length > 0 ? (
                                <div style={{width: '100%'}}>
                                    {tables.map((table) => (
                                        <Table
                                            key={table.table_id}
                                            enabled={auth.role === 'admin'}
                                            xpos={table.xpos}
                                            ypos={table.ypos}
                                            no_table={table.no_table}
                                            onSave={(position) => handleSave(table.table_id, position)}
                                            onDrag={(e) => onDrag(e)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <h1 className="centered-text">Tidak ada meja</h1>
                            )}
                        </>
                    )}
                </div>
            </helmet></div>
    );
};

export default Floorplan;
