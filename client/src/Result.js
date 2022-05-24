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

            <p>Thanks for participation!</p>
            <p>Say "Fintech Forever" at Devexperts desk and get a gift!</p>
            <p>А чтобы принять участие в розыгрыше супер-приза, надо заполнить <a href="https://docs.google.com/forms/d/1_qOo9r05XTCCKvgIGJChXD3FlPAzOBLYdkxjxsJb55U/edit" target="_blank">анкету</a>. <br /> Ватрушки для зимних катаний с горки ждёт победителя! :) Розыгрыш сегодня в 19:00</p>
            <button className="go" onClick={onAgain}>Again</button>
        </>
    );
}
