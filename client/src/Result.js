import React from 'react';

export default function Result({ links, text }) {

    return (
        <>
            <p>Correct!</p>
            <p className="multiline">{text}</p>
            <ul className="result-links">
                {
                    links.map(({ text: msg, link }, index) => (
                        <li key={index} ><a href={link} target="_blank">{msg}</a></li>
                    ))
                }
            </ul>
            <p>Thanks for participation!</p>
            <p>Say "Fintech Forever" at Devexperts desk and get a gift!</p>
            <p>А чтобы принять участие в розыгрыше супер-приза, надо заполнить <a href="https://docs.google.com/forms/d/1_qOo9r05XTCCKvgIGJChXD3FlPAzOBLYdkxjxsJb55U/edit" target="_blank">анкету</a>. <br/> Ватрушки для зимних катаний с горки ждёт победителя! :) Розыгрыш сегодня в 19:00</p>
        </>
    );
}
