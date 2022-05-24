import React, { useState, useEffect } from 'react';
import { getAPI, url } from './utils';

export default function Result({ poll }) {

    const [iam, setIam] = useState(undefined)

    const token = window.localStorage.getItem('token');

    window.localStorage.setItem('acquainted', true);

    const onGo = async () => {
        const rawResponse = await fetch(url + '/auth/' + poll);

        const token = await rawResponse.text();
        window.localStorage.setItem('token', token);
        window.location.reload();
    }

    const onExit = () => {
        window.localStorage.removeItem('token');
        window.location.reload();
    }

    const onContinue = () => {
        window.location.reload();
    }

    useEffect(() => {
        if (Boolean(token)) {
            getAPI('id/' + token)
                .then(setIam)
                .catch((error) => {
                    console.log('Fetch WHOAMI error', error);
                });
        }

    }, [])

    return (
        <>
            <div className="wrapper">
                <div className="about-without-button">
                    <div className="head">
                        <a href="https://www.devexperts.com/" target="_blank">
                            <img alt="devexperts.com" src="/static/logo.svg"
                                width="150" height="30" />
                        </a>

                        <a href="https://careers.devexperts.com/vacancies/?country=bg&remote=true" target="_blank">View open positions</a>
                    </div>
                    <div className="head">
                        Hello, <span>{iam?.name}</span>!
                        <span>{iam?.email}</span>
                        {Boolean(token) && <a onClick={onExit}>Logout</a>}
                    </div>
                    <div className="general-rules">
                        <div className="about-rules">
                            <h3 className="rules-header-text">Game rules</h3>
                            <p className="rules-text">
                                <ul className="rules-list">
                                    <li className="rules-list-point">
                                        We propose you to resolve a bunch of tasks.
                                    </li>
                                    <li className="rules-list-point">
                                        Tap "Submit" to submit your solution
                                    </li>
                                    <li className="rules-list-point">
                                        Tap on "//"  For commenting a line
                                    </li>
                                </ul>
                            </p>
                        </div>

                        <div className="rules-signs">
                            <h4 className="rules-signs-header">Notation keys</h4>
                            <span className="badge">
                                <span className="badge_icon material-icons material-icons-outlined">
                                    sort
                                </span>
                                Place in a right order
                            </span>

                            <span className="badge">
                                <span className="badge_icon material-icons material-icons-outlined">
                                    checklist_rtl
                                </span>
                                Multiple choices allowed
                            </span>
                        </div>
                    </div>
                </div>


                {!Boolean(token) && <button className="go" onClick={onGo}>Start!</button>}

                {Boolean(token) && <button className="go" onClick={onContinue}>Continue</button>}
            </div>
        </>
    );
}
