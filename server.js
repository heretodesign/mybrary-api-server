if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express")
const app = express()
const mongoose = require('mongoose')
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")

const indexRouter = require("./routes/index")
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine', 'ejs')
app.set('views', __dirname + 'views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

mongoose.connect(process.env.DATABASE_URL, { 
        useNewUrlParser:true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true
    })
    .then(() => console.log('DB Connected'))
	.catch(err => console.log('DB CONNECTED ERROR: ', err))

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 5555)