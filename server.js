const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

var db, collection;

const url = 'mongodb+srv://db_restaurant:db_restaurant@cluster0.taw0is4.mongodb.net/?retryWrites=true&w=majority';
const dbName = "demo";

// Make the server run on the chosen port
app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },
        (error, client) => {
            if (error) {
                throw error;
            }
            db = client.db(dbName)
            console.log(`Connected to ${dbName}!`);
        })
})



app.get('/', (req, res) => {
    db.collection('rate').find().toArray((err, result) => {
        if (err) return console.log(err);
        res.render('index.ejs', { rate: result })
        console.log(result);
    })
})

app.post('/rate', (req, res) => {
    db.collection("rate").insertOne({ nameOfRestaurant: req.body.nameOfRestaurant, foodQuality: req.body.foodQuality, hygiene: req.body.hygiene, cost: req.body.cost, customerService: req.body.customerService, comments: req.body.comments, numberOfRaters: 1 }, (err, result) => {
        if (err) return console.log(err);
        console.log('Rating saved to database');
        res.redirect('/')
    })
})



