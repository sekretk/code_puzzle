"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var POLL_DIR = 'polls';
var PORT = 9999;
var app = (0, express_1.default)();
var cors = require('cors');
app.use(cors());
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.listen(PORT, function () {
    console.log("Example app listening at http://localhost:" + PORT);
});
var getRandStr = function () { return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5); };
var parsePoll = function (fileName) {
    return JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, POLL_DIR, fileName), 'utf-8')).map(function (question) { return (__assign(__assign({}, question), { id: getRandStr() })); });
};
var findAnswer = function (attempt) {
    return function (question) {
        return question.id === attempt.question && question.answers.some(function (answer) { return JSON.stringify(attempt.lines) === JSON.stringify(answer); });
    };
};
var polls = fs_1.default.readdirSync(path_1.default.join(__dirname, POLL_DIR))
    .reduce(function (acc, cur) { return acc.set(cur.replace('.json', ''), parsePoll(cur)); }, new Map());
app.get('/allpolls', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(polls));
});
app.get('/rndpoll/:poll', function (req, res) {
    var _a, _b, _c;
    res.setHeader('Content-Type', 'application/json');
    var poll = req.params["poll"];
    var rndPoll = (_a = polls.get(poll)) === null || _a === void 0 ? void 0 : _a[Math.floor(Math.random() * ((_c = (_b = polls.get(poll)) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0))];
    console.log(polls, poll, rndPoll);
    res.end(JSON.stringify(__assign(__assign({}, rndPoll), { answers: undefined, result: undefined })));
});
app.post('/result/:poll', function (req, res) {
    var _a;
    var attempt = req.body;
    var poll = req.params["poll"];
    var foundPoll = (_a = polls.get(poll)) === null || _a === void 0 ? void 0 : _a.find(findAnswer(attempt));
    res.end(JSON.stringify(foundPoll === null || foundPoll === void 0 ? void 0 : foundPoll.result));
});
