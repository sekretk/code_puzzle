import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

const SortableItem = sortableElement(({ value, onToggle }) => {
    const { line, commented } = value;
    return (<li className={commented ? 'commented' : ''}>
        <div className="item">
            <button onMouseDown={onToggle}>com</button>
            <p>{line}</p>
        </div>
    </li>)
});

const SortableContainer = sortableContainer(({ children }) => {
    return <ul>{children}</ul>;
});

export default function List({ items, pollId, text }) {

    const [itemsVal, setItems] = useState(items);

    const [result, setResult] = useState(undefined);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(arrayMoveImmutable(itemsVal, oldIndex, newIndex));
    };

    const onSubmit = async () => {
        const rawResponse = await fetch('http://boysthings.top:9999/result', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: pollId, lines: itemsVal.filter(block => !block.commented).map(block => block.id) })
        });
        const content = await rawResponse.text();

        setResult(content);
    }

    const onNext = () => {
        window.location.reload();
    }

    const onItemToggle = (id) => () => {
        setItems(itemsVal.map((item) => ({ ...item, commented: item.id === id ? !item.commented : item.commented })))
    }

    return (
        <>
            <p>{text}</p>
            <button onClick={onNext}>Дальше</button>
            <button onClick={onSubmit}>Submit</button>
            <div className="content">
                <SortableContainer onSortEnd={onSortEnd}>
                    {itemsVal.map((value, index) => (
                        <SortableItem key={`item-${value.id}`} index={index} value={value} onToggle={onItemToggle(value.id)} />
                    ))}
                </SortableContainer>
            </div>
            {Boolean(result) && <div className="result">
                <button onClick={onNext}>Дальше</button>
                <p>{result}</p>
            </div>}
            
        </>);
}
