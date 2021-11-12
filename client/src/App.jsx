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
    : blocks.map(block => ({ ...block, commented: block !== blocks[0] }))


  const [itemsVal, setItems] = useState(items);

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
    <>
      <div className="legend">
        {
          Boolean(sortable) &&
          <span className="legend-badge sort">
            <span className="badge_icon material-icons material-icons-outlined">
              sort
            </span>
          </span>
        }
        {
          Boolean(multiple) &&
          <span className="legend-badge multiple">
            <span className="badge_icon material-icons material-icons-outlined">
              checklist_rtl
            </span>
          </span>
        }
        <button className="help" onClick={onNeedAbout}>Правила</button>
      </div>
      <p className="description multiline">{description}</p>
      <button className="next" onClick={onNext}>Дальше</button>
      <button className="submit" onClick={onSubmit}>Отправить</button>
      <div className={`alert ${incorrect ? 'alert-shown' : 'alert-hidden'}`}>
        <strong>{reason}</strong>
      </div>

      {
        list
      }
      {
        Boolean(result) && <div className="result">
          <button className="next" onClick={onNext}>Дальше</button>
          <Result {...result} />
        </div>
      }
      {
        Boolean(needAbout) && <div className="about">
          <About />
        </div>
      }

      <NotificationContainer />
    </>)
}
