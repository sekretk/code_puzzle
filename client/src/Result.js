import React, { useEffect, useState } from 'react';
import { getAPI } from './utils';

const token = window.localStorage.getItem('token');

export default function Result() {

    const [result, setResult] = useState([])

    useEffect(() => {
        if (Boolean(token)) {
            getAPI('result/' + token)
                .then(setResult)
                .catch((error) => {
                    console.log('Fetch RESULTS error', error);
                    //window.location.reload();
                });
        }

    }, [])

    const onAgain = () => {
        window.localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        result.length > 0 &&
        <>
            <h1 className={"s"}>Your results</h1>
            <p className="multiline">
                Passed: {result.filter(_ => _.passed)?.length??0} out of {result.length??0} <br />
                Say "Fintech Forever" at Devexperts desk and get a gift!
            </p>
            {
                result.map(resItem => (
                    <div className="question-result">
                        <div className="question-failed-passed">
                            <div className="head-answer">
                                <p className="multiline result-question-info">
                                    <span className="result-sign-text">
                                        {resItem.description}
                                    </span>
                                </p>
                            </div>
                            <p className="multiline result-correct-answer">
                                {
                                    resItem.passed ?
                                    <span className="text-passed"> Passed</span> : <span className="text-failed"> Failed</span>
                                }
                            </p>
                        </div>
                        <div>
                            <p className="multiline explanation">{resItem.result.text}</p>
                            <ul className="result-links">
                                {
                                    resItem.result.links.map(({ text: msg, link }, index) => (
                                        <li key={index} ><a href={link} target="_blank">{msg}</a></li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                ))
            }

            <p>Thank you for participating!</p>
            <button className="go" onClick={onAgain}>Again</button>
        </>
    );
}
