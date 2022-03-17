import express, { Request, Response } from 'express'
const app = express()
const port = 4000
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


// define mongo url and connect to DB 
const mongo_url: string = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.mzjzk.mongodb.net/mission6?retryWrites=true&w=majority` 

mongoose.connect(mongo_url)
.then((res: any) => console.log('Connected to DB'))
.catch((err: any) => console.log({error: err}))

const db = mongoose.connection

//object type for when adding products to DB
type Product = {
    productName: string,
    productDescription: string,
    price: number,
    inStock: boolean
}

app.get('/', (req: Request, res: Response): void => {
    res.send('Mission 6 API')
})

app.get('/api/products', async (req: Request, res: Response): Promise<void> => {
    await db.collection('dummy').find({}).toArray((err: any, result: any) => {
        if (err) throw err
        res.send(result)
    })
})

app.get('/test', (req, res) => {
    res.send('hola ')
})

app.listen(port, () : void => {
    console.log(`Server is listening on port ${port}`)
})

