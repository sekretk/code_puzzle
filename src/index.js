import { render } from 'react-dom'
import React from 'react'
import './styles.css'
import DraggableList from './App'

render(<DraggableList items={'Lorem ipsum dolor sit'.split(' ')} />, document.getElementById('root'))
