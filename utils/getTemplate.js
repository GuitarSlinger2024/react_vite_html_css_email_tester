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
  const templateHtml = fs.readFileSync(templatePath, 'utf8')

  //  Get the name of the image folder
  const imgFolderNames = ['images', '_img', '_imgs']
  const folderContents = fs.readdirSync(folderPath)
  const imageFolder = folderContents.filter(folder =>
    imgFolderNames.includes(folder)
  )[0]

  //  Get the HTML - init some variables
  const old_template = templateHtml
  const new_template = null
  const images = []

  let lastPos = 0
  while ((lastPos = templateHtml.indexOf('<img', lastPos)) !== -1) {
    let subString = templateHtml.substring(
      templateHtml.indexOf('src', lastPos) + 3
    )
    subString = subString.substring(subString.indexOf('"') + 1)
    subString = subString.substring(0, subString.indexOf('"'))

    const filePath = subString

    const subString2 = subString.split('/').pop()
    const imageName = `${subString2}`

    images.push({ fileName: imageName, filePath: filePath })

    lastPos += 5
  }

  let newTemplate = templateHtml
  for (let x = 0; x < images.length; x++) {
    const reference = '"image_' + (x + 1) + '"'
    newTemplate = newTemplate.replaceAll(
      images[x]['full_name'],
      '"cid:' + reference,
      
    )
    images[x]['reference'] = reference
  }

  return {
    html: {
      templateHtml,
      newTemplate,
      templateData,
    },
    folderData: {
      templatePath,
      imageFolder,
      images,
      folderContents,
    },
    'Hello': 'kitties!'
  }
}

export default { getTemplate }
