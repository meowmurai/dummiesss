import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import handlebars from 'express-handlebars'

import 'dotenv/config.js';
import route from './routes/index.js';


// connect to database
(async () => {
    try {
        await mongoose.connect('mongodb+srv://lammn:1234@lammnuet-cluster.onrvl.mongodb.net/mern-it?retryWrites=true&w=majority')
        console.log('Connected to database')
    } catch (error) {
        console.log('asd')
        console.log(error.message)
        process.exit(1)
    }
})()
// connect to aws s3

const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// app.use(cors());
app.use(cookieParser());

// config static file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'public')))

// template engine
app.engine('hbs', handlebars({
    extname: 'hbs',
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// route init
route(app)

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log('Server is running', `http://localhost:${port}`)
})