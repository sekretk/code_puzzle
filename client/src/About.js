import React from 'react';

export default function Result({ links, text }) {

    window.localStorage.setItem('acquainted', true);

    const onGo = () => {
        window.location.reload();
    }

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
                    <div className="general-rules">
                        <div className="about-rules">
                            <h3 className="rules-header-text">Game rules</h3>
                            <p className="rules-text">
                                <ul className="rules-list">
                                    <li className="rules-list-point">
                                        We propose you to resolve a bucnh of tasks.
                                    </li>
                                    <li className="rules-list-point">
                                        To submit your solution<br />tap "Submit"
                                    </li>
                                    <li className="rules-list-point">
                                        For commentning a line ,<br />tap on "//"
                                    </li>
                                    <li className="rules-list-point">
                                        To skip the task,<br />tap "Continue"
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


                <button className="go" onClick={onGo}>Start!</button>
            </div>
        </>
    );
}
