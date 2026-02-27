import 'colors'
import fs from 'fs'
import path from 'path'
import mime from 'mime'
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
  let templateHtml = originalHTML
  while ((lastPos = originalHTML.indexOf('<img', lastPos)) !== -1) {
    let subString = originalHTML.substring(
      originalHTML.indexOf('src', lastPos) + 3
    )
    subString = subString.substring(subString.indexOf('"') + 1)
    subString = subString.substring(0, subString.indexOf('"'))

    const filePath = subString

    const subString2 = subString.split('/').pop()
    const imageName = `${subString2}`
    
    const imagePath = path.join(folderPath, filePath)
    const file = fs.readFileSync(imagePath)
    const file64 = Buffer.from(file).toString('base64')
    let mime_type = mime.getType(imagePath)
    // mime_type = 'image/png'

    console.log(mime_type.rainbow)

    templateHtml = templateHtml.replace(filePath, `data:${mime_type};base64,${file64}`)

    const ref = imageName.replace('.', '')
    images[ref] = { fileName: imageName, filePath: filePath, file64 }

    console.log(String(lastPos).blue)
    lastPos += 5
  }

  //  //  Planning to do the src in front end
  // let templateHtml = originalHTML
  // for (let x = 0; x < images.length; x++) {
  //   const fileName = images[x].fileName.split('.').join('')
  //   // console.log(
  //   //   images[x]['filePath'].cyan,
  //   //   path.join(folderPath, images[x][fileName].file64)
  //   // )
  //   console.log(String(templateHtml.strpos(images[x]['filePath'])).red)
  //   templateHtml = templateHtml.replaceAll(
  //     images[x]['filePath'],
  //     path.join(folderPath, `data"[image/png;base64,${images[x]['filePath']}`)
  //   )
  // }

  const data = {
    folderPath,
    originalHTML,
    templateHtml,
    templateData,
    templatePath,
    imageData: {
      imageFolder,
      images,
    },
    Hello: 'kitties!',
  }

  // console.log(images)

  return data
}

export default { getTemplate }
