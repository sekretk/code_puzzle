import DraggableList from './DraggableList'
import NonDraggableList from './NonDraggableList'
import Result from './Result'
import About from './About'
import React, { useState, useEffect } from 'react';
import { url } from './utils';
import { reasons } from './reasons';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import 'react-notifications/dist/react-notifications.css';

const listPresenter = {
  true: (props) => <DraggableList {...props} />,
  false: (props) => <NonDraggableList {...props} />,
}

const addReasonToLocalStorage = reason => window.localStorage.setItem('reasons', JSON.stringify({ ...JSON.parse(window.localStorage.getItem('reasons')), [reason]: 1 }));

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

  const [achieve, setAchieve] = useState(undefined);

  const needAbout = !Boolean(window.localStorage.getItem('acquainted'));

  const checkForAchieve = () => {
    const lsReasons = Object.keys(JSON.parse(window.localStorage.getItem('reasons')));
    if (lsReasons.length === reasons.length && !window.localStorage.getItem('achieve')) {
      window.localStorage.setItem('achieve', '1');
    }
  };

  const showAchieve = () => {
    if (window.localStorage.getItem('achieve') === '1') {
      setAchieve({ text: 'Упорство', description: 'Тебе удалось раздобыть все сообщения о неправильных ответах' })
      window.localStorage.setItem('achieve', '0');
    }
  };

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
      const reason = reasons[Math.floor(Math.random() * reasons.length)]
      setReason(reason);
      addReasonToLocalStorage(reason);
      checkForAchieve();
      showAchieve();
    }
  }

  useEffect(() => {
    if (achieve) {
      NotificationManager.success(achieve.description, achieve.text);
    }
  }, achieve);

  const onNext = () => {
    window.location.reload();
  }

  const items = multiple
    ? blocks.map(block => ({ ...block, commented: Math.random() < 0.5 }))
    : blocks.map(block => ({ ...block, commented: block !== blocks[0] }));

  const [itemsVal, setItems] = useState(items.sort(() => (Math.random() > .5) ? 1 : -1));

  const list = listPresenter[sortable]({ items, onItemsChanged: setItems, multiple });

  const onNeedAbout = () => {
    window.localStorage.removeItem('acquainted');
    window.location.reload();
  }

  useEffect(() => {
    if (incorrect) {
      const timeout = setTimeout(() => {
        setIncorrect(false);
      }, 1000);

      return () => clearTimeout(timeout)
    }
  }
    , [incorrect]);

  return (
    <div className="main-app">
      <div className="task">
        <div className="head app-head">
          <a href="https://www.devexperts.com/" target="_blank">
            <img alt="devexperts.com" src="/static/logo.svg"
                 width="150" height="30" />
          </a>
          <button className="help" onClick={onNeedAbout}>Rules</button>
        </div>

        <div className={`alert ${incorrect ? 'alert-shown' : 'alert-hidden'}`}>
          <strong>{reason}</strong>
        </div>
        <div className="task-description">
          <div className="task-header">
            <h3>Task</h3>
            <div className="badge-block">
              {
                  Boolean(sortable) &&
                  <span className="main-badge">
                  <span className="badge_icon material-icons material-icons-outlined">
                    sort
                  </span>
                </span>
              }
              {
                  Boolean(multiple) &&
                  <span className="main-badge">
                  <span className="badge_icon material-icons material-icons-outlined">
                    checklist_rtl
                  </span>
                </span>
              }
            </div>
          </div>
          <p className="description multiline">{description}</p>
        </div>
        {
          list
        }
        {
          Boolean(result) && <div className="result">
            <button className="next" onClick={onNext}>Next</button>
            <Result {...result} />
          </div>
        }
        {
          Boolean(needAbout) && <div className="about">
            <About />
          </div>
        }
        <div className="confirm-buttons">
          <button className="next" onClick={onNext}>Continue</button>
          <button className="submit" onClick={onSubmit}>Submit</button>
        </div>
        <NotificationContainer />
      </div>
    </div>)
}
