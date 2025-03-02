/**
 * Script to rename React component files from .js to .jsx and update imports
 *
 * Usage: node rename-jsx-files.mjs
 */

import fs from "fs"
import path from "path"
import { promisify } from "util"
import { exec } from "child_process"

const execAsync = promisify(exec)
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const renameAsync = promisify(fs.rename)

// Better JSX pattern to match in files - looks for JSX tags or React import
const JSX_PATTERN =
  /<\s*[a-zA-Z][a-zA-Z0-9]*[\s\/>]|<\s*>|<\s*\/\s*[a-zA-Z][a-zA-Z0-9]*\s*>|import\s+(?:React|{.*React.*})\s+from\s+['"]react['"]/

// Track renames so we can update imports
const renamedFiles = new Map()

/**
 * Check if a file contains JSX
 */
async function fileContainsJSX(filePath) {
  try {
    const content = await readFileAsync(filePath, "utf8")
    return JSX_PATTERN.test(content)
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return false
  }
}

/**
 * Find all .js files in the src directory
 */
async function findJSFiles(dir) {
  const { stdout } = await execAsync('find src -type f -name "*.js"')
  return stdout.trim().split("\n").filter(Boolean)
}

/**
 * Rename a .js file to .jsx if it contains JSX
 */
async function renameJSToJSX(filePath) {
  try {
    // Check if file contains JSX
    const hasJSX = await fileContainsJSX(filePath)

    if (hasJSX) {
      const dirName = path.dirname(filePath)
      const baseName = path.basename(filePath, ".js")
      const newPath = path.join(dirName, `${baseName}.jsx`)

      // Rename the file
      await renameAsync(filePath, newPath)

      // Track the rename for updating imports
      const relativePath = filePath.replace(/^src\//, "")
      const newRelativePath = newPath.replace(/^src\//, "")
      renamedFiles.set(relativePath, newRelativePath)

      console.log(`Renamed: ${filePath} → ${newPath}`)
      return true
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error)
  }
  return false
}

/**
 * Update imports in all files to reference the renamed files
 */
async function updateImports(dir) {
  // Find all JS and JSX files
  const { stdout } = await execAsync(
    'find src -type f -name "*.js" -o -name "*.jsx"',
  )
  const allFiles = stdout.trim().split("\n").filter(Boolean)

  for (const filePath of allFiles) {
    try {
      let content = await readFileAsync(filePath, "utf8")
      let modified = false

      for (const [oldPath, newPath] of renamedFiles.entries()) {
        // Handle relative imports
        const fileDir = path.dirname(filePath.replace(/^src\//, ""))
        const oldRelativePath = path
          .relative(fileDir, oldPath)
          .replace(/\\/g, "/")
        const newRelativePath = path
          .relative(fileDir, newPath)
          .replace(/\\/g, "/")

        // Different import patterns to replace
        const importPatterns = [
          // Standard import
          {
            find: new RegExp(
              `from\\s+['"](\\.\\/|\\.\\.\\/)?${oldRelativePath.replace(/\.js$/, "")}['"]`,
              "g",
            ),
            replace: `from "$1${newRelativePath.replace(/\.jsx$/, "")}"`,
          },
          // Import with extension
          {
            find: new RegExp(
              `from\\s+['"](\\.\\/|\\.\\.\\/)?${oldRelativePath}['"]`,
              "g",
            ),
            replace: `from "$1${newRelativePath}"`,
          },
          // Direct path import
          {
            find: new RegExp(
              `from\\s+['"]${oldPath.replace(/\.js$/, "")}['"]`,
              "g",
            ),
            replace: `from "${newPath.replace(/\.jsx$/, "")}"`,
          },
        ]

        // Apply replacements
        for (const pattern of importPatterns) {
          const newContent = content.replace(pattern.find, pattern.replace)
          if (newContent !== content) {
            content = newContent
            modified = true
          }
        }
      }

      // Save the file if modified
      if (modified) {
        await writeFileAsync(filePath, content, "utf8")
        console.log(`Updated imports in: ${filePath}`)
      }
    } catch (error) {
      console.error(`Error updating imports in ${filePath}:`, error)
    }
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log("Finding JS files in src directory...")
    const jsFiles = await findJSFiles("src")
    console.log(`Found ${jsFiles.length} JS files.`)

    let renamedCount = 0
    for (const filePath of jsFiles) {
      const renamed = await renameJSToJSX(filePath)
      if (renamed) renamedCount++
    }
    console.log(`Renamed ${renamedCount} files from .js to .jsx.`)

    if (renamedCount > 0) {
      console.log("Updating import statements...")
      await updateImports("src")
      console.log("Import statements updated.")
    }

    console.log("Done!")
  } catch (error) {
    console.error("Error:", error)
    process.exit(1)
  }
}

main()
