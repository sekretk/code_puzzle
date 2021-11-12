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
                    width="150" height="30" />
            </a>

            <p>Международная карьера в Fintech:</p>
            <p><a href="https://devexperts.com/about-devexperts/" target="_blank">Подробнее о наших продуктах и команде</a></p>
            <p><a href="https://careers.devexperts.com/vacancies/?country=ru&remote=true" target="_blank">Наши вакансии</a></p>


            <p>
                Приложение предлагает решить задачу.
                Для пропуска нужно начать Далее.
                Для отправки на проверку Отправить.
                Для комментирования/раскомментирования строки нужно нажать на "//"
                Допустимы следующие флаги на задачах:
            </p>

            <span className="badge sort">
                <span className="badge_icon material-icons material-icons-outlined">
                    sort
                </span>
                Необходимо отсортировать
            </span>

            <span className="badge multiple">
                <span className="badge_icon material-icons material-icons-outlined">
                    checklist_rtl
                </span>
                Несколько вариантов
            </span>

            <button className="go" onClick={onGo}>Начать!</button>
        </>
    );
}
