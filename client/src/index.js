import { render } from 'react-dom'
import React, { useState } from 'react'
import './styles.css'
import App from './App'
import {url} from './utils'

export const swapInArray = (arr, idx1, idx2) => {
  const result = [...arr];
  [result[idx1], result[idx2]] = [arr[idx2], arr[idx1]]
  return result;
}

(async () => {

  const poll = window.location.pathname.replace('/', '');

  if (!Boolean(poll)) {
    const res = await fetch(url + '/polls');
    const allPolls = await res.json();
    const listOfPolls = (<ul>
      {allPolls.map((poll) => <li><a href={poll}>{poll}</a></li>)}
      </ul>)
    render(listOfPolls, document.getElementById('root'));
    return
  }

  render(<App poll={poll}/>, document.getElementById('root'))

})();