const express = require('express')
const app = express()
const cors = require('cors'); 
// const admin = require("firebase-admin");
require('dotenv').config(); // env for
const { MongoClient } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId; //delete for

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l2jwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);

const uri = "mongodb+srv://<username>:<password>@cluster0.l2jwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('Hello World! server1')
  })



  async function run() {
    try {
        await client.connect();
            const database = client.db('carzon');
            const carCollection = database.collection('cars');
            const ordersCollection = database.collection('orders');
            const testimonialCollection = database.collection("testimonials");
            const usersCollection = database.collection('users');


const cars =

[
    {
      "_id": "617e2b40f60eeb26cc958a61",
      "id": 1,
      "username": "Smith Watson",
      "image": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      "rating": "3.5",
      "review": "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. Man bun next level coloring book skateboard four loko knausgaard. Kitsch keffiyeh master cleanse direct trade indigo juice before they sold out gentrify plaid gastropub normcore XOXO 90's pickled cindigo jean shorts. Slow-carb next level shoindigoitch ethical authentic, yr scenester sriracha forage franzen organic drinking vinegar."
    },
    {
      "_id": "617e2b40f60eeb26cc958a62",
      "id": 2,
      "username": "Morese Sharpe",
      "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      "rating": "5",
      "review": "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. Man bun next level coloring book skateboard four loko knausgaard. Kitsch keffiyeh master cleanse direct trade indigo juice before they sold out gentrify plaid gastropub normcore XOXO 90's pickled cindigo jean shorts. Slow-carb next level shoindigoitch ethical authentic, yr scenester sriracha forage franzen organic drinking vinegar."
    },
    {
      "_id": "617e2b40f60eeb26cc958a63",
      "id": 3,
      "username": "Tom Williams",
      "image": "https://images.unsplash.com/photo-1614436163996-25cee5f54290?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      "rating": "4.5",
      "review": "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. Man bun next level coloring book skateboard four loko knausgaard. Kitsch keffiyeh master cleanse direct trade indigo juice before they sold out gentrify plaid gastropub normcore XOXO 90's pickled cindigo jean shorts. Slow-carb next level shoindigoitch ethical authentic, yr scenester sriracha forage franzen organic drinking vinegar."
    },
    {
      "_id": "617e2b40f60eeb26cc958a64",
      "id": 4,
      "username": "Bradley Greer",
      "image": "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHVzZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      "rating": "5",
      "review": "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. Man bun next level coloring book skateboard four loko knausgaard. Kitsch keffiyeh master cleanse direct trade indigo juice before they sold out gentrify plaid gastropub normcore XOXO 90's pickled cindigo jean shorts. Slow-carb next level shoindigoitch ethical authentic, yr scenester sriracha forage franzen organic drinking vinegar."
    },
    {
      "_id": "617e2b40f60eeb26cc958a65",
      "id": 5,
      "username": "Losis Bla",
      "image": "https://images.unsplash.com/photo-1528892952291-009c663ce843?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHVzZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      "rating": "3",
      "review": "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. Man bun next level coloring book skateboard four loko knausgaard. Kitsch keffiyeh master cleanse direct trade indigo juice before they sold out gentrify plaid gastropub normcore XOXO 90's pickled cindigo jean shorts. Slow-carb next level shoindigoitch ethical authentic, yr scenester sriracha forage franzen organic drinking vinegar."
    },
    {
      "_id": "617e2b40f60eeb26cc958a66",
      "id": 6,
      "username": "Angelica Ramos",
      "image": "https://images.unsplash.com/photo-1587614382231-d1590f0039e7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHVzZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      "rating": "4",
      "review": "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. Man bun next level coloring book skateboard four loko knausgaard. Kitsch keffiyeh master cleanse direct trade indigo juice before they sold out gentrify plaid gastropub normcore XOXO 90's pickled cindigo jean shorts. Slow-carb next level shoindigoitch ethical authentic, yr scenester sriracha forage franzen organic drinking vinegar."
    }
  ]
  const result = await testimonialCollection.insertMany(cars);
  console.log(result, "database insert");
    



}
finally {
    await client.close();
}
}

run().catch(console.dir)
//run the server
app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
})
