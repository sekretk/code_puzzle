import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SortableItem = sortableElement(({ value, onToggle }) => {
    const { line, commented } = value;
    return (<li className={commented ? 'commented' : ''}>
        <div className="item">
            <button className="comment" onMouseDown={onToggle}>//</button>
            <p className="multiline">{line}</p>
            <FontAwesomeIcon icon="fa-solid fa-grip-dots-vertical" />
        </div>
    </li>)
});

const SortableContainer = sortableContainer(({ children }) => {
    return <ul>{children}</ul>;
});

export default function DraggableList({ items, multiple, onItemsChanged }) {

    const [itemsVal, setItems] = useState(items);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(arrayMoveImmutable(itemsVal, oldIndex, newIndex));
        onItemsChanged(itemsVal);
    };

    const onItemToggle = (id) => () => {
        setItems(itemsVal.map((item) => ({ ...item, commented: item.id === id ? !item.commented : item.commented })));
        onItemsChanged(itemsVal);
    }

    return (
            <div className="content">
                <SortableContainer onSortEnd={onSortEnd} useWindowAsScrollContainer={true}>
                    {itemsVal.map((value, index) => (
                        <SortableItem key={`item-${value.id}`} index={index} value={value} onToggle={onItemToggle(value.id)} />
                    ))}
                </SortableContainer>
            </div>
           );
}
