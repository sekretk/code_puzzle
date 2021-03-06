import express from "express"
import path from "path"
import fs from 'fs'
import { Answer, Question, QuestionWithID, User } from '../../shared/dto'

const POLL_DIR = 'polls';

const SESSION_FILE = "session.json";

const PORT = 9999;

const name = {
  prefix: ['stackoverflow', 'defects', "'cant reproduce'", 'identation'],
  suffix: ['hero', 'master', 'sensei', 'guru', 'perfectionist']
}

const maxQuestions = 4;

const app = express()

var cors = require('cors')

app.use(cors())

app.use(express.urlencoded());

app.use(express.json());

app.listen(PORT, () => {
  console.log(`[QUIZ API] listening at ${PORT} port`)
})

const getName = () => `${name.prefix[Math.floor(Math.random() * (name.prefix.length))]} ${name.suffix[Math.floor(Math.random() * (name.suffix.length))]}`

const getRandStr = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

const users = new Map<string, User>();

if (fs.existsSync(SESSION_FILE)) {
  try {
    const rawSession: Array<[string, User]> = JSON.parse(fs.readFileSync(SESSION_FILE, 'utf8'));

    rawSession.forEach(item => users.set(...item));

    console.log(`[QUIZ API] startes with ${rawSession.length} sessions restore`)
  } catch (err) {
    console.error(`[QUIZ API] cannot start session`, err);
  }
} else {
  console.log(`[QUIZ API] session file ${SESSION_FILE} doesnt exists, start from scratch`)
}

const strHash = (str: string): string => {
  let hash = 0, i, chr;
  if (str.length === 0) return hash.toString().padStart(20, '0');
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0;
  }

  hash = Math.abs(hash)
  
  return hash.toString().padStart(20, '0');
};

const saveSession = () => fs.writeFileSync("session.json", JSON.stringify(Array.from(users.entries()), null, 4), { encoding: "utf8" });

const parsePoll = (fileName: string) =>
  (JSON.parse(fs.readFileSync(path.join(__dirname, POLL_DIR, fileName), 'utf-8')) as Array<Question>).map(question => ({ ...question, id: strHash(JSON.stringify(question)) }));

const isRightArray = (sortable: boolean) => (attempt: number[]) => (answer: number[]) =>
  sortable
    ? JSON.stringify(attempt) === JSON.stringify(answer)
    : JSON.stringify(attempt.sort()) === JSON.stringify(answer.sort())

const checkAnswers = (sortable: boolean) => (attempt: number[]) => (answers: number[][]) =>
  answers.some(isRightArray(sortable)(attempt));

const isCorrect = (question: Question, answer: Answer): boolean =>
  checkAnswers(question.sortable)(answer.lines)(question.answers)

const polls: Map<string, Array<QuestionWithID>> =
  fs.readdirSync(path.join(__dirname, POLL_DIR))
    .reduce((acc, cur) => acc.set(cur.replace('.json', ''), parsePoll(cur)), new Map<string, Array<QuestionWithID>>());

console.log('[QUIZ API] Started with polls ', Array.from(polls.keys()).join(', '));

app.get('/polls', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(Array.from(polls.keys())));
});

app.get('/question/:token', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const user = users.get(req.params["token"]);

  if (user === undefined) {
    res.status(400).send({
      message: `User for token ${req.params["token"]} not found`
    });
    return;
  }

  const poll = polls.get(user.poll);

  if (poll === undefined) {
    res.status(400).send({
      message: `Poll for token ${req.params["token"]} not found`
    });
    return;
  }
   
  if (user.toAsk.length === 0) {
    res.end(JSON.stringify({ noQuestions: true }));
    return;
  }

  const question = poll.find(q => q.id === user.toAsk[0]);

  res.end(JSON.stringify({ ...question, answers: [], result: undefined }));
});

app.post('/answer/:token', function (req, res) {
  const answer = req.body as Answer;
  const user = users.get(req.params["token"])

  if (user === undefined) {
    res.status(400).send({
      message: `User for token ${req.params["token"]} not found`
    });
    return;
  }

  const poll = polls.get(users.get(req.params["token"])?.poll ?? '');

  if (poll === undefined) {
    res.status(400).send({
      message: `Poll for token ${req.params["token"]} not found`
    });
    return;
  }

  const question = poll.find(q => q.id === answer.question);

  if (question === undefined) {
    res.status(400).send({
      message: `Question ${answer.question} not found`
    });
    return;
  }

  user.answers.push({ ...answer, ...question, passed: isCorrect(question, answer) });

  user.toAsk = user.toAsk.filter(quest => quest !== answer.question);

  res.status(200).send();
})

app.get('/result/:token', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const user = users.get(req.params["token"])

  if (user === undefined) {
    res.status(400).send({
      message: `User for token ${req.params["token"]} not found`
    });
    return;
  }

  if (user.toAsk.length !== 0) {
    res.status(400).send({
      message: `Have ${user.toAsk.length} questions to ask,`
    });
    return;
  }

  res.end(JSON.stringify(user.answers));
})

app.get('/auth/:poll', function (req, res) {

  const poll = req.params["poll"];
  console.log('Auth', req.query);
  const id = getRandStr()
  const randomQuestions: Array<string> = [];

  const currentPoll = polls.get(poll);

  if (currentPoll === undefined || currentPoll.length === 0) {
    res.status(400).send({
      message: `No questions for #{poll},`
    });
    return;
  }

  while (randomQuestions.length < maxQuestions) {
    const newQuestion = currentPoll[Math.floor(Math.random() * (currentPoll.length ?? 0))];

    if (newQuestion && !randomQuestions.includes(newQuestion?.id)) {
      randomQuestions.push(newQuestion.id);
    }

    continue;

  }

  users.set(id, { name: getName(), poll, email: String(req.query.email), answers: [], toAsk: randomQuestions })

  res.end(id)
})

app.get('/id/:token', function (req, res) {

  res.setHeader('Content-Type', 'application/json');

  const user = users.get(req.params["token"])

  if (user === undefined) {
    res.status(400).send({
      message: `User for token ${req.params["token"]} not found`
    });
    return;
  }

  res.end(JSON.stringify({ token: req.params["token"], name: user.name, email: user.email, questionsLeft: maxQuestions - user.answers.length }));
})

app.get('/status', function (req, res) {
  res.end(JSON.stringify({
    count: Array.from(users.keys()).length,
    all: Array.from(users.entries())
  }));
})

app.get('/save', function (req, res) {
  saveSession();
  res.status(200).send('Saved');
})