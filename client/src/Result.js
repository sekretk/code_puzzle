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
        </>
    );
}
