"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 4000;
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
//middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors());
// define mongo url and connect to DB 
const mongo_url = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.mzjzk.mongodb.net/mission6?retryWrites=true&w=majority`;
mongoose.connect(mongo_url)
    .then((res) => console.log('Connected to DB'))
    .catch((err) => console.log({ error: err }));
const db = mongoose.connection;
app.get('/', (req, res) => {
    res.send('Mission 6 API');
});
app.get('/api/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.collection('dummy').find({}).toArray((err, result) => {
        if (err)
            throw err;
        return res.send(result);
    });
}));
app.get('/test', (req, res) => {
    res.send('hola ');
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
