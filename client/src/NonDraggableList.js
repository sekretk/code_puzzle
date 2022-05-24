import React, { useState, memo } from 'react';
import { selectMapper } from './utils'

const UngraggableItem = ({ value, onToggle }) => {
    const { line, commented } = value;
    return (<li className={commented ? 'commented' : ''}>
        <div className="item">
            <button className="comment" onMouseDown={onToggle}>//</button>
            {
                Boolean(commented)
                    ? (
                        <strike>
                            <p className="multiline code">{line}</p>
                        </strike>
                    )
                    : <p className="multiline code">{line}</p>
            }
        </div>
    </li>)
};

export const NonDraggableList = memo(({ items, multiple, onItemsChanged }) => {

    const onItemToggle = (id) => () => {
        const result = items.map((item) => ({ ...item, commented: selectMapper[multiple](item, id) }));
        onItemsChanged(result);
    }

    return (
        <ul className={`undraggable ${multiple && 'multiple'}`}>
            {items.map(item => (
                <UngraggableItem key={`item-${item.id}`} value={item} onToggle={onItemToggle(item.id)} />))}
        </ul>
    );
});
