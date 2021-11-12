import React from 'react';

export default function Result(links, text) {

    return (
        <>
            <p>Верно!</p>
            <p>{text}</p>
            {/* {links?.map(({ text: msg, link }) => (<a href={link}>{msg}</a>))} */}
        </>
    );
}
