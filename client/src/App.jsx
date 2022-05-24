import DraggableList from './DraggableList'
import NonDraggableList from './NonDraggableList'
import Result from './Result'
import About from './About'
import React, { useState, useEffect, useMemo } from 'react';
import { getAPI, url } from './utils';
import { reasons } from './reasons';

const listPresenter = {
  true: (props) => <DraggableList {...props} />,
  false: (props) => <NonDraggableList {...props} />,
}

export default function App(params) {

  const { poll } = params;

  const [question, setQuestion] = useState(undefined);

  const [aboutPresent, setAboutPresent] = useState(false);

  const sortable = useMemo(() => question?.sortable ?? false, [])

  const items = useMemo(() => question ? question.multiple
    ? question.blocks.map(block => ({ ...block, commented: Math.random() < 0.5 }))
    : question.blocks.map(block => ({ ...block, commented: block !== blocks[0] })) : [], []);

  const token = window.localStorage.getItem('token');

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

  const [itemsVal, setItems] = useState(items.sort(() => (Math.random() > .5) ? 1 : -1));

  const list = listPresenter[sortable]({ items, onItemsChanged: setItems, multiple: question?.multiple ?? false });

  useEffect(() => {
    if (Boolean(token)) {
      getAPI('question/' + token)
        .then(setQuestion)
        .catch((error) => {
          console.log('Fetch QUESTIONS error', error);
          window.localStorage.removeItem('token');
          window.location.reload();
        });
    } else {
      setAboutPresent(true);
    }
  }, []);

  return (
    <div className="main-app">
      <div className="task">
        <div className="head app-head">
          <a href="https://www.devexperts.com/" target="_blank">
            <img alt="devexperts.com" src="/static/logo.svg"
              width="150" height="30" />
          </a>
          <button className="help" onClick={() => setAboutPresent(true)}>Rules</button>
        </div>
        {
          Boolean(question) && <>
            <div className="task-description">
              <div className="task-header">
                <h3>Task</h3>
                <div className="badge-block">
                  {
                    Boolean(question?.sortable) &&
                    <span className="main-badge">
                      <span className="badge_icon material-icons material-icons-outlined">
                        sort
                      </span>
                    </span>
                  }
                  {
                    Boolean(question?.multiple) &&
                    <span className="main-badge">
                      <span className="badge_icon material-icons material-icons-outlined">
                        checklist_rtl
                      </span>
                    </span>
                  }
                </div>
              </div>
              <p className="description multiline">{question?.description}</p>
            </div>
            {
              list
            }
            <div className="confirm-buttons">
              <button className="submit" onClick={onSubmit}>Submit</button>
            </div>
          </>
        }
        {
          aboutPresent && <div className="about">
            <About poll={poll} />
          </div>
        }
      </div>
    </div>)
}
