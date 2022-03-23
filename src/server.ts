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

//object interface for adding properties to db
interface Property {
    address: string
    pricePerWeek: number
    subtitle: string
    description: string
    bedrooms: number
    bathrooms: number
    image: string
    subimages: string[]
    fullyFenced: boolean
    petFriendly: boolean
    facingDirection: string
    driveway: boolean
    parking: number
    propertyManager: string
    propertyManagerEmail: string
    propertyManagerPhone: string
    distanceFromPark: number
    distanceFromGrocery: number
    distanceFromSchool: number
}

const propertiesToAdd: Property[] = [
    {
        address: "471 Okahu Street Mount Eden, 1023",
        pricePerWeek: 850,
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
        propertyManagerPhone: '0210815959',
        distanceFromPark: 1000,
        distanceFromGrocery: 3400,
        distanceFromSchool: 400,
    },
    {
        address: "277 Broadway, Newmarket, 1023",
        pricePerWeek: 1250,
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
        propertyManagerPhone: '0210815959',
        distanceFromPark: 300,
        distanceFromGrocery: 200,
        distanceFromSchool: 900,
    },
    {
        address: "42 Seacliffe Road, Hillsborough, 1042",
        pricePerWeek: 999,
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
        propertyManagerPhone: '0210815959',
        distanceFromPark: 1500,
        distanceFromGrocery: 6000,
        distanceFromSchool: 8000,
    },
    {
        address: "1/118 Asquith Avenue, Mount Albert, 1025",
        pricePerWeek: 1050,
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
        propertyManagerPhone: '0210815959',
        distanceFromPark: 2000,
        distanceFromGrocery: 1200,
        distanceFromSchool: 5500,
    },
    {
        address: "73 Morningside Drive, Mount Albert, 1025",
        pricePerWeek: 780,
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
        propertyManagerPhone: '0210815959',
        distanceFromPark: 300,
        distanceFromGrocery: 900,
        distanceFromSchool: 300,
    }
]

// db.collection('properties').insert(propertiesToAdd)
// .then((res: unknown) => console.log(res))
// .catch((err: unknown) => console.log(err))


app.get('/', (req: Request, res: Response): void => {
    res.send('Mission 6 API')
})

app.get('/api/products', (req: Request, res: Response): void => {
    db.collection('dummy').find({}).toArray((err: any, result: any) => {
        if (err) throw err
        res.send(result)
    })
    
})

app.post('/api/properties/query',  (req: Request, res: Response): void => {
    const query = req.body.query
    console.log(query)
    db.collection('properties').find(query).toArray((err: unknown, result: unknown) => {
        if (err) console.log(err)
        console.log(result)
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

