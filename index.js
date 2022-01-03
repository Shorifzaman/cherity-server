const express = require('express')
const app = express()
const cors = require('cors'); 
require('dotenv').config(); // env for

const ObjectId = require('mongodb').ObjectId; //delete for
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l2jwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {

            const database = client.db('carzon');
            
            const carCollection = database.collection('cars');
            const bookingsCollection = database.collection('orders');
            const testimonialCollection = database.collection("testimonials");
            const usersCollection = database.collection('users');



    // ==============GET API ==================== 
//GET API
app.get('/', (req, res) => {
    res.send('Welcome to carzon');
})

//GET API (Tours Package)
app.get('/tours', async (req, res) => {
    const result = await carCollection.find({}).toArray();
    res.send(result);
})

//GET API (users Package)
app.get('/users', async (req, res) => {
    const result = await usersCollection.find({}).toArray();
    res.send(result);
})




//GET API (Bookings)
app.get('/bookings', async (req, res) => {
    let query = {}
    const email = req.query.email;
    if(email){
        query ={email: email}
    }
    const result = await bookingsCollection.find(query).toArray();
    res.send(result);
})

//GET Dynamic (Bookings)
app.get('/bookings/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await bookingsCollection.findOne(query);
    res.send(result);
})

//GET Dynamic (Tours)\
app.get('/tours/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await carCollection.findOne(query);
    res.send(result);
})

//GET (testimonials)
app.get('/testimonials', async (req, res) => {
    const result = await testimonialCollection.find({}).toArray();
    res.send(result);
})

// review
app.post("/addSReview", async (req, res) => {
    const result = await testimonialCollection.insertOne(req.body);
    res.send(result);
  });

// ==========================POST API========================= 
//POST API (Tours Package)
app.post('/tours', async (req, res) => {
    const newTours = req.body;
    const result = await carCollection.insertOne(newTours);
    res.send(result);
})

//POST API (Bookings )
app.post('/bookings', async (req, res) => {
    const newBooking = req.body;
    const result = await bookingsCollection.insertOne(newBooking);
    res.send(result);
})

// ======================DELETE API ======================== 
//DELETE API(Bookings)
app.delete('/bookings/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await bookingsCollection.deleteOne(query);
    res.send(result);
})
//DELETE API(Bookings)
// app.delete('/tours/:id', async (req, res) => {
//     const id = req.params.id;
//     const query = { _id: ObjectId(id) };
//     const result = await carCollection.deleteOne(query);
//     res.send(result);
// })



app.delete("/tours/:id", (req, res) => {
    carCollection.deleteOne({ _id: ObjectId(req.params.id) })
        .then(result => {
            console.log(result, " delated car one ");

            res.send(result.deletedCount > 0);


        })
})

// =================Update API====================

//Update tours
// app.put('/tours/:id', async (req, res) => {
//     const id = req.params.id;
//     const newStatus = req.body;
//     const query = { _id: ObjectId(id) };
//     const options = { upsert: true };
//     const updateDoc = {
//         $set: {
//             data: newStatus.newData
//         }
//     }
//     const result = await carCollection.updateOne(query, updateDoc, options);
//     res.send(result);
// })

// update
app.patch('/tours/:id', (req, res) => {
    console.log(req.body.price)
    carCollection.updateOne({ _id: ObjectId(req.params.id) },
        {
            $set: { price: req.body.price,  name: req.body.name,}
        })
        .then(result => {
            res.send(result.modifiedCount > 0)
        })
})



//bookings updete
app.put('/bookings/:id', async (req, res) => {
    const id = req.params.id;
    const newStatus = req.body;
    const query = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
        $set: {
            data: newStatus.newData
        }
    }
    const result = await bookingsCollection.updateOne(query, updateDoc, options);
    res.send(result);
})


// =================Admin API====================

//insertOne user OK
app.post('/users', async (req, res) => {
    const user = req.body;
    const result = await usersCollection.insertOne(user);
    console.log(result);
    res.json(result);
});




  // check admin or not
  app.get("/users/:email", async (req, res) => {
    const result = await usersCollection
      .find({ email: req.params.email })
      .toArray();
    console.log(result);
    res.send(result);
  });

 //  make admin ok

 app.put("/makeAdmin", async (req, res) => {
    const filter = { email: req.body.email };
    const result = await usersCollection.find(filter).toArray();
    if (result) {
      const documents = await usersCollection.updateOne(filter, {
        $set: { role: "admin" },
      });
      console.log(documents);
    }
    // else {
    //   
    // }

    // console.log(result);
  });
  
  
  


});

//run the server
app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
})