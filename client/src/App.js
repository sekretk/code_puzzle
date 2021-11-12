import List from './List'
import React, { useState, useEffect } from 'react';

export default function App(question) {

  const {
    poll,
    description,
    blocks, 
    multiple,
    id
  } = question;

  const [result, setResult] = useState(undefined);

  const [incorrect, setIncorrecrt] = useState(false);

  const onSubmit = async () => {
    const rawResponse = await fetch('http://boysthings.top:9999/result/' + poll, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id: id, 
        lines: itemsVal.filter(block => !block.commented).map(block => block.id) 
      })
    });
    const content = await rawResponse.text();

    setResult(content);

    setIncorrecrt(!Boolean(content))
  }

  const onNext = () => {
    window.location.reload();
  }

  const items = multiple 
    ? blocks.map(block => ({ ...block, commented: Math.random() < 0.5 }))
    : blocks.map(block => ({ ...block, commented: false }))


  const [itemsVal, setItems] = useState(items);

  useEffect(() => {
    document.title = "Code Puzzle"
 }, []);

  return (
    <>
      <p className="description multiline">{description}</p>
      <button onClick={onNext}>Дальше</button>
      <button onClick={onSubmit}>Submit</button>

      <List items={items} onItemsChanged={setItems} />
      {
        Boolean(result) && <div className="result">
          <button onClick={onNext}>Дальше</button>
          <p>{result}</p>
          <p>Any text</p>
        </div>
      }
    </>)
}