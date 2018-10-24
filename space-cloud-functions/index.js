const Engine = require('space-engine-node');
const MongoClient = require('mongodb').MongoClient;

// Create a new engine
const engine = new Engine('todo-engine');

// Connection URL
const url = 'mongodb://localhost';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function (err) {
  if (err) {
    console.log('Connection to server failed');
    process.exit(-1);
  }
  console.log('Connected successfully to server');
});

// Register the function
engine.registerFunc('getCount', (params, auth, cb) => {
  console.log('Params:', params, 'Auth', auth)

  client.db('todo-app').collection('todos').find({userId: auth.id}).count(function (err, count) {
    if (err) {
      cb('response', { ack: false })
      return
    }

    cb('response', { ack: true, count: count})
  })
})
