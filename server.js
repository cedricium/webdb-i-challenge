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
    console.error(error)
    res.status(500).json({
      error: `Error occurred while attempting to get the accounts`
    })
  }
})

server.post('/api/accounts', async (req, res) => {
  const accountData = req.body
  try {
    const id = (await db('accounts').insert(accountData))[0]
    const account = await db('accounts').where({ id })
    console.log(account)
    res.status(201).json({ ...account })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: `Error occurred while attempting to add account`
    })
  }
})

module.exports = server;