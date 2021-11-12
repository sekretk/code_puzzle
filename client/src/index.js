import { render } from 'react-dom'
import React, { useState } from 'react'
import './styles.css'
import App from './App'

export const swapInArray = (arr, idx1, idx2) => {
  const result = [...arr];
  [result[idx1], result[idx2]] = [arr[idx2], arr[idx1]]
  return result;
}

(async () => {

  const poll = window.location.pathname.replace('/', '');

  const fetchedQuestion = await fetch('http://boysthings.top:9999/rndpoll/'+poll);

  let question = await fetchedQuestion.json();

  question = {...question, poll};

  render(<App {...question}/>, document.getElementById('root'))

})();