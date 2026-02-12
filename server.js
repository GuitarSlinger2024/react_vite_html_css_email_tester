require('colors')
const express = require('express')
const path = require('path')
const cors = require('cors')
const { readFile, writeFileSync } = require('fs')
const bodyParser = require('body-parser')
const DATABASE = require('./utils/file_functions')


const app = express()
const PORT = process.env.PORT || 8180

app.use(express.json())
// serve up production assets
app.use(express.static(path.join(__dirname, 'client', 'dist')))
// let the react app to handle any unknown routes
// serve up the index.html if express does'nt recognize the route
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.post('/getAddresses', async (req, res) => {
  const emailAddresses = await DATABASE.getAllData()
  res.json(emailAddresses)
})

app.post('/updateAddresses', async (req, res) => {
  emailOptions = req.body.emailOptions
  console.log(emailOptions)
  await DATABASE.updateAll(emailOptions)
  res.json(emailOptions)
})


app.listen(PORT, () => console.log(`Listening at: ${PORT}`))