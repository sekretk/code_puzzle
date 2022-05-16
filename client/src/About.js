import React from 'react';

export default function Result({ links, text }) {

    window.localStorage.setItem('acquainted', true);

    const onGo = () => {
        window.location.reload();
    }

    return (
        <>
            <a href="https://www.devexperts.com/" target="_blank">
                <img alt="devexperts.com" src="/static/logo.svg"
                    width="150" height="30" />
            </a>

            <p>20 years of experience building capital markets software solutions:</p>
            <p><a href="https://devexperts.com/about-devexperts/" target="_blank">Learn more about our team and products</a></p>
            <p><a href="https://careers.devexperts.com/vacancies/?country=ru&remote=true" target="_blank">View open positions</a></p>

            <br />
            <h3>Game rules:</h3>
            <p className="rules">
                We suggest you to resolve a bucnh of tasks.<br />
                To skip the task tap "Continue".<br />
                To submit your solution tap - "Submit".<br />
                For commentning the line tap on "//".<br />
                You always get randomized task, tap "Continue" if you already resolved it before.<br />
                JFYI: we comment random elements when generate tasks for you.<br />
                The following flags are allowed:
            </p>

            <span className="badge sort">
                <span className="badge_icon material-icons material-icons-outlined">
                    sort
                </span>
                Sorting is required
            </span>

            <span className="badge multiple">
                <span className="badge_icon material-icons material-icons-outlined">
                    checklist_rtl
                </span>
                Multiple choices allowed
            </span>

            <button className="go" onClick={onGo}>Start!</button>
        </>
    );
}
