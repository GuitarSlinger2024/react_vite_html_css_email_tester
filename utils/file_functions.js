import path from 'path'
import { readFile } from 'fs/promises'
import { writeFile } from 'fs'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//  Set CHANGE_DATABASE to true to change the actual notes.json file.
//  When set to false, the FAKE_DATABASE resets every time the server re-starts.
const CHANGE_DATABASE = false
let FAKE_DATABASE
//  More than one database can be created with each database name being passed as a parameter
const DATABASE_NAME = 'data'

//  Helper functions to read & update the JSON file
async function getAllData() {
  if (FAKE_DATABASE && !CHANGE_DATABASE) return FAKE_DATABASE
  return JSON.parse(
    await readFile(
      path.join(__dirname, '..', 'database', `${DATABASE_NAME}.json`)
    )
  )
}

//  FAKE_DATABASE must be decalared before getAllData(), but it
//  can't be given it's value untill after getAllData() is run.
FAKE_DATABASE = getAllData()

async function getSingleItem(id) {
  console.log(id)
  const DATA = await getAllData()
  const data = DATA.find(item => +item.id === +id)
  return data
}

async function addData(data) {
  const DATA = await getAllData()
  const id = DATA.length > 0 ? DATA[DATA.length - 1].id + 1 : 1
  // const stamp = Date.now()
  const newItem = {
    id: id,
    // timestamp: stamp,
    ...data,
  }
  DATA.push(newItem)
  writeToJson(DATA)
  return DATA
}

async function deleteItem(id) {
  // let DATA
  // DATA = await getAllData()
  // DATA = DATA.filter(note => note.id !== +id)

  DATA = await getAllData()
  const item = await getSingleItem(+id)
  const index = DATA.indexOf(item)
  console.log(index, item)
  DATA.splice(index, 1)

  //  rturn the current data
  await writeToJson(DATA)
  return DATA
}

async function updateItem({ id: id, newData: newData }) {
  console.log(id, newData)
  let DATA
  DATA = await getAllData()
  DATA = DATA.map(note => {
    if (+note.id !== +id) return note
    return {
      ...note,
      ...newData,
    }
  })
  // return {id, content, DATA}
  DATA = await writeToJson(DATA)
  return DATA
}

async function updateAll(allData) {
  console.log(allData)
  // return {id, content, DATA}
  writeToJson(allData)
  return allData
}

async function writeToJson(data) {
  FAKE_DATABASE = data
  if (CHANGE_DATABASE) {
    writeFile(
      path.join(__dirname, '..', 'database', `${DATABASE_NAME}.json`),
      JSON.stringify(data),
      'utf8',
      () => {
        console.log('data was written'.america)
      }
    )
  }
  return data
}

export default { getAllData, getSingleItem, addData, deleteItem, updateItem, updateAll }
