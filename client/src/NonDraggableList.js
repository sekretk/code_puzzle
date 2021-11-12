import React, { useState } from 'react';
import { selectMapper } from './utils'

const UngraggableItem = ({ value, onToggle }) => {
    const { line, commented } = value;
    return (<li className={commented ? 'commented' : ''}>
        <div className="item">
            <button className="comment" onMouseDown={onToggle}>//</button>
            <p className="multiline">{line}</p>
        </div>
    </li>)
};

export default function NonDraggableList({ items, multiple, onItemsChanged }) {

    const [itemsVal, setItems] = useState(items);

    const onItemToggle = (id) => () => {
        const result = itemsVal.map((item) => ({ ...item, commented: selectMapper[multiple](item, id) }));
        setItems(result);
        console.log(result)
        onItemsChanged(result);
    }

    return (
        <ul className={`undraggable ${multiple && 'multiple'}`}>
            {itemsVal.map(item => (
                <UngraggableItem key={`item-${item.id}`} value={item} onToggle={onItemToggle(item.id)} />))}
        </ul>
    );
}
