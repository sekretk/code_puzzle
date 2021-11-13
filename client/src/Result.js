import React from 'react';

export default function Result({ links, text }) {

    return (
        <>
            <p>Верно!</p>
            <p className="multiline">{text}</p>
            <ul className="result-links">
                {
                    links.map(({ text: msg, link }, index) => (
                        <li key={index} ><a href={link} target="_blank">{msg}</a></li>
                    ))
                }
            </ul>
            <p>Поучаствуй в розыгрыше ватрушки для зимних катаний! Оставь свои контакты <a href="https://docs.google.com/forms/d/1_qOo9r05XTCCKvgIGJChXD3FlPAzOBLYdkxjxsJb55U/edit" target="_blank">Тут</a> и жди результатов сегодня в 19:00</p>
        </>
    );
}
