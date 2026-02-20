require('colors')
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const DATABASE = require('./utils/file_functions')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 8180

app.use(express.json())
// serve up production assets
app.use(express.static(path.join(__dirname, 'client', 'dist')))
// let the react app to handle any unknown routes
// serve up the index.html if express does'nt recognize the route
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.json({health: 'good'})
})

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

app.post('/getTemplates', async (req, res) => {
  const fileTree = {}
  const objectPath = ['email_forms']
  createFileTree(fileTree, objectPath)

  //  This should be recursive
  async function createFileTree(fileBranch, currentObjectPath) {
    const pathText = path.join('./', ...currentObjectPath)

    const files = await getAllFiles(pathText)

    files.forEach(async fileName => {

      //  Is there an HTML file with a matching file name (plus the .html)
      const folderIncludesMatchingTitle = files.findIndex(file => {
        return Boolean(
          file.replace('.html', '') ===
            currentObjectPath[currentObjectPath.length - 1]
        )
      })

      const newPath = [...currentObjectPath, fileName]
      let stats = fs.statSync(path.join(...newPath))

      if (folderIncludesMatchingTitle > -1) {
        fileBranch[currentObjectPath[currentObjectPath.length - 1]] = [...files]
        console.log(files[folderIncludesMatchingTitle])
      }

      if (stats.isDirectory() && folderIncludesMatchingTitle === -1) {
        if (!fileBranch[fileName]) fileBranch[fileName] = {}
        return await createFileTree(fileBranch[fileName], newPath)
      } 
    })
  }

  async function getAllFiles(filePath) {
    return fs.readdirSync(filePath, (err, files) => {
      if (err) {
        console.log(err)
      } else {
        console.log('getAllFiles()'.red, files)
        return files
      }
    })
  }

  async function doesFileExist(fileLoc) {
    return new Promise(r => fs.access(fileLoc, fs.constants.F_OK, e => r(!e)))
  }

  setTimeout(() => {
    console.log('FILE TREE ARRAY'.red.inverse)
    console.log(fileTree)
    res.json(fileTree)
  }, 1000)
})

app.listen(PORT, () => console.log(`Listening at: ${PORT}`))
