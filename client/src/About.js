import React from 'react';

export default function Result({ links, text }) {

    window.localStorage.setItem('acquainted', true);

    const onGo = () => {
        window.location.reload();
    }

    return (
        <>
            <div className="wrapper">
                <div className="about-without-button">
                    <div className="head">
                        <a href="https://www.devexperts.com/" target="_blank">
                            <img alt="devexperts.com" src="/static/logo.svg"
                                width="150" height="30" />
                        </a>

                        <a href="https://careers.devexperts.com/vacancies/?country=ru&remote=true" target="_blank">Вакансии</a>
                    </div>
                    <div className="general-rules">
                        <div className="about-rules">
                            <h3 className="rules-header-text">Об игре</h3>
                            <p className="rules-text">
                                <ul className="rules-list">
                                    <li className="rules-list-point">
                                        Вам предлагается решить задачу
                                    </li>
                                    <li className="rules-list-point">
                                        Чтобы отправить решение на проверку,<br />нажмите “Далее”
                                    </li>
                                    <li className="rules-list-point">
                                        Чтобы добавить комментарий,<br />нажмите “//”
                                    </li>
                                    <li className="rules-list-point">
                                        Чтобы выбрать другое задание,<br />нажмите “Далее”
                                    </li>
                                </ul>
                            </p>
                        </div>

                        <div className="rules-signs">
                            <h4 className="rules-signs-header">Условные обозначения</h4>
                            <span className="badge">
                                <span className="badge_icon material-icons material-icons-outlined">
                                    sort
                                </span>
                                Расположить в правильном порядке
                            </span>

                            <span className="badge">
                                <span className="badge_icon material-icons material-icons-outlined">
                                    checklist_rtl
                                </span>
                                Допустимо несколько вариантов
                            </span>
                        </div>
                    </div>
                </div>


                <button className="go" onClick={onGo}>Начать игру!</button>
            </div>
        </>
    );
}
