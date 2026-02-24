import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function getTemplate(templateData) {
  const templatePath = path.join(
    __dirname,
    '..',
    'email_forms',
    ...templateData.folderPath,
    templateData.currentTemplate,
    `${templateData.currentTemplate}.html`
  )
  const isTemplate = fs.existsSync(templatePath)
  const templateHtml = fs.readFileSync(templatePath, 'utf8');
  return { data: ['Hello Kitties!', templateData, isTemplate, templatePath, templateHtml] }
}

export default { getTemplate }
