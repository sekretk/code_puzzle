import express from "express"
import path from "path"
import fs from 'fs'

const app = express()
const port = 9999

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

var cors = require('cors')

app.use(cors())

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const getRandStr = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

type PollAttempt = {
  id: string,
  lines: Array<number>
}

type Line = {
  id: number,
  line: string
}

type Poll = {
  description: string,
  blocks: Array<string>,
  answers: Array<Array<number>>,
  result: string
}

type PollWithID = Poll & { id: string }

const polls: Array<PollWithID> = (JSON.parse(fs.readFileSync(path.join(__dirname, 'polls.json'), 'utf-8')) as Array<Poll>).map(poll => ({ ...poll, id: getRandStr() }));

app.get('/allpolls', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(polls));
});

app.get('/rndpoll', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const rndPoll = polls[Math.floor(Math.random() * polls.length)];

  res.end(JSON.stringify({ ...rndPoll, answers: undefined, result: undefined }));
});

app.post('/result', function (req, res) {
  const attempt = req.body as PollAttempt;
  const foundPoll = polls.find(poll => poll.id === attempt.id);
  res.end(foundPoll?.result)
})