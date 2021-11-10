import { render } from 'react-dom'
import React from 'react'
import './styles.css'
import DraggableList from './App'

// const items = [
//   { name: 'compact', commented: false },
//   { name: 'takeWhile', commented: false },
//   { name: 'filter', commented: true },
//   { name: 'skip(1)', commented: false },
//   { name: 'shareReply', commented: true }
// ]

(async () => {
const fetchedPolls = await fetch('http://boysthings.top:9999/rndpoll');

const poll = await fetchedPolls.json();

const items = poll.blocks.map(block => ({name: block, commented: Math.random() < 0.5}))

render(<DraggableList pollId={poll.id} text={poll.description} items={items} />, document.getElementById('root'))
})();