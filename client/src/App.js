import DraggableList from './DraggableList'
import NonDraggableList from './NonDraggableList'
import Result from './Result'
import About from './About'
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
      <p className="description multiline">{description}</p>
      <button className="help" onClick={onNeedAbout}>Правила</button>
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
      {
        Boolean(needAbout) && <div className="about">
          <About/>
        </div>
      }
    </>)
}