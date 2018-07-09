const express = require('express');
const app = express();
const koalaRouter = require('./routes/koala');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;


const mongoose = require('mongoose');
const databaseUrl = process.env.MONGODB_URI ||'mongodb://localhost:27017/koalaholla'
// Configure body-parser for Angular and jQuery

mongoose.connect(databaseUrl);

mongoose.connection.on('connected', ()=>{
    console.log('mongoose connected to', databaseUrl);
});

mongoose.connection.on('error', (error)=>{
  console.log('mongoose has failed with this error code', error);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // This line is required for Angular
app.use('/koala', koalaRouter);
// // Routes
// // Should these be in a router?

// // POST
// app.post('/koala', (req, res) => {
//   console.log('POST to /koala req.body =', req.body);
// });

// // GET
// app.get('/koala', (req, res) => {
//   // Temporary mock data. Replace this with mongoose.
//   const mockData = [{ _id: 1, name: 'Mock 1', gender: 'F', age: 5, ready_to_transfer: true, notes: 'n/a' },
//                     { _id: 2, name: 'Mock 2', gender: 'M', age: 5, ready_to_transfer: false, notes: 'n/a' }]
//   res.send(mockData);
// })

// Static files
app.use(express.static('server/public'));

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
