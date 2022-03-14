import express, { Request, Response } from 'express'
const app = express()
const port = 3001
const mongoose = require('mongoose')
require('dotenv').config()

// define mongo url and connect to DB 
const mongo_url: string = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.mzjzk.mongodb.net/mission6?retryWrites=true&w=majority` 

mongoose.connect(mongo_url)
.then((res: any) => console.log('Connected to DB'))
.catch((err: any) => console.log({error: err}))

const db = mongoose.connection


app.get('/', (req: Request, res: Response): void => {
    res.send('Hello world!')
})

db.collection('dummy').insertOne({house: 'mine'})


app.listen(port, () : void => {
    console.log(`Server is listening on port ${port}`)
})

