import React, { useState } from 'react';

export default function NonDraggableList({ items, onItemsChanged }) {

    const [itemsVal, setItems] = useState(items);

    const onItemToggle = (id) => () => {
        setItems(itemsVal.map((item) => ({ ...item, commented: item.id === id ? !item.commented : item.commented })));
        onItemsChanged(itemsVal);
    }

    return (
        <p>Non graggable</p>
    );
}
