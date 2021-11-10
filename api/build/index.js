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
var app = (0, express_1.default)();
var port = 9999;
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
var cors = require('cors');
app.use(cors());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express_1.default.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express_1.default.json());
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
var getRandStr = function () { return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5); };
var polls = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, 'polls.json'), 'utf-8')).map(function (poll) { return (__assign(__assign({}, poll), { id: getRandStr() })); });
app.get('/allpolls', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(polls));
});
app.get('/rndpoll', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var rndPoll = polls[Math.floor(Math.random() * polls.length)];
    res.end(JSON.stringify(__assign(__assign({}, rndPoll), { answers: undefined, result: undefined })));
});
app.post('/result', function (req, res) {
    var attempt = req.body;
    var foundPoll = polls.find(function (poll) { return poll.id === attempt.id; });
    res.end(foundPoll === null || foundPoll === void 0 ? void 0 : foundPoll.result);
});
