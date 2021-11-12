import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { selectMapper } from './utils'

const SortableItem = sortableElement(({ value, onToggle }) => {
    const { line, commented } = value;
    return (<li className={commented ? 'commented' : ''}>
        <div className="item">
            <button className="comment" onMouseDown={onToggle}>//</button>
            <p className="multiline">{line}</p>
            <span>...</span>
        </div>
    </li>)
});

const SortableContainer = sortableContainer(({ children }) => {
    return <ul>{children}</ul>;
});

export default function DraggableList({ items, multiple, onItemsChanged }) {

    const [itemsVal, setItems] = useState(items);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const result = arrayMoveImmutable(itemsVal, oldIndex, newIndex);
        setItems(result);
        onItemsChanged(result);
    };

    const onItemToggle = (id) => () => {
        const result = itemsVal.map((item) => ({ ...item, commented: selectMapper[multiple](item, id) }));
        setItems(result);
        onItemsChanged(result);
    }

    return (
        <div className={`content ${multiple && 'multiple'}`}>
            <SortableContainer onSortEnd={onSortEnd} useWindowAsScrollContainer={true}>
                {itemsVal.map((value, index) => (
                    <SortableItem key={`item-${value.id}`} index={index} value={value} onToggle={onItemToggle(value.id)} />
                ))}
            </SortableContainer>
        </div>
    );
}
