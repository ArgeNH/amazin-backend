"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.set('port', process.env.PORT || 3000);
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/ping', (_req, res) => {
    res.send('pong');
});
//app listen
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
