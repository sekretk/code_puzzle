import DraggableList from './DraggableList'
import NonDraggableList from './NonDraggableList'
import Result from './Result'
import React, { useState, useEffect } from 'react';
import {url} from './utils';

const listPresenter = {
  true: (props) => <DraggableList {...props}/>,
  false: (props) => <NonDraggableList {...props}/>,
}

export default function App(question) {

  const {
    poll,
    description,
    blocks, 
    multiple,
    sortable,
    id
  } = question;

  const [result, setResult] = useState(undefined);

  const [incorrect, setIncorrect] = useState(false);

  const onSubmit = async () => {

    const rawResponse = await fetch(url + '/result/' + poll, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        question: id, 
        lines: itemsVal.filter(block => !block.commented).map(block => block.id)
      })
    });
    const content = await rawResponse.text();

    setResult(content);

    setIncorrect(!Boolean(content))
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

 const list = listPresenter[sortable]({items, onItemsChanged: setItems, multiple});

  return (
    <>
      <p className="description multiline">{description}</p>
      <button className="next" onClick={onNext}>Дальше</button>
      <button className="submit" onClick={onSubmit}>Submit</button>
      <div className={`alert ${incorrect ? 'alert-shown' : 'alert-hidden'}`}
          onTransitionEnd={() => {
            console.log('onTransitionEnd');
            setIncorrect(false)}}>
        <strong>Извините. Не принято!</strong>
      </div>   

      {
        list
      }
      {
        Boolean(result) && <div className="result">
          <button onClick={onNext}>Дальше</button>
          <Result {...result}/>
        </div>
      }
    </>)
}