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

  const relativePath = path.join(
    'email_forms',
    ...templateData.folderPath,
    templateData.currentTemplate,
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
  const images = []

  let lastPos = 0
  while ((lastPos = originalHTML.indexOf('<img', lastPos)) !== -1) {
    let subString = originalHTML.substring(
      originalHTML.indexOf('src', lastPos) + 3
    )
    subString = subString.substring(subString.indexOf('"') + 1)  //  just after first double-quotes
    subString = subString.substring(0, subString.indexOf('"'))  //  just

    const filePath = subString

    const subString2 = subString.split('/').pop()
    const imageName = `${subString2}`

    const image = path.join(__dirname, '..', filePath)
    // const file = fs.readFileSync(image, {encoding:'utf8'})

    images.push({ fileName: imageName, filePath: filePath })

    console.log(lastPos)
    lastPos += 5
  }

  let templateHtml = originalHTML
  for (let x = 0; x < images.length; x++) {
    console.log(
      images[x]['filePath'].cyan,
      path.join(images[x]['filePath'])
    )
    templateHtml = templateHtml.replaceAll(
      images[x]['filePath'],
      path.join(images[x]['filePath'])
    )
    // console.log(
    //   images[x]['filePath'].cyan,
    //   path.join(folderPath, images[x]['filePath'])
    // )
    // templateHtml = templateHtml.replaceAll(
    //   images[x]['filePath'],
    //   path.join(folderPath, images[x]['filePath'])
    // )
  }

  return {originalHTML,
    relativePath,
    templatePath,
    old_template,
    templateHtml,
    templateData,
    folderData: {
      templatePath,
      imageFolder,
      images,
      folderContents,
    },
    Hello: 'kitties!',
  }
}

export default { getTemplate }
