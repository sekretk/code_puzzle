import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

const SortableItem = sortableElement(({ value }) => <li>{value}</li>);

const SortableContainer = sortableContainer(({ children }) => {
    return <ul>{children}</ul>;
});

export default function List({ items, pollId, text }) {

    const [itemsVal, setItems] = useState(items);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(arrayMoveImmutable(items, oldIndex, newIndex));
    };

    const onSubmit = async () => {
        const rawResponse = await fetch('http://boysthings.top:9999/result', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: pollId, lines: itemsVal.map(block => block.name)})
          });
          const content = await rawResponse.json();
        
          console.log(content);
    }

    const onNext = () => {
        window.location.reload();
    }

    return (
        <>
            <p>{text}</p>\
            <button onClick={onNext}>Дальше</button>
            <button onClick={onSubmit}>Submit</button>
            <div className="content">
                <SortableContainer onSortEnd={onSortEnd}>
                    {itemsVal.map((value, index) => (
                        <SortableItem key={`item-${value.name}`} index={index} value={value} />
                    ))}
                </SortableContainer>
            </div>
        </>);
}
