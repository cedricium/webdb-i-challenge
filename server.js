const express = require('express');
const db = require('./data/dbConfig.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.json({ message: `Hello, world!` })
})

server.get('/api/accounts', async (req, res) => {
  try {
    const accounts = await db('accounts')
    res.json(accounts)
  } catch (error) {
    res.status(500).json({
      error: `Error occurred while attempting to get the accounts`
    })
  }
})

module.exports = server;