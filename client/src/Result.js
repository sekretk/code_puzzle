import React from 'react';

export default function Result({ links, text }) {

    return (
        <>
            <p>Верно!</p>
            <p>{text}</p>
            <ui>
                {
                    links.map(({ text: msg, link }, index) => (
                        <li key={index} ><a href={link} target="_blank">{msg}</a></li>
                    ))
                }
            </ui>
        </>
    );
}
