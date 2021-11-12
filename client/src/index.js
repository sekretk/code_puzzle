import { render } from 'react-dom'
import React, { useState } from 'react'
import './styles.css'
import List from './List'

export const swapInArray = (arr, idx1, idx2) => {
  const result = [...arr];
  [result[idx1], result[idx2]] = [arr[idx2], arr[idx1]]
  return result;
}

(async () => {
  const fetchedPolls = await fetch('http://boysthings.top:9999/rndpoll');

  const poll = await fetchedPolls.json();

  const items = poll.blocks.map(block => ({ ...block, commented: Math.random() < 0.5 }))

  render(<List pollId={poll.id} text={poll.description} items={items}/>, document.getElementById('root'))

})();