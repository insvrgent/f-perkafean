import React, { useState } from 'react';

const Table = ({ enabled, xpos, ypos, no_table, onSave, onDrag }) => {
    const [position, setPosition] = useState({ x: Math.min(window.innerWidth - 50, xpos), y: Math.min(window.innerHeight - 50, ypos) });
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e) => {
        if (!enabled) return;

        setStartPosition({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
        setIsDragging(true);
    };

    const handleTouchStart = (e) => {
        if (!enabled) return;

        const touch = e.touches[0];
        setStartPosition({
            x: touch.clientX - position.x,
            y: touch.clientY - position.y,
        });
        setIsDragging(true);
        onDrag(true);
    };

    const handleMouseMove = (e) => {
        if (!enabled) return;

        if (!isDragging) return;

        let newPosition = {
            x: e.clientX - startPosition.x,
            y: e.clientY - startPosition.y,
        };

        newPosition.x = Math.min(window.innerWidth - 50, Math.max(0, newPosition.x));
        newPosition.y = Math.min(window.innerHeight - 50, Math.max(0, newPosition.y));

        setPosition(newPosition);
    };

    const handleTouchMove = (e) => {
        if (!enabled) return;

        if (!isDragging || e.touches.length !== 1) return;

        const touch = e.touches[0];

        let newPosition = {
            x: touch.clientX - startPosition.x,
            y: touch.clientY - startPosition.y,
        };

        newPosition.x = Math.min(window.innerWidth - 50, Math.max(0, newPosition.x));
        newPosition.y = Math.min(window.innerHeight - 50, Math.max(0, newPosition.y));

        setPosition(newPosition);
    };

    const handleMouseUp = () => {
        if (!enabled) return;

        setIsDragging(false);
        onSave(position);
    };

    const handleTouchEnd = () => {
        if (!enabled) return;

        setIsDragging(false);
        onSave(position);
        onDrag(false);
    };

    return (
        <div
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                userSelect: 'none',
                cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleTouchEnd}
        >
            <div
                style={{
                    width: '50px',
                    height: '50px',
                    background: 'grey',
                    position: 'relative',
                }}
            >
                <h1 style={{ color: 'white', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    {no_table}
                </h1>
            </div>
        </div>
    );
};

export default Table;
