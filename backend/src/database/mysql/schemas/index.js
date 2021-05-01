import fs from "fs"

class ModelManager {
  initialize(sequelize) {
    // Read models in files
    const modelNames = fs.readdirSync(__dirname)
    modelNames
    // Exclude hidden files and index.js
    .filter((modelName) => {
      return (modelName.indexOf(".") !== 0) && (modelName !== "index.js")
    })
    // Initialize each models 
    .forEach((modelName) => {
      require(`./${modelName}`).default.init(sequelize)
    })
  }
}


const modelManager = new ModelManager()

export default modelManager