import React from 'react';

export default function Result({ links, text }) {

    window.localStorage.setItem('acquainted', true);

    const onGo = () => {
        window.location.reload();
    }

    return (
        <>
            <a href="https://www.devexperts.com/">
                <img alt="devexperts.com" src="/static/logo.svg"
                    width="150" height="40" />
            </a>

            <p>Международная карьера в Fintech.
                Подробнее о наших продуктах и команде:</p>
            <p><a href="https://devexperts.com/about-devexperts/" target="_blank">Подробнее о наших продуктах и команде</a></p>
            <p><a href="https://careers.devexperts.com/vacancies/?country=ru&remote=true" target="_blank">Наши вакансии</a></p>
            <button onClick={onGo}>Поехали!</button>
        </>
    );
}
