import express, { Request, Response } from 'express'
import { getEffectiveTypeParameterDeclarations } from 'typescript'
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

//object interface for adding properties to db
interface Property {
    address: string
    price_per_week: number
    subtitle: string
    bedrooms: number
    bathrooms: number
    image: string
    fullyFenced: boolean
    petFriendly: boolean
    facingDirection: string
    driveway: boolean
    parking: number
}

const propertiesToAdd: Property[] = [
    {
        address: "471 Okahu Street Mount Eden, 1023",
        price_per_week: 850,
        subtitle: "Love working from home",
        bedrooms: 3,
        bathrooms: 1,
        image: './images/houses/house1.png',
        fullyFenced: false,
        petFriendly: true,
        facingDirection: "north",
        driveway: true,
        parking: 2,
    },
    {
        address: "277 Broadway, Newmarket, 1023",
        price_per_week: 1250,
        subtitle: "Broadway, baby.",
        bedrooms: 1,
        bathrooms: 4,
        image: './images/houses/house2.png',
        fullyFenced: false,
        petFriendly: false,
        facingDirection: "south",
        driveway: false,
        parking: 1,
    },
    {
        address: "42 Seacliffe Road, Hillsborough, 1042",
        price_per_week: 999,
        subtitle: "Beautiful beach view!",
        bedrooms: 5,
        bathrooms: 2,
        image: './images/houses/house3.png',
        fullyFenced: true,
        petFriendly: true,
        facingDirection: "north",
        driveway: true,
        parking: 2,
    },
    {
        address: "1/118 Asquith Avenue, Mount Albert, 1025",
        price_per_week: 1050,
        subtitle: "Very nice",
        bedrooms: 5,
        bathrooms: 2,
        image: './images/houses/house4.png',
        fullyFenced: false,
        petFriendly: true,
        facingDirection: "east",
        driveway: false,
        parking: 1,
    },
    {
        address: "73 Morningside Drive, Mount Albert, 1025",
        price_per_week: 780,
        subtitle: "Extremely chill",
        bedrooms: 2,
        bathrooms: 2,
        image: './images/houses/house5.png',
        fullyFenced: false,
        petFriendly: true,
        facingDirection: "north",
        driveway: false,
        parking: 1,
    },
]


app.get('/', (req: Request, res: Response): void => {
    res.send('Mission 6 API')
})

app.get('/api/products', (req: Request, res: Response): void => {
    db.collection('dummy').find({}).toArray((err: any, result: any) => {
        if (err) throw err
        res.send(result)
    })
    
})

app.get('/api/properties', (req: Request, res: Response): void => {
    db.collection('properties').find({}).toArray((err: unknown, result: unknown) => {
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

