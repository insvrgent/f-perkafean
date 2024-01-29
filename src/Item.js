import React, { useEffect, useState } from 'react';
import './Item.css';
import './tombol.css';

const Item = ({ item, apiUrl, startqty, cancel, listed, onEdit, isAdmin }) => {
    const [qty, setQty] = useState(startqty);
    const [editableItem, setEditableItem] = useState(null);

    useEffect(() => {
        // set();
        // navigator.geolocation.getCurrentPosition(function(position) {
        //     const latitude = position.coords.latitude;
        //     const longitude = position.coords.longitude;
        //     console.log('Latitude:', latitude);
        //     console.log('Longitude:', longitude);
        //     const accuracy = position.coords.accuracy;

        //     sss(latitude + " " + longitude + " " + accuracy);
        // }, function(error) {
        //     console.error('Error getting geolocation:', error);
        // });
    }, []);
    
    const cancelHandler = () => {
        setQty(0);
        cancel();
    };

    const decreaseQty = () => {
        if (qty > 0) {
            setQty(qty - 1);
            onEdit(qty - 1);
        }
        if (qty == 1) cancel();
    };

    const increaseQty = () => {
        setQty(qty + 1);
        onEdit(qty + 1);
    };

    const handleEditClick = (field) => {
        if (isAdmin) {
            setEditableItem(field);
        }
    };

    const handleFieldChange = (event, field) => {
        // Handle changes to the editable fields here
    };

    return (
        <div className="quadrant-container">
            <div className="top-left">
                <div className={editableItem === 'name' ? 'editable' : 'name'} onClick={() => handleEditClick('name')}>
                    {editableItem === 'name' ? (
                        <input type="text" value={item.name} onChange={(e) => handleFieldChange(e, 'name')} />
                    ) : (
                        item.name
                    )}
                </div>
                <div className={editableItem === 'price' ? 'editable' : 'price'} onClick={() => handleEditClick('price')}>
                    {editableItem === 'price' ? (
                        <input type="text" value={item.price} onChange={(e) => handleFieldChange(e, 'price')} />
                    ) : (
                        item.price
                    )}
                </div>
            </div>
            <div className="top-right">
                <img
                    src={apiUrl + "/" + item.image_url}
                    alt="Product"
                    className={editableItem === 'image' ? 'editable' : 'image'}
                    onClick={() => handleEditClick('image')}
                />
            </div>
            <div className="bottom-left" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div>
                    <button className="tombol" onClick={decreaseQty}>-</button>
                </div>
                <div>
                    <div>
                        &nbsp;
                        {qty}
                        &nbsp;
                    </div>
                </div>
                <div>
                    <button className="tombol" onClick={increaseQty}>+</button>
                </div>
            </div>
            <div className="bottom-right">
                {!listed ? (
                    <button className="tombol" onClick={increaseQty}>Tambahkan</button>
                ) : (
                    <button className="tombol" onClick={cancelHandler}>Batalkan</button>
                )}
            </div>
        </div>
    );
};

export default Item;