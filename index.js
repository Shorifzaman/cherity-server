const express = require('express');
const cors = require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l2jwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const app = express();
app.use(express.json());
app.use(cors());


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    // const database = client.db('cherity');
    // const donateCollection = database.collection('donatecauses');
    // const ordersCollection = database.collection('orders');
    // const testimonialCollection = database.collection("testimonials");
    // const usersCollection = database.collection('users');



    // service api
    const donateCollection = client.db("cherity").collection("donatecauses");
    app.post('/addService', (req, res) => {
        donateCollection.insertOne(req.body)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })
    app.get('/services', (req, res) => {
        donateCollection.find({})
            .toArray((error, documents) => {
                res.send(documents)
            })
    })
    app.delete('/delete/:id', (req, res) => {
        donateCollection.findOneAndDelete({ _id: ObjectId(req.params.id) })
            .then(response => {
                res.send(response.ok > 0);
            })
    })
    app.get('/service/:title', (req, res) => {
        donateCollection.find({ title: req.params.title })
            .toArray((error, documents) => {
                res.send(documents)
            })
    })
    // add admin api
    const adminCollection = client.db("cherity").collection("admin");
    app.post('/addAdmin', (req, res) => {
        adminCollection.insertOne(req.body)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })
    // find admin or not
    app.post('/admin', (req, res) => {
        const email = req.body.email
        adminCollection.find({ email: email })
            .toArray((err, data) => {
                res.send(data.length > 0)
            })
    })
    // order api
    const orderCollection = client.db("cherity").collection("orders");
    // add new order
    app.post('/addOrder', (req, res) => {
        orderCollection.insertOne(req.body)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })
    // all orders
    app.get('/allOrders', (req, res) => {
        orderCollection.find({})
            .toArray((error, documents) => {
                res.send(documents)
            })
    })
    // individual orders
    app.post('/orders', (req, res) => {
        const email = req.body.email
        orderCollection.find({ email: email })
            .toArray((error, documents) => {
                res.send(documents)
            })
    })
    //update order status 
    app.patch('/update/:id', (req, res) => {
        const toUpdate = req.body;
        orderCollection.updateOne({ _id: ObjectId(req.params.id) },
            { $set: toUpdate, $currentDate: { lastModified: true } })
            .then(result => {
                res.send(result.modifiedCount > 0)
            })
            .catch(err => {
                console.log('Failed to update');
            })
    })
    // review api
    const reviewCollection = client.db("cherity").collection("reviews");
    app.post('/addReview', (req, res) => {
        reviewCollection.insertOne(req.body)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })
    app.get('/reviews', (req, res) => {
        reviewCollection.find({})
            .toArray((error, documents) => {
                res.send(documents)
            })
    })
});

const port = 5000;
app.listen(process.env.PORT || port);