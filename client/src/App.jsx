import { DraggableList } from './DraggableList'
import { NonDraggableList } from './NonDraggableList'
import Result from './Result'
import About from './About'
import React, { useState, useEffect, useMemo } from 'react';
import { getAPI, url, postAPI } from './utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function App(params) {

  const { poll } = params;

  const [question, setQuestion] = useState(undefined);

  const [aboutPresent, setAboutPresent] = useState(false);

  const [showResults, setShowResults] = useState(false);

  const sortable = useMemo(() => question?.sortable ?? false, [question])

  const [items, setItems] = useState([]);

  const token = window.localStorage.getItem('token');

  const onSubmit = () => {

    postAPI('answer/' + token, {
      question: question?.id,
      lines: items.filter(block => !block.commented).map(block => block.id)
    })
      .then(() => window.location.reload());
  }

  const setQuestionInternal = (question) => {
    setQuestion(question);

    if (Boolean(question)) {
      const questionBlocks = (question.multiple
        ? question.blocks?.map(block => ({ ...block, commented: Math.random() < 0.5 }))
        : question.blocks?.map(block => ({ ...block, commented: block !== question?.blocks[0] })))??[];

      setItems(questionBlocks.sort(() => (Math.random() > .5) ? 1 : -1));

    }
    else {
      setItems([]);
    }
  }

  useEffect(() => {
    if (Boolean(token)) {
      getAPI('question/' + token)
        .then(question => {
          if (Boolean(question.noQuestions)) {
            setShowResults(true);
            setQuestionInternal(undefined);
          } else {
            setQuestionInternal(question);
            setShowResults(false);
          }
        })
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
              <div>
                <SyntaxHighlighter language="java"  style={ tomorrow }>
                  {question?.code}
                </SyntaxHighlighter>
              </div>
            </div>
            {
              sortable ?
                <DraggableList items={items} onItemsChanged={setItems} multiple={question?.multiple ?? false} />
                : <NonDraggableList items={items} onItemsChanged={setItems} multiple={question?.multiple ?? false} />
            }
            <div className="confirm-buttons">
              <button className="submit" onClick={onSubmit}>Submit</button>
            </div>
          </>
        }
        {
          showResults && <div className="result">
            <Result />
          </div>
        }
        {
          aboutPresent && <div className="about">
            <About poll={poll} />
          </div>
        }
      </div>
    </div>)
}
