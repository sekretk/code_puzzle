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