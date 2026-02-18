// import { readdir } from 'fs/promises'
import { readdir } from 'fs'

// export const getDirectories = source =>
//   (readdirSync(source, { withFileTypes: true }))
//     .filter(dirent => dirent.isDirectory())
//     .map(dirent => dirent.name)

export function getDirectories(filePath) {
  return readdir(filePath, { withFileTypes: true })
    // .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}
