import { render } from 'react-dom'
import React from 'react'
import './styles.css'
import DraggableList from './App'

const items = [
  { name: 'compact', commented: false },
  { name: 'takeWhile', commented: false },
  { name: 'filter', commented: true },
  { name: 'skip(1)', commented: false },
  { name: 'shareReply', commented: true }
]

render(<DraggableList items={items} />, document.getElementById('root'))
