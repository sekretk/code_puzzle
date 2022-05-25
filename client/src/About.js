import React, { useState, useEffect } from 'react';
import { getAPI, url } from './utils';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

const token = window.localStorage.getItem('token');

export default function Result({ poll }) {

    const [iam, setIam] = useState(undefined)
    const [email, setEmail] = useState(undefined);
    const [checked, setChecked] = useState(false);

    window.localStorage.setItem('acquainted', true);

    const onGo = async () => {
        const rawResponse = await fetch(`${url}/auth/${poll}?email=${email ?? ''}`);

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

    const styles = theme => ({
        multilineColor: {
            color: 'red'
        }
    });

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
                    {Boolean(iam) && <div className="head">
                        <div>
                            <span>Hello, {iam.name}!</span>
                        </div>
                        <div>
                            <span>Questions left: {iam.questionsLeft}</span>
                            {Boolean(token) && <a className='logout' onClick={onExit}>Logout</a>}
                        </div>
                    </div>}
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

                            <span className="badge">
                                <span className="badge_icon material-icons material-icons-outlined">
                                    rule
                                </span>
                                Only one option to select
                            </span>
                        </div>
                    </div>
                </div>

                {
                    !Boolean(token) &&
                    <div className="about-buttons">
                        <label className="checkbox-approvement">
                            <Checkbox
                                className="checkbox-mui"
                                checked={checked}
                                onChange={() => setChecked(!checked)}
                            />
                            <span> I want to receive email newsletters from Devexperts</span>
                        </label>
                        <div className='gowrapper'>
                            <input className="email-input"
                                   disabled={!checked}
                                   placeholder="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                            <button className="go" onClick={onGo}>Start!</button>
                        </div>
                    </div>
                }

                {Boolean(token) && <button className="go" onClick={onContinue}>Continue</button>}
            </div>
        </>
    );
}
