"use strict";
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
const propertiesToAdd = [
    {
        address: "471 Okahu Street Mount Eden, 1023",
        price_per_week: 850,
        subtitle: "Love working from home",
        description: 'Home to live in',
        bedrooms: 3,
        bathrooms: 1,
        image: './images/houses/house1.png',
        subimages: ['./images/houses/interior1.png', './images/houses/interior2.png', './images/houses/interior3.jpg', './images/houses/interior4.jpg'],
        fullyFenced: false,
        petFriendly: true,
        facingDirection: "north",
        driveway: true,
        parking: 2,
        propertyManager: 'Darrel Steward',
        propertyManagerEmail: 'darrelsteward@aucklandprop.co.nz',
        propertyManagerPhone: '0210815959'
    },
    {
        address: "277 Broadway, Newmarket, 1023",
        price_per_week: 1250,
        subtitle: "Broadway, baby.",
        description: 'Home to live in',
        bedrooms: 1,
        bathrooms: 4,
        image: './images/houses/house2.png',
        subimages: ['./images/houses/interior1.png', './images/houses/interior2.png', './images/houses/interior3.jpg', './images/houses/interior4.jpg'],
        fullyFenced: false,
        petFriendly: false,
        facingDirection: "south",
        driveway: false,
        parking: 1,
        propertyManager: 'Darrel Steward',
        propertyManagerEmail: 'darrelsteward@aucklandprop.co.nz',
        propertyManagerPhone: '0210815959'
    },
    {
        address: "42 Seacliffe Road, Hillsborough, 1042",
        price_per_week: 999,
        subtitle: "Beautiful beach view!",
        description: 'Home to live in',
        bedrooms: 5,
        bathrooms: 2,
        image: './images/houses/house3.png',
        subimages: ['./images/houses/interior1.png', './images/houses/interior2.png', './images/houses/interior3.jpg', './images/houses/interior4.jpg'],
        fullyFenced: true,
        petFriendly: true,
        facingDirection: "north",
        driveway: true,
        parking: 2,
        propertyManager: 'Darrel Steward',
        propertyManagerEmail: 'darrelsteward@aucklandprop.co.nz',
        propertyManagerPhone: '0210815959'
    },
    {
        address: "1/118 Asquith Avenue, Mount Albert, 1025",
        price_per_week: 1050,
        subtitle: "Very nice",
        description: 'Home to live in',
        bedrooms: 5,
        bathrooms: 2,
        image: './images/houses/house4.png',
        subimages: ['./images/houses/interior1.png', './images/houses/interior2.png', './images/houses/interior3.jpg', './images/houses/interior4.jpg'],
        fullyFenced: false,
        petFriendly: true,
        facingDirection: "east",
        driveway: false,
        parking: 1,
        propertyManager: 'Darrel Steward',
        propertyManagerEmail: 'darrelsteward@aucklandprop.co.nz',
        propertyManagerPhone: '0210815959'
    },
    {
        address: "73 Morningside Drive, Mount Albert, 1025",
        price_per_week: 780,
        subtitle: "Extremely chill",
        description: 'Home to live in',
        bedrooms: 2,
        bathrooms: 2,
        image: './images/houses/house5.png',
        subimages: ['./images/houses/interior1.png', './images/houses/interior2.png', './images/houses/interior3.jpg', './images/houses/interior4.jpg'],
        fullyFenced: false,
        petFriendly: true,
        facingDirection: "north",
        driveway: false,
        parking: 1,
        propertyManager: 'Darrel Steward',
        propertyManagerEmail: 'darrelsteward@aucklandprop.co.nz',
        propertyManagerPhone: '0210815959'
    },
];
db.collection('properties').insert(propertiesToAdd)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
app.get('/', (req, res) => {
    res.send('Mission 6 API');
});
app.get('/api/products', (req, res) => {
    db.collection('dummy').find({}).toArray((err, result) => {
        if (err)
            throw err;
        res.send(result);
    });
});
app.get('/api/properties', (req, res) => {
    db.collection('properties').find({}).toArray((err, result) => {
        if (err)
            throw err;
        res.send(result);
    });
});
app.get('/test', (req, res) => {
    res.send('hola ');
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
