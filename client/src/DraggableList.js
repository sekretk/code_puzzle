import React, { memo } from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { selectMapper } from './utils'

const SortableItem = sortableElement(({ value, onToggle }) => {
    const { line, commented } = value;
    return (<li className={commented ? 'commented' : 'uncommented'}>
        <div className="item content__item">
            <button className="comment code" onMouseDown={onToggle}>//</button>
            {
                Boolean(commented)
                    ? (
                        <strike>
                            <p className="multiline item__code code">{line}</p>
                        </strike>
                    )
                    : <p className="multiline item__code code">{line}</p>
            }
            <span className="drag material-icons material-icons-outlined">
                drag_indicator
            </span>
        </div>
    </li>)
});

const SortableContainer = sortableContainer(({ children }) => {
    return <ul className={"sortable-container"}>{children}</ul>;
});

export const DraggableList = memo(({ items, multiple, onItemsChanged }) => {


    const onSortEnd = ({ oldIndex, newIndex }) => {
        const result = arrayMoveImmutable(items, oldIndex, newIndex);
        onItemsChanged(result);
    };

    const onItemToggle = (id) => () => {
        const result = items.map((item) => ({ ...item, commented: selectMapper[multiple](item, id) }));
        onItemsChanged(result);
    }

    return (
        <div className={`content ${multiple && 'multiple'}`}>
            <SortableContainer onSortEnd={onSortEnd} useWindowAsScrollContainer={true}>
                {items.map((value, index) => (
                    <SortableItem key={`item-${value.id}`} index={index} value={value} onToggle={onItemToggle(value.id)}/>
                ))}
            </SortableContainer>
        </div>
    );
});
