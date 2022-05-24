export type PollAttempt = {
    id: string,
    lines: Array<number>
}

export type Line = {
    id: number,
    line: string
}

export type Poll = {
    description: string,
    blocks: Array<string>,
    answers: Array<Array<number>>,
    result: string
}

export type PollWithID = Poll & { id: string }

export type Answer = {
    question: string,
    lines: Array<number>
}

export type AnswerWithResult = Pick<Answer, 'lines'> & Question & {
    passed: boolean,
}

export type Link = {
    text: string,
    link: string
}

export type Result = {
    links: Array<Link>,
    text: string
}

export type Question = {
    description: string,
    code: string,
    blocks: Array<Line>,
    answers: Array<Array<number>>,
    result: Result,
    sortable: boolean,
    multiple: boolean,
}

export type QuestionWithID = Question & { id: string }

export type User = {
    name: string,
    email: string,
    poll: string,
    toAsk: Array<string>,
    answers: Array<AnswerWithResult>
}