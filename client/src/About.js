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

            <br />\
            <h3>Правила игры:</h3>
            <p className="rules">
                Приложение предлагает решить задачу.<br/>
                Для пропуска нужно начать Далее.<br/>
                Для отправки на проверку Отправить.<br/>
                Для комментирования/раскомментирования строки нужно нажать на "//".<br/>
                На основе фидбэка от 5 минутного тестирования нужно добавить что вы получаете ВСЕГДА случайное задание - так что жмите Далее если уже решали. И при старте закомментированы случайный элементы - не позволяйте этому выбору повлиять на вас!<br/>
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
