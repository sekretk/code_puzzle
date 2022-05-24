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
            <p>Your results</p>
            <p className="multiline">Passed: {result.filter(_ => _.passed)?.length??0} out of {result.length??0}</p>
            {
                result.map(resItem => (
                    <>
                        <p className="multiline">Question: {resItem.description}</p>
                        <p className="multiline">Result: {resItem.passed ? 'Passed' : 'Failed'}</p>
                        <p className="multiline">{resItem.result.text}</p>
                        <ul className="result-links">
                            {
                                resItem.result.links.map(({ text: msg, link }, index) => (
                                    <li key={index} ><a href={link} target="_blank">{msg}</a></li>
                                ))
                            }
                        </ul>
                    </>
                ))
            }

            <p>Thank you for participating!</p>
            <button className="go" onClick={onAgain}>Again</button>
        </>
    );
}
