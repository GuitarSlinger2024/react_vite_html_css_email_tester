export async function getTemplate(templateData) {
  return {data: ['Hello Kitties!', templateData]}
}

export default {getTemplate}