import React, { useRef, useState } from 'react'
import clamp from 'lodash-es/clamp'
import swap from 'lodash-move'
import { useGesture } from 'react-use-gesture'
import { useSprings, animated, interpolate } from 'react-spring'

// Returns fitting styles for dragged/idle items
const fn = (order, down, originalIndex, curIndex, y) => (index) =>
  down && index === originalIndex
    ? { y: curIndex * 100 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: (n) => n === 'y' || n === 'zIndex' }
    : { y: order.indexOf(index) * 100, scale: 1, zIndex: '0', shadow: 1, immediate: false }

const ItemElement = ({ key, item: { name, commented }, onToggle }) => {
  const onToggleClick = (e) => {
    e.stopPropagation()
    console.log()
    onToggle()
  }

  return (
    <div className="item">
      <button onMouseDown={onToggleClick} className="item__button">{commented ? 'uncomment' : 'comment'}</button>
      <p className={['item__code', commented ? ' commented' : ''].join('')}>{name}</p>
    </div>
  )
}
export default function DraggableList({ items, pollId, text }) {
  const [itemsVal, setItems] = useState(items.map((x, id) => ({ ...x, id })))
  const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
  const [springs, setSprings] = useSprings(itemsVal.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useGesture(({ args: [originalIndex], down, delta: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, itemsVal.length - 1)
    const newOrder = swap(order.current, curIndex, curRow)
    setSprings(fn(newOrder, down, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
    if (!down) order.current = newOrder
  })

  const onItemToggle = (i) => () => {
    console.log('to toggle', i)
    setItems(itemsVal.map((item) => ({ ...item, commented: item.id === i ? !item.commented : item.commented })))
  }

  return (
    <div>
      <div className="content">
        <div className="content__wrapper">
          {springs.map(({ zIndex, shadow, y, scale }, i) => (
            <animated.div
              {...bind(i)}
              className="content__item"
              key={i}
              style={{
                zIndex,
                boxShadow: shadow.interpolate((s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
                transform: interpolate([y, scale], (y, s) => `translate3d(0,${y}px,0) scale(${s})`)
              }}>
              <ItemElement item={itemsVal[i]} onToggle={onItemToggle(i)} />
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  )
}
