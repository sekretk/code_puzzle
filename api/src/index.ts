import express from "express"
import path from "path"
import fs from 'fs'

const POLL_DIR = 'polls';
const PORT = 9999;

const app = express()

var cors = require('cors')

app.use(cors())

app.use(express.urlencoded());

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

const getRandStr = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

type Attempt = {
  question: string,
  lines: Array<number>
}

type Link = {
  text: string,
  link: string
}

type Line = {
  id: number,
  line: string
}

type Result = {
  links: Array<Link>,
  text: string
}

type Question = {
  description: string,
  blocks: Array<Line>,
  answers: Array<Array<number>>,
  result: Result,
  sortable: boolean,
  multiple: boolean
}

type QuestionWithID = Question & { id: string }

const parsePoll = (fileName: string) => 
  (JSON.parse(fs.readFileSync(path.join(__dirname, POLL_DIR, fileName), 'utf-8')) as Array<Question>).map(question => ({...question, id: getRandStr()}));

const findAnswer = 
  (attempt: Attempt) => 
    (question: QuestionWithID) => 
      question.id === attempt.question && question.answers.some(answer => JSON.stringify(attempt.lines) === JSON.stringify(answer));

const polls: Map<string, Array<QuestionWithID>> = 
  fs.readdirSync(path.join(__dirname, POLL_DIR))
  .reduce((acc, cur) => acc.set(cur.replace('.json', ''), parsePoll(cur)), new Map<string, Array<QuestionWithID>>());

app.get('/polls', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(Array.from(polls.keys())));
});

app.get('/rndpoll/:poll', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const poll = req.params["poll"];
  
  const rndPoll = polls.get(poll)?.[Math.floor(Math.random() * (polls.get(poll)?.length??0))];

  res.end(JSON.stringify({ ...rndPoll, answers: undefined, result: undefined }));
});

app.post('/result/:poll', function (req, res) {
  const attempt = req.body as Attempt;
  const poll = req.params["poll"];
  const foundPoll = polls.get(poll)?.find(findAnswer(attempt));
  console.log(attempt, polls.get(poll))
  res.end(JSON.stringify(foundPoll?.result))
})