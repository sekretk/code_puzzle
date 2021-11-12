import DraggableList from './DraggableList'
import NonDraggableList from './NonDraggableList'
import Result from './Result'
import About from './About'
import React, { useState, useEffect } from 'react';
import {url} from './utils';
import { reasons } from './reasons';

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

  const [reason, setReason] = useState(undefined);

  const needAbout = !Boolean(window.localStorage.getItem('acquainted'));

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

    const text = await rawResponse.text();

    const content = Boolean(text) ? JSON.parse(text) : undefined;

    setResult(content);

    setIncorrect(!Boolean(content))

    if (!content) {
      setReason(reasons[Math.floor(Math.random()*reasons.length)]);
    }
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

 const onNeedAbout = () => {
  window.localStorage.removeItem('acquainted');
  window.location.reload();
 }

  return (
    <>
    <button className="help" onClick={onNeedAbout}>Правила</button>
      <p className="description multiline">{description}</p>
      
      <div className="df"><button className="next" onClick={onNext}>Дальше</button>
      <button className="submit" onClick={onSubmit}>Submit</button></div>
      <div className={`alert ${incorrect ? 'alert-shown' : 'alert-hidden'}`}
          onTransitionEnd={() => {
            console.log('onTransitionEnd');
            setIncorrect(false)}}>
        <strong>{reason}</strong>
      </div>   

      {
        list
      }
      {
        Boolean(result) && <div className="result">
          <Result {...result}/>
          <button onClick={onNext} className="next">Дальше</button>
        </div>
      }
      {
        Boolean(needAbout) && <div className="about">
          <About/>
        </div>
      }
    </>)
}
