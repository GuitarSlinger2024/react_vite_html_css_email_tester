import 'colors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function getTemplate(templateData) {
  const folderPath = path.join(
    __dirname,
    '..',
    'email_forms',
    ...templateData.folderPath,
    templateData.currentTemplate
  )
  const templatePath = path.join(
    folderPath,
    `${templateData.currentTemplate}.html`
  )

  //  Check that the template file exists - then get the file
  const isTemplate = fs.existsSync(templatePath)
  const originalHTML = fs.readFileSync(templatePath, 'utf8')

  //  Get the name of the image folder
  const imgFolderNames = ['images', '_img', '_imgs']
  const folderContents = fs.readdirSync(folderPath)
  const imageFolder = folderContents.filter(folder =>
    imgFolderNames.includes(folder)
  )[0]

  //  Get the HTML - init some variables3333333
  const old_template = originalHTML
  const new_template = null
  const images = {}

  let lastPos = 0
  while ((lastPos = originalHTML.indexOf('<img', lastPos)) !== -1) {
    let subString = originalHTML.substring(
      originalHTML.indexOf('src', lastPos) + 3
    )
    subString = subString.substring(subString.indexOf('"') + 1)
    subString = subString.substring(0, subString.indexOf('"'))

    const filePath = subString

    const subString2 = subString.split('/').pop()
    const imageName = `${subString2}`

    const image = path.join(folderPath, filePath)
    const file = fs.readFileSync(image, { encoding: 'utf8' })

    const ref = imageName.replace('.', '')
    images[ref] = { fileName: imageName, filePath: filePath, file }

    console.log(String(lastPos).blue)
    lastPos += 5
  }

   //  Planning to do the src in front end
  let templateHtml = originalHTML
  for (let x = 0; x < images.length; x++) {
    const fileName = images[x].fileName.split('.').join('')
    console.log(
      images[x]['filePath'].cyan,
      // path.join(folderPath, images[x][fileName].file)
    )
    templateHtml = templateHtml.replaceAll(
      images[x]['filePath'],
      path.join(folderPath, images[x]['filePath'])
    )
  }
  const data = {
    originalHTML,
    templateData,
    templatePath,
    imageData: {
      imageFolder,
      images,
    },
    Hello: 'kitties!',
  }

  console.log(data)

  return data
}

export default { getTemplate }
