"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var app = (0, express_1.default)();
var port = 3000;
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
var pollsFilePath = path_1.default.join(__dirname, 'polls.json');
app.get('/polls', function (req, res) {
    var readable = fs_1.default.createReadStream(pollsFilePath);
    readable.pipe(res);
});
